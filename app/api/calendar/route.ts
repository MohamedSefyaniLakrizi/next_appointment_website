import { NextResponse } from "next/server";
import { GoogleCalendarService } from "../../../lib/google-calendar";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

// Helper function to get authenticated calendar service
async function getCalendarService() {
  const session = await getServerSession(authOptions);

  if (!session || !(session as any).accessToken) {
    throw new Error("Authentication required");
  }

  return new GoogleCalendarService((session as any).accessToken);
}

// Validation schemas
const createEventSchema = z.object({
  summary: z.string().min(1),
  description: z.string().optional(),
  date: z.string(),
  time: z.string(),
  clientEmail: z.string().email(),
  clientName: z.string().min(1),
  durationMinutes: z.number().optional().default(60),
});

const updateEventSchema = createEventSchema.extend({
  eventId: z.string().min(1),
});

const deleteEventSchema = z.object({
  eventId: z.string().min(1),
});

export async function GET(request: Request) {
  try {
    const calendarService = await getCalendarService();

    const { searchParams } = new URL(request.url);
    const timeMin = searchParams.get("timeMin");
    const timeMax = searchParams.get("timeMax");
    const maxResults = parseInt(searchParams.get("maxResults") || "50");

    const events = await calendarService.getEvents(
      timeMin || undefined,
      timeMax || undefined,
      maxResults
    );

    // Format events for frontend consumption
    const formattedEvents = events.map((event: any) => ({
      id: event.id,
      title: event.summary,
      start: event.start.dateTime,
      end: event.end.dateTime,
      description: event.description,
      status: event.status,
      attendees:
        event.attendees?.map((attendee: any) => ({
          email: attendee.email,
          name: attendee.displayName,
        })) || [],
    }));

    return NextResponse.json({
      events: formattedEvents,
      total: formattedEvents.length,
    });
  } catch (error) {
    console.error("Calendar GET error:", error);

    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json(
        { error: "Authentication required. Please sign in." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch calendar events" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case "create":
        return await handleCreateEvent(body);
      case "update":
        return await handleUpdateEvent(body);
      case "delete":
        return await handleDeleteEvent(body);
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Calendar POST error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleCreateEvent(body: any) {
  const calendarService = await getCalendarService();
  const validatedData = createEventSchema.parse(body);

  const {
    summary,
    description,
    date,
    time,
    clientEmail,
    clientName,
    durationMinutes,
  } = validatedData;

  // Format datetime for Google Calendar
  const startDateTime = GoogleCalendarService.formatDateTime(date, time);
  const endDateTime = GoogleCalendarService.calculateEndTime(
    startDateTime,
    durationMinutes
  );

  const event = await calendarService.createEvent({
    summary,
    description,
    startDateTime,
    endDateTime,
    clientEmail,
    clientName,
  });

  return NextResponse.json({
    message: "Event created successfully",
    event: {
      id: event.id,
      summary: event.summary,
      start: event.start.dateTime,
      end: event.end.dateTime,
    },
  });
}

async function handleUpdateEvent(body: any) {
  const calendarService = await getCalendarService();
  const validatedData = updateEventSchema.parse(body);

  const {
    eventId,
    summary,
    description,
    date,
    time,
    clientEmail,
    clientName,
    durationMinutes,
  } = validatedData;

  // Format datetime for Google Calendar
  const startDateTime = GoogleCalendarService.formatDateTime(date, time);
  const endDateTime = GoogleCalendarService.calculateEndTime(
    startDateTime,
    durationMinutes
  );

  const event = await calendarService.updateEvent({
    eventId,
    summary,
    description,
    startDateTime,
    endDateTime,
    clientEmail,
    clientName,
  });

  return NextResponse.json({
    message: "Event updated successfully",
    event: {
      id: event.id,
      summary: event.summary,
      start: event.start.dateTime,
      end: event.end.dateTime,
    },
  });
}

async function handleDeleteEvent(body: any) {
  const calendarService = await getCalendarService();
  const validatedData = deleteEventSchema.parse(body);

  await calendarService.deleteEvent(validatedData.eventId);

  return NextResponse.json({
    message: "Event deleted successfully",
  });
}

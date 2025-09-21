"use client";
import "../styles/book.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

const formSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .min(1, "Le numéro de téléphone est requis")
    .regex(/^(\d{2}\s){4}\d{2}$/, "Le numéro doit contenir 10 chiffres"),
  date: z.date({ message: "La date est requise" }),
  time: z.string().min(1, "L'heure est requise"),
  preferred_method: z.string().min(1, "La méthode de contact est requise"),
});

type FormData = z.infer<typeof formSchema>;

export default function BookPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      time: "09:00",
      preferred_method: "",
    },
  });

  // Phone number formatting function
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");

    const limitedDigits = digits.substring(0, 10);

    const formatted = limitedDigits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();

    return formatted;
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Prepare the data for API submission
      const submitData = {
        ...data,
        date: data.date?.toISOString(), // Convert Date to string for API
      };

      console.log("Form submitted:", submitData);

      // Send the booking request to our API
      const response = await fetch("/api/send-booking-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi");
      }

      toast.success("Demande de rendez-vous envoyée avec succès!", {
        description:
          "Nous vous contacterons bientôt pour confirmer votre rendez-vous.",
      });

      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Erreur lors de l'envoi", {
        description:
          error instanceof Error
            ? error.message
            : "Veuillez réessayer plus tard.",
      });
    }
  };

  useEffect(() => {
    // Load the CSS
    const link = document.createElement("link");
    link.href =
      "https://calendar.google.com/calendar/scheduling-button-script.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      // Cleanup
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {selectedType !== "online" && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Prendre Rendez-vous
            </h1>
            <p className="text-xl text-gray-600">
              Choisissez le type de consultation qui vous convient
            </p>
          </div>
        )}

        {!selectedType && (
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <button
              onClick={() => setSelectedType("consultation")}
              className="group relative cursor-pointer overflow-hidden rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Consultation
                </h3>
                <p className="text-gray-600 mb-4">
                  Rendez-vous en personne dans notre cabinet
                </p>
                <ul className="text-sm text-gray-500 space-y-1 mb-6">
                  <li>• Contact direct et personnel</li>
                  <li>• Environnement professionnel</li>
                  <li>• Confidentialité assurée</li>
                </ul>
                <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                  Choisir cette option
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedType("online")}
              className="group relative overflow-hidden cursor-pointer rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Consultation en ligne
                </h3>
                <p className="text-gray-600 mb-4">
                  Séance à distance par vidéoconférence
                </p>
                <ul className="text-sm text-gray-500 space-y-1 mb-6">
                  <li>• Confort de votre domicile</li>
                  <li>• Flexibilité horaire</li>
                  <li>• Même qualité d&apos;accompagnement</li>
                </ul>
                <div className="inline-flex items-center text-green-600 font-medium group-hover:text-green-700">
                  Choisir cette option
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        )}

        {selectedType === "consultation" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Consultation en cabinet
                </h2>
                <p className="text-gray-600">
                  Remplissez vos informations pour prendre rendez-vous
                </p>
              </div>
              <button
                onClick={() => setSelectedType(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Retour
              </button>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Votre prénom"
                            {...field}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Votre nom"
                            {...field}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="votre.email@exemple.com"
                          {...field}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone *</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="06 12 34 56 78"
                          value={field.value}
                          onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            field.onChange(formatted);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={14}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date / Heure préférée *
                  </label>
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal cursor-pointer"
                                >
                                  <svg
                                    className="mr-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                  {field.value ? (
                                    field.value.toLocaleDateString("fr-FR")
                                  ) : (
                                    <span>Sélectionnez une date</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                  field.onChange(date);
                                  setOpen(false);
                                }}
                                disabled={(date) =>
                                  date < new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              type="time"
                              {...field}
                              step="60"
                              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="preferred_method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Méthode préférée de contact *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex gap-8 items-center mt-4"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="Email" id="r1" />
                            <Label htmlFor="r1">Email</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="Téléphone" id="r2" />
                            <Label htmlFor="r2">Téléphone</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="WhatsApp" id="r3" />
                            <Label htmlFor="r3">WhatsApp</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {form.formState.isSubmitting
                      ? "Envoi en cours..."
                      : "Demander un rendez-vous"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}

        {selectedType === "online" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Consultation en ligne
                </h2>
                <p className="text-gray-600">
                  Sélectionnez un créneau pour votre visioconférence
                </p>
              </div>
              <button
                onClick={() => setSelectedType(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Retour
              </button>
            </div>
            <div
              className="relative w-full"
              style={{ height: "calc(100vh - 300px)", minHeight: "500px" }}
            >
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2UX9Nk0LuRXxt5XCJyhRBGS5FfWHIiLAfZTk9eD2ytNIYmNZX6DRed8JtUf_OBWcpkTcdkgTAS?gv=true"
                className="absolute inset-0 w-full h-full rounded-lg"
                style={{ border: 0 }}
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

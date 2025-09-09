"use client";
import "../styles/book.css";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";

export default function BookPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: undefined as Date | undefined,
  });

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

  const handleScriptLoad = () => {
    // This runs after the Google Calendar script loads
    if ((window as any).calendar && (window as any).calendar.schedulingButton) {
      const target = document.getElementById("calendar-button-target");
      if (target) {
        (window as any).calendar.schedulingButton.load({
          url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2UX9Nk0LuRXxt5XCJyhRBGS5FfWHIiLAfZTk9eD2ytNIYmNZX6DRed8JtUf_OBWcpkTcdkgTAS?gv=true",
          color: "#1a1a1a",
          label: "Consultation",
          target,
        });
      }
    }
  };

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
                  <li>• Même qualité d'accompagnement</li>
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

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Votre prénom"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Votre nom"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="votre.email@exemple.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="06 12 34 56 78"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date préférée *
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
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
                      {formData.date ? (
                        formData.date.toLocaleDateString("fr-FR")
                      ) : (
                        <span>Sélectionnez une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => setFormData({ ...formData, date })}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle form submission here
                    console.log("Form submitted:", formData);
                  }}
                >
                  Demander un rendez-vous
                </Button>
              </div>
            </form>
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

"use client";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  description: string;
}

export default function AdminPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [formData, setFormData] = useState({
    clientEmail: "",
    firstName: "",
    lastName: "",
    date: "",
    time: "",
    originalDate: "",
    originalTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load templates on component mount
  const loadTemplates = async () => {
    try {
      const response = await fetch("/api/send-template-email");
      const data = await response.json();
      setTemplates(data.templates);
    } catch (error) {
      toast.error("Erreur lors du chargement des templates");
    }
  };

  // Load templates when component mounts
  useEffect(() => {
    loadTemplates();
  }, []);

  const handleSendTemplate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTemplate) {
      toast.error("Veuillez sélectionner un template");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        templateType: selectedTemplate,
        clientEmail: formData.clientEmail,
        firstName: formData.firstName,
        lastName: formData.lastName,
        date: new Date(formData.date).toISOString(),
        time: formData.time,
        ...(selectedTemplate === "reschedule" && {
          originalDate: new Date(formData.originalDate).toISOString(),
          originalTime: formData.originalTime,
        }),
      };

      const response = await fetch("/api/send-template-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi");
      }

      toast.success("Email envoyé avec succès!");

      // Reset form
      setFormData({
        clientEmail: "",
        firstName: "",
        lastName: "",
        date: "",
        time: "",
        originalDate: "",
        originalTime: "",
      });
      setSelectedTemplate("");
    } catch (error) {
      console.error("Error sending template:", error);
      toast.error(
        error instanceof Error ? error.message : "Erreur lors de l'envoi"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            📧 Administration - Envoi de Templates
          </h1>

          <form onSubmit={handleSendTemplate} className="space-y-6">
            {/* Client Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom du client *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="Prénom"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom du client *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Nom"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="clientEmail">Email du client *</Label>
              <Input
                id="clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={(e) =>
                  setFormData({ ...formData, clientEmail: e.target.value })
                }
                placeholder="email@exemple.com"
                required
              />
            </div>

            {/* Appointment Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date du rendez-vous *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Heure du rendez-vous *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Original appointment details (for reschedule template) */}
            {selectedTemplate === "reschedule" && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-yellow-800">
                  📅 Informations du rendez-vous original (pour reprogrammation)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="originalDate">Date originale</Label>
                    <Input
                      id="originalDate"
                      type="date"
                      value={formData.originalDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          originalDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalTime">Heure originale</Label>
                    <Input
                      id="originalTime"
                      type="time"
                      value={formData.originalTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          originalTime: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Template Selection */}
            <div>
              <Label className="text-base font-semibold">
                Sélectionnez un template d'email *
              </Label>
              <RadioGroup
                value={selectedTemplate}
                onValueChange={setSelectedTemplate}
                className="mt-3"
              >
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <RadioGroupItem
                      value={template.id}
                      id={template.id}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={template.id}
                        className="font-medium cursor-pointer"
                      >
                        {template.name}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {template.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Envoi en cours..." : "📧 Envoyer l'email"}
            </Button>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">
            💡 Guide d'utilisation
          </h2>
          <div className="space-y-2 text-blue-800">
            <p>
              <strong>Confirmation :</strong> Utilisez après avoir accepté une
              demande de rendez-vous
            </p>
            <p>
              <strong>Reprogrammation :</strong> Utilisez pour proposer de
              nouveaux créneaux
            </p>
            <p>
              <strong>Rappel :</strong> Envoyez quelques jours avant le
              rendez-vous
            </p>
            <p>
              <strong>Annulation :</strong> Utilisez pour annuler un rendez-vous
              confirmé
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

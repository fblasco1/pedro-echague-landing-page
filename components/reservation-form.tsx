"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Users, Phone, User, MessageSquare, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ReservationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    comments: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  const generateWhatsAppMessage = () => {
    const message = `Hola! Quiero hacer una reserva en La Casona:
    
👤 Nombre: ${formData.name}
📅 Fecha: ${formData.date}
🕐 Hora: ${formData.time}
👥 Comensales: ${formData.guests}
📞 Teléfono: ${formData.phone}
${formData.comments ? `💬 Comentarios: ${formData.comments}` : ""}

¡Gracias!`

    return encodeURIComponent(message)
  }

  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-4 font-raleway">¡Solicitud Enviada!</h3>
          <p className="text-green-700 mb-6 font-roboto">
            Hemos recibido tu solicitud de reserva. Nos comunicaremos contigo en breve para confirmar la disponibilidad.
          </p>
          <div className="space-y-4">
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
              <a
                href={`https://wa.me/5491176401842?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="mr-2 h-4 w-4" />
                Enviar por WhatsApp
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  name: "",
                  phone: "",
                  date: "",
                  time: "",
                  guests: "",
                  comments: "",
                })
              }}
              className="ml-4"
            >
              Nueva Reserva
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center text-club-blue font-semibold">
            <User className="h-4 w-4 mr-2" />
            Nombre completo *
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Tu nombre completo"
            required
            className="border-gray-300 focus:border-club-blue focus:ring-club-blue"
          />
        </div>

        {/* Teléfono */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center text-club-blue font-semibold">
            <Phone className="h-4 w-4 mr-2" />
            Teléfono *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="11 1234-5678"
            required
            className="border-gray-300 focus:border-club-blue focus:ring-club-blue"
          />
        </div>

        {/* Fecha */}
        <div className="space-y-2">
          <Label htmlFor="date" className="flex items-center text-club-blue font-semibold">
            <Calendar className="h-4 w-4 mr-2" />
            Fecha *
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            required
            min={new Date().toISOString().split('T')[0]}
            className="border-gray-300 focus:border-club-blue focus:ring-club-blue"
          />
          <p className="text-xs text-gray-500">Solo viernes y sábados</p>
        </div>

        {/* Hora */}
        <div className="space-y-2">
          <Label htmlFor="time" className="flex items-center text-club-blue font-semibold">
            <Clock className="h-4 w-4 mr-2" />
            Hora *
          </Label>
          <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
            <SelectTrigger className="border-gray-300 focus:border-club-blue focus:ring-club-blue">
              <SelectValue placeholder="Selecciona la hora" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20:00">20:00 hs</SelectItem>
              <SelectItem value="20:30">20:30 hs</SelectItem>
              <SelectItem value="21:00">21:00 hs</SelectItem>
              <SelectItem value="21:30">21:30 hs</SelectItem>
              <SelectItem value="22:00">22:00 hs</SelectItem>
              <SelectItem value="22:30">22:30 hs</SelectItem>
              <SelectItem value="23:00">23:00 hs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Comensales */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="guests" className="flex items-center text-club-blue font-semibold">
            <Users className="h-4 w-4 mr-2" />
            Cantidad de comensales *
          </Label>
          <Select value={formData.guests} onValueChange={(value) => handleInputChange("guests", value)}>
            <SelectTrigger className="border-gray-300 focus:border-club-blue focus:ring-club-blue">
              <SelectValue placeholder="¿Cuántas personas?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 persona</SelectItem>
              <SelectItem value="2">2 personas</SelectItem>
              <SelectItem value="3">3 personas</SelectItem>
              <SelectItem value="4">4 personas</SelectItem>
              <SelectItem value="5">5 personas</SelectItem>
              <SelectItem value="6">6 personas</SelectItem>
              <SelectItem value="7">7 personas</SelectItem>
              <SelectItem value="8">8 personas</SelectItem>
              <SelectItem value="mas">Más de 8 personas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Comentarios */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="comments" className="flex items-center text-club-blue font-semibold">
            <MessageSquare className="h-4 w-4 mr-2" />
            Comentarios adicionales
          </Label>
          <Textarea
            id="comments"
            value={formData.comments}
            onChange={(e) => handleInputChange("comments", e.target.value)}
            placeholder="Algún pedido especial, celebración, etc."
            rows={3}
            className="border-gray-300 focus:border-club-blue focus:ring-club-blue resize-none"
          />
        </div>
      </div>

      {/* Botón de envío */}
      <div className="text-center pt-4">
        <Button
          type="submit"
          disabled={
            isLoading || !formData.name || !formData.phone || !formData.date || !formData.time || !formData.guests
          }
          className="bg-club-blue hover:bg-club-blue/90 text-white px-8 py-3 text-lg font-semibold"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Enviando...
            </>
          ) : (
            <>
              <Calendar className="mr-2 h-5 w-5" />
              Solicitar Reserva
            </>
          )}
        </Button>
        <p className="text-xs text-gray-500 mt-2">
          * Campos obligatorios. Las reservas están sujetas a disponibilidad.
        </p>
      </div>
    </form>
  )
}

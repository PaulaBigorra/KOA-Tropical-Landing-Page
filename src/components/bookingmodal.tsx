import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { BookingFormData, RoomType } from '../Types/booking';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: RoomType[];
  roomStock: Record<string, number>; // Seguimiento de stock restante
  onBookingSuccess: (roomTypeId: string, count: number) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  rooms,
  roomStock,
  onBookingSuccess,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    roomTypeId: rooms[0]?.id || '',
    roomsCount: 1,
    guestsCount: 1,
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const selectedRoom = rooms.find((r) => r.id === formData.roomTypeId);
  const currentAvailable = selectedRoom ? roomStock[selectedRoom.id] : 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Validación de stock límite (5 unidades por tipo)
    if (formData.roomsCount > currentAvailable) {
      setErrorMessage(
        `Lo sentimos, no quedan suficientes habitaciones disponibles de este tipo. Disponibles: ${currentAvailable}`
      );
      return;
    }

    setLoading(true);

    try {
      // Reemplaza con tus IDs reales de EmailJS
      const SERVICE_ID = 'YOUR_SERVICE_ID';
      const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
      const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

      const templateParams = {
        to_name: `${formData.firstName} ${formData.lastName}`,
        to_email: formData.email,
        room_type: selectedRoom?.name || 'Habitación KOA',
        rooms_count: formData.roomsCount,
        guests_count: formData.guestsCount,
        phone: formData.phone,
      };

      // Envío de correo mediante EmailJS
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      // Descontar del stock
      onBookingSuccess(formData.roomTypeId, Number(formData.roomsCount));

      setSuccessMessage(
        '¡Reserva guardada con éxito! Se ha enviado un correo de confirmación a tu email.'
      );
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      setErrorMessage(
        'La reserva se guardó, pero hubo un problema al enviar el correo de confirmación.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 my-8 text-gray-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-emerald-900 mb-6">
          Reservar tu Estancia en KOA Tropical
        </h2>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-100 border border-emerald-400 text-emerald-700 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Datos Personales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                Apellido *
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                Teléfono *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                Gmail / Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Selección de Habitación y Personas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                Modelo de Habitación *
              </label>
              <select
                name="roomTypeId"
                value={formData.roomTypeId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {rooms.map((room) => {
                  const stock = roomStock[room.id];
                  return (
                    <option key={room.id} value={room.id} disabled={stock === 0}>
                      {room.name} {stock === 0 ? '(Agotada)' : `(${stock} disponibles)`}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                Cant. Habitaciones *
              </label>
              <input
                type="number"
                name="roomsCount"
                min="1"
                max={currentAvailable || 1}
                required
                value={formData.roomsCount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                Huéspedes *
              </label>
              <input
                type="number"
                name="guestsCount"
                min="1"
                max="10"
                required
                value={formData.guestsCount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Sección de Tarjeta (Opcional por Demo) */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-bold text-gray-700 mb-2">
              Datos de Pago / Tarjeta (Opcional - Demo)
            </h3>
            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Número de tarjeta (16 dígitos)"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  name="cardName"
                  placeholder="Nombre en la tarjeta"
                  value={formData.cardName}
                  onChange={handleChange}
                  className="col-span-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                />
                <input
                  type="text"
                  name="cardExpiry"
                  placeholder="MM/AA"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                />
                <input
                  type="text"
                  name="cardCvc"
                  placeholder="CVC"
                  value={formData.cardCvc}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Botón de Guardar en la parte inferior */}
          <div className="border-t pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || currentAvailable === 0}
              className="px-6 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-medium rounded-lg shadow-md transition disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar Reserva'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
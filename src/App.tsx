import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Menu, 
  X 
} from 'lucide-react';
import { Room, EventService, Review } from './types';

// Datos basados en las capturas de Figma
const ROOMS: Room[] = [
  {
    id: '1',
    name: 'The Canopy Room',
    capacity: '2 guests',
    beds: '1 king-sized bed',
    description: 'A serene retreat featuring natural materials and a private terrace, perfect for soaking in the beauty of the tropics.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'The Palm Room',
    capacity: '3 guests',
    beds: '1 double bed + 1 single bed',
    description: 'A welcoming and comfortable space for a tropical getaway with your partner, friends, or family.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'The Coastline Triple',
    capacity: '3 guests',
    beds: '3 single beds',
    description: 'An inviting and practical retreat for friends or small groups looking to enjoy the coast together.',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'The Tropical Quad',
    capacity: '4 guests',
    beds: '4 single beds',
    description: 'A spacious and relaxing retreat for families and groups, with all the comfort you need after a day of exploring.',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80'
  }
];

const EVENTS: EventService[] = [
  {
    id: '1',
    title: 'Wedding Celebrations',
    description: 'Celebrate your special day in a beautiful tropical setting, surrounded by natural beauty and the people who matter most.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    title: 'Talks & Book Launches',
    description: 'An inspiring space for keynotes, author talks, book presentations, workshops, and meaningful conversations.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    title: 'Executive Meetings',
    description: 'A focus and relaxing setting for business meetings, team discussions, presentations, and strategic planning sessions.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '4',
    title: 'Birthday Celebrations',
    description: 'Make every birthday feel special with a memorable gathering in a relaxed tropical atmosphere, surrounded by friends and family.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '5',
    title: 'Milestone Celebrations',
    description: 'Honor the important moments, from graduations to professional achievements, with a gathering to remember.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '6',
    title: 'Private Gatherings',
    description: 'From family reunions to intimate dinners and one-of-a-kind occasions, discover a setting that can tailored to your gathering.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80'
  }
];

const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Evelyn W.',
    location: 'USA',
    rating: 5,
    title: 'A Truly Peaceful Escape',
    comment: '"Beautiful surroundings, thoughtful details, and the perfect atmosphere to unwind. Waking up to the ocean view was unforgettable."',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '2',
    author: 'Jarrod M.',
    location: 'Australia',
    rating: 5,
    title: 'Comfort Meets Nature',
    comment: '"The natural design, warm atmosphere, and beautiful rooms made our stay feel special. A perfect place to relax and reconnect."',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '3',
    author: 'Sophia L.',
    location: 'USA',
    rating: 5,
    title: 'A Tropical Dream',
    comment: '"From the peaceful beach to the beautiful wooden interiors, every detail captures the essence of tropical living. We would love to return."',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=300&q=80'
  }
];

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Estado para el formulario de contacto
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // Estado para suscripción
  const [promoEmail, setPromoEmail] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will contact you soon.');
    setContactForm({ firstName: '', lastName: '', email: '', message: '' });
  };

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing! Check your email for exclusive deals.');
    setPromoEmail('');
  };

  return (
    <div className="min-h-screen bg-[#efece6] text-[#2c2a29] font-sans antialiased">
      
      {/* --- HEADER / NAVBAR --- */}
      <header className="sticky top-0 z-50 bg-[#8E8277]/90 backdrop-blur-md border-b border-[#d8d3c9]">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
          {/* Logo Oficial de Figma */}
          <a href="#" className="flex items-center ml-8">
            <img 
              src="/logo.png" 
              alt="KOA Hotel Logo" 
              className="h-18 sm:h-16 w-auto object-contain"
            />
          </a>
          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#000000]">
            <a href="#rooms" className="hover:text-[#1a1a1a] transition">Rooms</a>
            <a href="#services" className="hover:text-[#1a1a1a] transition">Services</a>
            <a href="#location" className="hover:text-[#1a1a1a] transition">Our Location</a>
            <a href="#contact" className="hover:text-[#1a1a1a] transition">Contact Us</a>
          </nav>

          <a 
            href="#rooms" 
            className="hidden md:inline-block bg-[#1a1a1a] text-white px-6 py-2.5 text-xs tracking-wider uppercase font-semibold hover:bg-[#333] transition"
          >
            Reserve Your Stay
          </a>

          {/* Menú Mobile */}
          <button 
            className="md:hidden text-[#1a1a1a]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#efece6] border-b border-[#d8d3c9] px-6 py-4 space-y-3">
            <a href="#rooms" className="block text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Rooms</a>
            <a href="#services" className="block text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#location" className="block text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Our Location</a>
            <a href="#contact" className="block text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Contact Us</a>
            <a href="#rooms" className="block w-full text-center bg-[#1a1a1a] text-white py-2 text-xs uppercase" onClick={() => setMobileMenuOpen(false)}>
              Reserve Your Stay
            </a>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80" 
            alt="Koa Tropical Resort" 
            className="w-full h-full object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-white space-y-4">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wide drop-shadow-md">
            Koa Tropical Resort & Spa
          </h1>
          <p className="text-lg sm:text-xl font-light tracking-widest text-slate-100 drop-shadow">
            Where tropical nature and ocean serenity come together
          </p>
        </div>
      </section>

      {/* --- ROOMS SECTION --- */}
      <section id="rooms" className="py-20 bg-[#D6C9BC] max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-[#1a1a1a]">Rooms</h2>
          <div className="w-12 h-[1px] bg-[#8c857b] mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {ROOMS.map((room) => (
            <div key={room.id} className="bg-white rounded-sm overflow-hidden shadow-sm flex flex-col justify-between">
              <img src={room.image} alt={room.name} className="w-full h-64 object-cover" />
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#1a1a1a] mb-1">{room.name}</h3>
                  <p className="text-xs text-[#8c857b] uppercase tracking-wider font-semibold mb-3">
                    {room.capacity} · {room.beds}
                  </p>
                  <p className="text-sm text-[#666] leading-relaxed">{room.description}</p>
                </div>
                <button className="self-start bg-[#8E8277] text-white text-xs px-5 py-2 uppercase tracking-wider hover:bg-[#8E8277] transition">
                  Reserve This Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- MEETINGS & SPECIAL EVENTS --- */}
      <section id="services" className="py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-[#1a1a1a]">Meetings & Special Events</h2>
            <div className="w-12 h-[1px] bg-[#8c857b] mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENTS.map((event) => (
              <div key={event.id} className="bg-white p-4 rounded-sm flex flex-col justify-between">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover mb-4" />
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-[#1a1a1a]">{event.title}</h3>
                    <p className="text-xs text-[#666] mt-2 leading-relaxed">{event.description}</p>
                  </div>
                  <button className="mt-4 self-start bg-[#8E8277] text-white text-[10px] px-4 py-2 uppercase tracking-wider hover:bg-[#8E8277] transition">
                    Inquire About Events
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OUR LOCATION --- */}
      <section id="location" className="py-20 bg-[#D6C9BC] max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-serif text-4xl text-[#1a1a1a]">Our Location</h2>
            <p className="text-sm text-[#555] leading-relaxed max-w-lg">
              Discover the beauty of the destination from serene landscapes to local highlights. Enjoy a relaxing experience at Koa Resort, your starting point for exploring the best of the area.
            </p>
            <a href="#contact" className="inline-block bg-[#8E8277] text-white text-xs px-6 py-2.5 uppercase tracking-wider hover:bg-[#8E8277] transition">
              Contact Us
            </a>
          </div>

          <div className="w-full h-80 rounded-sm overflow-hidden shadow-md relative bg-slate-300">
            <iframe 
              title="Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105073.44388716912!2d-58.50333857181313!3d-34.6037222718116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b41c1e9f3%3A0xed0732b008545b36!2sBuenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sar!4v1700000000000!5m2!1sen!2sar" 
              className="w-full h-full border-0"
              allowFullScreen={false} 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* --- GUEST REVIEWS --- */}
      <section className="py-20 bg-[#e6e2da]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-[#1a1a1a]">Guest Reviews</h2>
            <div className="w-12 h-[1px] bg-[#8c857b] mx-auto mt-3"></div>
          </div>

          <div className="space-y-6">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-[#efece6] p-6 rounded-sm flex flex-col md:flex-row gap-6 items-center border border-[#d8d3c9]">
                <img src={rev.image} alt={rev.author} className="w-24 h-24 object-cover rounded-sm flex-shrink-0" />
                <div className="space-y-2 text-center md:text-left flex-1">
                  <div className="flex justify-center md:justify-start space-x-1 text-amber-600">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#1a1a1a]">{rev.title}</h3>
                  <p className="text-xs text-[#555] italic">{rev.comment}</p>
                  <p className="text-[11px] text-[#8c857b] font-medium">- {rev.author}, <span className="uppercase">{rev.location}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT US --- */}
      <section id="contact" className="py-20 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="font-serif text-4xl text-[#1a1a1a]">Contact Us</h2>
          <div className="w-12 h-[1px] bg-[#8E8277] mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Formulario con campos redondeados 10px */}
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="First Name" 
                required
                value={contactForm.firstName}
                onChange={(e) => setContactForm({...contactForm, firstName: e.target.value})}
                className="w-full bg-white border border-[#4a4a4a] rounded-[10px] p-3.5 text-sm text-[#1a1a1a] placeholder-gray-500 focus:outline-none focus:border-black"
              />
              <input 
                type="text" 
                placeholder="Last Name" 
                required
                value={contactForm.lastName}
                onChange={(e) => setContactForm({...contactForm, lastName: e.target.value})}
                className="w-full bg-white border border-[#4a4a4a] rounded-[10px] p-3.5 text-sm text-[#1a1a1a] placeholder-gray-500 focus:outline-none focus:border-black"
              />
            </div>
            <input 
              type="email" 
              placeholder="Email" 
              required
              value={contactForm.email}
              onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
              className="w-full bg-white border border-[#4a4a4a] rounded-[10px] p-3.5 text-sm text-[#1a1a1a] placeholder-gray-500 focus:outline-none focus:border-black"
            />
            <textarea 
              rows={5} 
              placeholder="Consulta" 
              required
              value={contactForm.message}
              onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
              className="w-full bg-white border border-[#4a4a4a] rounded-[10px] p-3.5 text-sm text-[#1a1a1a] placeholder-gray-500 focus:outline-none focus:border-black resize-none"
            ></textarea>
            <button 
              type="submit" 
              className="bg-[#9d9387] text-white text-xs px-8 py-2.5 rounded-[10px] hover:bg-[#887e72] transition font-medium"
            >
              Send
            </button>
          </form>

          {/* Información de contacto con íconos de Lucide parecidos al diseño */}
          <div className="space-y-6 lg:pl-8 pt-2">
            <div className="flex items-center space-x-3 text-base text-[#1a1a1a] font-semibold">
              <MapPin size={22} className="text-black flex-shrink-0" />
              <span>Av. Libertador xxx , Buenos Aires, Argentina</span>
            </div>
            <div className="flex items-center space-x-3 text-base text-[#1a1a1a] font-semibold">
              <Phone size={22} className="text-black flex-shrink-0" />
              <span>(+54) xx xxxx-xxxx</span>
            </div>
            <div className="flex items-center space-x-3 text-base text-[#1a1a1a] font-semibold">
              <Mail size={22} className="text-black flex-shrink-0" />
              <span>reservas_KoaHotel@gmail.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROMOTIONS AND NEWS --- */}
      <section className="py-10 text-center px-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1a1a]">Promotions and News</h2>
          <p className="text-lg text-[#1a1a1a]">¡Sign up for exclusive deals!</p>

          <form onSubmit={handlePromoSubmit} className="flex flex-col sm:flex-row gap-4 pt-2 justify-center items-center">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full sm:w-56 bg-white border border-[#4a4a4a] rounded-[10px] p-3 text-sm text-[#1a1a1a] placeholder-gray-500 focus:outline-none focus:border-black"
            />
            <input 
              type="email" 
              placeholder="Email" 
              required
              value={promoEmail}
              onChange={(e) => setPromoEmail(e.target.value)}
              className="w-full sm:w-56 bg-white border border-[#4a4a4a] rounded-[10px] p-3 text-sm text-[#1a1a1a] placeholder-gray-500 focus:outline-none focus:border-black"
            />
            <button 
              type="submit" 
              className="w-full sm:w-auto bg-[#9d9387] text-white text-sm px-8 py-3 rounded-[10px] hover:bg-[#887e72] transition font-medium"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-[#666] pt-2">You'll receive a confirmation email to verify your address</p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#8E8277] py-4 text-center text-[#2c2a29]">
        <div className="max-w-7xl mx-auto px-6 space-y-2">
          <div className="flex flex-col items-center">
            <img 
              src="/logo.png" 
              alt="KOA Hotel Logo" 
              className="h-24 w-auto object-contain mb-1"
            />
          </div>
          <p className="text-xs text-[#4a4640]">
            Av. Libertador xxx | (+54) xx xxxx-xxxx <br />
            reservas_KoaHotel@gmail.com
          </p>
          <div className="flex justify-center space-x-4 pt-2 text-xs text-[#4a4640]">
            <span>Facebook</span>
            <span>·</span>
            <span>Instagram</span>
            <span>·</span>
            <span>LinkedIn</span>
            <span>·</span>
            <span>YouTube</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
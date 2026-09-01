import React, { useState } from 'react';
import { Scissors, Menu, X, Phone } from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Le Salon', href: '#salon' },
    { name: 'Services & Tarifs', href: '#services' },
    { name: 'Galerie', href: '#galerie' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-nude/90 backdrop-blur-md border-b border-gres/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
            {/* Conteneur de l'image du logo */}
            <div className="w-11 h-11 rounded-full overflow-hidden border border-gres/30 shadow-sm group-hover:border-terracotta transition-all duration-300">
                <img 
                src={logo} 
                alt="Maison Grès Logo" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Textes du logo */}
            <div className="flex flex-col">
                <span className="font-serif text-xl tracking-wider font-bold text-noir-mat group-hover:text-terracotta transition-colors uppercase">
                Asly Coiff
                </span>
                <span className="text-[10px] tracking-widest text-gres uppercase font-medium">
                L'ARTISTE
                </span>
            </div>
        </a>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm uppercase tracking-widest font-medium text-noirMat/80 hover:text-terracotta transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-terracotta hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Bouton RDV & Contact Rapide */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+33388000000"
              className="p-2.5 rounded-full text-noirMat hover:text-terracotta hover:bg-terracotta/10 transition-all"
              title="Nous appeler"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="#reservation"
              className="bg-terracotta hover:bg-noirMat text-white text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Prendre RDV
            </a>
          </div>

          {/* Bouton Hamburger Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-noirMat hover:text-terracotta focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-nude border-b border-gres/20 px-4 pt-2 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-noirMat hover:text-terracotta transition-colors py-2 border-b border-gres/10"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-3">
            <a
              href="#reservation"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-terracotta text-white text-xs uppercase tracking-widest font-semibold py-3 rounded-full shadow-md"
            >
              Prendre RDV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
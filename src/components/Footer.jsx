import React from 'react';
import { MapPin, Phone, Mail, Clock, Scissors, ExternalLink, Code, Heart } from 'lucide-react';

export default function Footer() {
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const GOOGLE_PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_IDD;

  // URL Google Maps pour le bouton d'itinéraire
  const GOOGLE_MAPS_URL = GOOGLE_PLACE_ID 
    ? `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`
    : "https://maps.google.com/?q=Salon+de+coiffure+Strasbourg+Cathedrale";

  // URL d'intégration Iframe Google Maps (utilise le Place ID si dispo, sinon recherche générique Strasbourg)
  const MAP_EMBED_URL = GOOGLE_PLACE_ID && GOOGLE_API_KEY
    ? `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=place_id:${GOOGLE_PLACE_ID}`
    : `https://maps.google.com/maps?q=Strasbourg%20Cathedrale%20Coiffure&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <footer id="contact" className="bg-noir-mat text-white relative pt-20 pb-8 overflow-hidden">
      
      {/* Glow décoratif */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gres/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Principale : Infos + Horaires + Carte */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Colonne 1 & 2 : Informations & Horaires (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Header & Bio */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-terracotta/20 flex items-center justify-center text-terracotta">
                  <Scissors className="w-5 h-5 transform -rotate-45" />
                </div>
                <span className="font-serif text-2xl font-bold uppercase tracking-wider text-white">
                  Asly Coiffure
                </span>
              </div>
              <p className="text-white/70 text-sm max-w-lg leading-relaxed">
                Votre salon de coiffure haute exigence à Strasbourg. Expertise visagisme, balayages d'exception et soins capillaires naturels au cœur de la capitale alsacienne.
              </p>
            </div>

            {/* Grille Coordonnées & Horaires */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              {/* Coordonnées */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg font-bold text-terracotta tracking-wide">
                  Nous Trouver
                </h4>
                <ul className="space-y-3 text-sm text-white/80">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                    <span>18 Rue de Molsheim,<br />67000 Strasbourg, France</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-terracotta flex-shrink-0" />
                    <a href="tel:+33388000000" className="hover:text-terracotta transition-colors">
                      +33 7 61 18 21 85
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-terracotta flex-shrink-0" />
                    <a href="mailto:contact@aslycoiff.fr" className="hover:text-terracotta transition-colors">
                      contact@aslycoiff.fr
                    </a>
                  </li>
                </ul>
              </div>

              {/* Horaires d'ouverture */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg font-bold text-terracotta tracking-wide flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Horaires</span>
                </h4>
                <ul className="space-y-2 text-xs text-white/80">
                  <li className="flex justify-between py-1 border-b border-white/10">
                    <span className="font-medium">Lundi — Samedi</span>
                    <span>10h00 – 19h00</span>
                  </li>
                  <li className="flex justify-between py-1 border-b border-white/10">
                    <span className="font-medium">Dimanche</span>
                    <span>11h00 – 16h30</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* CTA Itinéraire */}
            <div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-terracotta hover:bg-white hover:text-noir-mat text-white font-medium text-xs tracking-widest uppercase px-6 py-3.5 rounded-full transition-all duration-300 shadow-lg"
              >
                <span>Obtenir l'itinéraire Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Colonne 3 : Carte Google Maps Intégrée (5 cols) */}
          <div className="lg:col-span-5 h-full min-h-[320px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
            <iframe
              title="Localisation Google Business Maison Grès Strasbourg"
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

        </div>

        {/* Bottom Footer : Copyright & Signature Développeur */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          
          <p>© {new Date().getFullYear()} Asly Coiffure. Tous droits réservés.</p>

          {/* Signature Développeur */}
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <Code className="w-3.5 h-3.5 text-terracotta" />
            <span>Site conçu & développé par</span>
            <a
              href="https://github.com/Ach8393" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold hover:text-terracotta underline transition-colors"
            >
             Achraf Sadiq / ABSDev
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
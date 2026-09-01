import React, { useState } from 'react';
import { Scissors, Sparkles, Clock, Calendar } from 'lucide-react';

export default function Services() {
  const [activeTab, setActiveTab] = useState('homme');

  const GOOGLE_PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;
  const GOOGLE_MAPS_URL = import.meta.env.VITE_GOOGLE_MAPS_URL;

  const categories = [
    { id: 'homme', label: 'Homme' },
    { id: 'technique', label: 'Technique' },
    { id: 'autres', label: 'Autres' },
  ];

  const servicesData = {
    homme: [
      {
        title: "Coupe Homme ",
        price: "13 €",
        duration: "30 min",
        description: "Coupe aux ciseaux/tondeuse et finition coiffante.",
        popular: false,
      },
      {
        title: "Taille de Barbe",
        price: "8 €",
        duration: "30 min",
        description: "Sculpture de la barbe, serviette chaude et huile d'entretien biologique.",
        popular: false,
      },
      {
        title: "Formule Complète (Coupe + Barbe)",
        price: "20 €",
        duration: "50 min",
        description: "Le rituel masculin complet pour un soin impeccable de la tête aux joues.",
        popular: true,
      },
    ],
    technique: [
      {
        title: "Raser",
        price: "12 €",
        duration: "30 min",
        description: "Éclaircissement fondu et naturel, patine personnalisée et soin fixateur.",
        popular: true,
      },
      {
        title: "Ciseau",
        price: "17 €",
        duration: "40 min",
        description: "Couleur éclatante aux pigments naturels, sans ammoniaque ni allergènes.",
        popular: false,
      },
    ],
    autres: [
      {
        title: "Méches",
        price: "à partir de 20 €",
        duration: "plus de 60 min",
        description: "Traitement réparateur intense pour cheveux sensibilisés et déshydratés.",
        popular: true,
      },
    ],
  };

  // Récupération sécurisée du tableau courant
  const currentServices = servicesData[activeTab] || [];

  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Entête */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gres/10 text-gres text-xs font-semibold tracking-widest uppercase">
            <Scissors className="w-3.5 h-3.5" />
            <span>Tarifs & Prestations</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-noir-mat">
            Nos Prestations Sur-Mesure
          </h2>
          
          <p className="text-noir-mat/70 text-base sm:text-lg">
            Chaque service comprend un diagnostic visagisme personnalisé et des produits haut de gamme respectueux de vos cheveux.
          </p>
        </div>

        {/* Navigation Onglets */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-nude border border-gres/20 gap-1 flex-wrap justify-center">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-terracotta text-white shadow-md'
                    : 'text-noir-mat/70 hover:text-terracotta hover:bg-white/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grille des Tarifs Sécurisée */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentServices.map((service, index) => (
            <div
              key={index}
              className={`relative bg-nude/50 rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
                service.popular ? 'border-terracotta shadow-md bg-white' : 'border-gres/20'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3.5 right-6 bg-terracotta text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  <span>Coup de Cœur</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-serif text-xl font-bold text-noir-mat leading-snug">
                    {service.title}
                  </h3>
                  <span className="font-serif text-xl font-bold text-terracotta whitespace-nowrap">
                    {service.price}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gres font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{service.duration}</span>
                </div>

                <p className="text-sm text-noir-mat/70 leading-relaxed pt-2 border-t border-gres/15">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 mt-6">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-terracotta/30 text-terracotta hover:bg-terracotta hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 group"
                >
                  <Calendar className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span>Appelez nous</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-noir-mat/50 mt-12">
          * Les tarifs pour les techniques de coloration et balayage peuvent variar selon la longueur et la densité des cheveux.
        </p>

      </div>
    </section>
  );
}
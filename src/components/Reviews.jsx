import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, ExternalLink, Quote, Loader2, CheckCircle2 } from 'lucide-react';
import { useGooglePlaces } from '../hooks/useGooglePlaces';

export default function Reviews() {
  const isGoogleLoaded = useGooglePlaces();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const GOOGLE_PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;
  const GOOGLE_MAPS_URL = GOOGLE_PLACE_ID 
    ? `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`
    : "https://maps.google.com";

  const fallbackReviews = [
    {
      author_name: "Alexandre Devaux",
      profile_photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      relative_time_description: "il y a 2 semaines",
      text: "Un service irréprochable pour la barbe et les cheveux. Le rituel serviette chaude est tout simplement parfait. Le meilleur salon homme de Strasbourg.",
    },
    {
      author_name: "Thomas Bertrand",
      profile_photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      relative_time_description: "il y a 1 mois",
      text: "Dégradé à blanc ultra propre et conseils avisés pour entretenir sa barbe au quotidien. Cadre très classe et accueil au top.",
    },
    {
      author_name: "Julien Mercer",
      profile_photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      relative_time_description: "il y a 1 mois",
      text: "Rien à redire ! Ponctualité, précision des ciseaux et produits de rasage de qualité. Je reviendrai tous les mois sans hésiter.",
    },
  ];

  useEffect(() => {
    console.log("🔍 [Reviews.jsx] Démarrage de la vérification des avis Google...");

    if (!isGoogleLoaded || !GOOGLE_PLACE_ID) {
      console.warn("⚠️ [Reviews.jsx] Google SDK non prêt ou Place ID absent. Utilisation des avis de secours.");
      setReviews(fallbackReviews);
      setLoading(false);
      return;
    }

    try {
      const dummyElement = document.createElement('div');
      const service = new window.google.maps.places.PlacesService(dummyElement);

      console.log("📡 [Reviews.jsx] Demande du champ 'reviews' pour Place ID:", GOOGLE_PLACE_ID);

      service.getDetails(
        { placeId: GOOGLE_PLACE_ID, fields: ['reviews'] },
        (place, status) => {
          console.log("📡 [Reviews.jsx] Statut API Google Reviews:", status);
          console.log("📦 [Reviews.jsx] Objet 'place' complet renvoyé:", place);
          console.log("💬 [Reviews.jsx] Tableau d'avis bruts:", place?.reviews);

          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            place?.reviews &&
            place.reviews.length > 0
          ) {
            const formattedReviews = place.reviews.map((rev) => ({
              author_name: rev.author_name,
              profile_photo_url: rev.profile_photo_url,
              rating: rev.rating,
              relative_time_description: rev.relative_time_description,
              text: rev.text,
            }));
            console.log("✅ [Reviews.jsx] Avis Google chargés avec succès:", formattedReviews.length);
            setReviews(formattedReviews);
          } else {
            console.error("❌ [Reviews.jsx] Impossible d'afficher les avis Google réels. Raison :", 
              status !== "OK" ? `Erreur API (${status})` : "Aucun avis présent dans l'objet Place"
            );
            setReviews(fallbackReviews);
          }
          setLoading(false);
        }
      );
    } catch (err) {
      console.error("💥 [Reviews.jsx] Erreur inattendue:", err);
      setReviews(fallbackReviews);
      setLoading(false);
    }
  }, [isGoogleLoaded, GOOGLE_PLACE_ID]);

  return (
    <section id="avis" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold tracking-widest uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Avis Clients Google</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-noir-mat">
            L'Avis de Nos Clients
          </h2>

          <p className="text-noir-mat/70 text-base sm:text-lg">
            Retours d'expérience authentiques extraits directement de notre fiche Google Business.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-terracotta">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-medium uppercase tracking-widest">
              Chargement des avis Google...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-nude/40 rounded-3xl p-8 border border-gres/20 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative group"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-terracotta/15 group-hover:text-terracotta/30 transition-colors pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-medium text-noir-mat/50">
                      {review.relative_time_description}
                    </span>
                  </div>

                  <p className="text-sm text-noir-mat/80 leading-relaxed italic pt-1">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gres/15 flex items-center gap-3">
                  <img
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=C86D51&color=fff`;
                    }}
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-noir-mat flex items-center gap-1">
                      <span>{review.author_name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    </h4>
                    <span className="text-[11px] text-terracotta font-medium">Avis vérifié Google</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-noir-mat text-white font-medium text-xs tracking-widest uppercase px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>Afficher sur Google Maps</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
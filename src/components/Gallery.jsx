import React, { useState, useEffect } from 'react';
import { Camera, ExternalLink, Sparkles, X, Loader2, Maximize2 } from 'lucide-react';
import { useGooglePlaces } from '../hooks/useGooglePlaces';

export default function Gallery() {
  const isGoogleLoaded = useGooglePlaces();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('tous');

  const GOOGLE_PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;
  const GOOGLE_MAPS_URL = import.meta.env.VITE_GOOGLE_MAPS_URL;

  const fallbackPhotos = [
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlzMpUy7LopuloUiiG8evgVUWsdZDriaDDthaNdOAsFOj7HV9BHYEK2aTDvorFmGMGarnJY56KciFzcYo05fmxYbmvqlGiriHh-4s3koMtatFIeorFP6erYaoy9IqGeqvjQl8SEXXkeUowC=w243-h304-n-k-no-nu", category: "balayage", title: "Balayage Grès & Wave" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlaEOJ5lWyMBA2T4amXbdat1XZ5Tr6WhiomLjEJvKmP4dYGOmd8wRR3fiHxcZP9x0oHoCMQULJQ4ff_yoZlW7jjfuGpdvbMhlHdeGXRN8yXvS5e9ogTZwemgcN18fDPaIutdz4pRxHUFjMe=w243-h244-n-k-no-nu", category: "coupe", title: "Carré Structuré" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmxWM0iJ4MUO2R_ZmcooSAkwcdTgwrTnaaakREm4yRklwhWbBuCXNFWNla4oQnqbejkFn0RZ7JDzGjEpBZat5DhtS4cO6IKI-UgDW9Wg54AaMSf9O6MMk0V5v-5QpH3oc5j7EzjomwFl9eN=w243-h244-n-k-no-nu", category: "coloration", title: "Coloration Végétale Chaud" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmrUnqW7TErKGyK8860QhmR1-gb5JkasKowFT8E15EImoZmOZDBZfYYk5xebKKmqgOcVA5AFka0qCNFDSgrwQvPdLumQcxklRKdk8p_aINeX8ITKHyOLjO8QhWgWbGCv-wiq8_siKFYewY=w243-h304-n-k-no-nu", category: "balayage", title: "Ombré Blond Polaire" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm3Gjne7-mOfq6hngk4UvRFZIKTvsxQxmmsdIQTWPqfPfzP29xMzS2n-6-gPqgObt1Q9wdKYppZRmdh_c3zazSXD_sHUFWM0hl1gu_B9vKCqx91_IEAGwHoSQ2Byat1H44eUlOqLZnUxHvc=w243-h304-n-k-no-nu", category: "salon", title: "L'Espace Coiffure" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmhd3A_-mNnTsSJI-GPngAoka52zpuC9JpTy7AlOliZ7a-Omb_u4aA0_orugncVDrCoP7lt62e9PeC879hEGetnWyMwliw1tvMC9j21cSpnX0lRlOv0z9t1evGJxyX5hFGC7QU95SJIN7ns=w243-h174-n-k-no-nu", category: "coupe", title: "Coiffage Événementiel" },
  ];

  useEffect(() => {
    if (!isGoogleLoaded || !GOOGLE_PLACE_ID) {
      setPhotos(fallbackPhotos);
      setLoading(false);
      return;
    }

    try {
      const dummyElement = document.createElement('div');
      const service = new window.google.maps.places.PlacesService(dummyElement);

      service.getDetails(
        { placeId: GOOGLE_PLACE_ID, fields: ['photos'] },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.photos) {
            const googlePhotosFormatted = place.photos.map((photo, index) => ({
              url: photo.getUrl({ maxWidth: 800, maxHeight: 800 }),
              category: index % 2 === 0 ? 'balayage' : 'coupe',
              title: `Réalisation Fiche Google #${index + 1}`,
            }));
            setPhotos(googlePhotosFormatted);
          } else {
            setPhotos(fallbackPhotos);
          }
          setLoading(false);
        }
      );
    } catch {
      setPhotos(fallbackPhotos);
      setLoading(false);
    }
  }, [isGoogleLoaded, GOOGLE_PLACE_ID]);

  const filters = [
    { id: 'tous', label: 'Toutes les réalisations' },
    { id: 'balayage', label: 'Balayages & Ombrés' },
    { id: 'coupe', label: 'Coupes & Coiffages' },
    { id: 'coloration', label: 'Colorations' },
  ];

  const filteredPhotos = activeFilter === 'tous'
    ? photos
    : photos.filter((p) => p.category === activeFilter);

  return (
    <section id="galerie" className="py-20 bg-nude/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold tracking-widest uppercase">
            <Camera className="w-3.5 h-3.5" />
            <span>Galerie Google Business</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-noir-mat">
            Nos Réalisations en Images
          </h2>

          <p className="text-noir-mat/70 text-base sm:text-lg">
            Découvrez nos plus belles transformations capillaires, extraites en direct de notre fiche Google.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-white border border-gres/20 gap-1 flex-wrap justify-center shadow-sm">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-terracotta text-white shadow-sm'
                    : 'text-noir-mat/70 hover:text-terracotta'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-terracotta">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-medium uppercase tracking-widest">
              Chargement des visuels Google Maps...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(photo)}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl cursor-pointer transition-all duration-500 transform hover:-translate-y-1.5"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-noir-mat/80 via-noir-mat/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs font-semibold text-terracotta uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Maison Grès</span>
                      </p>
                      <h3 className="font-serif text-lg font-bold">{photo.title}</h3>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-gres/30 hover:border-terracotta text-noir-mat hover:text-terracotta font-medium text-xs tracking-widest uppercase px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          >
            <span>Voir plus de photos sur Google Maps</span>
            <ExternalLink className="w-4 h-4 text-terracotta" />
          </a>
        </div>

      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-noir-mat/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="rounded-2xl overflow-hidden max-h-[80vh] border-2 border-white/20 shadow-2xl">
              <img src={selectedImage.url} alt={selectedImage.title} className="w-full h-full object-contain" />
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-white font-serif text-xl font-bold">{selectedImage.title}</h3>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-terracotta hover:underline mt-1 font-medium"
              >
                <span>Publié sur la Fiche Google du salon</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
import { useState, useEffect } from 'react';

export function useGooglePlaces() {
  const [isLoaded, setIsLoaded] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  useEffect(() => {
    if (!apiKey) return;

    if (window.google?.maps?.places) {
      setIsLoaded(true);
      return;
    }

    let script = document.querySelector('script[id="google-maps-script"]');

    if (!script) {
      script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      document.head.appendChild(script);
    }

    const handleLoad = () => setIsLoaded(true);
    script.addEventListener('load', handleLoad);

    return () => {
      script.removeEventListener('load', handleLoad);
    };
  }, [apiKey]);

  return isLoaded;
}
import { useEffect, useState } from "react";
import { getAddress } from "@/services/api-reverse-geo";

export function useReverseGeo({ lat, lng }: { lat: number; lng: number }) {
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return;

    setLoading(true);
    setError(null);

    async function fetchAddress() {
      try {
        const result = await getAddress({ latitude: lat, longitude: lng });
        const fullAddress = `${result?.locality}, ${result?.city}, ${result?.countryName}`;
        setAddress(fullAddress);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAddress();
  }, [lat, lng, address]);

  return { address, loading, error };
}

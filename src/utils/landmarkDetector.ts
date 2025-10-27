export interface LandmarkResult {
  name: string | null;
  details?: string;
}

/**
 * Faz reverse geocoding usando OpenStreetMap Nominatim.
 * Retorna o nome do ponto de referência mais próximo (por ex. "Pico da Neblina").
 */
export async function detectLandmarkSmart(lat: number, lon: number): Promise<LandmarkResult> {
  const endpoint = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=14&addressdetails=1`;

  try {
    const res = await fetch(endpoint, {
      headers: { "User-Agent": "PatoPrimordial/1.0" },
    });

    if (!res.ok) throw new Error(`Nominatim error: ${res.status}`);
    const data = await res.json();

    const name =
      data.display_name ||
      data.name ||
      data.address?.tourism ||
      data.address?.natural ||
      data.address?.mountain ||
      data.address?.state_district ||
      data.address?.state ||
      data.address?.region ||
      null;

    return { name, details: data.display_name };
  } catch (err) {
    console.error("Erro ao buscar ponto de referência:", err);
    return { name: null };
  }
}

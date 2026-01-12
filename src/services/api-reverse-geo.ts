export async function getAddress(position: number[]) {
  const [latitude, longitude] = position;
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}

export async function searchGeoLocation(query: string) {
  const res = await fetch(
    `https://api.locationiq.com/v1/autocomplete?key=pk.8b3dccc82cbd1ba1b556fa1d8a304ac6&q=${query}&limit=5&dedupe=1`
  );

  if (!res.ok) throw Error("Failed to get address");

  const data = await res.json();

  return data;
}

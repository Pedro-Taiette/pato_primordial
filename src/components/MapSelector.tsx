import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

delete (L as any).Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export interface MapSelectorProps {
  lat: number;
  lon: number;
  onSelect: (lat: number, lon: number) => void;
  zoom?: number;
}

export default function MapSelector({ lat, lon, onSelect, zoom = 4 }: MapSelectorProps) {
  const [position, setPosition] = useState<[number, number]>([lat, lon]);
  useEffect(() => setPosition([lat, lon]), [lat, lon]);
  const center = useMemo(() => position, [position]);

  function ClickHandler() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        onSelect(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
      <div className="absolute top-2 left-3 z-[999] text-xs text-primary-light font-display tracking-wide bg-slate-900/70 px-3 py-1 rounded-full border border-primary/30 backdrop-blur-sm">
        LOCALIZAÇÃO ATIVA
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: 380, width: "100%" }}
        scrollWheelZoom
        className="bg-slate-900"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler />
        <Marker position={center} />
      </MapContainer>

      <div className="flex items-center justify-between px-3 py-2 bg-slate-900/80 text-xs text-slate-300 font-mono">
        <span>
          LAT/LON&nbsp;
          <span className="text-primary font-semibold">
            {center[0].toFixed(5)}, {center[1].toFixed(5)}
          </span>
        </span>
        <span className="opacity-70">Clique no mapa para reposicionar</span>
      </div>
    </div>
  );
}

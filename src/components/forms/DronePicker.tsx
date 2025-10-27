import { useEffect, useMemo } from "react";
import { DRONES } from "../../data/drones";
import { Section } from "../ui/Section";

export interface DronePickerValue {
  brand: string;
  modelId: string;
  serial: string;
  readings: Record<string, number>;
}

export interface DronePickerProps {
  value: DronePickerValue;
  onChange: (value: DronePickerValue) => void;
}

const ReadingSlider = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
}) => (
  <div>
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-300">{label}</span>
      <span className="text-primary font-semibold text-sm">{value}/10</span>
    </div>
    <input
      type="range"
      min={1}
      max={10}
      step={1}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value, 10))}
      className="w-full accent-primary"
    />
  </div>
);

const BrandPicker = ({
  brand,
  setBrand,
}: {
  brand: string;
  setBrand: (b: string) => void;
}) => {
  const brands = useMemo(
    () => Array.from(new Set(DRONES.map((d) => d.brand))),
    []
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {brands.map((b) => (
        <button
          key={b}
          onClick={() => setBrand(b)}
          className={`rounded-xl border p-3 text-center transition font-display ${
            brand === b
              ? "border-primary bg-primary/10 shadow-neon"
              : "border-slate-700 hover:border-slate-600"
          }`}
        >
          <div className="text-lg font-semibold">{b}</div>
          <div className="text-xs opacity-70">
            {DRONES.filter((d) => d.brand === b).length} modelos
          </div>
        </button>
      ))}
    </div>
  );
};

export default function DronePicker({ value, onChange }: DronePickerProps) {
  const models = useMemo(
    () => DRONES.filter((d) => d.brand === value.brand),
    [value.brand]
  );

  const selectedModel = useMemo(
    () => models.find((m) => m.id === value.modelId) ?? models[0],
    [models, value.modelId]
  );

  useEffect(() => {
    if (!selectedModel) return;

    const defaultReadings: Record<string, number> = {};
    selectedModel.reads.forEach(({ key }) => {
      defaultReadings[key] = value.readings[key] ?? 5;
    });

    onChange({
      ...value,
      modelId: selectedModel.id,
      serial: selectedModel.serialFixed,
      readings: defaultReadings,
    });
  }, [value.brand, value.modelId]);

  if (!selectedModel) return null;

  const turbo = selectedModel.turboStats;

  return (
    <div className="grid gap-6">
      {/* Marca */}
      <Section title="Marca do Drone">
        <BrandPicker
          brand={value.brand}
          setBrand={(b) => onChange({ ...value, brand: b })}
        />
      </Section>

      {/* Modelo */}
      <Section title="Modelo">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((m) => (
            <button
              key={m.id}
              onClick={() =>
                onChange({ ...value, modelId: m.id, serial: m.serialFixed })
              }
              className={`rounded-2xl border p-4 text-left transition hover:border-primary-light font-display ${
                value.modelId === m.id
                  ? "border-primary bg-primary/10 shadow-neon"
                  : "border-slate-700"
              }`}
            >
              <div className="font-semibold mb-1 text-primary-light">
                {m.brand} {m.model}
              </div>
              <div className="text-xs text-slate-400">
                Unidades: altura {m.duckUnits.altura}, peso {m.duckUnits.peso}
              </div>
              <div className="mt-1 text-xs text-slate-400">
                Atributos: {m.reads.map((r) => r.label).join(", ")}
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Número de Série */}
      <Section title="Número de Série">
        <input
          readOnly
          value={selectedModel.serialFixed}
          className="bg-slate-900/50 border border-slate-700 rounded-xl px-3 py-2 text-primary-light font-semibold cursor-not-allowed w-full"
        />
      </Section>

      {/* Atributos */}
      <Section title="Atributos">
        <div className="grid md:grid-cols-2 gap-4">
          {selectedModel.reads.map(({ key, label }) => (
            <ReadingSlider
              key={key}
              label={label}
              value={value.readings[key] ?? 5}
              onChange={(v) =>
                onChange({
                  ...value,
                  readings: { ...value.readings, [key]: v },
                })
              }
            />
          ))}
        </div>
      </Section>

      {/* Turbo do Drone */}
      <Section
        title="Turbo do Drone"
        description="Estatísticas fixas determinadas pelo drone ativo."
      >
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              label: "Potência Turbo",
              desc: "Velocidade que o dash dá.",
              val: turbo.potencia,
            },
            {
              label: "Estoque Turbo",
              desc: "Quantidade total de dashs disponíveis.",
              val: turbo.estoque,
            },
            {
              label: "Produção de Turbo",
              desc: "Velocidade de recarregamento do dash.",
              val: turbo.producao,
            },
          ].map((t) => (
            <div
              key={t.label}
              className="rounded-2xl border border-slate-700 bg-slate-900/50 p-4 text-center hover:border-primary/60 transition-all duration-300"
            >
              <div className="text-primary-light font-display text-lg font-semibold">
                {t.label}
              </div>
              <div className="text-slate-400 mt-1 text-sm italic">{t.desc}</div>
              <div className="text-3xl font-bold mt-2 text-primary animate-pulse">
                {t.val}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
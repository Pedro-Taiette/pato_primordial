import { useEffect, useMemo } from "react";
import { DRONES } from "../../data/drones";
import { Section } from "../ui/Section";
import { Zap, Gauge, RefreshCw } from "lucide-react";

export interface DronePickerValue {
  brand: string;
  modelId: string;
  serial: string;
}

export interface DronePickerProps {
  value: DronePickerValue;
  onChange: (value: DronePickerValue) => void;
}

// Picker de marcas (PatoX, Quacksa, DSIN)
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

// Barra de atributo visual (1–10)
const StatBar = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => {
  const pct = (value / 10) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="text-primary font-semibold text-sm">{value}/10</span>
      </div>
      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-3 bg-gradient-to-r from-primary-light to-primary rounded-full shadow-[0_0_10px_rgba(34,211,238,0.6)] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
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
    if (selectedModel) {
      onChange({
        ...value,
        modelId: selectedModel.id,
        serial: selectedModel.serialFixed,
      });
    }
  }, [value.brand, value.modelId]);

  if (!selectedModel) return null;

  const turbo = selectedModel.turboStats;

  return (
    <div className="grid gap-10">
      {/* Marca */}
      <Section title="Marca do Drone" card>
        <BrandPicker
          brand={value.brand}
          setBrand={(b) =>
            onChange({
              ...value,
              brand: b,
              modelId:
                DRONES.find((d) => d.brand === b)?.id ?? value.modelId,
            })
          }
        />
      </Section>

      {/* Modelo */}
      <Section title="Modelo" card>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((m) => (
            <button
              key={m.id}
              onClick={() =>
                onChange({
                  ...value,
                  modelId: m.id,
                  serial: m.serialFixed,
                })
              }
              className={`rounded-2xl border p-4 text-left transition font-display ${
                value.modelId === m.id
                  ? "border-primary bg-primary/10 shadow-neon"
                  : "border-slate-700 hover:border-slate-600"
              }`}
            >
              <div className="font-semibold mb-1 text-primary-light">
                {m.brand} {m.model}
              </div>
              <div className="text-xs text-slate-400">
                Unidades: altura {m.duckUnits.altura}, peso {m.duckUnits.peso}
              </div>
              <div className="text-xs text-slate-400 mt-1 italic">
                {m.reads.map((r) => r.label).join(", ")}
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Identificação */}
      <Section title="Identificação Técnica" card>
        <div className="grid sm:grid-cols-3 gap-4 text-center font-display">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
            <div className="text-slate-400 text-xs uppercase mb-1">Marca</div>
            <div className="text-primary-light font-semibold text-lg">
              {selectedModel.brand}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
            <div className="text-slate-400 text-xs uppercase mb-1">Modelo</div>
            <div className="text-primary-light font-semibold text-lg">
              {selectedModel.model}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
            <div className="text-slate-400 text-xs uppercase mb-1">
              Número de Série
            </div>
            <div className="text-primary font-semibold tracking-wide">
              {selectedModel.serialFixed}
            </div>
          </div>
        </div>
      </Section>

      {/* Atributos com Barras */}
      <Section
        title="Atributos Operacionais"
        description="Leitura dos módulos de desempenho do drone ativo."
        card
      >
        <div className="grid sm:grid-cols-2 gap-6">
          {selectedModel.reads.map((r) => (
            <StatBar key={r.key} label={r.label} value={r.value ?? 5} />
          ))}
        </div>
      </Section>

      {/* Turbo */}
      <Section
        title="Subsistema de Turbo"
        description="Indicadores energéticos de propulsão do drone."
        card
      >
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: <Zap className="w-5 h-5 text-primary" />,
              label: "Potência Turbo",
              value: turbo.potencia,
            },
            {
              icon: <Gauge className="w-5 h-5 text-primary" />,
              label: "Estoque Turbo",
              value: turbo.estoque,
            },
            {
              icon: <RefreshCw className="w-5 h-5 text-primary" />,
              label: "Produção de Turbo",
              value: turbo.producao,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 flex flex-col items-center justify-center text-center transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              <div className="mb-2">{item.icon}</div>
              <div className="text-primary-light font-display text-lg font-semibold">
                {item.label}
              </div>
              <div className="relative w-full mt-3">
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-3 bg-gradient-to-r from-primary-light to-primary rounded-full shadow-[0_0_10px_rgba(34,211,238,0.7)] transition-all"
                    style={{ width: `${(item.value / 10) * 100}%` }}
                  />
                </div>
                <div className="absolute top-[-24px] right-0 text-primary font-bold">
                  {item.value}/10
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

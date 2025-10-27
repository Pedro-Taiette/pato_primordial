import { Section } from "../ui/Section";
import { Field } from "../ui/Field";
import type { DroneModel } from "../../data/drones";

export interface DuckData {
  heightInput: { value: number; unit: string };
  weightInput: { value: number; unit: string };
  heightCm: number;
  weightG: number;
  hibernation: "despertado" | "transe" | "hibernacao";
  bpm: number;
  mutations: { score: number; tier: string; traits: string[] };
  superpower: { name: string; description: string; tags: string[] };
}

export default function DuckForm({
  duck,
  setDuck,
  duckUnits,
  selectedModel,
}: {
  duck: DuckData;
  setDuck: (d: DuckData) => void;
  duckUnits: { altura: string; peso: string };
  selectedModel: DroneModel;
}) {
  const superpowers = [
    { name: "Tempestade Elétrica", desc: "Libera descargas elétricas poderosas." },
    { name: "Hyper Raio", desc: "Dispara feixes de energia concentrada." },
    { name: "Floresta Mágica", desc: "Invoca raízes e ventos espirituais." },
  ];

  const tiers = ["Comum", "Notável", "Rara", "Épica", "Anômala"];

  return (
    <div className="grid gap-8">
      {/* Medidas */}
      <Section title="Medidas" description="Ajuste a altura e o peso do pato primordial.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label={`Altura (${duckUnits.altura})`}>
            <input
              type="number"
              min={1}
              step={1}
              value={duck.heightInput.value}
              onChange={(e) =>
                setDuck({
                  ...duck,
                  heightInput: { ...duck.heightInput, value: +e.target.value },
                })
              }
              className="bg-slate-900/50 border border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-primary-light"
            />
          </Field>

          <Field label={`Peso (${duckUnits.peso})`}>
            <input
              type="number"
              min={1}
              step={1}
              value={duck.weightInput.value}
              onChange={(e) =>
                setDuck({
                  ...duck,
                  weightInput: { ...duck.weightInput, value: +e.target.value },
                })
              }
              className="bg-slate-900/50 border border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-primary-light"
            />
          </Field>
        </div>
      </Section>

      {/* Estado */}
      <Section title="Estado" description="Defina o estado atual do Pato Primordial.">
        <div className="grid sm:grid-cols-3 gap-3">
          {(["despertado", "transe", "hibernacao"] as const).map((state) => (
            <button
              key={state}
              onClick={() => setDuck({ ...duck, hibernation: state })}
              className={`rounded-xl border p-3 transition font-display ${
                duck.hibernation === state
                  ? "border-primary bg-primary/10 shadow-neon"
                  : "border-slate-700 hover:border-slate-600"
              }`}
            >
              {state === "despertado"
                ? "Despertado"
                : state === "transe"
                ? "Transe"
                : "Hibernação"}
            </button>
          ))}
        </div>
      </Section>

      {/* Batimentos (só se transe/hibernação) */}
      {(duck.hibernation === "transe" || duck.hibernation === "hibernacao") && (
        <Section title="Batimentos Cardíacos" description="Monitore a vida do Pato em transe ou hibernação.">
          <Field label="Vida (30–140)">
            <input
              type="range"
              min={30}
              max={140}
              step={1}
              value={duck.bpm}
              onChange={(e) =>
                setDuck({ ...duck, bpm: parseInt(e.target.value, 10) })
              }
              className="w-full accent-primary"
            />
            <div className="text-primary font-semibold mt-1">{duck.bpm} / 140</div>
          </Field>
        </Section>
      )}

      {/* Superpoder (só se despertado) */}
      {duck.hibernation === "despertado" && (
        <Section title="Superpoder" description="Selecione o superpoder revelado ao despertar.">
          <div className="grid sm:grid-cols-3 gap-4">
            {superpowers.map((sp) => (
              <button
                key={sp.name}
                onClick={() =>
                  setDuck({
                    ...duck,
                    superpower: {
                      name: sp.name,
                      description: sp.desc,
                      tags: ["bélico"],
                    },
                  })
                }
                className={`rounded-2xl border p-4 text-left transition font-display ${
                  duck.superpower?.name === sp.name
                    ? "border-primary bg-primary/10 shadow-neon"
                    : "border-slate-700 hover:border-slate-600"
                }`}
              >
                <div className="text-lg font-semibold text-primary-light">{sp.name}</div>
                <div className="text-xs text-slate-400 italic mt-1">{sp.desc}</div>
              </button>
            ))}
          </div>
        </Section>
      )}

      {/* Mutações */}
      <Section title="Mutações" description="Ajuste pontuação e tier da mutação.">
        <div className="w-full accent-primary">
          <Field label="Pontuação">
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={duck.mutations.score}
              onChange={(e) =>
                setDuck({
                  ...duck,
                  mutations: { ...duck.mutations, score: +e.target.value },
                })
              }
              className="w-full accent-primary"
            />
            <div className="text-primary font-semibold mt-1">
              {duck.mutations.score} / 100
            </div>
          </Field>

          <Field label="Tier">
            <select
              value={duck.mutations.tier}
              onChange={(e) =>
                setDuck({
                  ...duck,
                  mutations: { ...duck.mutations, tier: e.target.value },
                })
              }
              className="bg-slate-900/50 border border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-primary-light"
            >
              {tiers.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Section>
    </div>
  );
}

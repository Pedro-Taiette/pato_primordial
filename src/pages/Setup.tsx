import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../components/ui/Page";
import { Section } from "../components/ui/Section";
import { Field } from "../components/ui/Field";
import { Button } from "../components/ui/Button";
import { useAppStore } from "../store/appStore";
import { DRONES } from "../data/drones";
import DronePicker from "../components/forms/DronePicker";
import type { DronePickerValue } from "../components/forms/DronePicker";
import DuckForm from "../components/forms/DuckForm";
import MapSelector from "../components/MapSelector";
import { toCm, toG } from "../utils/conversions";
import { detectLandmarkSmart } from "../utils/landmarkDetector";

export default function Setup() {
  const navigate = useNavigate();
  const { setSetup } = useAppStore();

  const [originCountry, setOriginCountry] = useState("Brasil");
  const [location, setLocation] = useState({
    city: "São Gabriel da Cachoeira",
    country: "Brasil",
    lat: -0.12,
    lon: -67.08,
    landmarkName: "",
  });

  const [drone, setDrone] = useState<DronePickerValue>(() => {
    const first = DRONES?.[0];
    if (!first) return { brand: "", modelId: "", serial: "", readings: {} };

    const readings: Record<string, number> = {};
    first.reads.forEach(({ key }) => (readings[key] = 5));

    return {
      brand: first.brand,
      modelId: first.id,
      serial: first.serialFixed,
      readings,
    };
  });

  const selectedModel = useMemo(
    () => DRONES.find((m) => m.id === drone.modelId) ?? DRONES[0],
    [drone.modelId]
  );

  const [duck, setDuck] = useState({
    heightInput: { value: 100, unit: selectedModel.duckUnits.altura },
    weightInput: { value: 5000, unit: selectedModel.duckUnits.peso },
    heightCm: toCm(100, selectedModel.duckUnits.altura),
    weightG: toG(5000, selectedModel.duckUnits.peso),
    hibernation: "hibernacao" as const,
    bpm: 40,
    mutations: { score: 0, tier: "Comum", traits: [] as string[] },
    superpower: {
      name: "Tempestade Elétrica",
      description: "Libera descargas elétricas poderosas.",
      tags: ["bélico"],
    },
  });

  async function handleMapSelect(lat: number, lon: number) {
    const detected = await detectLandmarkSmart(lat, lon);
    setLocation({
      ...location,
      lat,
      lon,
      landmarkName: detected.name || "",
    });
  }

  function handleSave() {
    const readings = Object.fromEntries(
      Object.entries(drone.readings ?? {}).map(([k, v]) => {
        const num = Number(v);
        return [k, Number.isFinite(num) && num > 0 ? num : 5];
      })
    );

    const json = {
      originCountry: originCountry.trim(),
      drone: {
        brand: drone.brand,
        modelId: drone.modelId,
        serial: selectedModel?.serialFixed ?? drone.serial,
        readings,
      },
      duck,
      location,
    };

    setSetup(json);
    navigate("/dashboard");
  }

  return (
    <Page title="Configurações">
      <div className="grid gap-10 xl:grid-cols-2">
        {/* Coluna Esquerda: Drone + Localização */}
        <div className="grid gap-10">
          <Section
            title="Drone"
            description="Selecione a marca, modelo e distribua os atributos. O número de série é fixo do modelo."
            card
          >
            <DronePicker value={drone} onChange={setDrone} />
          </Section>

          <Section
            title="Localização"
            description="Escolha o país, cidade e defina a posição no mapa. Se cair em um ponto conhecido, ele será identificado automaticamente."
            card
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="País de origem">
                <input
                  value={originCountry}
                  onChange={(e) => setOriginCountry(e.target.value)}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-primary-light w-full"
                />
              </Field>

              <Field label="Cidade">
                <input
                  value={location.city}
                  onChange={(e) =>
                    setLocation({ ...location, city: e.target.value })
                  }
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-primary-light w-full"
                />
              </Field>

              <Field label="País">
                <input
                  value={location.country}
                  onChange={(e) =>
                    setLocation({ ...location, country: e.target.value })
                  }
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-primary-light w-full"
                />
              </Field>
            </div>

            <div className="mt-6">
              <MapSelector
                lat={location.lat}
                lon={location.lon}
                onSelect={handleMapSelect}
              />
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-slate-300 mb-2">
                Ponto de Referência Detectado
              </h3>
              <div
                className={`transition-all duration-300 ease-out rounded-2xl border-2 
                            ${location.landmarkName
                              ? "border-primary/50 bg-primary/10 text-primary-light shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                              : "border-slate-800 bg-slate-900/60 text-slate-500"
                            }
                            w-full px-6 py-5 text-center text-xl font-display tracking-wide
                            min-h-[90px] flex items-center justify-center`}
              >
                {location.landmarkName || "Nenhum ponto conhecido encontrado"}
              </div>
            </div>
          </Section>
        </div>

        {/* Coluna Direita: Pato */}
        <div className="grid gap-10">
          <Section
            title="Pato Primordial"
            description="Defina medidas, estado, superpoder e mutações."
            card
          >
            <DuckForm
              duck={duck}
              setDuck={setDuck}
              duckUnits={selectedModel.duckUnits}
            />
          </Section>
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <Button onClick={handleSave}>Salvar e Ir para o Dashboard</Button>
      </div>
    </Page>
  );
}
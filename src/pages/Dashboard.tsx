import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/appStore";
import { Page } from "../components/ui/Page";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { DRONES } from "../data/drones";

export default function Dashboard() {
  const { setup, clear } = useAppStore();
  const navigate = useNavigate();
  const [showDrone, setShowDrone] = useState(true);
  const [showDuck, setShowDuck] = useState(true);

  if (!setup) {
    return (
      <Page title="Dashboard">
        <div className="text-center grid gap-3">
          <p className="text-slate-300">Nenhuma configuração encontrada.</p>
          <Button onClick={() => navigate("/setup")}>Ir para Configurações</Button>
        </div>
      </Page>
    );
  }

  const model = DRONES.find((d) => d.id === setup.drone.modelId);

  const jsonExport = {
    drone: setup.drone,
    pato: {
      ...setup.duck,
      originCountry: setup.originCountry,
      location: setup.location,
    },
  };

  function handleLaunchPreview() {
    console.clear();
    console.groupCollapsed("%c🐤 Pato Primordial - JSON Gerado", "color:#22d3ee;font-weight:bold;");
    console.log(JSON.stringify(jsonExport, null, 2));
    console.groupEnd();
    alert("✅ JSON gerado! Veja o conteúdo no console (F12).");
  }

  return (
    <Page title="Dashboard">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <div className="text-slate-300 text-sm">
            Revise os detalhes abaixo. Clique nos títulos para expandir ou recolher.
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate("/setup")}>Voltar</Button>
            <Button
              variant="ghost"
              onClick={() => {
                clear();
                navigate("/");
              }}
            >
              Limpar
            </Button>
          </div>
        </div>

        {/* Drone */}
        <Card>
          <button
            onClick={() => setShowDrone((v) => !v)}
            className="w-full text-left text-lg font-display font-semibold text-primary-light"
          >
            Drone
          </button>
          {showDrone && (
            <div className="mt-3 grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 grid gap-2 text-sm">
                <div>
                  Marca:{" "}
                  <span className="text-slate-200 font-semibold">
                    {setup.drone.brand}
                  </span>
                </div>
                <div>
                  Modelo:{" "}
                  <span className="text-slate-200 font-semibold">
                    {model?.brand} {model?.model}
                  </span>
                </div>
                <div>
                  Serial:{" "}
                  <span className="text-slate-200 font-semibold">
                    {setup.drone.serial || "-"}
                  </span>
                </div>
                <div className="grid md:grid-cols-3 gap-2 mt-2">
                  {Object.entries(setup.drone.readings).map(([k, v]) => (
                    <div
                      key={k}
                      className="rounded-xl border border-slate-700 p-3"
                    >
                      <div className="text-xs text-slate-400 capitalize">
                        {k}
                      </div>
                      <div className="text-primary font-semibold">{v}/10</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-36 rounded-xl border border-slate-700 bg-slate-800/60 grid place-items-center text-slate-500 text-xs italic">
                {model?.image ? (
                  <img
                    src={model.image}
                    alt={`${model.brand} ${model.model}`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  "Imagem do drone"
                )}
              </div>
            </div>
          )}
        </Card>

        {/* Pato */}
        <Card>
          <button
            onClick={() => setShowDuck((v) => !v)}
            className="w-full text-left text-lg font-display font-semibold text-primary-light"
          >
            Pato
          </button>
          {showDuck && (
            <div className="mt-3 grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 grid gap-2 text-sm">
                <div>
                  Altura:{" "}
                  <span className="text-slate-200 font-semibold">
                    {setup.duck.heightCm.toFixed(1)} cm
                  </span>
                </div>
                <div>
                  Peso:{" "}
                  <span className="text-slate-200 font-semibold">
                    {setup.duck.weightG.toFixed(1)} g
                  </span>
                </div>
                <div>
                  Estado:{" "}
                  <span className="text-slate-200 font-semibold capitalize">
                    {setup.duck.hibernation}
                  </span>
                </div>
                {setup.duck.superpower && (
                  <div className="grid gap-1">
                    <div>
                      Superpoder:{" "}
                      <span className="text-slate-200 font-semibold">
                        {setup.duck.superpower.name}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 italic">
                      {setup.duck.superpower.description}
                    </div>
                  </div>
                )}
                <div className="text-sm">
                  Mutação:{" "}
                  <span className="text-slate-200 font-semibold">
                    {setup.duck.mutations.score.toFixed(0)} / 100
                  </span>{" "}
                  ({setup.duck.mutations.tier})
                </div>
              </div>
              <div className="h-36 rounded-xl border border-slate-700 bg-slate-800/60 grid place-items-center text-slate-500 text-xs italic">
                imagem do pato
              </div>
            </div>
          )}
        </Card>

        {/* Ações */}
        <div className="pt-2 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/setup")}>Voltar</Button>
          <Button onClick={handleLaunchPreview}>
            Embarcar para a Missão
          </Button>
        </div>
      </div>
    </Page>
  );
}

/* === SUBCOMPONENTES === */
function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800/60 pb-1">
      <span className="text-slate-400 text-xs uppercase tracking-wide">{label}</span>
      <span className="text-slate-200 font-medium">{value}</span>
    </div>
  );
}
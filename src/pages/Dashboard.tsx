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
  const [copied, setCopied] = useState(false);

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

  const model = DRONES.find((d) => d.id === setup.drone_modelId);
  const jsonExport = setup;

  async function handleCopyJSON() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(jsonExport));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Falha ao copiar JSON.");
    }
  }

  function handleLaunchPreview() {
    navigate("https://seu-jogo-godot-url.com"); 
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
                    {setup.drone_brand}
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
                    {setup.drone_serial || "-"}
                  </span>
                </div>
                <div className="grid md:grid-cols-3 gap-2 mt-2">
                  {Object.entries(setup)
                    .filter(
                      ([k]) =>
                        k.startsWith("drone_") &&
                        !["drone_brand", "drone_modelId", "drone_serial"].includes(k) &&
                        !k.includes("turbo")
                    )
                    .map(([k, v]) => (
                      <div key={k} className="rounded-xl border border-slate-700 p-3">
                        <div className="text-xs text-slate-400 capitalize">
                          {k.replace("drone_", "")}
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
                    {setup.pato_height?.toFixed(1)} cm
                  </span>
                </div>
                <div>
                  Peso:{" "}
                  <span className="text-slate-200 font-semibold">
                    {setup.pato_weight?.toFixed(1)} g
                  </span>
                </div>
                <div>
                  Estado:{" "}
                  <span className="text-slate-200 font-semibold capitalize">
                    {setup.pato_hibernation}
                  </span>
                </div>
                {setup.pato_superpower_name && (
                  <div className="grid gap-1">
                    <div>
                      Superpoder:{" "}
                      <span className="text-slate-200 font-semibold">
                        {setup.pato_superpower_name}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 italic">
                      {setup.pato_superpower_description}
                    </div>
                  </div>
                )}
                <div className="text-sm">
                  Mutação:{" "}
                  <span className="text-slate-200 font-semibold">
                    {setup.pato_mutation_score?.toFixed(0)} / 100
                  </span>{" "}
                  ({setup.pato_mutation_tier})
                </div>
              </div>
              <div className="h-36 rounded-xl border border-slate-700 bg-slate-800/60 grid place-items-center text-slate-500 text-xs italic">
                imagem do pato
              </div>
            </div>
          )}
        </Card>

        <div className="pt-2 flex items-center justify-between">
          <Button variant="secondary" onClick={handleCopyJSON}>
            {copied ? "✅ Copiado!" : "Salvar Pato Primordial"}
          </Button>
          <Button onClick={handleLaunchPreview}>Embarcar para a Missão</Button>
        </div>
      </div>
    </Page>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/appStore";
import { Page } from "../components/ui/Page";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { DRONES } from "../data/drones";
import patoImage from "../assets/ducks/pato.png";

enum DuckSituation {
  HIBERNATING = 0,
  TRANCE = 1,
  AWAKE = 2,
}

enum PowerEnum {
  HYPER_BEAM = 0,
  THUNDER_RAIN = 1,
  MAGIC_FOREST = 2,
}

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

  function normalize(str?: string) {
    return str
      ? str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim()
      : "";
  }

  // === MAPAS DE CONVERSÃO ===
  const situationMap: Record<string, number> = {
    hibernacao: DuckSituation.HIBERNATING,
    transe: DuckSituation.TRANCE,
    despertado: DuckSituation.AWAKE,
  };

  const powerMap: Record<string, number> = {
    [normalize("Hyper Raio")]: PowerEnum.HYPER_BEAM,
    [normalize("Tempestade Eletrica")]: PowerEnum.THUNDER_RAIN,
    [normalize("Floresta Magica")]: PowerEnum.MAGIC_FOREST,
  };

  // === JSON EXPORTADO COM ENUMS NUMÉRICOS ===
  const jsonExport = {
    ...setup,
    pato_hibernation:
      situationMap[normalize(setup.pato_hibernation)] ??
      DuckSituation.HIBERNATING,
    pato_superpower:
      powerMap[normalize(setup.pato_superpower_name)] ??
      PowerEnum.HYPER_BEAM,
  };

  async function copyJSON() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(jsonExport, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Falha ao copiar JSON.");
    }
  }

  async function handleSave() {
    await copyJSON();
  }

  async function handleLaunch() {
    await copyJSON();
    window.open("https://thiagohaga.itch.io/dronesvspatos", "_blank");
  }

  return (
    <Page title="Dashboard">
      <div className="grid gap-6">
        {/* TOPO */}
        <div className="flex items-center justify-between">
          <div className="text-slate-300 text-sm">
            Revise os detalhes abaixo. Clique nos títulos para expandir ou recolher.
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate("/setup")}>
              Voltar
            </Button>
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

        {/* === DRONE === */}
        <Card>
          <button
            onClick={() => setShowDrone((v) => !v)}
            className="w-full text-left text-lg font-display font-semibold text-primary-light"
          >
            Drone
          </button>

          {showDrone && model && (
            <div className="mt-3 grid md:grid-cols-3 gap-4">
              {/* Dados gerais */}
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
                    {model.brand} {model.model}
                  </span>
                </div>
                <div>
                  Serial:{" "}
                  <span className="text-slate-200 font-semibold">
                    {setup.drone_serial || "-"}
                  </span>
                </div>

                {/* Stats corretos do modelo */}
                <div className="grid md:grid-cols-3 gap-2 mt-2">
                  {model.reads.map((stat) => (
                    <div
                      key={stat.key}
                      className="rounded-xl border border-slate-700 p-3"
                    >
                      <div className="text-xs text-slate-400 capitalize">
                        {stat.label}
                      </div>
                      <div className="text-primary font-semibold">{stat.value}/10</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* IMAGEM DO DRONE */}
              <div className="h-40 rounded-2xl border border-primary/30 bg-slate-800/40 relative overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                {model?.image ? (
                  <img
                    src={model.image}
                    alt={`${model.brand} ${model.model}`}
                    className="max-h-full max-w-full object-contain p-2 transition-transform duration-300 hover:scale-105"
                    draggable={false}
                  />
                ) : (
                  <span className="text-slate-500 text-xs italic">Imagem do drone</span>
                )}
              </div>
            </div>
          )}
        </Card>

        {/* === PATO === */}
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
                  </span>{" "}
                  <span className="text-slate-500 text-xs italic">
                    ({model?.duckUnits.altura === "ft"
                      ? "convertido de pés"
                      : model?.duckUnits.altura === "in"
                      ? "convertido de polegadas"
                      : "métrico"})
                  </span>
                </div>

                <div>
                  Peso:{" "}
                  <span className="text-slate-200 font-semibold">
                    {setup.pato_weight?.toFixed(1)} g
                  </span>{" "}
                  <span className="text-slate-500 text-xs italic">
                    ({model?.duckUnits.peso === "lb"
                      ? "convertido de libras"
                      : "métrico"})
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

                <div className="mt-4 pt-3 border-t border-slate-800/60 grid gap-1">
                  <div>
                    <span className="text-slate-400 text-xs uppercase tracking-wide">
                      Cidade
                    </span>{" "}
                    <span className="text-slate-200 font-medium">
                      {setup.location_city}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs uppercase tracking-wide">
                      País
                    </span>{" "}
                    <span className="text-slate-200 font-medium">
                      {setup.location_country}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs uppercase tracking-wide">
                      País de Origem
                    </span>{" "}
                    <span className="text-slate-200 font-medium">
                      {setup.origin_country}
                    </span>
                  </div>
                  {setup.location_landmark && (
                    <div className="text-xs text-primary-light italic mt-1">
                      🗺️ {setup.location_landmark}
                    </div>
                  )}
                </div>
              </div>

              {/* IMAGEM DO PATO */}
              <div className="h-36 rounded-2xl border border-primary/30 bg-slate-800/40 relative overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <img
                  src={patoImage}
                  alt="Pato Primordial"
                  className="max-h-full max-w-full object-contain p-3 transition-transform duration-300 hover:scale-105"
                  draggable={false}
                />
              </div>
            </div>
          )}
        </Card>

        {/* === AÇÕES === */}
        <div className="pt-2 flex items-center justify-between">
          <Button variant="secondary" onClick={handleSave}>
            {copied ? "✅ Copiado!" : "Salvar Chave"}
          </Button>
          <Button onClick={handleLaunch}>Embarcar para a Missão</Button>
        </div>
      </div>
    </Page>
  );
}
import { useNavigate } from "react-router-dom";
import { Page } from "../components/ui/Page";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

/**
 * Landing presents an introduction to the Pato Primordial mission and
 * outlines the three steps required to configure a drone, define the
 * primordial duck and review the mission dashboard. The call to action
 * button navigates to the setup screen.
 */
export default function Landing() {
  const navigate = useNavigate();
  return (
    <Page title="Pato Primordial — Missão">
      <div className="grid gap-8 text-center place-items-center">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
            Inicie sua operação contra os {" "}
            <span className="text-primary-light">Patos Primordiais</span>
          </h2>
          <p className="mt-3 text-slate-300/90 text-sm md:text-base">
            Configure seu drone, escaneie o alvo e embarque para a missão.
            Interface futurística, dados precisos e controle total sobre o
            cenário. Todo o processo foi pensado para ser rápido e
            intuitivo.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 w-full">
          <Card title="1) Seleção de Drone">
            <p className="text-xs md:text-sm text-slate-300/80">
              Escolha marca, modelo e atributos (1–10) para desempenho.
            </p>
          </Card>
          <Card title="2) Definições do Pato & Local">
            <p className="text-xs md:text-sm text-slate-300/80">
              Altura/peso com unidades, hibernação, mutações e mapa
              interativo para selecionar coordenadas.
            </p>
          </Card>
          <Card title="3) Dashboard">
            <p className="text-xs md:text-sm text-slate-300/80">
              Visualize tudo em cartões detalhados e exporte para JSON.
            </p>
          </Card>
        </div>
        <Button onClick={() => navigate("/setup")}>Ir para Configurações</Button>
      </div>
    </Page>
  );
}
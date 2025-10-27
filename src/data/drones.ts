export interface DroneModel {
  id: string;
  brand: string;
  model: string;
  reads: { key: string; label: string; value: number }[]; // <-- cada atributo tem valor fixo
  duckUnits: { altura: "cm" | "in" | "ft"; peso: "g" | "lb" };
  serialFormat: {
    prefix: string;
    pattern: string;
    example: string;
  };
  serialFixed: string;
  image?: string;
  turboStats: {
    potencia: number;
    estoque: number;
    producao: number;
  };
}

// Balanceamento: somatório de atributos próximos (36–40)
export const DRONES: DroneModel[] = [
  {
    id: "patox-alpha",
    brand: "PatoX",
    model: "Alpha",
    reads: [
      { key: "velocidade", label: "Velocidade", value: 9 },
      { key: "danoTiro", label: "Dano de Tiro", value: 7 },
      { key: "taxaTiro", label: "Taxa de Tiro", value: 6 },
      { key: "cortaVento", label: "Corta Vento", value: 5 },
      { key: "resistencia", label: "Resistência", value: 6 },
      { key: "precisao", label: "Precisão", value: 7 },
    ],
    duckUnits: { altura: "cm", peso: "g" },
    serialFormat: {
      prefix: "PTX",
      pattern: "####-AA",
      example: "PTX-1234-AB",
    },
    serialFixed: "PTX-ALPHA-001",
    image: new URL("../assets/drones/patox-alpha.png", import.meta.url).href,
    turboStats: { potencia: 8, estoque: 6, producao: 5 },
  },
  {
    id: "patox-sigma",
    brand: "PatoX",
    model: "Sigma",
    reads: [
      { key: "velocidade", label: "Velocidade", value: 7 },
      { key: "danoTiro", label: "Dano de Tiro", value: 8 },
      { key: "taxaTiro", label: "Taxa de Tiro", value: 7 },
      { key: "cortaVento", label: "Corta Vento", value: 6 },
      { key: "resistencia", label: "Resistência", value: 5 },
      { key: "precisao", label: "Precisão", value: 7 },
    ],
    duckUnits: { altura: "in", peso: "lb" },
    serialFormat: {
      prefix: "PTX",
      pattern: "###-###",
      example: "PTX-321-999",
    },
    serialFixed: "PTX-SIGMA-001",
    image: new URL("../assets/drones/patox-sigma.png", import.meta.url).href,
    turboStats: { potencia: 6, estoque: 9, producao: 7 },
  },
  {
    id: "quacksa-gamma",
    brand: "Quacksa",
    model: "Gamma",
    reads: [
      { key: "velocidade", label: "Velocidade", value: 8 },
      { key: "danoTiro", label: "Dano de Tiro", value: 6 },
      { key: "taxaTiro", label: "Taxa de Tiro", value: 8 },
      { key: "cortaVento", label: "Corta Vento", value: 7 },
      { key: "resistencia", label: "Resistência", value: 5 },
      { key: "precisao", label: "Precisão", value: 6 },
    ],
    duckUnits: { altura: "ft", peso: "lb" },
    serialFormat: {
      prefix: "QKS",
      pattern: "##-####",
      example: "QKS-12-3456",
    },
    serialFixed: "QKS-GAMMA-001",
    image: new URL("../assets/drones/quacksa-gamma.png", import.meta.url).href,
    turboStats: { potencia: 7, estoque: 5, producao: 9 },
  },
  {
    id: "dsin-orion",
    brand: "DSIN",
    model: "Orion",
    reads: [
      { key: "velocidade", label: "Velocidade", value: 6 },
      { key: "danoTiro", label: "Dano de Tiro", value: 9 },
      { key: "taxaTiro", label: "Taxa de Tiro", value: 5 },
      { key: "cortaVento", label: "Corta Vento", value: 9 },
      { key: "resistencia", label: "Resistência", value: 7 },
      { key: "precisao", label: "Precisão", value: 6 },
    ],
    duckUnits: { altura: "cm", peso: "g" },
    serialFormat: {
      prefix: "DSIN",
      pattern: "AA##-##",
      example: "DSIN-AB12-34",
    },
    serialFixed: "DSIN-ORION-001",
    image: new URL("../assets/drones/dsin-orion.png", import.meta.url).href,
    turboStats: { potencia: 9, estoque: 7, producao: 8 },
  },
];

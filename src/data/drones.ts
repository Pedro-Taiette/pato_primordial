/**
 * Definitions for all available drone models in the Pato Primordial
 * application. By centralising this data in a single module it becomes
 * straightforward to add new models or adjust existing parameters without
 * touching business logic. Each model describes its brand, display name,
 * measured attributes, unit configuration for primordial ducks, serial
 * number format and an optional image.
 */
export interface DroneModel {
  id: string;
  brand: string;
  model: string;
  reads: { key: string; label: string }[];
  duckUnits: { altura: "cm" | "in" | "ft"; peso: "g" | "lb" };
  serialFormat: {
    prefix: string;
    pattern: string;
    example: string;
  };
  serialFixed: string;
  image?: string;
  /** Valores fixos de turbo — lidos pelo pato primordial */
  turboStats: {
    potencia: number;
    estoque: number;
    producao: number;
  };
}

/**
 * Catálogo completo dos modelos de drones disponíveis.
 */
export const DRONES: DroneModel[] = [
  {
    id: "patox-alpha",
    brand: "PatoX",
    model: "Alpha",
    reads: [
      { key: "velocidade", label: "Velocidade" },
      { key: "danoTiro", label: "Dano de Tiro" },
      { key: "taxaTiro", label: "Taxa de Tiro" },
      { key: "cortaVento", label: "Corta Vento" },
      { key: "resistencia", label: "Resistência" },
      { key: "precisao", label: "Precisão" },
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
      { key: "velocidade", label: "Velocidade" },
      { key: "danoTiro", label: "Dano de Tiro" },
      { key: "taxaTiro", label: "Taxa de Tiro" },
      { key: "cortaVento", label: "Corta Vento" },
      { key: "resistencia", label: "Resistência" },
      { key: "precisao", label: "Precisão" },
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
      { key: "velocidade", label: "Velocidade" },
      { key: "danoTiro", label: "Dano de Tiro" },
      { key: "taxaTiro", label: "Taxa de Tiro" },
      { key: "cortaVento", label: "Corta Vento" },
      { key: "resistencia", label: "Resistência" },
      { key: "precisao", label: "Precisão" },
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
      { key: "velocidade", label: "Velocidade" },
      { key: "danoTiro", label: "Dano de Tiro" },
      { key: "taxaTiro", label: "Taxa de Tiro" },
      { key: "cortaVento", label: "Corta Vento" },
      { key: "resistencia", label: "Resistência" },
      { key: "precisao", label: "Precisão" },
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

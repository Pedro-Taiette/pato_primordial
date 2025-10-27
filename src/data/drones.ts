/**
 * Definitions for all available drone models in the Pato Primordial
 * application. By centralising this data in a single module it becomes
 * straightforward to add new models or adjust existing parameters without
 * touching business logic. Each model describes its brand, display name,
 * measured attributes, unit configuration for primordial ducks, serial
 * number format and an optional image.
 */
export interface DroneModel {
  /** Unique identifier for the drone model */
  id: string;
  /** Brand name, e.g. "PatoX" */
  brand: string;
  /** Human friendly model name */
  model: string;
  /** Which attributes can be measured by this drone. Each entry has a
   * machine‐readable key and a human friendly label. */
  reads: { key: string; label: string }[];
  /** Units used for measuring the primordial duck. Heights can be
   * centimetres, inches or feet; weights can be grams or pounds. When a
   * model specifies inches or feet, the values will be normalised to
   * centimetres internally. Likewise for grams/pounds. */
  duckUnits: { altura: "cm" | "in" | "ft"; peso: "g" | "lb" };
  /** Serial format definition for the model. A prefix denotes a fixed
   * string, pattern outlines the allowed characters and example gives a
   * hint to the user. */
  serialFormat: {
    prefix: string;
    pattern: string;
    example: string;
  };
  /** Fixed serial number for this model (non-editable) */
  serialFixed: string;
  /** Optional relative path to an image representing this drone. Place
   * your images into `src/assets/drones` and reference them here. */
  image?: string;
}

/**
 * A catalogue of all available drone models. You can freely extend
 * this array to add new models or tweak existing ones. When adding a new
 * model don't forget to update the `reads` and `serialFormat` fields to
 * match the new capabilities.
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
    // Resolve the asset path at runtime so that Vite bundles the image
    image: new URL("../assets/drones/patox-alpha.png", import.meta.url).href,
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
  },
];
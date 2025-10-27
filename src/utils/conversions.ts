export type LengthUnit = "cm" | "in" | "ft";
export type MassUnit = "g" | "lb";

export const toCm = (v: number, unit: LengthUnit) =>
  unit === "cm" ? v : unit === "in" ? v * 2.54 : v * 30.48;

export const toG = (v: number, unit: MassUnit) =>
  unit === "g" ? v : v * 453.59237;
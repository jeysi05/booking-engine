import lagunaAthleticsConfig from "@/config/laguna-athletics.json";
import type { ClientConfig } from "@/types";

// To deploy for a new client, replace the imported JSON file here only.
export function getConfig(): ClientConfig {
  return lagunaAthleticsConfig as ClientConfig;
}
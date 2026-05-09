import demoConfig from "@/config/laguna-athletics.json";
import type { AppConfig, ClientConfig } from "@/types";

// To deploy for a new client, replace the imported JSON file here only.
export function getConfig(): AppConfig {
  return demoConfig as AppConfig;
}

export function getDefaultProfile(): ClientConfig {
  const config = getConfig();
  return config.demoProfiles.find((profile) => profile.client.id === config.defaultProfileId) ?? config.demoProfiles[0];
}

export function getProfileById(profileId: string): ClientConfig {
  const config = getConfig();
  return config.demoProfiles.find((profile) => profile.client.id === profileId) ?? getDefaultProfile();
}

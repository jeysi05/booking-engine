import venueFlowConfig from "@/config/laguna-athletics.json";
import type { ClientConfig, DemoProfile } from "@/types";

// To deploy for a new client, replace the imported JSON file here only.
export function getConfig(): ClientConfig {
  return venueFlowConfig as ClientConfig;
}

export function getDefaultProfile(config: ClientConfig = getConfig()): DemoProfile {
  return config.demoProfiles.find((profile) => profile.id === config.defaultProfileId) ?? config.demoProfiles[0];
}

export function getProfileById(profileId: string, config: ClientConfig = getConfig()): DemoProfile {
  return config.demoProfiles.find((profile) => profile.id === profileId) ?? getDefaultProfile(config);
}

interface EnvArgs {
  port: number;
  apiId: number;
  apiHash: string;
  workerCount: number;
  statsPort: number;
}

/**
 * Parses environment variables. Returns a string describing the error if failed or {@link EnvArgs} if succeeded.
 */
export function parseEnvVars(): string | EnvArgs {
  const apiIdStr = Deno.env.get("API_ID");
  if (!apiIdStr) {
    return "API ID not provided in environment variables.";
  }
  
  const apiId = Number(apiIdStr);
  if (isNaN(apiId) || !apiId) {
    return "API ID must be a valid number.";
  }  
  
  const apiHash = Deno.env.get("API_HASH");
  if (!apiHash || !apiHash.trim()) {
    return "API hash not provided in environment variables.";
  }  
  
  const workerCountStr = Deno.env.get("WORKER_COUNT") ?? "1";
  const workerCount = Number(workerCountStr);
  if (isNaN(workerCount) || workerCount < 0 || workerCount % 1 != 0 || workerCount > 1_000) {
    return "Invalid worker count.";
  }

  const portStr = Deno.env.get("PORT") ?? "8000";
  const port = Number(portStr);
  if (isNaN(port) || port < 0 || port > 0xFFFF || port % 1 != 0) {
    return "Invalid port.";
  }  

  const statsPortStr = Deno.env.get("STATS_PORT") ?? "3000";
  const statsPort = Number(statsPortStr);
  if (isNaN(statsPort) || statsPort < 0 || statsPort > 0xFFFF || statsPort % 1 != 0) {
      return "Invalid stats port.";
  }  

  return {
    port,
    apiId,
    apiHash,
    workerCount,
    statsPort,
  };
}

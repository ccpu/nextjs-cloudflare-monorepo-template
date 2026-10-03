export declare const requiredPublicEnv: string[];

export declare function getMissingPublicEnv(
  env: Record<string, string | undefined>,
  names?: readonly string[],
): string[];

export declare function assertPublicEnv(
  env: Record<string, string | undefined>,
  context: string,
  names?: readonly string[],
): void;

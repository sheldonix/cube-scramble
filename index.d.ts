export type ScrambleType =
  | "333"
  | "444"
  | "555"
  | "666"
  | "777"
  | "222"
  | "sq1"
  | "pyraminx"
  | "skewb"
  | "mgmp"
  | "kilominx"
  | "redi"
  | "fto"
  | "clock"
  | "1x3x3"
  | "2x2x3"
  | "333lse"
  | "gearcube"
  | "mgmlsll"
  | "slide"
  | string;

export interface ScrambleOptions {
  type?: ScrambleType;
  length?: number;
  state?: unknown;
  neutrality?: number;
}

export function getScrambleTypes(): ScrambleType[];

export function setSeed(seed: string | number | undefined | null): void;

export function getScramble(
  type?: ScrambleType,
  length?: number,
  state?: unknown,
  neutrality?: number,
): string;

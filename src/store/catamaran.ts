import { rm, rm5 } from "@/store/calc";

export function CatamaranPassenger(L: number, B: number, F2: number) {
  return rm(((F2 - 0.025 * L) * L * B) / 0.33 - 1);
}
export function CatamaranMoment(
  n: number,
  Hp: number,
  d: number,
  B: number,
  Bp: number,
  f0: number,
  L: number,
  b: number
) {
  let F = f0 - (0.15 * n) / L / b;
  if (F > B / 5.5) F = B / 5.5;
  return rm((n / 100) * (7.5 + 7.5 * Hp - 13.1 * d + (0.7 * B * Bp) / F));
}
export const CatamaranText = {
  F2: "人を搭載しない状態での船尾の最小乾舷(m)",
  Bp: "旅客の移動可能な平均幅(m)",
  b: "単胴部の最大幅(m)",
};

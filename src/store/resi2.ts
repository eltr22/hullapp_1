import { rm, rm5 } from "@/store/calc";

export class HullCheck {
  state: HullState;
  constructor(state: HullState) {
    this.state = state;
  }
  result = {
    d_: 0,
    tan: 0,
    wy: 0,
    WGM0: 0,
    WGM: 0,
    f: 0,
    Hp: 0,
    Hc: 0,
    Mt: 0,
  };
  text = {
    w: "移動物の重量(t)",
    y: "wの移動距離(m)",
    s: "平均s(mm)",
    l: "下げ振り長さ(mm)",
    f0: "中央乾舷(m)",
    L: "船の長さ",
    B: "船の幅",
    B_: "船舷の幅",
    Zf: "乾舷高さ",
    Zp: "旅客床面高さ",
    Zc: "貨物床面高さ",
    Wc: "搭載貨物重量",
    N: "旅客人数",
    Fnab: "Σ(7-n/a)nb",
    A: "風圧側面積",
    H: "風圧重心高さ",
  };
  calc(w: number, y: number, s: number, l: number, f0: number) {
    this.result.d_ = rm(this.state.Zf - f0);
    this.result.Hc = rm(this.state.Zc - this.result.d_);
    this.result.Hp = rm(this.state.Zp - this.result.d_);
    this.result.wy = rm(w * y);
    this.result.tan = rm5(s / l);
    this.result.WGM0 = rm(this.result.wy / this.result.tan);
    const d1 = rm(
      this.result.d_ + this.state.Wc / (0.7 * this.state.L * this.state.B)
    );
    const dM = rm(
      0.06 * this.state.N * (this.result.Hp + 1 - 1.33 * d1) +
        this.state.Wc * (this.result.Hc - 1.33 * this.result.d_)
    );
    this.result.WGM = rm(this.result.WGM0 - dM);
    const f_1 = rm(this.state.B_ / 5.5);
    const f_2 = rm(
      f0 -
        (this.state.Wc + 0.06 * this.state.N) /
          (0.7 * this.state.L * this.state.B)
    );
    this.result.f = f_1 < f_2 ? f_1 : f_2;
    const AH107 = rm(1.07 * this.state.A * this.state.H);
    const Fanb134 = rm(0.134 * this.state.Fnab);
    this.result.Mt = rm(
      ((AH107 + Fanb134) * this.state.B_) / (100 * this.result.f)
    );
    return this.result;
  }
}

export interface HullState {
  L: number;
  B: number;
  B_: number;
  Zf: number;
  Zp: number;
  Zc: number;
  Wc: number;
  N: number;
  Fnab: number;
  A: number;
  H: number;
}

export const Airclair: HullState = {
  L: 11.894,
  B: 6.98,
  B_: 6.98,
  Zf: 1.991,
  Zp: 1.55,
  Zc: 1.55,
  Wc: 0,
  N: 12,
  Fnab: 628.32,
  A: 26.87,
  H: 1.631,
};

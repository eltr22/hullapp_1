class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

export class CatamaranCheck {
  passenger(L: number, B: number, F2: number) {
    return ((F2 - 0.025 * L) * L * B) / 0.33 - 1;
  }
  Moment0(W: number, l: number, tan: number) {
    if (tan <= 0) return -99.99;
    return (W * l) / tan;
  }
  MomentCheck(
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
    return (n / 100) * (7.5 + 7.5 * Hp - 13.1 * d + (0.7 * B * Bp) / F);
  }
  text = {
    W: "傾斜試験に使用した移動重量物の重量(t)",
    l: "Wの水平横方向の移動距離(m)",
    tan: "WをLだけ移動したときの船の横傾斜角のtangent",
    Hp: "キールの上面から客席の床上面までの高さ(m))",
    d0: "傾斜試験のときキールの上面から測った平均喫水(m)",
    n: "旅客数（人）",
    F2: "人を搭載しない状態での船尾の最小乾舷(m)",
    B: "船体最広部におけるフレームの外面から外面までの船の幅(m)",
    Bp: "旅客の移動可能な平均幅(m))",
    L: "船の長さ(m)",
    f0: "傾斜試験時の乾舷(m)",
    b: "単胴部の最大幅(m)",
  };
}

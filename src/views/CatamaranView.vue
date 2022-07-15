<template>
  <div class="container">
    <table class="table">
      <tbody v-for="(item, key) in data" :key="key">
        <tr>
          <th scope="col" @click="item.s = !item.s">{{ item.name }}</th>
          <th scope="col">
            <input type="number" class="form-control" v-model="item.v" />
          </th>
        </tr>
        <tr v-show="item.s">
          <th colspan="2">{{ item.t }}</th>
        </tr>
      </tbody>
    </table>

    <div class="text-center mb-3">
      <button class="btn btn-primary" @click="check">モーメントを計算</button>
    </div>
    <hr />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">計算値</th>
          <th scope="col">基準値</th>
          <th scope="col">状態</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">M0</th>
          <td>{{ data2.M0.toPrecision(4) }}</td>
          <td>{{ data2.M_chk.toPrecision(4) }}</td>
          <td>{{ data2.M0 > data2.M_chk ? "good" : "bad" }}</td>
        </tr>
        <tr>
          <th scope="row">n</th>
          <td>{{ data.n.v.toPrecision(4) }}</td>
          <td>{{ data2.n_chk.toPrecision(4) }}</td>
          <td>{{ data.n.v < data2.n_chk ? "good" : "bad" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { CatamaranCheck } from "@/store/resilience";

export default defineComponent({
  name: "HomeView",
  setup() {
    const Catamaran = new CatamaranCheck();
    const data = reactive({
      n: { name: "n", v: 0, t: Catamaran.text.n, s: false },
      B: { name: "B", v: 0, t: Catamaran.text.B, s: false },
      L: { name: "L", v: 0, t: Catamaran.text.L, s: false },
      F2: { name: "F2", v: 0, t: Catamaran.text.F2, s: false },
      W: { name: "W", v: 0, t: Catamaran.text.W, s: false },
      l: { name: "l", v: 0, t: Catamaran.text.l, s: false },
      tan: { name: "tan", v: 0, t: Catamaran.text.tan, s: false },
      Hp: { name: "Hp", v: 0, t: Catamaran.text.Hp, s: false },
      d0: { name: "d0", v: 0, t: Catamaran.text.d0, s: false },
      Bp: { name: "Bp", v: 0, t: Catamaran.text.Bp, s: false },
      f0: { name: "f0", v: 0, t: Catamaran.text.f0, s: false },
      b: { name: "b", v: 0, t: Catamaran.text.b, s: false },
    });
    const data2 = reactive({ M0: 0, M_chk: 0, n_chk: 0 });
    const check = () => {
      data2.n_chk = Catamaran.passenger(data.L.v, data.B.v, data.F2.v);
      data2.M0 = Catamaran.Moment0(data.W.v, data.l.v, data.tan.v);
      data2.M_chk = Catamaran.MomentCheck(
        data.n.v,
        data.Hp.v,
        data.d0.v,
        data.B.v,
        data.Bp.v,
        data.f0.v,
        data.L.v,
        data.b.v
      );
    };
    return {
      data,
      check,
      data2,
    };
  },
});
</script>

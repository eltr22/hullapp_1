<template>
  <div class="container">
    <table class="table">
      <tbody>
        <tr>
          <th scope="col">{{ Hull.text.w }}</th>
          <th scope="col">
            <input
              type="number"
              class="form-control"
              v-model="data.w"
              step="0.01"
              style="width: 120px"
            />
          </th>
        </tr>
        <tr>
          <th scope="col">{{ Hull.text.y }}</th>
          <th scope="col">
            <input
              type="number"
              class="form-control"
              v-model="data.y"
              step="0.1"
              style="width: 120px"
            />
          </th>
        </tr>
        <tr>
          <th scope="col">{{ Hull.text.l }}</th>
          <th scope="col">
            <input
              type="number"
              class="form-control"
              v-model="data.l"
              step="1"
              style="width: 120px"
            />
          </th>
        </tr>
        <tr>
          <th scope="col">{{ Hull.text.s }}</th>
          <th scope="col">
            <input
              type="number"
              class="form-control"
              v-model="data.s"
              step="0.1"
              style="width: 120px"
            />
          </th>
        </tr>
        <tr>
          <th scope="col">{{ Hull.text.f0 }}</th>
          <th scope="col">
            <input
              type="number"
              class="form-control"
              v-model="data.f0"
              step="0.01"
              style="width: 120px"
            />
          </th>
        </tr>
        <tr>
          <th scope="col">{{ CatamaranText.Bp }}</th>
          <th scope="col">
            <input
              type="number"
              class="form-control"
              v-model="dataC.Bp"
              step="0.1"
              style="width: 120px"
            />
          </th>
        </tr>
        <tr>
          <th scope="col">{{ CatamaranText.b }}</th>
          <th scope="col">
            <input
              type="number"
              class="form-control"
              v-model="dataC.b"
              step="0.1"
              style="width: 120px"
            />
          </th>
        </tr>
        <tr>
          <th scope="col">{{ CatamaranText.F2 }}</th>
          <th scope="col">
            <input
              type="number"
              class="form-control"
              v-model="dataC.F2"
              step="0.1"
              style="width: 120px"
            />
          </th>
        </tr>
      </tbody>
    </table>

    <div class="text-center mb-3">
      <button class="btn btn-primary mx-5" @click="check">計算</button>
      <button class="btn btn-primary mx-5" @click="check_c">
        計算(双胴船)
      </button>
    </div>
    <hr />
    <table class="table">
      <tbody>
        <tr>
          <th scope="row">復原力</th>
          <td>{{ result.WGM }}</td>
        </tr>
        <tr>
          <th scope="row">傾斜偶力</th>
          <td>{{ result.Mt }}</td>
        </tr>
        <tr>
          <th scope="row">喫水</th>
          <td>{{ result.d_ }}</td>
        </tr>
        <tr>
          <th scope="row">傾斜偶力（双胴船）</th>
          <td>{{ result.M_c }}</td>
        </tr>
        <tr>
          <th scope="row">旅客数（双胴船）</th>
          <td>{{ result.n_c }}</td>
        </tr>
        <tr>
          <th scope="col" colspan="2">
            <button class="btn btn-secondary" @click="showDetail = !showDetail">
              計算元値
            </button>
          </th>
        </tr>
      </tbody>
    </table>
    <table class="table">
      <tbody v-show="showDetail">
        <tr>
          <td scope="col">{{ Hull.text.L }}</td>
          <td scope="col">{{ Hull.state.L }}</td>
        </tr>
        <tr>
          <td scope="col">{{ Hull.text.B }}</td>
          <td scope="col">{{ Hull.state.B }}</td>
        </tr>
        <tr>
          <td scope="col">{{ Hull.text.B_ }}</td>
          <td scope="col">{{ Hull.state.B_ }}</td>
        </tr>
        <tr>
          <td scope="col">{{ Hull.text.Zf }}</td>
          <td scope="col">{{ Hull.state.Zf }}</td>
        </tr>
        <tr>
          <td scope="col">{{ Hull.text.Zp }}</td>
          <td scope="col">{{ Hull.state.Zp }}</td>
        </tr>
        <tr>
          <td scope="col">{{ Hull.text.Zc }}</td>
          <td scope="col">{{ Hull.state.Zc }}</td>
        </tr>
        <tr>
          <td scope="col">{{ Hull.text.Wc }}</td>
          <td scope="col">{{ Hull.state.Wc }}</td>
        </tr>
        <tr>
          <td scope="col">{{ Hull.text.N }}</td>
          <td scope="col">{{ Hull.state.N }}</td>
        </tr>
        <tr>
          <td scope="col">{{ Hull.text.Fnab }}</td>
          <td scope="col">{{ Hull.state.Fnab }}</td>
        </tr>
        <tr>
          <td scope="col">{{ Hull.text.A }}</td>
          <td scope="col">{{ Hull.state.A }}</td>
        </tr>
        <tr>
          <td scope="col">{{ Hull.text.H }}</td>
          <td scope="col">{{ Hull.state.H }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { HullCheck, Airclair } from "@/store/resi2";
import {
  CatamaranMoment,
  CatamaranPassenger,
  CatamaranText,
} from "@/store/catamaran";

export default defineComponent({
  name: "HomeView",
  setup() {
    const Hull = new HullCheck(Airclair);
    const data = reactive({
      w: 0.27,
      y: 6.6,
      s: 11.2,
      l: 1277,
      f0: 1.2,
    });
    const dataC = reactive({
      b: 0,
      Bp: 0,
      F2: 0,
    });
    const result = reactive({ WGM: 0, Mt: 0, d_: 0, M_c: 0, n_c: 0 });
    const check = () => {
      const r = Hull.calc(data.w, data.y, data.s, data.l, data.f0);
      result.WGM = r.WGM;
      result.Mt = r.Mt;
      result.d_ = r.d_;
    };
    const check_c = () => {
      result.n_c = CatamaranPassenger(Hull.state.L, Hull.state.B, dataC.F2);
      result.M_c = CatamaranMoment(
        Hull.state.N,
        Hull.state.Zp,
        Hull.result.d_,
        Hull.state.B,
        dataC.Bp,
        data.f0,
        Hull.state.L,
        dataC.b
      );
    };
    const showDetail = ref(false);
    return {
      Hull,
      data,
      check,
      result,
      showDetail,
      CatamaranText,
      dataC,
      check_c,
    };
  },
});
</script>

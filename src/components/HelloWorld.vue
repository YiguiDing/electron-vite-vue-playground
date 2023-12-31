<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  demo_echo,
  demo_add,
  demo_div,
  demo_mut,
  demo_sub,
  current_time,
} from "../api";
const A = ref(1);
const B = ref(1);
const AddResult = ref<undefined | number>(undefined);
const SubResult = ref<undefined | number>(undefined);
const MutResult = ref<undefined | number>(undefined);
const DivResult = ref<undefined | number>(undefined);
watchEffect(async () => {
  AddResult.value = await demo_add(A.value, B.value);
  SubResult.value = await demo_sub(A.value, B.value);
  MutResult.value = await demo_mut(A.value, B.value);
  DivResult.value = await demo_div(A.value, B.value);
});
onMounted(async () => {
  console.log("echo:" + (await demo_echo("Hello World")));
});
let now = current_time();
</script>

<template>
  <h1>Electron + Vite + Vue</h1>
  <p>{{ now }}</p>
  <div class="card">
    <button type="button" @click="++A">++A == {{ A }}</button>
    <button type="button" @click="++B">++B == {{ B }}</button>
    <p>A + B = {{ AddResult }}</p>
    <p>A - B = {{ SubResult }}</p>
    <p>A * B = {{ MutResult }}</p>
    <p>A / B = {{ DivResult }}</p>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

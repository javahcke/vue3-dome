<template>
  <img :src="result && result.message">
</template>
<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  async setup() {
    console.log(11111111)
    const rawData = await axios.get('https://dog.ceo/api/breeds/image/random')
    console.log(11111111)
    return {
      result: rawData.data
    }
  }
});
</script>
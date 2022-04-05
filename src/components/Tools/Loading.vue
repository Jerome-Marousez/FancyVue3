<template>

  <div class="loading-container">

    <div class="loading-background"></div>

    <SpinningCube v-if="type === 'cube'" :color="color" :opacity="opacity" :radius="radius" />
    <Trinity v-if="type === 'trinity'" :color="color" :opacity="opacity" :radius="radius" />
    <Layers v-if="type === 'layers'" :color="color" :opacity="opacity" :radius="radius" />

    <div class="loading-text">Loading...</div>

  </div>

</template>

<script>
import SpinningCube from '@/components/Decorations/SpinningCube'
import Trinity from '@/components/Decorations/Trinity'
import Layers from '@/components/Decorations/Layers'
export default {
  name: "Loading",

  components: {
    SpinningCube,
    Trinity,
    Layers,
  },

  props: {
    color: String,
    opacity: String,
    radius: String,
    type: String,
  },

  data() {
    return {}
  },

  computed: {},

  methods: {},

  created() {

  },

}
</script>

<style scoped>
.loading-container {
  --size: 4em;

  position: absolute;
  inset: 0 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  font-size: 1.5em;
}
.loading-text {
  z-index: 2001;
}
.loading-background {
  position: absolute;
  width: calc(var(--size) * 8);
  height: calc(var(--size) * 8);
  /* ff 3.6+ */
  background:-moz-radial-gradient(circle at 50% 50%, var(--bg-primary) 0%, rgba(238, 130, 238, 0) 90%);

  /* safari 5.1+,chrome 10+ */
  background:-webkit-radial-gradient(circle at 50% 50%, var(--bg-primary) 0%, rgba(238, 130, 238, 0) 90%);

  /* opera 11.10+ */
  background:-o-radial-gradient(circle at 50% 50%, var(--bg-primary) 0%, rgba(238, 130, 238, 0) 90%);

  /* ie 10+ */
  background:-ms-radial-gradient(circle at 50% 50%, var(--bg-primary) 0%, rgba(238, 130, 238, 0) 90%);

  /* global 92%+ browsers support */
  background:radial-gradient(circle at 50% 50%, var(--bg-primary) 0%, rgba(238, 130, 238, 0) 90%);
}
</style>
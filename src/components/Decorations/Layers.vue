<template>


  <div class="layers-container">

    <div class="layer layer-1" />
    <div class="layer layer-2" />
    <div class="layer layer-3" />
    <div class="layer layer-4" />

  </div>


</template>

<script>
export default {
  name: "Layers",

  props: {
    color: String,
    opacity: String,
    radius: String,
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
.layers-container {
  width: 7em;
  height: 7em;
  font-size: .7rem;
  transform-style: preserve-3d;
  transform: perspective(5em) rotateX(75deg);
  z-index: 1;
  position: relative;
}
.layer {
  position: absolute;
  border: .1em solid v-bind(color);
  margin-bottom: 1em;
  animation: spin 3s infinite linear;
  opacity: v-bind(opacity);
}

.layer.layer-1 {
  width: 7em;
  height: 4em;
  border-radius: v-bind(radius);
}
.layer.layer-2 {
  animation-delay: .333s;
  left: .5em;
  width: 6em;
  top: .5em;
  height: 3em;
  border-radius: calc(v-bind(radius) * 0.8);
}
.layer.layer-3 {
  animation-delay: .666s;
  left: 1em;
  width: 5em;
  top: 1em;
  height: 2em;
  border-radius: calc(v-bind(radius) * 0.6);
}
.layer.layer-4 {
  animation-delay: 1s;
  left: 1.5em;
  width: 4em;
  top: 1.5em;
  height: 1em;
  border-radius: calc(v-bind(radius) * 0.4);
}
@keyframes spin {
  0% {
    transform: translateZ(0);
  }
  25% {
    transform: translateZ(-4em);
  }
  50% {
    transform: translateZ(-6em);
  }
  75% {
    transform: translateZ(-4em);
  }
  100% {
    transform: translateZ(0);
  }
}
</style>
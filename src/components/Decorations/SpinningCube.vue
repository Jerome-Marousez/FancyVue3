<template>


  <div class="cube-container">

    <div class="cube">
      <div class="side front"></div>
      <div class="side left"></div>
      <div class="side right"></div>
      <div class="side back"></div>
      <div class="side top"></div>
      <div class="side bottom"></div>
    </div>

  </div>


</template>

<script>
export default {
  name: "SpinningCube",

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
.cube-container {
  margin-bottom: 1.5rem;
  perspective: 120px;
  font-size: .5rem;
}
.cube {
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  z-index: 2002;
}

.cube {
  animation: spin 5s linear infinite;
}

.side {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--size);
  height: var(--size);
  position: absolute;
  border: .07em solid v-bind(color);
  border-radius: v-bind(radius);
  opacity: v-bind(opacity);
  transform: rotateY(var(--rotate-y, 0)) rotateX(var(--rotate-x, 0)) translateZ(calc(var(--size) / 2));
}

.right {
  --rotate-y: 90deg;
}

.left {
  --rotate-y: -90deg;
}

.top {
  --rotate-x: 90deg;
}

.bottom {
  --rotate-x: -90deg;
}

.back {
  --rotate-y: 180deg;
}

@keyframes spin {
  0% {
    transform: rotateX(0) rotateY(0);
  }

  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
</style>
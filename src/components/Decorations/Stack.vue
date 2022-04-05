<template>
  <div class="stack-container">

    <div class="stack-layer layer-1"><i :class="'fab fa-' + title" /></div>
    <div class="stack-layer layer-2"></div>
    <div class="stack-layer layer-3"></div>

  </div>

</template>

<script>
export default {
  name: "Stack",

  props: {
    title: String,
    color: String,
  },

  data() {
    return {

    }
  },

  computed: {
    lightestColor(){
      return [this.color.slice(0, this.color.length-1), '-lighter', this.color.slice(this.color.length-1)].join('')
    },
    lighterColor(){
      return [this.color.slice(0, this.color.length-1), '-light', this.color.slice(this.color.length-1)].join('')
    },
    darkerColor(){
      return [this.color.slice(0, this.color.length-1), '-dark', this.color.slice(this.color.length-1)].join('')
    },
    darkestColor(){
      return [this.color.slice(0, this.color.length-1), '-darker', this.color.slice(this.color.length-1)].join('')
    },
  },

  methods: {},

  created() {

  },

}
</script>

<style scoped>
.stack-container {
  position: relative;
  transform-style: preserve-3d;
  transform-origin: top center;
  transform: perspective(200px) rotateX(45deg);
  user-select: none;
  cursor: pointer;
}
.stack-layer {
  position: absolute;
  font-size: 1.5rem;
  width: 1.6em;
  aspect-ratio: 1;
  padding: .3em;
  display: flex;
  border-radius: var(--radius-s);
  color: white;
  justify-content: center;
  align-items: center;
}
.stack-container:hover .layer-1 {
  transform: translateZ(.5em);
  transition: all .2s ease-in;
  opacity:.8;
}
.stack-container:hover .layer-2 {
  transform: translateZ(.2em);
  transition: transform .2s ease-in;
}
.stack-container:hover .layer-3 {
  transform: translateY(.1em);
  transition: transform .2s ease-in;
  filter: blur(.05em);
}
.layer-1 {
  background-image: linear-gradient(to top, v-bind(color), v-bind(lightestColor));
  z-index: 5;
}
.layer-2 {
  background-color: v-bind(color);
  opacity: .7;
  z-index: 4;
}
.layer-3 {
  background-color: v-bind(color);
  opacity: .5;
  z-index: 3;
}
</style>
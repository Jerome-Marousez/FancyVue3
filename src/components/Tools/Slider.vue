<template>

  <div class="slider-container">
    <div v-show="modelValue > min && modelValue < max" id="slider-value">{{ modelValue }}</div>
    <div class="slider-legend">{{ min }}</div>
    <input type="range" :min="min" :max="max" :value="modelValue" class="slider" :step="steps" @mousedown="updateInput" @mouseleave="removeListener">
    <div class="slider-legend">{{ max }}</div>
  </div>


</template>

<script>
export default {
  name: "Slider",

  props: {
    min: Number,
    max: Number,
    modelValue: Number,
    steps: Number,
    color: String,
  },

  data() {
    return {
      timer: null,
      thumbHalfWidth: 6,
      sliderWidth: 100,
    }
  },

  computed: {},

  methods: {
    updateInput(e){
      this.timer = setInterval(() => {
        const left = (((e.target.value - this.min) / (this.max - this.min)) * ((this.sliderWidth - this.thumbHalfWidth) - this.thumbHalfWidth)) + this.thumbHalfWidth;
        const position = ( (left / 10).toFixed(2) ) + 'em'
        const value = document.getElementById('slider-value')
        value.style.left = position
        this.$emit ('update:modelValue', parseInt(e.target.value))
      }, 1000 / 60)

    },
    removeListener(){
      clearInterval(this.timer)
    },
  },

  mounted(){
    const left = (((this.modelValue - this.min) / (this.max - this.min)) * ((this.sliderWidth - this.thumbHalfWidth) - this.thumbHalfWidth)) + this.thumbHalfWidth;
    const position = ( (left / 10).toFixed(2) ) + 'em'
    const value = document.getElementById('slider-value')
    value.style.left = position
  },

  created() {

  },

}
</script>

<style scoped>
.slider-container {
  margin: .5em;
  display: flex;
  align-items: center;
  position: relative;
  user-select: none;
}
.slider-legend {
  padding: .5em;
}
.slider {
  -webkit-appearance: none;
  width: calc(v-bind(sliderWidth) * 0.1em);
  height: .8em;
  border-radius: 100vw;
  background: var(--bg-secondary);
  outline: none;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: calc(v-bind(thumbHalfWidth) * 0.2em);
  height: calc(v-bind(thumbHalfWidth) * 0.2em);
  border-radius: 100vw;
  background: v-bind(color);
  cursor: pointer;
  position: relative;
}

.slider::-moz-range-thumb {
  width: calc(v-bind(thumbHalfWidth) * 0.2em);
  height: calc(v-bind(thumbHalfWidth) * 0.2em);
  border-radius: 100vw;
  background: v-bind(color);
  cursor: pointer;
  position: relative;
  outline: none;
  border: none;
}
#slider-value {
  position: absolute;
  top: -1em;
  left: 0;
  text-align: center;
  width: calc(v-bind(thumbHalfWidth) * 0.5em);
}
</style>
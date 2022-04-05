<template>

  <div
      class="checkbox-container"
      @click="toggle"
      @mouseover="hideTitle"
      @mouseleave="restoreTitle"
      role="checkbox"
      :aria-checked="modelValue"
      aria-describedby="checkbox-label"
  >

    <div
        class="checkbox"
        tabindex="0"
        :title="tooltip ? tooltip : label"
        :aria-label="label ? label : tooltip"
    >
      <div
          v-if="modelValue"
          class="checked"
          tabindex="0"
          :title="tooltip ? tooltip : label"
          :aria-label="label ? label : tooltip"
      >&check;</div>
    </div>



    <label
        class="label"
        id="checkbox-label"
        :data-tooltip="tooltip"
    >{{ label }}</label>

  </div>

</template>

<script>
export default {
  name: "Checkbox",

  props: {
    label: String,
    modelValue: Boolean,
    tooltip: String,
  },

  data() {
    return {

    }
  },

  computed: {

  },

  methods: {

    toggle(){
      this.$emit ('update:modelValue', !this.modelValue)
    },

    hideTitle(e){
      e.target.setAttribute('title', "")
    },

    restoreTitle(e){
      e.target.setAttribute('title', this.tooltip)
    },

  },



  created() {

  },

}
</script>

<style scoped>
.checkbox-container{
  display: flex;
  padding: .5em;
  cursor: pointer;
  align-items: center;
  width: fit-content;
  user-select: none;
}
.checkbox{
  width: 1em;
  height: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--radius-xs);
  outline: .1em solid var(--borders-weak);
  font-size: 1.2rem;
  overflow: hidden;
}
.checkbox:focus{
  outline: none;
  border: .1em solid var(--blue);
  box-shadow: 0 0 5px var(--blue);
}
.checked{
  padding: 0 .1em;
  border-radius: var(--radius-xs);
  background-color: var(--green-dark);
  color: white;
  animation: appear 200ms ease-in forwards;
}
@keyframes appear {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.7);
  }
  100% {
    transform: scale(1);

  }
}
.label{
  margin-left: .5em;
  cursor: pointer;
}
</style>
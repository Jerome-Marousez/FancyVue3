<template>
  <div :data-tooltip="tooltip" :title="tooltip">

    <button
        v-if="type !== 'toggle'"
        :class="classes"
        @mousedown="handleMouseDown"
        @mouseup="handleClick"
        @mouseover="hideTitle"
        @mouseleave="restoreTitle"
        :title="tooltip ? tooltip : label"
        :aria-label="label ? label : title"
    >{{ title.charAt(0).toUpperCase() + title.slice(1) }}</button>

    <button
        v-if="type === 'toggle'"
        :class="classes"
        @click="toggle"
        @mouseover="hideTitle"
        @mouseleave="restoreTitle"
        :aria-label="label ? label : tooltip"
        :title="tooltip ? tooltip : label"
        role="switch"
        :aria-checked="modelValue"
    ><div class="switch" /></button>

  </div>

</template>

<script>
export default {
  name: "Button",

  emits:['clickEvent', 'update:modelValue'],

  props:{
    title: String,
    type: String,
    modelValue: Boolean,
    tooltip: String,
    label: String,
  },

  data(){
    return {
      defaultClass: "btn",
      position: '',
    }
  },

  computed:{
    classes(){
      return this.defaultClass + ' ' + this.type
    },
    bgColor(){
      if(this.modelValue) return 'hsl(120, 50%, 50%)'
      if(!this.modelValue) return 'hsl(0, 50%, 50%)'
    },
  },

  methods:{
    handleClick(){
      this.$emit('clickEvent')
    },

    handleMouseDown(e){
      const circle = document.createElement('span')
      circle.classList.add('growing-circle')
      circle.style.left = e.offsetX + 'px'
      circle.style.top = e.offsetY + 'px'
      e.target.appendChild(circle)

      setTimeout(() => {
        circle.remove()
      }, 600)

    },

    toggle(){
      if(!this.modelValue) this.position = '+100%'
      if(this.modelValue) this.position = ''
      this.$emit ('update:modelValue', !this.modelValue)
    },

    updateTogglePosition(){
      if(this.modelValue) this.position = '+100%'
      if(!this.modelValue) this.position = ''
    },

    hideTitle(e){
      e.target.setAttribute('title', "")
    },

    restoreTitle(e){
      e.target.setAttribute('title', this.tooltip)
    },
  },


  created(){
    this.updateTogglePosition()

  },

}
</script>

<style scoped>
:root{

}
.btn {
  box-sizing: border-box;
  position: relative;
  background: none;
  font-size: 1.25rem;
  margin: 0.5em;
  border: none;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
  color: white;
  user-select: none;
}
.btn:hover:not(.toggle), .btn:focus-visible:not(.toggle) {
  box-shadow: 0 .2em .4em -.1em rgba(0, 0, 0, 0.5), 0 .2em .4em -.1em rgba(0, 0, 0, 0.06);
}

.btn.primary {
  padding: .3em 1.5em;
  border-radius: var(--radius-xs);
  background-color: var(--blue);
}
.btn.primary:hover {
  background: var(--blue-dark);
}

.btn.alert {
  padding: .3em 1.5em;
  border-radius: var(--radius-xs);
  background-color: var(--red);
}
.btn.alert:hover {
  background: var(--red-dark);
}

.btn.small {
  font-size: .8rem;
  width: 1.8em;
  aspect-ratio: 1 / 1;
  border-radius: var(--radius-xs);
  border: .1em solid var(--borders-weak);
  color: var(--text-light);
  font-weight: bold;
}
.btn.small:hover {
  background: var(--bg-secondary);
}

.btn.toggle {
  box-sizing: content-box;
  border-radius: var(--radius-xl);
  padding: 0.1em;
  width: 1.6em;
  transition: background 0.5s 0.1s;
  background-color: v-bind(bgColor);
}
.btn.toggle:focus {
  box-shadow: none;
}
.switch {
  transition: transform 0.3s cubic-bezier(0,-1,1,2);
  transform: translate(v-bind(position));
  width: .8em;
  height: .8em;
  border-radius: 50%;
  background-color: white;
}

</style>

<style>
.growing-circle {
  position: absolute;
  background-color: white;
  border-radius: 100vw;
  animation: grow .6s ease-in forwards;
  z-index: 1;
  width: .1em;
  height: .1em;
}
@keyframes grow {
  0% {
    transform: scale(0);
    opacity: .1;
  }
  100% {
    transform: scale(100);
    opacity: 0;
  }
}
</style>
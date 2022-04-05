<template>
  <div class="select-container">

    <legend v-if="modelValue" class="legend">
      {{ placeholder.charAt(0).toUpperCase() + this.placeholder.slice(1) + 's' }}
    </legend>

    <input type="text" :placeholder="modelValue ? '' : proxy" :value="modelValue" class="select" role="listbox" readonly aria-readonly="true" @click.self="toggleMenu"/>
      <div id="select-arrow"><i class="fas fa-chevron-down"/></div>

    <div v-if="menuOpen" class="menu-container">
      <div v-for="option in options" :key="option">
        <div class="option" @click="selectOption(option)">{{option}}</div>
      </div>
    </div>


  </div>

</template>

<script>
export default {
  name: "Select",

  props: {
    modelValue: String,
    placeholder: String,
    options: Array,
  },

  data() {
    return {
      menuOpen: false,
    }
  },

  computed: {
    proxy(){
      return 'Select ' + this.placeholder.charAt(0).toLowerCase() + this.placeholder.slice(1) + '...'
    },
  },

  methods: {
    handleClick(e){
      if(!e.path.some(div => div.className === 'select-container')){
        this.menuOpen = false
        const arrow = document.getElementById('select-arrow')
        arrow.classList.remove('select-arrow-up')
      }
    },
    selectOption(option){
      this.menuOpen = false
      const arrow = document.getElementById('select-arrow')
      arrow.classList.remove('select-arrow-up')
      this.$emit ('update:modelValue', option)
    },
    toggleMenu(){
      this.menuOpen = !this.menuOpen
      if(this.menuOpen) {
        const arrow = document.getElementById('select-arrow')
        arrow.classList.add('select-arrow-up')
      } else {
        const arrow = document.getElementById('select-arrow')
        arrow.classList.remove('select-arrow-up')
      }
    },
  },

  mounted(){
    document.addEventListener('click', this.handleClick)
  },

  destroyed(){
    document.removeEventListener('click')
  },

  created() {

  },

}
</script>

<style scoped>
.select-container {
  height: 3.8em;
  margin: .5em;
  display: flex;
  width: 18em;
  flex-direction: column;
  position: relative;
  user-select: none;
}
.legend {
  position: absolute;
  top: -.6em;
  color: var(--text-light);
  font-size: .8rem;
  display: flex;
  width: fit-content;
  height: fit-content;
  margin-left: 0.5em;
  padding: 0 0.8em;
  background: linear-gradient(90deg, rgba(2,0,36,0) 0%, var(--bg-primary) 10%, var(--bg-primary) 50%, var(--bg-primary) 90%, rgba(0,212,255,0) 100%);
  z-index: 10;
  user-select: none;
  animation: grow-left .2s linear forwards;
  transform-origin: left;
}
@keyframes grow-left {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}
.select {
  z-index: 2;
  box-sizing: border-box;
  background: none;
  font-size: inherit;
  padding: .6em;
  border: .1em solid var(--borders-weak);
  border-radius: var(--radius-xs);
  outline: none;
  overflow: hidden;
  color: inherit;
  position: relative;
  cursor: pointer;
  user-select: none;
}
.select:focus{
  border-color: var(--blue);
  box-shadow: 0 0 .3em var(--blue);
}
#select-arrow{
  position: absolute;
  right: .5em;
  top: .6em;
  color: var(--text-light);
  user-select: none;
  pointer-events: none;
  transition: transform .2s linear;
  transform-style: preserve-3d;
}
#select-arrow:hover{
  color: var(--text-disabled);
}
.select-arrow-up {
  transform: rotateX(180deg);
  transition: transform .2s linear;
  transform-style: preserve-3d;
}
.menu-container {
  z-index: 1;
  width: 18em;
  position: absolute;
  top: 2.4em;
  background-color: var(--bg-primary);
  border: .1em solid var(--borders-weak);
  border-top: .1em solid transparent;
  border-radius: var(--radius-xs);
  animation: grow-top .2s linear forwards;
  transform-origin: top;
}
@keyframes grow-top {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
.option {
  padding: .6em;
  cursor: pointer;
}
.option:hover {
  background-color: var(--bg-secondary);
}
</style>
<template>
  
  <div v-if="type !== 'textarea'" class="input-container" :data-tooltip="tooltip">

    <legend v-show="modelValue" class="legend">
        {{ placeholder.charAt(0).toUpperCase() + this.placeholder.slice(1) + (required ? ' (required)' : '') }}
    </legend>

    <input
        :class="classes"
        :type="type"
        :placeholder="proxy"
        :pattern=" type === 'email' ? '^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$' : ''"
        spellcheck="false"
        @input="updateInput"
        @keyup="validation"
        @mouseover="hideTitle"
        @mouseleave="restoreTitle"
        :min="min"
        :aria-valuemin="min"
        :max="max"
        :aria-valuemax="max"
        v-model="modelValue"
        :aria-valuetext="modelValue"
        :title="tooltip ? tooltip : label"
        :aria-label="label ? label : tooltip"
    >

    <div v-if="type === 'number'" class="arrows">
      <div class="arrow left" @click.self="updateNumber('increase')">&#10096;</div>
      <div class="arrow right" @click.self="updateNumber('decrease')">&#10097;</div>
    </div>

    <div v-if="error" class="error-message">{{ error }}</div>

  </div>

  <div v-if="type === 'textarea'" :data-tooltip="tooltip">

    <textarea
        :class="classes"
        name=""
        id=""
        cols="21"
        rows="4"
        @input="updateInput"
        @mouseover="hideTitle"
        @mouseleave="restoreTitle"
        v-model="modelValue"
        :placeholder="placeholder"
        :title="tooltip ? tooltip : label"
        :aria-label="label ? label : tooltip"
        :aria-valuetext="modelValue"
    />

  </div>
  
</template>

<script>
export default {
  name: "Input",

  props:{
    placeholder: String,
    type: String,
    modelValue: String,
    min: Number,
    max: Number,
    required: Boolean,
    tooltip: String,
    label: String,
  },

  data(){
    return{
      error: '',
    }
  },

  computed:{
    classes(){
      return this.type === 'textarea' ? 'textarea' : 'input' + ' ' + this.type
    },
    proxy(){
      return 'Enter ' + this.placeholder.charAt(0).toLowerCase() + this.placeholder.slice(1) + '...'
    }
  },

  methods:{
    updateInput(){
      const e = document.querySelector('.' + this.type)
      this.$emit ('update:modelValue', e.value)
    },

    validation(){
      const e = document.querySelector('.' + this.type)
      const placeholder = this.placeholder.charAt(0).toUpperCase() + this.placeholder.slice(1)

      if(e.type !== 'number'){
        if(e.min && e.value.length < e.min){
          e.classList.add('error')
          this.error = `${placeholder} too short`
        }
        if(e.max && e.value.length > e.max){
          e.classList.add('error')
          this.error = `${placeholder} too long`
        }
        if(e.value.length >= e.min && e.value.length <= e.max){
          e.classList.remove('error')
          e.classList.add('success')
          this.error = ''
        }
      }

      if(e.type === 'number'){
        const value = parseInt(e.value)
        if(e.min && value < e.min){
          e.classList.remove('success')
          e.classList.add('error')
          this.error = `${placeholder} too low`
        }
        if(e.max && value > e.max){
          e.classList.add('error')
          this.error = `${placeholder} too high`
        }
        if(value >= e.min && value <= e.max){
          e.classList.remove('error')
          e.classList.add('success')
          this.error = ''
        }
        if(!value && !this.required){
          e.classList.remove('error')
          e.classList.remove('success')
          this.error = ''
        }
        if(!value && this.required){
          e.classList.add('error')
          e.classList.remove('success')
          this.error = 'Age cannot be empty'
        }
      }

      if(e.type === 'email' && e.validity.valid){
        e.classList.remove('error')
        e.classList.add('success')
        this.error = ''
      }
      if(e.type === 'email' && !e.validity.valid){
        e.classList.remove('success')
        e.classList.add('error')
        this.error = `${placeholder} invalid`
      }
      if(e.type === 'email' && e.value.length < 1 && this.required){
        e.classList.remove('success')
        e.classList.add('error')
        this.error = `${placeholder} cannot be empty`
      } else if (e.type === 'email' && e.value.length < 1 && !this.required){
        e.classList.remove('error')
        e.classList.remove('success')
        this.error = ''
      }

    },

    updateNumber(action){
      let target = document.querySelector('.number')
      if(!target.value) {
        if(action === 'increase') {
          target.value = target.min
        }
        if(action === 'decrease') {
          target.value = target.max
        }

      } else {
        if(action === 'increase' && parseInt(target.value) < parseInt(target.max)) {
          target.value++
        }
        if(action === 'decrease' && parseInt(target.value) > parseInt(target.min)) {
          target.value--
        }
      }

      this.validation()
      this.updateInput()

    },

    hideTitle(e){
      e.target.setAttribute('title', "")
    },

    restoreTitle(e){
      e.target.setAttribute('title', this.tooltip)
    },

  },


  created(){

  },
}
</script>

<style scoped>
.input-container{
  margin: .5em;
  display: flex;
  width: 18em;
  flex-direction: column;
  position: relative;
}
.input{
  box-sizing: border-box;
  background: none;
  font-size: inherit;
  padding: .6em;
  border: .1em solid var(--borders-weak);
  border-radius: var(--radius-xs);
  outline: none;
  overflow: hidden;
  color: inherit;
}
.input:focus{
  border-color: var(--blue);
  box-shadow: 0 0 .3em var(--blue);
}
.input.success{
  border-color: var(--green);
}
.input.success:focus{
  box-shadow: 0 0 .3em var(--green);
}
.input.error{
  border-color: var(--red);
}
.input.error:focus{
  box-shadow: 0 0 .3em var(--red);
}
.input.disabled{
  background-color:  var(--bg-secondary);
}
.input.disabled::placeholder{
  color: var(--text-disabled);
}
.error-message{
  margin-top: 0.3em;
  color: var(--red);
  font-size: .8rem;
  margin-left: 0.5em;
  user-select: none;
}
.legend{
  position: absolute;
  top: -.5em;
  color: var(--text-light);
  font-size: .8rem;
  display: flex;
  width: fit-content;
  height: fit-content;
  margin-left: 0.5em;
  padding: 0 0.5em;
  background-color: var(--bg-primary);
  z-index: 10;
  user-select: none;
}

.input[type = number]::-webkit-inner-spin-button,
.input[type = number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type = number] {
  -moz-appearance:textfield;
}

.input[type = number] {
  min-width: 9em;
}
.arrows{
  position: absolute;
  right: .5em;
  top: .1em;
  cursor: pointer;
}
.arrow{
  display: flex;
  justify-content: center;
  align-items: center;
  width: .8em;
  height: 50%;
  color: var(--text-light);
  user-select: none;
}
.arrow:hover{
  color: var(--text-disabled);
}
.arrow.left{
  transform: rotate(90deg);
}
.arrow.right{
  transform: rotate(90deg);
}

.textarea{
  box-sizing: border-box;
  position: relative;
  background: none;
  font-size: inherit;
  margin: .5em;
  padding: .5em;
  border: .1em solid var(--borders-weak);
  border-radius: var(--radius-xs);
  outline: none;
  overflow: hidden;
  resize: none;
  color: inherit;
}
.textarea:focus{
  border-color: var(--blue);
  box-shadow: 0 0 .3em var(--blue);
}
</style>
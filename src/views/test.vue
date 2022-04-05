<template>
  <div class="page" id="test">



    <div class="content-sidebar">
      <div ref="nav">
        <div class="item">hey1</div>
        <div class="item">hey2</div>
        <div class="item">hey3</div>
        <div class="item">hey4</div>
      </div>

      <div class="content">

        <div ref="subNav">
          <div @click="switchTheme" style="padding:1em;">
            Theme
          </div>
        </div>

        <div ref="mainSection" class="main-section">

          <div class="column">

            <div class="row">
              <Button title="Submit" type="primary"/>
              <Button title="Cancel" type="alert"/>
              <Button title="toggle" type="toggle" v-model="toggle" tooltip="Toggle between states"/>
              <Button title="x" type="small" tooltip="Close window" label=""/>
            </div>

            <div class="row">
              <Input type="text" placeholder="first name" v-model="textA" :min="4" :max="12" />
              <Input type="number" placeholder="Age" v-model="textD" :min="4" :max="12" :required="true" tooltip="Choose wisely"/>
              <Input type="email" placeholder="email" :required="false" v-model="textB" tooltip="Choose wisely"/>
              <Input type="textarea" placeholder="Leave reply..." v-model="textC" label="Reply input"/>
            </div>

            <div class="row">
              <Slider :min="0" :max="100" v-model="slider" :steps="10" color="var(--green)"/>
            </div>

            <div>
              <Checkbox label="Accept cookies" v-model="check" tooltip="Your info will not be visible to other members"/>
            </div>

            <div>
              <Modal v-if="modalActive" v-on:closeModal="closeModal" v-on:confirmModal="confirmModal" header="Welcome!" body=""/>
            </div>

          </div>


          <div class="row">
            <Socials title="facebook" color="var(--green)"/>
            <Socials title="twitter" color="var(--blue)" url="https://twitter.com/lporiginalg"/>
            <Socials title="instagram" color="var(--red)"/>
            <Socials title="instagram" color="var(--yellow)"/>
            <Socials title="twitter" color="var(--purple)"/>
            <Socials title="facebook" color="var(--grey)"/>
            <Socials title="instagram" color="var(--pink)"/>
          </div>

<!--          <div class="grid">-->
<!--            <div class="grid-unit">1</div>-->
<!--            <div class="grid-unit">2</div>-->
<!--            <div class="grid-unit">3</div>-->
<!--            <div class="grid-unit">4</div>-->
<!--            <div class="grid-unit">5</div>-->
<!--            <div class="grid-unit">6</div>-->
<!--            <div class="grid-unit">7</div>-->
<!--            <div class="grid-unit">8</div>-->
<!--            <div class="grid-unit">9</div>-->
<!--            <div class="grid-unit">10</div>-->
<!--            <div class="grid-unit">11</div>-->
<!--            <div class="grid-unit">12</div>-->
<!--            <div class="grid-unit">13</div>-->
<!--          </div>-->


          <Select placeholder="fruit" v-model="selected" :options="options"/>



        </div>





      </div>

    </div>


<!--    <Loading v-if="loading" type="cube" color="var(&#45;&#45;green)" opacity=".4" radius=".15em"/>-->
<!--    <Loading v-if="loading" type="trinity" color="var(&#45;&#45;green)" opacity=".6" radius=".1em"/>-->
    <Loading v-if="loading" type="layers" color="var(--green)" opacity=".8" radius=".5em"/>


  </div>
</template>

<script>
import Button from "@/components/Tools/Button"
import Input from "@/components/Tools/Input"
import Modal from "@/components/Tools/Modal"
import Checkbox from "@/components/Tools/Checkbox"
import Loading from "@/components/Tools/Loading"
import Slider from "@/components/Tools/Slider"
import Socials from "@/components/Tools/Socials"
import Select from "@/components/Tools/Select"

export default {
  name: "SlrCSS",

  components:{
    Button,
    Input,
    Modal,
    Checkbox,
    Loading,
    Slider,
    Socials,
    Select,
  },

  data(){
    return {
      loading: false,
      modalActive: false,
      toggle: true,
      check: false,
      textA: '',
      textB: '',
      textC: '',
      textD: null,
      theme: true,
      slider: 50,
      options: ['Cherry', 'Strawberry', 'Apple'],
      selected: "",
    }
  },

  computed:{

  },

  methods:{
    updateSizeNav(){
      const nav = this.$refs.nav
      if(nav && nav.scrollWidth && nav.clientWidth){
        const width = this.$refs.nav.clientWidth
        const height = this.$refs.nav.clientHeight
        if(width > height){
          this.$refs.nav.classList.add('row')
          this.$refs.nav.classList.remove('column')
          const offsetTop = this.$refs.mainSection.offsetTop
          this.$refs.mainSection.style.height = (window.innerHeight - offsetTop) + "px"
        } else {
          this.$refs.nav.classList.remove('row')
          this.$refs.nav.classList.add('column')
          const offsetTop = this.$refs.mainSection.offsetTop
          this.$refs.mainSection.style.height = (window.innerHeight - offsetTop) + "px"
        }
      }

    },

    closeModal(){
      this.modalActive = !this.modalActive
    },

    confirmModal(){
      console.log('do your thing')
    },

    switchTheme(){
      this.theme = !this.theme
      localStorage.setItem("theme", this.theme)
      this.setTheme()
    },

    setTheme(){
      const json = localStorage.getItem("theme")
      this.theme = JSON.parse(json)
      if(!this.theme){
        const css = document.getElementById('css')
        css.setAttribute("href", "theme/light.css")
      } else {
        const css = document.getElementById('css')
        css.setAttribute("href", "theme/dark.css")
      }
    },

  },

  mounted(){
    this.updateSizeNav()
  },

  created(){
    this.setTheme()
    window.addEventListener('resize', this.updateSizeNav)
  },

  destroyed(){
    window.removeEventListener('resize', this.updateSizeNav)
  },
}
</script>

<style scoped>
.main-section{
  max-height: 100%;
  overflow-y: auto;
}
.item {
  padding: 1em;
}
</style>
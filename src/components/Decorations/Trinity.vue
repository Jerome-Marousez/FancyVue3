<template>

  <div class="trinity-container">

    <div class="spinner spinner-1"/>
    <div class="spinner spinner-2"/>
    <div class="spinner spinner-3"/>

  </div>

</template>

<script>
export default {
  name: "Trinity",

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
.trinity-container {
  z-index: 1;
  width: 2.5em;
  height: 2.5em;
  transform-style: preserve-3d;
  position: relative;
  transform: perspective(120px) rotateX(50deg);
}
.spinner {
  width: 1.5em;
  height: 1.5em;
  border-radius: 50vw;
  position: absolute;
  opacity: v-bind(opacity);
}
.spinner.spinner-1 {
  border-right: v-bind(radius) solid transparent;
  border-bottom: v-bind(radius) solid v-bind(color);
  border-left: v-bind(radius) solid v-bind(color);
  animation: spin 2s infinite linear;
}
.spinner.spinner-2 {
  border-bottom: v-bind(radius) solid transparent;
  border-left: v-bind(radius) solid v-bind(color);
  border-top: v-bind(radius) solid v-bind(color);
  right: 0;
  animation: spin 2s infinite linear;
}
.spinner.spinner-3 {
  border-left: v-bind(radius) solid transparent;
  border-top: v-bind(radius) solid v-bind(color);
  border-right: v-bind(radius) solid v-bind(color);
  bottom: 0;
  left: 20%;
  animation: spin 2s infinite linear;
}

@-ms-keyframes spin {
  from {
    -ms-transform: rotate(0deg);
  } to {
      -ms-transform: rotate(-360deg);
    }
}
@-moz-keyframes spin {
  from {
    -moz-transform: rotate(0deg);
  } to {
      -moz-transform: rotate(-360deg);
    }
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  } to {
      -webkit-transform: rotate(-360deg);
    }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  } to {
      transform: rotate(-360deg);
    }
}


</style>
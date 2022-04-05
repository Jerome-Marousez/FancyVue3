<template>
  <a :href="url" target="_blank" class="social-container">
    <Stack :title="title" :color="color" />
  </a>

</template>

<script>
import Stack from "@/components/Decorations/Stack"

export default {
  name: "Socials",

  components: {
    Stack
  },

  props: {
    color: String,
    title: String,
    url: String,
  },

  data() {
    return {

    }
  },

  computed: {

  },

  methods: {

  },

  created() {

  },

}
</script>

<style scoped>
.social-container {
  margin:.5em;
  width: 3em;
  aspect-ratio: 1;
}
</style>
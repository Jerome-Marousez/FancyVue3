<template>
  <div
      class="modal-container"
      @click.self="closeModal"
      role="dialog"
      aria-describedby="modal-body"
      aria-hidden="true"
  >
    <div class="modal" aria-modal="true">

      <div class="modal-header">
        <div class="modal-title" :aria-label="header">{{ header }}</div>
        <Button
            title="x"
            type="small"
            v-on:clickEvent="closeModal"
            label="Close Modal"
            tooltip="Close Modal"
        />
      </div>

      <div v-if="body" class="modal-body">
        <div id="modal-body">{{ body }}</div>
      </div>

      <div class="modal-footer">
        <Button
            title="OK"
            type="primary"
            v-on:clickEvent="confirmModal"
            label="Confirm"
        />
      </div>

    </div>

  </div>

</template>

<script>
import Button from "@/components/Tools/Button"

export default {
  name: "Modal",

  emits:['closeModal', 'confirmModal'],

  props:{
    header: String,
    body: String,
  },

  components: {
    Button,
  },

  data() {
    return {

    }
  },

  computed: {

  },

  methods: {
    closeModal(){
      this.$emit('closeModal')
    },
    confirmModal(){
      this.$emit('confirmModal')
    },
  },

  created() {

  },

}
</script>

<style scoped>
.modal-container{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: hsla(0, 0%, 0%, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal{
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 80vw;
}
.modal-header{
  background-color: var(--bg-primary);
  padding: .5em 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1px;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}
.modal-title{
  font-weight: bold;
  font-size: 1.2rem;
}
.modal-body{
  background-color: var(--bg-primary);
  padding: .5em 1em;
  margin-bottom: 1px;
  max-height: 75vh;
  overflow-y: auto;
}
.modal-footer{
  background-color: var(--bg-primary);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: .5em 1em;
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
}
</style>
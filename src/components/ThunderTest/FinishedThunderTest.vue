<template>
  <div class="flex items-center min-h-screen bg-gray-100">
    <div class="container mx-auto">
      <div class="max-w-sm mx-auto my-10 bg-white border-2 border-orange shadow-2xl">
        <div class="text-center py-2 text-black-400 bg-orange">
          Prueba relámpago
        </div>
        <div class="m-3">
          <div class="text-center font-bold text-xl">
            Prueba terminada
          </div>
          <div class="flex border-b-2 border-dashed my-3 border-orange-light justify-center">
            <radial-progress-bar :diameter="150"
                                 :completed-steps="Number(num)"
                                 :total-steps="Number(num) + 1">
              Nivel: <br><strong>{{ Number(num) }}/{{ Number(num) + 1 }}</strong>
            </radial-progress-bar>
          </div>
          <div class="flex justify-center">
            <button class="button-secondary hover:bg-orange-dark hover:text-white mt-1" @click="startOver">
              Volver a intentarlo
            </button>
          </div>
          <div class="flex justify-center">
            <button class="button-secondary hover:bg-orange-dark hover:text-white mt-1" @click="goToHome">
              Regresar a pantalla principal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadialProgressBar from "vue-radial-progress";

export default {
  name: "FinishedThunderTest",
  components: {RadialProgressBar},
  props: ['areaId', 'num'],
  methods: {
    startOver() {
      this.$router.push({ name: 'thunder-test' });
    },
    goToHome() {
      this.$router.push({ name: 'student-home' });
    },
  }
}
</script>

<style scoped>

</style>

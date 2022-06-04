<template>
  <div class="flex items-center min-h-screen bg-gray-100">
    <div class="container mx-auto">
      <div class="max-w-sm mx-auto my-10 bg-white border-2 border-orange shadow-2xl">
        <div class="text-center py-2 text-black-400 bg-orange">
          Test Relámpago
        </div>
        <div class="m-3">
          <div class="mb-2 bg-blue-500 px-1 border-2 shadow-lg cursor-pointer" @click="startExam(1)">
            Matemática
          </div>
          <div class="mb-2 bg-green-400 px-1 border-2 shadow-lg cursor-pointer" @click="startExam(2)">
            Ciencias
          </div>
          <div class="mb-2 bg-yellow-300 px-1 border-2 shadow-lg cursor-pointer" @click="startExam(3)">
            Lectura
          </div>
          <div class="mb-2 bg-yellow-400 px-1 border-2 shadow-lg cursor-pointer" @click="startExam(4)">
            Educación Financiera
          </div>
        </div>
        <div class="bg-orange text-right text-xl">
          <i class="fab fa-facebook-square mr-2"></i>
          <i class="fab fa-instagram-square mr-2"></i>
          <i class="fab fa-twitter-square mr-2"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ThunderTestService from "@/services/ThunderTestService";

export default {
  name: "ThunderTestOptions",
  methods: {
    startExam(area) {
      ThunderTestService.startThunderTest({ student: this.$store.getters.getUserId, area: area }).then((response) => {
        if (response.status === 201) {
          this.$router.push({ name: 'thunder-test-start', params: { areaId: area, questionInfo: response.data, num: '1' }});
        }
      }).catch(() => {
        this.$swal('Error', 'El servicio no está disponible', 'error');
      });
    }
  },
  created() {
    this.$store.dispatch('setToken');
    this.$store.dispatch('setUserId');
  }
}
</script>

<style scoped>

</style>

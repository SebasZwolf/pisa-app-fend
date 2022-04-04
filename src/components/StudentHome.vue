<template>
  <div>
    <StudentNavbar></StudentNavbar>
    <section>
      <div class="flex items-center bg-orange-light justify-between border-0">
        <p class="text-lg py-2.5 ml-4">Inicio</p>
      </div>
      <div>
        <div class="flex items-center justify-between border-b-2 border-dashed m-1 border-orange-light">
          <p class="text-md py-2 ml-3">Evaluaciones pendientes</p>
          <button class="button-secondary m-1.5" @click="goToProfile">Ir a perfil</button>
        </div>

        <template v-if="exams.length < 1">
          <span class="ml-4">No hay exámenes disponibles por el momento</span>
        </template>
        <template v-else>
          <div v-for="exam of exams" v-bind:key="exam.id">
            <div class="flex justify-between ml-3 mr-2 py-2 my-1.5 bg-gray-300 block hover:bg-gray-400 my-auto">
              <div class="text-left mx-3" v-text="exam.name"></div>
              <div class="text-right mx-3">{{ exam.startDate | moment("calendar") }}</div>
            </div>
          </div>
        </template>

        <div class="flex items-center justify-between border-b-2 border-dashed m-1 border-orange-light">
          <p class="text-md py-2 ml-3">Pizarra</p>
        </div>
        <div class="bg-orange-light my-2 mx-4 p-2">
          <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-400 block shadow-inner shadow-2xl p-6">
            <div v-for="(message, index) of messages" v-bind:key="index" class="block bg-blue-200 shadow-2xl transform p-2.5 text-center m-4" :class="index % 2 === 0? '-rotate-6' : 'rotate-6'">
              <div class="flex justify-center">
                <div class="rounded-full bg-blue-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              </div>
              {{ message.message }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import StudentNavbar from "@/utils/StudentNavbar";
import UserService from "@/services/UserService";
import HomeService from "@/services/HomeService";

export default {
  name: "StudentHome",
  components: {StudentNavbar},
  data: () => ({
    exams: [],
    messages: []
  }),
  created() {
    UserService.getUserById(this.$store.getters.getUserId).then((response) => {
      if (response.status === 200) {
        sessionStorage.setItem('educationalInstitutionId', response.data.educationalInstitution);
        this.$store.dispatch('setEducationalInstitution');
        this.getHomeInfo();
        this.getBoardInfo();
      }
    }).catch(() => {
      this.$swal('Error', 'El servicio no está disponible', 'error');
    })
  },
  methods: {
    getHomeInfo() {
      HomeService.getHomeInfoByStudentId(this.$store.getters.getUserId).then((response) => {
        if (response.status === 200) {
          this.exams = response.data;
        }
      });
    },
    getBoardInfo() {
      HomeService.getBoardInfoByStudentId(this.$store.getters.getUserId).then((response) => {
        this.messages = response.data;
      });
    },
    goToProfile() {
      this.$router.push({ name: 'student-profile' });
    }
  }
}
</script>

<style>

</style>

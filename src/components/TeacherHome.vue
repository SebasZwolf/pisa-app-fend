<template>
  <div>
    <TeacherNavbar></TeacherNavbar>
    <section>
      <div class="flex items-center bg-orange-light justify-between border-0">
        <p class="text-lg py-2.5 ml-4">Inicio</p>
      </div>
      <div>
        <div class="flex items-center justify-between border-b-2 border-dashed m-1 border-orange-light">
          <p class="text-md py-2 ml-3">Aulas</p>
        </div>
        <template v-if="classrooms.length < 1">
          <span class="ml-4">No tiene aulas asociadas</span>
        </template>
        <template v-else>
          <div v-for="classroom of classrooms" v-bind:key="classroom.id">
            <div class="flex justify-between ml-3 mr-2 py-2 my-1.5 bg-gray-300 block hover:bg-gray-400 my-auto cursor-pointer"
                 @click="goToClassroomProfile(classroom.id)">
              <div class="text-left mx-3">
                {{ classroom.name }}
              </div>
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
import TeacherNavbar from "@/utils/TeacherNavbar";
import UserService from "@/services/UserService";
import HomeService from "@/services/HomeService";

export default {
  name: "TeacherHome",
  components: {TeacherNavbar},
  data: () => ({
    classrooms: [],
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
      HomeService.getHomeInfoByTeacherId(this.$store.getters.getUserId).then((response) => {
        if (response.status === 200) {
          this.classrooms = response.data;
        }
      });
    },
    getBoardInfo() {
      HomeService.getBoardInfoForTeacher(this.$store.getters.getUserId).then((response) => {
        this.messages = response.data;
      });
    },
    goToClassroomProfile(classroomId) {
      this.$router.push({ name: 'classroom-profile', params: { id: classroomId }});
    }
  }
}
</script>

<style>

</style>

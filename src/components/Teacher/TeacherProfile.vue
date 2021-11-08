<template>
  <div>
    <TeacherNavbar></TeacherNavbar>
    <section>
      <div class="flex items-center bg-orange-light justify-between border-0">
        <p class="text-lg py-2.5 ml-4">Perfil del profesor</p>
      </div>
      <div>
        <div class="flex items-center justify-between border-b-2 border-dashed m-1 border-orange-light">
          <p class="text-md py-2 ml-3">Información general</p>
        </div>
        <div class="mx-3 mt-3"> <!-- username -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Nombre de usuario
          </label>
          <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
            <div class="bg-orange w-12 border-0 text-center">
              <i class="fas fa-user"></i>
            </div>
            <input type="text" v-model="teacher.username" readonly
                   class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring-indigo-100 focus:border-indigo-300"
            />
          </span>
        </div>
        <div class="mx-3 mt-3"> <!-- full name -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Nombre completo
          </label>
          <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
            <div class="bg-orange w-12 border-0 text-center">
              <i class="far fa-user"></i>
            </div>
            <input type="text" v-model="fullName" readonly
                   class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring-indigo-100 focus:border-indigo-300"
            />
          </span>
        </div>
        <div class="mx-3 mt-3"> <!-- email -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Correo de contacto
          </label>
          <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
            <div class="bg-orange w-12 border-0 text-center">
              <i class="fas fa-envelope"></i>
            </div>
            <input type="text" v-model="teacher.email" readonly
                   class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring-indigo-100 focus:border-indigo-300"
            />
          </span>
        </div>
        <div class="flex items-center justify-between border-b-2 border-dashed mx-1 my-3 border-orange-light">
          <p class="text-md py-2 ml-3">Aulas asignadas a usted</p>
        </div>
        <div class="grid grid-cols-3 md:grid-cols-5">
          <div class="ml-3 mr-2 py-2 my-1.5 bg-gray-300 cursor-pointer hover:bg-gray-400" v-for="classroom of classrooms" v-bind:key="classroom.id">
            <div class="w-full text-center">
              <i class="fas fa-landmark"></i>
            </div>
            <div class="w-full text-center">
              {{ classroom.name }}
            </div>
            <div class="w-full text-center text-sm">
              100 <i class="fas fa-user"></i>
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
import ClassroomService from "@/services/ClassroomService";

export default {
  name: "TeacherProfile",
  components: { TeacherNavbar },
  data: () => ({
    teacher: {
      educationalInstitution: '',
      email: '',
      firstName: '',
      lastName: '',
      username: ''
    },
    fullName: '',
    classrooms: [],
  }),
  created() {
    this.$store.dispatch('setToken');
    this.$store.dispatch('setUserId');
    UserService.getUserById(this.$store.getters.getUserId).then((response) => {
      if (response.status === 200) {
        this.teacher = response.data;
        this.fullName = `${this.teacher.firstName} ${this.teacher.lastName}`;
        sessionStorage.setItem('educationalInstitutionId', response.data.educationalInstitution);
        this.$store.dispatch('setEducationalInstitution');
      }
    }).catch(() => {
      this.$swal('Error', 'El servicio no está disponible', 'error');
    });
    ClassroomService.getClassroomByTeacher(this.$store.getters.getUserId).then((response) => {
      if (response.status === 200) {
        this.classrooms = response.data;
      }
    }).catch(() => {
      this.$swal('Error', 'El servicio no está disponible', 'error');
    });
  },
}
</script>

<style scoped>

</style>
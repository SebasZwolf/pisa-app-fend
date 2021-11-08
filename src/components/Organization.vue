<template>
  <div>
    <TeacherNavbar></TeacherNavbar>
    <section>
      <div class="flex items-center bg-orange-light justify-between border-0">
        <p class="text-lg py-2.5 ml-4">Resumen organizacional</p>
        <button @click="editOrganization" class="button-secondary text-right mr-2.5 truncate">Ir a edición</button>
      </div>
      <div> <!-- classrooms -->
        <div v-for="(classroom, index) of classrooms" v-bind:key="classroom.id">
          <div class="mx-5 mt-3 text-xl font-medium bg-orange-light hover:bg-orange bg-opacity-50 duration-300 p-3 rounded-lg rounded-b-none flex justify-between">
            {{ classroom.name }}
            <button @click="changeAccordionStatus(index)" :hidden="!classroom.open"><i class="fas fa-chevron-up"></i></button>
            <button @click="changeAccordionStatus(index)" :hidden="classroom.open"><i class="fas fa-chevron-down"></i></button>
          </div>
          <div v-show="classroom.open" class="mx-5 bg-orange-light bg-opacity-50 p-3 pt-1 rounded-b-lg">
            {{ classroom.description }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TeacherNavbar from "@/utils/TeacherNavbar";
import ClassroomService from "@/services/ClassroomService";

export default {
  name: "Organization",
  components: {TeacherNavbar},
  data: () => ({
    classrooms: [],
  }),
  methods: {
    editOrganization() {
      this.$router.push({ name: 'edit-organization' });
    },
    getClassrooms() {
      ClassroomService.getClassroomByInstitution(this.$store.getters.getEducationalInstitution).then((response) => {
        if (response.status === 200) {
          response.data.forEach(f => f.open = false);
          this.classrooms = response.data;
        }
      }).catch(() => {
        this.$swal('Error', 'El servicio no está disponible', 'error');
      });
    },
    changeAccordionStatus(index) {
      this.classrooms[index].open = !this.classrooms[index].open;
    },
  },
  created() {
    this.$store.dispatch('setToken');
    this.$store.dispatch('setEducationalInstitution');
    this.getClassrooms();
  }
}
</script>

<style scoped>

</style>

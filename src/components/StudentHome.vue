<template>
  <StudentNavbar></StudentNavbar>
</template>

<script>
import StudentNavbar from "@/utils/StudentNavbar";
import UserService from "@/services/UserService";

export default {
  name: "StudentHome",
  components: {StudentNavbar},
  created() {
    UserService.getUserById(this.$store.getters.getUserId).then((response) => {
      if (response.status === 200) {
        sessionStorage.setItem('educationalInstitutionId', response.data.educationalInstitution);
        this.$store.dispatch('setEducationalInstitution');
      }
    }).catch(() => {
      this.$swal('Error', 'El servicio no está disponible', 'error');
    })
  }
}
</script>

<style>

</style>

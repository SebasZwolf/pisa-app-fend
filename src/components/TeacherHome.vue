<template>
  <TeacherNavbar></TeacherNavbar>
</template>

<script>
import TeacherNavbar from "@/utils/TeacherNavbar";
import UserService from "@/services/UserService";

export default {
  name: "TeacherHome",
  components: {TeacherNavbar},
  created() {
    UserService.getUserById(this.$store.getters.getUserId).then((response) => {
      if (response.status === 200) {
        sessionStorage.setItem('educationalInstitutionId', response.data.educationalInstitution);
        this.$store.dispatch('setEducationalInstitution');
      }
    }).catch((error) => {
      // TODO: error handling
      console.log(error);
    })
  }
}
</script>

<style>

</style>

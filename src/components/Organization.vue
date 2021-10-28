<template>
  <div>
    <TeacherNavbar></TeacherNavbar>
    <section>
      <div class="flex items-center bg-orange-light justify-between border-0">
        <p class="text-lg py-2.5 ml-4">Resumen organizacional</p>
        <button @click="editOrganization" class="button-secondary text-right mr-2.5 truncate">Ir a edición</button>
      </div>
    </section>
  </div>
</template>

<script>
import TeacherNavbar from "@/utils/TeacherNavbar";

export default {
  name: "Organization",
  components: {TeacherNavbar},
  methods: {
    editOrganization() {
      this.$router.push({ name: 'edit-organization' });
    },
  }
}
</script>

<style scoped>

</style>

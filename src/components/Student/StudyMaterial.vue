<template>
  <div>
    <StudentNavbar></StudentNavbar>
    <section>
      <div class="flex items-center bg-orange-light justify-between border-0">
        <p class="text-lg py-2.5 ml-4">Material de estudio</p>
      </div>
      <div class="grid-cols-2 md:grid-cols-4" v-for="area of areas" :key="area.id">
        <div class="justify-center bg-blue-500 m-3 p-2 cursor-pointer"
             v-if="area.id === 1"
             @click="goToCourseMaterial(1, 'blue-500')">
          {{ area.name }}
        </div>
        <div class="justify-center bg-green-400 m-3 p-2 cursor-pointer"
             v-if="area.id === 2"
             @click="goToCourseMaterial(2, 'green-400')">
          {{ area.name }}
        </div>
        <div class="justify-center bg-yellow-200 m-3 p-2 cursor-pointer"
             v-if="area.id === 3"
             @click="goToCourseMaterial(3, 'yellow-200')">
          {{ area.name }}
        </div>
        <div class="justify-center bg-yellow-400 m-3 p-2 cursor-pointer"
             v-if="area.id === 4"
             @click="goToCourseMaterial(4, 'yellow-400')">
          {{ area.name }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import StudentNavbar from "@/utils/StudentNavbar";
import ExamService from "@/services/ExamService";

export default {
  name: "StudyMaterial",
  components: { StudentNavbar },
  data: () => ({
    areas: []
  }),
  created() {
    this.$store.dispatch('setToken');
    this.$store.dispatch('setUserId');
    ExamService.getAreas().then((response) => {
      this.areas = response.data
    });
  },
  methods: {
    goToCourseMaterial(areaId, color) {
      this.$router.push({ name: 'course-material', params: { areaId: areaId, color: color }});
    }
  }
}
</script>

<style scoped>

</style>

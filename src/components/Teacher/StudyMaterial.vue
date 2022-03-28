<template>
  <div>
    <TeacherNavbar></TeacherNavbar>
    <section>
      <div class="flex items-center bg-orange-light justify-between border-0">
        <p class="text-lg py-2.5 ml-4">Material de estudio</p>
      </div>

      <div class="grid-cols-2 md:grid_cols-4" v-for="area of areas" :key="area.id">
        <div class="justify-center m-3 p-2 cursor-pointer" :class="'bg-' + colors[area.id - 1]"
             @click="goToCourseMaterial(area.id, colors[area.id - 1] )">
          {{ area.name }}
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import TeacherNavbar from "@/utils/TeacherNavbar";
import ExamService from "@/services/ExamService";

export default {
  name: "StudyMaterial",
  components: { TeacherNavbar },
  data: () => ({
    areas: []
  }),
  computed : {
    colors : () => ['blue-500','green-400','yellow-200','yellow-400'],
  },
  created() {
    this.$store.dispatch('setToken');
    this.$store.dispatch('setUserId');
    ExamService.getAreas().then( response => this.areas = response.data );
  },
  methods: {
    goToCourseMaterial(areaId, color) {
      this.$router.push({ name: 'course-material-teacher', params: { areaId: areaId, color: color }});
    }
  }
}
</script>

<style scoped>

</style>

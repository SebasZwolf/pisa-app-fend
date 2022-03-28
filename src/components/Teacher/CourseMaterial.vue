<template>
  <div>
    <StudentNavbar></StudentNavbar>
    <section>
      <div class="flex items-center justify-between border-0" :class="'bg-'+color">
        <p class="text-lg py-2.5 ml-4">{{ area.name }}</p>
      </div>

      <div class="block items-center justify-between border-0 my-2.5" v-for="topic of topics" :key="topic.id">
        <p class="text-lg py-2.5 pl-4" :class="'bg-'+color">{{ topic.name }}</p>
        <div class="my-2 grid grid-cols-1 md:grid-cols-3 ml-2 gap-2">

        <div class="bg-gray-300 pl-4 py-1 border-l-2 border-red-400 cursor-pointer" 
             @click="goToTopicMaterial(areaId, material, color)"
             v-for="material of topic.materials" :key="material.id">
          {{ material.name }}
        </div>

      </div>

      </div>
    </section>
  </div>
</template>

<script>
import StudentNavbar from "@/utils/TeacherNavbar";
import ExamService from "@/services/ExamService";
import MaterialStudyService from "@/services/MaterialStudyService";

export default {
  name: "CourseMaterial",
  components: { StudentNavbar },
  props: ['areaId', 'color'],
  data: () => ({
    area: {},
    topics: [],
  }),
  created() {
    this.$store.dispatch('setToken');
    this.$store.dispatch('setUserId');
    ExamService.getAreas().then((response) => {
      this.area = response.data.find(a => a.id === this.areaId);
    });
    MaterialStudyService.getTopicsByAreaId(this.areaId).then((response) => {
      response.data.forEach(f => f.materials = []);
      this.topics = response.data;
      for (let topic of this.topics) {
        MaterialStudyService.getStudyMaterialByTopicId(topic.id).then((response) => {
          topic.materials = response.data;
        });
      }
    });
  },
  methods: {
    goToTopicMaterial(areaId, topic, color) {
      this.$router.replace({ name: 'topic-material-teacher', params: { areaId: areaId, topic: topic, color: color }});
    }
  }
}
</script>

<style scoped>

</style>

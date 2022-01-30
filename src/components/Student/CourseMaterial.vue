<template>
  <div>
    <StudentNavbar></StudentNavbar>
    <section>
      <div class="flex items-center justify-between border-0" :class="'bg-'+color">
        <p class="text-lg py-2.5 ml-4">{{ area.name }}</p>
      </div>
      <div class="block items-center justify-between border-0 my-2.5"
           v-for="level of levels"
           :key="level.id">
        <p class="text-lg py-2.5 pl-4" :class="'bg-'+color">{{ level.name }}</p>
        <div class="my-2 grid grid-cols-1 md:grid-cols-3 ml-2 gap-2">
          <div class="bg-gray-300 pl-4 py-1 border-l-2 border-red-400 cursor-pointer"
               @click="goToTopicMaterial(areaId, topic, level, color)"
               v-for="topic of level.topics" :key="topic.id">
            {{ topic.name }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import StudentNavbar from "@/utils/StudentNavbar";
import ExamService from "@/services/ExamService";

export default {
  name: "CourseMaterial",
  components: { StudentNavbar },
  props: ['areaId', 'color'],
  data: () => ({
    area: {},
    // Mock data
    levels: [
      { id: 1, name: 'Básico', topics: [
          { id: 1, name: 'tema_1'}, { id: 2, name: 'tema_2'}, { id: 3, name: 'tema_3'}, { id: 4, name: 'tema_4'}, { id: 5, name: 'tema_5'}
        ]
      },
      { id: 2, name: 'Regular', topics: [
          { id: 1, name: 'tema_1'}, { id: 2, name: 'tema_2'}, { id: 3, name: 'tema_3'}, { id: 4, name: 'tema_4'}, { id: 5, name: 'tema_5'}
        ]
      },
      { id: 3, name: 'Avanzado', topics: [
          { id: 1, name: 'tema_1'}, { id: 2, name: 'tema_2'}, { id: 3, name: 'tema_3'}, { id: 4, name: 'tema_4'}, { id: 5, name: 'tema_5'}
        ]
      },
      { id: 4, name: 'Adicional', topics: [
          { id: 1, name: 'tema_1'}, { id: 2, name: 'tema_2'}, { id: 3, name: 'tema_3'}, { id: 4, name: 'tema_4'}, { id: 5, name: 'tema_5'}
        ]
      },
    ],
  }),
  created() {
    this.$store.dispatch('setToken');
    this.$store.dispatch('setUserId');
    ExamService.getAreas().then((response) => {
      this.area = response.data.find(a => a.id === this.areaId);
    });
  },
  methods: {
    goToTopicMaterial(areaId, topic, level, color) {
      this.$router.push({ name: 'topic-material', params: { areaId: areaId, topic: topic, level: level, color: color }});
    }
  }
}
</script>

<style scoped>

</style>

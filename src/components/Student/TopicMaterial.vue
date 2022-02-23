<template>
  <div>
    <StudentNavbar></StudentNavbar>
    <section>
      <div class="flex items-center justify-between border-0" :class="'bg-'+color">
        <p class="text-lg py-2.5 ml-4">{{ area.name }}</p>
      </div>
      <div class="flex items-center justify-between my-2 border-2" :class="'border-'+color">
        <p class="text-lg py-2.5 ml-4">{{ topic.name }}</p>
        <button class="p-2.5 border-2 text-black" :class="'bg-'+color">Ejercicios resueltos</button>
      </div>
      <div class="mx-3">
        <vue-pdf-app style="height: 98vh;" :pdf="pdfBuffer" @open="openHandler"></vue-pdf-app>
      </div>
    </section>
  </div>
</template>

<script>
import StudentNavbar from "@/utils/StudentNavbar";
import ExamService from "@/services/ExamService";
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";
import MaterialStudyService from "@/services/MaterialStudyService";

export default {
  name: "TopicMaterial",
  components: { StudentNavbar, VuePdfApp },
  props: ['areaId', 'topic', 'color'],
  data: () => ({
    area: {},
    pdfBuffer: '',
  }),
  created() {
    this.$store.dispatch('setToken');
    this.$store.dispatch('setUserId');
    ExamService.getAreas().then((response) => {
      this.area = response.data.find(a => a.id === this.areaId);
    });
    MaterialStudyService.getFileByStudyMaterialId(this.topic.id).then((response) => {
      if (response.status === 200) {
        const blob = new Blob([response.data]);
        this.pdfBuffer = URL.createObjectURL(blob);
      }
    });
  },
  methods: {
    openHandler(pdfApp) {
      window._pdfApp = pdfApp;
    },
  }
}
</script>

<style scoped>

</style>

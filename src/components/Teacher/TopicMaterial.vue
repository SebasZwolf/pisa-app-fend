<template>
  <div>
    <Navbar></Navbar>
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
import Navbar from "@/utils/TeacherNavbar";
import ExamService from "@/services/ExamService";
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";
import MaterialStudyService from "@/services/MaterialStudyService";

import { colors } from "@/utils/colors.json"

export default {
  name: "TopicMaterial",
  components: { Navbar, VuePdfApp },
  props: ['areaId', 'topic'],
  data: () => ({
    area: {},
    pdfBuffer: '',
  }),
  created() {
    this.color = colors[this.areaId - 1];
    console.log(this.areaId);
    this.$store.dispatch('setToken');
    this.$store.dispatch('setUserId');
    ExamService.getAreas().then( response => this.area = response.data.find(a => a.id === this.areaId));
    MaterialStudyService.getFileByStudyMaterialId(this.topic.id).then( response => {
      if (response.status === 200) this.pdfBuffer = URL.createObjectURL(new Blob([response.data]));
    });
  },
  methods: {
    openHandler(pdfApp) {
      window._pdfApp = pdfApp;
    },
  }
}
</script>

<style>
  section .toolbar {
    z-index : 29 !important;
  }
</style>

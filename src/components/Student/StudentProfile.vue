<template>
  <div>
    <StudentNavbar></StudentNavbar>
    <section>
      <div class="flex items-center bg-orange-light justify-between border-0">
        <p class="text-lg py-2.5 ml-4">Perfil del estudiante</p>
      </div>
      <div>
        <div class="flex items-center justify-between border-b-2 border-dashed m-1 border-orange-light">
          <p class="text-md py-2 ml-3">Información general</p>
        </div>
        <div class="mx-3 mt-3"> <!-- username -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Usuario
          </label>
          <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
            <div class="bg-orange w-12 border-0 text-center">
              <i class="fas fa-user"></i>
            </div>
            <input type="text" v-model="student.username" readonly
                   class="w-full py-2 placeholder-gray-300 border-2 border-l-0 border-orange focus:outline-none focus:ring-indigo-100 focus:border-indigo-300"
            />
          </span>
        </div>
        <div class="mx-3 mt-3"> <!-- fullName -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Nombre
          </label>
          <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
            <div class="bg-orange w-12 border-0 text-center">
              <i class="far fa-user"></i>
            </div>
            <input type="text" v-model="fullName" readonly
                   class="w-full py-2 placeholder-gray-300 border-2 border-l-0 border-orange focus:outline-none focus:ring-indigo-100 focus:border-indigo-300"
            />
          </span>
        </div>
        <div class="mx-3 mt-3"> <!-- email -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Correo electrónico
          </label>
          <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
            <div class="bg-orange w-12 border-0 text-center">
              <i class="fas fa-envelope"></i>
            </div>
            <input type="text" v-model="student.email" readonly
                   class="w-full py-2 placeholder-gray-300 border-2 border-l-0 border-orange focus:outline-none focus:ring-indigo-100 focus:border-indigo-300"
            />
          </span>
        </div>
        <div class="mx-3 mt-3"> <!-- classroom -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Aula
          </label>
          <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
            <div class="bg-orange w-12 border-0 text-center">
              <i class="fas fa-landmark"></i>
            </div>
            <input type="text" v-model="student.classRoom" readonly
                   class="w-full py-2 placeholder-gray-300 border-2 border-l-0 border-orange focus:outline-none focus:ring-indigo-100 focus:border-indigo-300"
            />
          </span>
        </div>

        <div class="flex items-center justify-between border-b-2 border-dashed m-1 border-orange-light">
          <p class="text-md py-2 ml-3">Reportes generales</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-5">
          
          <div v-for="(area, index) of areas" v-bind:key="area.id">
            <div class="mx-5 mt-3 text-xl font-medium bg-opacity-50 hover:bg-opacity-100 duration-300 p-3 rounded-lg rounded-b-none flex justify-between" :class="['bg-' + colors[area.id - 1] ]">
              {{ area.name }}
              <button @click="changeGeneralReportsAccordionStatus(index)" :hidden="!area.openGeneralReport"><i class="fas fa-chevron-up"></i></button>
              <button @click="changeGeneralReportsAccordionStatus(index)" :hidden="area.openGeneralReport"><i class="fas fa-chevron-down"></i></button>
            </div>

            <div v-show="area.openGeneralReport" class="mx-5 bg-opacity-25 p-3 pt-1 rounded-b-lg" :class="`bg-${colors[area.id-1]}`">
              <template v-if="area.generalReportData < 1">No hay reporte general de esta área </template>
              <template v-else>
                <line-chart v-if="area.generalReportLoaded" :chartdata="area.generalReport" :options="options"></line-chart>
              </template>
            </div>
          </div>

        </div>
        
        <div class="flex items-center justify-between border-b-2 border-dashed m-1 border-orange-light">
          <p class="text-md py-2 ml-3">Reportes thunder-test</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-5">

          <div v-for="(area, index) of areas" v-bind:key="area.id">
            <div class="mx-5 mt-3 text-xl font-medium bg-opacity-50 hover:bg-opacity-100 duration-300 p-3 rounded-lg rounded-b-none flex justify-between" :class="['bg-' + colors[area.id - 1] ]">
              {{ area.name }}
              <button @click="changeReportsAccordionStatus(index)" :hidden="!area.openReport"><i class="fas fa-chevron-up"></i></button>
              <button @click="changeReportsAccordionStatus(index)" :hidden="area.openReport"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div v-show="area.openReport" class="mx-5 p-3 pt-1 rounded-b-lg" :class="`bg-opacity-25 bg-${colors[area.id-1]}`">
              <template v-if="area.report.thunderTestQuantity < 1">
                No hay reportes de esta área. Realice evaluaciones para obtener reportes.
              </template>
              <template v-else>
                <div class="flex justify-center my-2">
                  <radial-progress-bar 
                    :diameter="150"
                    :completed-steps="area.report.levelOfCompetenceAchieved"
                    :total-steps="area.report.highestScoreOfTheCompetition">
                    Nivel alcanzado<br>
                    <strong>
                      {{ area.report.levelOfCompetenceAchieved }}/{{ area.report.highestScoreOfTheCompetition }}
                    </strong>
                  </radial-progress-bar>
                </div>

                <div class="flex justify-between ml-3 mr-2 py-2 my-1.5 bg-gray-300 block hover:bg-gray-400 my-auto">
                  <div class="text-left mx-3">
                    Ha realizado {{ area.report.thunderTestQuantity }} pruebas relámpago
                  </div>
                </div>

                <div class="flex justify-between ml-3 mr-2 py-2 my-1.5 bg-gray-300 block hover:bg-gray-400 my-auto">
                  <div class="text-left mx-3">
                    Nivel de competencia alcanzado: {{ area.report.levelOfCompetenceAchieved }}
                  </div>
                </div>

                <div v-for="topic of area.report.problemsTopics" v-bind:key="topic"
                    class="flex justify-between ml-3 mr-2 py-2 my-1.5 bg-gray-300 block hover:bg-gray-400 my-auto">
                  <div class="text-left mx-3">
                    Tiene problemas con el tema <strong>{{ topic }}</strong>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between border-b-2 border-dashed m-1 border-orange-light">
          <p class="text-md py-2 ml-3">Evaluaciones</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 mb-5">
          <div v-for="(area, index) of areas" v-bind:key="area.id">
            <div class="mx-5 mt-3 text-xl font-medium bg-opacity-50 hover:bg-opacity-100 duration-300 p-3 rounded-lg rounded-b-none flex justify-between" :class="['bg-' + colors[area.id - 1] ]">
              {{ area.name }}
              <button @click="changeAccordionStatus(index)" :hidden="!area.open"><i class="fas fa-chevron-up"></i></button>
              <button @click="changeAccordionStatus(index)" :hidden="area.open"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div v-show="area.open" class="mx-5 p-3 pt-1 rounded-b-lg"  :class="`bg-opacity-25 bg-${colors[area.id-1]}`">
              <template v-if="area.exams.length < 1"> No hay exámenes de esta área</template>
              <div v-else class="flex justify-between ml-3 mr-2 py-2 my-1.5 bg-gray-300 block hover:bg-gray-400 my-auto" v-for="exam of area.exams" :key="exam.id">
                <div class="text-left mx-3"><!--<i class="fas fa-stream"></i> lectura-->
                  <i class="fas fa-calculator"></i> <!--matemática--><!--<i class="fas fa-coins"></i> finanzas<i class="fas fa-atom"></i>ciencia-->
                  {{ exam.name }}
                </div>
                <div class="text-right mx-3" v-if="new Date() >= new Date(exam.startDate) && new Date() <= new Date(exam.expirationDate)">
                  <button class="button-secondary" @click="startExam(exam)">Comenzar examen</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import StudentNavbar from "@/utils/StudentNavbar";
import StudentService from "@/services/StudentService";
import ExamService from "@/services/ExamService";
import ReportService from "@/services/ReportService";
import RadialProgressBar from "vue-radial-progress";
import LineChart from "@/utils/LineChart";

import { colors } from '@/utils/colors.json'

export default {
  name: "StudentProfile",
  components: { StudentNavbar, RadialProgressBar, LineChart },
  data: () => ({
    student: {
      id: '',
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      classRoom: '',
      classRoomId: '',
    },
    areas: [],
    options: {
      responsive: true,
      aspectRatio: 1,
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 100,
            callback: function(value) {
              return value + '%';
            }
          }
        }]
      }
    }
  }),
  methods: {
    changeAccordionStatus(index) {
      this.areas[index].open = !this.areas[index].open;
    },
    changeReportsAccordionStatus(index) {
      this.areas[index].openReport = !this.areas[index].openReport;
    },
    changeGeneralReportsAccordionStatus(index) {
      this.areas[index].openGeneralReport = !this.areas[index].openGeneralReport;
    },
    async getStudent() {
      return await StudentService.getStudentsById(this.$store.getters.getUserId).then( response => {
        if (response.status === 200) this.student = response.data;
      }).catch(() => this.$swal('Error', 'El servicio no está disponible', 'error'));
    },
    getAreas() {
      ExamService.getAreas().then(response => {

        if (response.status === 200) {
          response.data.sort( (a,b) => a.id - b.id );
          response.data.forEach(f => {
            f.open = false;
            f.openReport = false;
            f.openGeneralReport = true;
            f.generalReportLoaded = false;
            f.exams = [];
            f.report = [];
            f.generalReport = [];
            f.generalReportData = 0;
          });
          this.areas = response.data;
          this.getExams();
          this.getGeneralReport();
        }
      });
    },
    getExams() {
      console.log('cid', this.student.classRoomId);
      for (let area of this.areas) {
        ExamService.getExamsByArea(area.id, this.student.classRoomId ).then( response => {
          if (response.status === 200) area.exams = response.data;
        });
      }
    },
    getReports() {
      ReportService.getReportsByStudentId(this.$store.getters.getUserId).then((response) => {
        if (response.status === 200) {
          for (let report of response.data) {
            this.areas.find(a => a.id === report.areaId).report = report;
          }
        }
      });
    },
    getGeneralReport() {
      for (let area of this.areas) {
        ReportService.getGeneralReportByStudentIdAndAreaId(this.$store.getters.getUserId, area.id).then((response) => {
          if (response.status === 200) {
            area.generalReport = {
              labels: Array.from(Array(response.data.length).keys(), i => ++i),
              datasets: [
                {
                  label: 'Evolución de rendimiento',
                  backgroundColor: ['#27e','#2e2','#ed2','#e62'][area.id - 1],
                  data: response.data.map(a => a.percentage)
                }
              ]
            }
            area.generalReportLoaded = true;
            area.generalReportData = response.data.length;
          }
        });
      }
    },
    startExam(exam) {
      this.$swal({
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Empezar evaluación',
        cancelButtonText: 'Cancelar',
        html: `<strong>Nombre de evaluación</strong>: ${exam.name}. <br>
        <strong>Descripción</strong>: ${exam.description}. <br>
        <strong>Duración</strong>: ${exam.duration} minutos. <br>
        <strong>Inicio</strong>: ${new Date(exam.startDate).toLocaleString()} <br>
        <strong>Vencimiento</strong>: ${new Date(exam.expirationDate).toLocaleString()}`,
        title: 'Información de evaluación'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ name: 'student-exam', params: { id: exam.id }});
        }
      });
    }
  },
  created() {
    this.$store.dispatch('setToken');
    this.$store.dispatch('setUserId');
    this.getStudent().then(()=>{
      this.getAreas();
      this.getReports();
    })
  },
  computed: {
    fullName: function () { return this.student.firstName + ' ' + this.student.lastName; },
    colors : () => colors,
  }
}
</script>

<style scoped>

</style>

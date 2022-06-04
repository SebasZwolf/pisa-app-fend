<template>
  <div>
    <TeacherNavbar></TeacherNavbar>
    <section>
      <div class="flex items-center bg-orange-light justify-between border-0">
        <p class="text-lg py-2.5 ml-4">Información del aula</p>
      </div>
      <div>
        <div class="flex items-center justify-between border-b-2 border-dashed m-1 border-orange-light">
          <p class="text-md py-2 ml-3">Información general</p>
        </div>
        <div class="mx-3 mt-3"> <!-- name -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Nombre clave
          </label>
          <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
            <div class="bg-orange w-12 border-0 text-center">
              <i class="fas fa-landmark"></i>
            </div>
            <input type="text" v-model="classroom.name" readonly
                   class="w-full py-2 placeholder-gray-300 border-2 border-l-0 border-orange focus:outline-none focus:ring-indigo-100 focus:border-indigo-300"
            />
          </span>
        </div>
        <div class="mx-3 mt-3"> <!-- description -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Descripción
          </label>
          <span class="flex items-center leading-extra-snug bg-orange border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
            <div class="w-12 h-full border-0 text-center">
              <i class="far fa-edit"></i>
            </div>
            <textarea v-model="classroom.description" readonly
                   class="resize-y w-full py-2 placeholder-gray-300 border-2 border-l-0 border-orange focus:outline-none focus:ring-indigo-100 focus:border-indigo-300"
            />
          </span>
        </div>
        <div class="flex items-center justify-between border-b-2 border-dashed mx-1 my-3 border-orange-light">
          <p class="text-md py-2 ml-3">Evaluaciones</p>
          <button @click="addEvaluation" class="text-right font-bold text-sm mr-5 rounded px-1.5 hover:bg-orange-light">Agregar Evaluación</button>
        </div>

        <div v-if="exams.length > 0">
          <div class="flex justify-between ml-3 mr-2 py-2 my-1.5 bg-gray-300 block cursor-pointer hover:bg-gray-400 my-auto" v-for="exam of exams" :key="exam.id">
            <div class="text-left mx-3">
              <!--  <i class="fas fa-stream"></i> --> <!-- lectura -->
              <i class="fas fa-calculator"></i> <!-- matemática -->
              <!-- <i class="fas fa-coins"></i> --> <!-- finanzas -->
              <!-- <i class="fas fa-atom"></i> --> <!-- ciencia -->
              {{ exam.name }}
            </div>
            <div class="text-right mx-3">
              {{ exam.startDate | moment("calendar") }}
            </div>
          </div>
        </div>
        <div v-else>
          no hay evaluaciones registradas en este aula aún
        </div>

        <div class="flex items-center justify-between border-b-2 border-dashed mx-1 my-3 border-orange-light">
          <p class="text-md py-2 ml-3">Alumnos del aula</p>
        </div>
        <template v-if="students.length > 0">
          <div class="mx-4">
            <input class="py-0" type="text" name="" id="" placeholder="filtre por nombre" pattern="^[a-zA-Z ]{0,}$"
            @input="filterStudents($event.target.value)">
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3">
            <button
              class="ml-3 mr-2 py-2 my-1.5 bg-gray-300 cursor-pointer hover:bg-gray-400 my-auto"
              v-for="student of students_filtered" :key="student.id"
              @click="$router.push({ name : 'one-student-profile', params : { sid : student.id }})">
              <div class="w-full text-center">
                {{ student.firstName }} {{ student.lastName }}
              </div>
            </button>
          </div>
        </template>
        <div v-else>
          no hay alumnos registrados en este aula
        </div>

        <div class="flex items-center justify-between border-b-2 border-dashed mx-1 my-3 border-orange-light">
          <p class="text-md py-2 ml-3">Reportes</p>
        </div>



        <button v-if="!showingReports" @click="GenerarReporte" style="display: block;" class="mx-auto px-6 py-2 bg-orange-light border-2 border-solid border-orange-dark cursor-pointer" >Generar</button>
        <div v-else class="grid grid-cols-1 md:grid-cols-1 mb-5">
          <div v-for="(area, index) of areas" v-bind:key="index">
            <div class="mx-5 mt-3 text-xl font-medium hover:bg-opacity-100 duration-300 p-3 rounded-lg rounded-b-none flex justify-between" :class="`bg-opacity-50 bg-${colors[index]}`">
              {{ area.name }}
              <button @click="AreaReportChange(index)" :hidden="!area.open"><i class="fas fa-chevron-up"></i></button>
              <button @click="AreaReportChange(index)" :hidden="area.open"><i class="fas fa-chevron-down"></i></button>
            </div>

            <div v-show="area.open" class="mx-5 p-3 pt-1 rounded-b-lg"  :class="`bg-opacity-25 bg-${colors[index]}`">
              <template v-if="area.reporte == null">
                No hay reportes de esta área. Realice evaluaciones para obtener reportes.
              </template>
              <template v-else>

                <div class="grid grid-cols-3">
                  <div class="flex justify-center my-2">
                    <radial-progress-bar 
                      :diameter="150"
                      :completed-steps="area.score"
                      :total-steps="area.score_objective">
                      Nivel alcanzado<br>
                      <strong>{{ area.score.toFixed(2) }}/{{ area.score_objective }}</strong>
                    </radial-progress-bar>
                  </div>

                  <div class="justify-center my-2">
                    <div 
                      v-for="(d, i) in area.msg" :key="i"
                      class="flex justify-between ml-3 mr-2 py-2 my-1.5 bg-white block hover:bg-gray-400 my-auto cursor-pointer"
                      @click="searchForStudents(d)">
                      <div class="text-left mx-3">
                        <span v-text="d.title"></span><br>
                        
                        <span v-if="d.display==='num'">{{d.value}}/{{d.second_value}}</span>
                        <span v-if="d.display==='pro'">{{d.value}}%</span>
                        <span v-if="d.display==='str'">{{d.value}}</span>
                      </div>
                    </div>
                  </div>

                  <div class="my-2 ">
                    <div class="p-3 pt-1">
                      <line-chart v-if="area.reporte != null" :chartdata="area.reporte" :options="options"></line-chart>
                    </div>
                  </div>

                  

                </div>
              </template>
            </div>

          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import TeacherNavbar      from "@/utils/TeacherNavbar";
import formHandlers       from "@/utils/formHandlers";
import EvaluationForm     from "@/utils/forms/EvaluationForm";
import ExamService        from "@/services/ExamService";
import ClassroomService   from "@/services/ClassroomService";
import StudentService     from "@/services/StudentService";
import RadialProgressBar  from "vue-radial-progress";
import ReportService      from "@/services/ReportService";
import LineChart from "@/utils/LineChart";

import { colors } from '@/utils/colors.json'

const helpers = {
  filter_update : 0,
}

export default {
  name: "ClassroomProfile",
  components: { TeacherNavbar, RadialProgressBar, LineChart },
  props: [
      'id'
  ],
  data: () => ({
    classroom: {
      id: '',
      name: '',
      description: ''
    },
    exams: [],
    students: [],
    students_filtered : [],
    areas : [
      { open : false, score : 0, score_objective : 1, msg : [], reporte : null, name : 'matematica',             },
      { open : false, score : 0, score_objective : 1, msg : [], reporte : null, name : 'ciencias',               },
      { open : false, score : 0, score_objective : 1, msg : [], reporte : null, name : 'lectura',                },
      { open : false, score : 0, score_objective : 1, msg : [], reporte : null, name : 'educación financiera',   },
    ],
    showingReports : false,
    options : {
      responsive: true,
      aspectRatio: 1,
      scales: {
        xAxes: [{
          gridLines: { display: false },
          ticks : {
            autoSkip: false,
            maxRotation: 45,
            minRotation: 45
          }
        }],
        yAxes: [{
          ticks: {
            min: 0, max: 100, callback: value => value + '%',
          }
        }],
      } 
    }
  }),
  computed : {
    colors : () => colors,
  },
  methods: {
    searchForStudents( d ){
      switch (d.type){
        case 'grp':
          this.students_filtered = this.students.filter( s => d.user.includes(s.id));
          break;
        case 'ind':
          this.students_filtered = this.students.filter( s => d.user === s.id);
          break;
      }
    },
    filterStudents( v ){
      clearTimeout(helpers.filter_update);
      helpers.filter_update = setTimeout(()=>{
        const val = v.trim().toUpperCase();
        if(val === '') return this.students_filtered = this.students;

        console.log('FILTERING');
        this.students_filtered = this.students.filter( s =>  (s.firstName + s.lastName).toUpperCase().includes(val));
      }, 500);

    },
    AreaReportChange(index){
      //console.log(index, this.areas[index].open);
      this.areas[index].open = !this.areas[index].open;
    },
    GenerarReporte(){
      this.$swal({
        html: '<div><h1>¿Esta seguro?</h1><p>esta acción puede tardar unos minutos, no continue si no esta seguro de que desea solicitar un reporte</p></div>',
        showCancelButton:   true,
        showConfirmButton:  true,
        confirmButtonText:  'Aceptar',
        cancelButtonText:   'Cancelar',
        showLoaderOnConfirm:true,
        preConfirm : () =>{
          ReportService.getGeneralReportByClassroomId(this.id).then( response => {
            if (response.status !== 200) this.$swal.showValidationMessage("Error al generar reporte");

            if (response.data.every( r => r === null))
              this.$swal('Falló', 'no se han generado reportes debido a que no hay registros de evaluaciones', 'warning');
            else if ( response.data.includes(null))
              this.$swal('Éxito', 'se han generado reportes; sin embargo, puede que algunos esten vacios por falta de registros', 'success');
            else
              this.$swal('Éxito', 'se han generado reportes', 'success');
            
            //console.log(response.data);
            for( const el of response.data) {
              if (el === null) continue;

              console.log(el);
              this.areas[el.areaId - 1].score = el.score;
              this.areas[el.areaId - 1].score_objective = el.score_objective;
              this.areas[el.areaId - 1].msg = el.details;
              
              this.areas[el.areaId - 1].reporte = {
                labels: el.dates.map( d => d.split('T')[0]),
                datasets : [
                  {
                    label: 'Evolución de rendimiento',
                    backgroundColor: ['#27e','#2e2','#ed2','#e62'][el.areaId - 1],
                    data: el.grades.map( g => g.toFixed(2)),
                  }
                ]
              };
            }

            this.showingReports = true;
          }).catch(() => this.$swal.showValidationMessage("Error al generar reporte"));

          return true;
        }
      });
    },
    getClassroom() {
      ClassroomService.getClassroomById(this.id).then((response) => {
        if (response.status === 200) {
          this.classroom = response.data
        }
      }).catch(() => {
        this.$swal('Error', 'El servicio no está disponible', 'error');
      })
    },
    getExams() {
      ExamService.getExamsByClassroom(this.id).then((response) => {
        if (response.status === 200) {
          this.exams = response.data;
        }
      }).catch(() => {
        this.$swal('Error', 'El servicio no está disponible', 'error');
      });
    },
    getStudents() {
      StudentService.getStudentsByClassroom(this.id).then((response) => {
        if (response.status === 200) {
          this.students = response.data;
          this.students_filtered = response.data;
        }
      }).catch(() => {
        this.$swal('Error', 'El servicio no está disponible', 'error');
      })
    },
    addEvaluation() {
      this.$swal({
        html: '<div id="EvaluationForm"></div>',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Crear evaluación',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        willOpen: () => {
          formHandlers.mountVueComponents(EvaluationForm, 'new', null);
        },
        preConfirm: () => {
          return formHandlers.getFormInstance().getValidation().then((validation) => {
            if (!validation) {
              throw new Error('not-required');
            } else {
              const data = formHandlers.destroyVueComponent();
              data.classRoom = Number(this.id);
              ExamService.createExam(data).then((response) => {
                if (response.status === 201) {
                  this.getExams();
                  this.$swal('Éxito', `La evaluación ha sido creada correctamente. La evaluación tiene una duración de ${response.data.duration} minutos.`, 'success');
                }
              }).catch(() => {
                return this.$swal.showValidationMessage("Error al crear evaluación");
              });
            }
          }).catch(() => {
            this.$swal.showValidationMessage("Rellene todos los campos necesarios")
          });
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      });
    },
  },
  created() {
    this.$store.dispatch('setToken');
    this.$store.dispatch('setEducationalInstitution');
    this.getClassroom();
    this.getExams();
    this.getStudents();
  }
}
</script>
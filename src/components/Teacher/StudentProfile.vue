<template>
  <div>
    <TeacherNavbar></TeacherNavbar>
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
        <div class="flex items-center justify-between border-b-2 border-dashed m-1 border-orange-light">
          <p class="text-md py-2 ml-3">Evaluaciones</p>
        </div>
        <div class="mb-5">
          <div v-for="(area, index) of areas" v-bind:key="area.id">
            <div class="mx-5 mt-3 text-xl font-medium bg-orange-light hover:bg-orange bg-opacity-50 duration-300 p-3 rounded-lg rounded-b-none flex justify-between">
              {{ area.name }}
              <button @click="changeAccordionStatus(index)" :hidden="!area.open"><i class="fas fa-chevron-up"></i></button>
              <button @click="changeAccordionStatus(index)" :hidden="area.open"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div v-show="area.open" class="mx-5 bg-orange-light bg-opacity-50 p-3 pt-1 rounded-b-lg">
              <template v-if="area.exams.length < 1">
                No hay exámenes de esta área
              </template>
              <template v-else>
                <div class="flex justify-between ml-3 mr-2 py-2 my-1.5 bg-gray-300 block hover:bg-gray-400 my-auto" v-for="exam of area.exams" :key="exam.id">
                  <div class="text-left mx-3">
                    <!--  <i class="fas fa-stream"></i> --> <!-- lectura -->
                    <i class="fas fa-calculator"></i> <!-- matemática -->
                    <!-- <i class="fas fa-coins"></i> --> <!-- finanzas -->
                    <!-- <i class="fas fa-atom"></i> --> <!-- ciencia -->
                    {{ exam.name }}
                  </div>
                  <div class="text-right mx-3">
                    <button class="button-secondary" @click="startExam(exam)">Comenzar examen</button>
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
import TeacherNavbar from "@/utils/TeacherNavbar";
import StudentService from "@/services/StudentService";
import ExamService from "@/services/ExamService";

export default {
  name: "StudentProfile",
  components: { TeacherNavbar },
  props: [
    'id'
  ],
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
  }),
  methods: {
    changeAccordionStatus(index) {
      this.areas[index].open = !this.areas[index].open;
    },
    getStudent() {
      StudentService.getStudentsById(this.id).then((response) => {
        if (response.status === 200) {
          this.student = response.data;
        }
      }).catch(() => {
        this.$swal('Error', 'El servicio no está disponible', 'error');
      })
    },
    getAreas() {
      ExamService.getAreas().then((response) => {
        if (response.status === 200) {
          response.data.forEach(f => {
            f.open = false;
            f.exams = [];
          });
          this.areas = response.data;
          this.getExams();
        }
      });
    },
    getExams() {
      for (let area of this.areas) {
        ExamService.getExamsByArea(area.id, this.student.classRoomId).then((response) => {
          if (response.status === 200) {
            area.exams = response.data;
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
        <strong>Vencimiento</strong>: ${new Date(exam.expirationDate).toLocaleString()}`,
        title: 'Información de evaluación'
      });
    }
  },
  created() {
    this.$store.dispatch('setToken');
    this.$store.dispatch('setEducationalInstitution');
    this.getStudent();
    this.getAreas();
  },
  computed: {
    fullName: function () {
      return this.student.firstName + ' ' + this.student.lastName;
    }
  }
}
</script>

<style scoped>

</style>
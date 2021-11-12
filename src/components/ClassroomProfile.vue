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
          <button @click="addEvaluation" class="text-right font-extrabold text-xl mr-5 rounded px-1.5 hover:bg-orange-light">+</button>
        </div>
        <div>
          <div class="flex justify-between ml-3 mr-2 py-2 my-1.5 bg-gray-300 block cursor-pointer hover:bg-gray-400 my-auto" v-for="exam of exams" :key="exam.id">
            <div class="text-left mx-3">
              <!--  <i class="fas fa-stream"></i> --> <!-- lectura -->
              <i class="fas fa-calculator"></i> <!-- matemática -->
              <!-- <i class="fas fa-coins"></i> --> <!-- finanzas -->
              <!-- <i class="fas fa-atom"></i> --> <!-- ciencia -->
              {{ exam.name }}
            </div>
            <div class="text-right mx-3">
              {{ exam.expirationDate | moment("from", "now") }}
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between border-b-2 border-dashed mx-1 my-3 border-orange-light">
          <p class="text-md py-2 ml-3">Alumnos del aula</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3">
          <div class="ml-3 mr-2 py-2 my-1.5 bg-gray-300 cursor-pointer hover:bg-gray-400 my-auto" v-for="student of students" :key="student.id" @click="goToStudentProfile(student.id)">
            <div class="w-full text-center">
              {{ student.firstName }} {{ student.lastName }}
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between border-b-2 border-dashed mx-1 my-3 border-orange-light">
          <p class="text-md py-2 ml-3">Reportes</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TeacherNavbar from "@/utils/TeacherNavbar";
import formHandlers from "@/utils/formHandlers";
import EvaluationForm from "@/utils/forms/EvaluationForm";
import ExamService from "@/services/ExamService";
import ClassroomService from "@/services/ClassroomService";
import StudentService from "@/services/StudentService";

export default {
  name: "ClassroomProfile",
  components: { TeacherNavbar },
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
    students: []
  }),
  methods: {
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
          this.students = response.data
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
    goToStudentProfile(studentId) {
      this.$router.push({ name: 'student-profile', params: { id: studentId }})
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

<style scoped>

</style>
<template>
  <div>
    <StudentNavbar></StudentNavbar>
    <section>
      <div class="flex items-center bg-orange-light justify-between border-0">
        <p class="text-lg py-2.5 ml-4">Examen en progreso</p>
        <button @click="finishExam" class="button-secondary mr-1 md:mr-2.5">Finalizar examen</button>
      </div>
      <div>
        <div class="grid border-b-2 border-dashed my-3 border-orange-light">
          <countdown @end="timeout" :time="exam.duration*60*1000" auto-start class="mb-3 md:ml-3 justify-self-center" v-slot="props">
            <radial-progress-bar 
              :diameter="200"
              :completed-steps="(60*exam.duration-props.totalSeconds)"
              :total-steps="exam.duration*60"
              :startColor ="currentColor(exam.duration * 60, props.totalSeconds)"
              :stopColor  ="currentColor(exam.duration * 60, props.totalSeconds)"
              >
              Tiempo restante: <br> <strong>{{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}</strong>
            </radial-progress-bar>
          </countdown>
        </div>
        <div>
          <div v-for="(question, index) of exam.questions" :key="question.id" class="m-3 border-2 border-opacity-60 border-black p-3">
            <strong>Pregunta {{ index + 1 }}:</strong>
            <p>{{ question.description }}</p>
            <div class="grid grid-cols-2 gap-2 md:grid-cols-4 mt-1.5">
              <div v-for="alternative of question.alternatives" :key="alternative.id">
                <input type="radio" :id="alternative.id" :value="alternative.id" v-model="question.picked" class="mr-1.5">
                <label :for="alternative.id">{{ alternative.description }}</label>
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
import ExamService from "@/services/ExamService";
import RadialProgressBar from 'vue-radial-progress'

export default {
  name: "ExamResolution",
  props: ['id'],
  components: {StudentNavbar, RadialProgressBar},
  data: () => ({
    exam: {
      duration: '',
      questions: []
    },
    windowWidth: window.innerWidth,
  }),
  created() {
    this.$store.dispatch('setToken');
    this.$store.dispatch('setUserId');
    ExamService.startExam(this.id).then((response) => {
      if (response.status === 200) {
        response.data.questions.forEach(f => {
          f.picked = null
        });
        this.exam = response.data;
      }
    });
  },
  methods: {
    timeout : function(){
      //s
      if(this.exam.questions.length === 0) return;
      let array = this.exam.questions.map( q => ({
        questionId : q.id,
        alternativeId : q.picked ?? -1,
      }))

      ExamService.finishExam(this.$store.getters.getUserId, this.id, array).then(response => {
        if (response.status === 201) {
          this.$router.push({ name: 'student-exam-finish', params: { finishedExam: response.data }});
        }
      }).catch(() => {
        this.$swal('Error', 'El servicio no está disponible', 'error');
      });
      //s
    },
    currentColor : (t, r) =>['#f66','#dd6','#6f6','#6f6'][Math.floor(4 * r  / t )],
    onResize() {
      this.windowWidth = window.innerWidth
    },
    finishExam() {
      this.$swal({
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Finalizar',
        cancelButtonText: 'Cancelar',
        title: '¿Estás seguro?',
        text: 'No podrás cambiar tus respuestas',
        icon: 'info'
      }).then(result => {
        if (result.isConfirmed) {
          let array = [];
          for (let question of this.exam.questions) {
            array.push({
              questionId: question.id,
              alternativeId: question.picked
            });
          }
          ExamService.finishExam(this.$store.getters.getUserId, this.id, array).then((response) => {
            if (response.status === 201) {
              this.$router.push({ name: 'student-exam-finish', params: { finishedExam: response.data }});
            }
          }).catch(() => {
            this.$swal('Error', 'El servicio no está disponible', 'error');
          });
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  }
}
</script>

<style scoped>

</style>
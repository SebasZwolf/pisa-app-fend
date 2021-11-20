<template>
  <div>
    <StudentNavbar></StudentNavbar>
    <section>
      <div class="flex items-center bg-orange-light justify-between border-0">
        <p class="text-lg py-2.5 ml-4">Resultados de examen</p>
      </div>
      <div class="grid">
        <div class="justify-self-center m-3">
          <radial-progress-bar :diameter="200"
                               :completed-steps="finishedExam.score"
                               :total-steps="finishedExam.maximumScore"
                               :start-color="color">
            Nivel de desempeño:
            <strong class="text-3xl">{{ finishedExam.score }}</strong>/{{ finishedExam.maximumScore }}
          </radial-progress-bar>
        </div>
      </div>
      <div>
        <div class="flex justify-between ml-3 mr-2 py-2 my-1.5 bg-gray-300 block hover:bg-gray-400 my-auto"
             v-for="(question, index) of finishedExam.gradedQuestions" :key="question.id">
          <div class="text-left mx-3">
            Pregunta N°{{ index + 1 }}
          </div>
          <div class="text-right mx-3">
            <i class="fas" :class="question.answeredCorrectly? 'fa-check' : 'fa-times'"></i>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import StudentNavbar from "@/utils/StudentNavbar";
import RadialProgressBar from 'vue-radial-progress'

export default {
  name: "FinishedExam",
  components: {StudentNavbar, RadialProgressBar},
  props: ['finishedExam'],
  data: () => ({
    color: ''
  }),
  created() {
    if (this.finishedExam.score/this.finishedExam.maximumScore > 0.65) {
      this.color = '#8ec840';
    } else if (this.finishedExam.score/this.finishedExam.maximumScore > 0.5 && this.finishedExam.score/this.finishedExam.maximumScore <= 0.65) {
      this.color = '#fcaf5d';
    } else {
      this.color = '#fe0000';
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div class="flex items-center min-h-screen bg-gray-100">
    <div class="container mx-auto">
      <div class="max-w-sm mx-auto my-10 bg-white border-2 border-orange shadow-2xl">
        <div class="text-center py-2 text-black-400 bg-orange">
          Prueba relámpago
          <div class="bg-blue-500 px-1 border-2 shadow-lg">"Dificultad : "{{Math.min(Math.ceil(num / 5), 3)}}</div>
        </div>
        <div class="m-3">
          <div class="grid border-b-2 border-dashed my-3 border-orange-light">
            <countdown :time="questionInfo.duration*60*1000" auto-start class="mb-3 md:ml-3 justify-self-center">
              <template slot-scope="props">
                <radial-progress-bar :diameter="150"
                                     :completed-steps="(60*questionInfo.duration-props.totalSeconds)"
                                     :total-steps="questionInfo.duration*60">
                  Tiempo restante: <br> <strong>{{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}</strong>
                </radial-progress-bar>
              </template>
            </countdown>
          </div>
          <div class="text-justify">
            <strong>Pregunta:</strong> {{ questionInfo.nextQuestion.description }}
          </div>
          <div v-for="alternative of questionInfo.nextQuestion.alternatives" :key="alternative.id"
               class="text-center bg-blue-500 my-1 py-1 cursor-pointer" @click="verifyAnswer(alternative.id)">
            {{ alternative.description }}
          </div>
<!--          <div class="flex justify-center">
            <button class="button-secondary hover:bg-orange-dark hover:text-white mt-1" @click="finishTest">Finalizar</button>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'
import ThunderTestService from "@/services/ThunderTestService";

export default {
  name: "ThunderTestResolution",
  props: ['areaId', 'questionInfo', 'num'],
  components: { RadialProgressBar },
  computed : {
  },
  methods: {
    verifyAnswer(alternativeId) {
      const data = {
        questionId    : this.questionInfo.nextQuestion.id,
        alternativeId : alternativeId,
        iteration     : +this.num
      }

      ThunderTestService.verifyThunderTest(this.questionInfo.id, data).then( response => {

        if (response.status === 201) {
          if (response.data.failed) 
            this.$router.replace({ name: 'thunder-test-finish', params: { areaId: this.areaId, num: this.num, msg : response.data.message }});
          else {
            this.$router.replace({ 
              name: 'thunder-test-start',
              params: { 
                areaId: this.areaId,
                questionInfo: response.data,
                num: (Number(this.num) + 1).toString()}
              }
            );
          }
        }
      });
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="flex items-center min-h-screen bg-gray-100">
    <div class="container mx-auto">
      <div class="max-w-sm mx-auto my-10 bg-white border-2 border-orange shadow-2xl">
        <div class="text-center py-2 text-black-400 bg-orange">
          <div>Test Relámpago</div>
          <div class="px-1 border-2 shadow-lg" :class="`bg-${colors[areaId -1]}`">{{areaId}} - Dificultad : {{Math.min(Math.ceil(num / 5), 3)}}</div>
        </div>
        <div class="m-3">
          <div class="grid border-b-2 border-dashed my-3 border-orange-light" >
            <countdown @end="timeout" :time="questionInfo.duration* 60 * 1000" auto-start class="mb-3 md:ml-3 justify-self-center" v-slot="props">
              <radial-progress-bar 
                :completed-steps="(60 * questionInfo.duration - props.totalSeconds)"
                :diameter   ="150" 
                :total-steps="questionInfo.duration * 60"
                :startColor ="currentColor(questionInfo.duration * 60, props.totalSeconds)"
                :stopColor  ="currentColor(questionInfo.duration * 60, props.totalSeconds)"
                >
                Tiempo restante: <br> <strong>{{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}</strong>
              </radial-progress-bar>
            </countdown>
          </div>
          <div class="text-justify">
            <strong>Pregunta:</strong> {{ questionInfo.nextQuestion.description }}
          </div>
          <div v-for="alternative of questionInfo.nextQuestion.alternatives" :key="alternative.id" :class="`bg-${colors[areaId -1]}`"
              class="text-center my-1 py-1 cursor-pointer" @click="verifyAnswer(alternative.id)">
            {{ alternative.description }}
          </div>
          <a style="display: block; width: fit-content; color: red; letter-spacing: 1px; font-weight: bold; font-size : .9em" class="m-auto mt-4 px-2" href="#" @click="timeout">finalizar</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'
import ThunderTestService from "@/services/ThunderTestService";

import { colors } from '@/utils/colors.json'
console.log(colors);

export default {
  name: "ThunderTestResolution",
  props: ['areaId', 'questionInfo', 'num'],
  components: { RadialProgressBar },
  computed : {
    colors : () => colors,
  },
  methods: {
    timeout : function () {
      this.verifyAnswer(-1);
    },
    currentColor : (t, r) =>['#f66','#dd6','#6f6','#6f6'][Math.floor(4 * r  / t )],
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

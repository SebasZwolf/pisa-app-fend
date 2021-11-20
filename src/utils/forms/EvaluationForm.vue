<template>
  <div class="text-center">
    <ValidationObserver v-slot="{ invalid }" ref="form">
      <form @submit.prevent="getResult" class="grid grid-cols-1 md:grid-cols-2 md:gap-1.5">
        <div> <!-- name -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Nombre
          </label>
          <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
            <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
              <div class="bg-orange w-16 border-0">
                <i class="far fa-user"></i>
              </div>
              <input type="text" name="firstName" required v-model="evaluation.name" :readonly="mode === 'edit'"
                     class="w-full py-2 placeholder-gray-300 border-2 border-l-0 border-orange focus:outline-none focus:ring-indigo-100 focus:border-indigo-300"
              />
            </span>
            <div class="text-sm">
              <span v-for="(error, index) of errors" v-bind:key="index">{{ error }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div> <!-- area -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Tipo de área
          </label>
          <ValidationProvider name="área" rules="required" v-slot="{ errors }">
            <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
              <div class="bg-orange w-16 border-0">
                <i class="far fa-user"></i>
              </div>
              <select v-model="evaluation.area" class="w-full py-2 placeholder-gray-300 border-2 border-l-0 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300">
                <option v-for="area of areas" :key="area.id" :value="area.id">{{ area.name }}</option>
              </select>
            </span>
            <div class="text-sm">
              <span v-for="(error, index) of errors" v-bind:key="index">{{ error }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div class="col-span-1 md:col-span-2"> <!-- description -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Descripción
          </label>
          <ValidationProvider name="descripción" rules="required|alpha_spaces" v-slot="{ errors }">
            <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
              <div class="bg-orange w-16 border-0">
                <i class="far fa-user"></i>
              </div>
              <input type="text" name="description" required v-model="evaluation.description" :readonly="mode === 'edit'"
                     class="w-full py-2 placeholder-gray-300 border-2 border-l-0 border-orange focus:outline-none focus:ring-indigo-100 focus:border-indigo-300"
              />
            </span>
            <div class="text-sm">
              <span v-for="(error, index) of errors" v-bind:key="index">{{ error }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div class="col-span-1 md:col-span-2"> <!-- startDate -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Fecha de inicio
          </label>
          <ValidationProvider name="fecha de expiración" rules="required" v-slot="{ errors }">
            <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
              <div class="bg-orange w-16 border-0">
                <i class="far fa-user"></i>
              </div>
              <input type="datetime-local" name="startDate" required v-model="evaluation.startDate" :readonly="mode === 'edit'"
                     class="w-full py-2 placeholder-gray-300 border-2 border-l-0 border-orange focus:outline-none focus:ring-indigo-100 focus:border-indigo-300"
              />
            </span>
            <div class="text-sm">
              <span v-for="(error, index) of errors" v-bind:key="index">{{ error }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div class="flex items-center justify-between border-b-2 border-dashed m-1 border-orange-light col-span-1 md:col-span-2">
          <p class="text-sm py-2 ml-3">Preguntas</p>
        </div>
        <div> <!-- questionsQuantity -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Cantidad
          </label>
          <ValidationProvider name="cantidad de preguntas" rules="required|min_value:1|max_value:25" v-slot="{ errors }">
            <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
              <div class="bg-orange w-16 border-0">
                <i class="far fa-user"></i>
              </div>
              <input type="number" name="questionsQuantity" required v-model="evaluation.questionsQuantity" :readonly="mode === 'edit'"
                     class="w-full py-2 placeholder-gray-300 border-2 border-l-0 border-orange focus:outline-none focus:ring-indigo-100 focus:border-indigo-300"
              />
            </span>
            <div class="text-sm">
              <span v-for="(error, index) of errors" v-bind:key="index">{{ error }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div> <!-- difficulty -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Dificultad
          </label>
          <ValidationProvider name="dificultad" rules="required|min_value:1|max_value:3" v-slot="{ errors }">
            <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
              <div class="bg-orange w-16 border-0">
                <i class="far fa-user"></i>
              </div>
              <input type="number" name="dificultad" required v-model="evaluation.difficulty" :readonly="mode === 'edit'"
                     class="w-full py-2 placeholder-gray-300 border-2 border-l-0 border-orange focus:outline-none focus:ring-indigo-100 focus:border-indigo-300"
              />
            </span>
            <div class="text-sm">
              <span v-for="(error, index) of errors" v-bind:key="index">{{ error }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div>
          <button type="button" @click="getResult" :disabled="invalid" class="hidden"></button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import ExamService from "@/services/ExamService";

export default {
  name: "EvaluationForm",
  props: {
    mode: String,
    data: null,
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    evaluation: {
      name: '',
      description: '',
      startDate: '',
      classRoom: '',
      area: '',
      difficulty: '',
      questionsQuantity: '',
    },
    areas: [],
    minDate: '',
  }),
  methods: {
    getResult() {
      return this.evaluation;
    },
    async getValidation() {
      return await this.$refs.form.validate();
    },
    initForm() {
      if (this.mode === 'edit') {
        this.evaluation = this.data;
      }
      this.getAreas();
      let date = new Date();
      this.minDate = date.toISOString();
    },
    getAreas() {
      ExamService.getAreas().then((response) => {
        if (response.status === 200) {
          this.areas = response.data;
        }
      });
    }
  },
}
</script>

<style scoped>

</style>
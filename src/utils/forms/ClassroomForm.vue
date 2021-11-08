<template>
  <div class="text-center">
    <ValidationObserver v-slot="{ invalid }" ref="form">
      <form @submit.prevent="getResult">
        <div> <!-- name -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Nombre
          </label>
          <ValidationProvider name="nombre" rules="required" v-slot="{ errors }">
            <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
              <div class="bg-orange w-16">
                <i class="fas fa-file-signature"></i>
              </div>
              <input type="text" name="name" required v-model="classroom.name"
                     class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </span>
            <div class="text-sm">
              <span v-for="(error, index) of errors" v-bind:key="index">{{ error }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div> <!-- description -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Descripción
          </label>
          <ValidationProvider name="descripción" rules="max:250" v-slot="{ errors }">
            <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
              <div class="bg-orange w-16">
                <i class="fas fa-file-signature"></i>
              </div>
              <input type="text" name="description" required v-model="classroom.description"
                     class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
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

export default {
  name: "ClassroomForm",
  props: {
    mode: String,
    data: null,
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    classroom: {
      name: '',
      description: '',
      educationalInstitution: '',
    },
  }),
  methods: {
    getResult() {
      return this.classroom;
    },
    async getValidation() {
      return await this.$refs.form.validate();
    },
    initForm() {
      if (this.mode === 'edit') {
        this.classroom = this.data;
      }
    }
  },
}
</script>

<style scoped>

</style>
<template>
  <div class="text-center">
    <ValidationObserver v-slot="{ invalid }" ref="form">
      <form @submit.prevent="getResult" class="grid grid-cols-1 md:grid-cols-2 md:gap-1.5">
        <div> <!-- firstName -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Nombre
          </label>
          <ValidationProvider name="nombre" rules="required|alpha" v-slot="{ errors }">
            <span class="flex items-center leading-normal border-0 text-3xl text-gray-600">
              <div class="bg-orange px-3">
                <i class="far fa-user"></i>
              </div>
              <input type="text" name="firstName" required v-model="teacher.firstName"
                     class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </span>
            <div class="text-sm">
              <span v-for="(error, index) of errors" v-bind:key="index">{{ error }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div> <!-- lastName -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Apellidos
          </label>
          <ValidationProvider name="apellidos" rules="required|alpha" v-slot="{ errors }">
            <span class="flex items-center leading-normal border-0 text-3xl text-gray-600">
              <div class="bg-orange px-3">
                <i class="far fa-user"></i>
              </div>
              <input type="text" name="lastName" required v-model="teacher.lastName"
                     class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </span>
            <div class="text-sm">
              <span v-for="(error, index) of errors" v-bind:key="index">{{ error }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div> <!-- email -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Correo electrónico</label>
          <ValidationProvider name="correo electrónico" rules="required|email" v-slot="{ errors }">
            <span class="flex items-center leading-normal border-0 text-3xl text-gray-600">
              <div class="bg-orange px-3">
                <i class="fas fa-envelope"></i>
              </div>
              <input type="text" name="email" required v-model="teacher.email"
                     class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </span>
            <div class="text-sm">
              <span v-for="(error, index) of errors" v-bind:key="index">{{ error }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div> <!-- username -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Usuario</label>
          <ValidationProvider name="usuario" rules="required" v-slot="{ errors }">
              <span class="flex items-center leading-normal border-0 text-3xl text-gray-600">
                <div class="bg-orange px-3">
                  <i class="fas fa-user-circle"></i>
                </div>
                <input type="text" name="username" required v-model="teacher.username"
                       class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
              </span>
            <div class="text-sm">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div v-if="mode === 'new'"> <!-- password -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Contraseña</label>
          <ValidationProvider name="contraseña" rules="required_if:mode,new|min:8" vid="confirmation" v-slot="{ errors }">
            <span class="flex items-center leading-normal border-0 text-3xl text-gray-600">
              <div class="bg-orange px-3">
                <i class="fas fa-key"></i>
              </div>
              <input type="password" name="password" :required="mode === 'new'" v-model="teacher.password"
                     class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </span>
            <div class="text-sm">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div v-if="mode === 'new'"> <!-- confirmation password -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Confirme contraseña</label>
          <ValidationProvider name="confirmación de contraseña" rules="required_if:mode,new|confirmed:confirmation|min:8" v-slot="{ errors }">
            <span class="flex items-center leading-normal border-0 text-3xl text-gray-600">
              <div class="bg-orange px-3">
                <i class="fas fa-key"></i>
              </div>
              <input type="password" name="confirmPassword" :required="mode === 'new'" v-model="confirmationPassword"
                     class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </span>
            <div class="text-sm">
              <span v-for="(error, index) of errors" v-bind:key="index">{{ error }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div>
          <button type="button" @click="getValidation" :disabled="invalid" class="hidden"></button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: "TeacherForm",
  props: {
    mode: String,
    data: null,
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    teacher: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      educationalInstitution: '',
    },
    confirmationPassword: '',
  }),
  methods: {
    getResult() {
      return this.teacher;
    },
    async getValidation() {
      return await this.$refs.form.validate();
    },
    initForm() {
      if (this.mode === 'edit') {
        this.teacher = this.data;
      }
    }
  },
}
</script>

<style scoped>

</style>
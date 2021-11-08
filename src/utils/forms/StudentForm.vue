<template>
  <div class="text-center">
    <ValidationObserver v-slot="{ invalid }" ref="form">
      <form @submit.prevent="getResult" class="grid grid-cols-1 md:grid-cols-2 md:gap-1.5">
        <div> <!-- firstName -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Nombre
          </label>
          <ValidationProvider name="nombre" rules="required|alpha_spaces" v-slot="{ errors }">
            <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
              <div class="bg-orange w-16 border-0">
                <i class="far fa-user"></i>
              </div>
              <input type="text" name="firstName" required v-model="student.firstName"
                     class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring-indigo-100 focus:border-indigo-300"
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
          <ValidationProvider name="apellidos" rules="required|alpha_spaces" v-slot="{ errors }">
            <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
              <div class="bg-orange w-16">
                <i class="far fa-user"></i>
              </div>
              <input type="text" name="lastName" required v-model="student.lastName"
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
            <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
              <div class="bg-orange w-16">
                <i class="fas fa-envelope"></i>
              </div>
              <input type="text" name="email" required v-model="student.email"
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
              <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
                <div class="bg-orange w-16">
                  <i class="fas fa-user-circle"></i>
                </div>
                <input type="text" name="username" required v-model="student.username"
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
            <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
              <div class="bg-orange w-16">
                <i class="fas fa-key"></i>
              </div>
              <input type="password" name="password" :required="mode === 'new'" v-model="student.password"
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
            <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
              <div class="bg-orange w-16">
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
        <div class="col-span-1 md:col-span-2">
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Aula</label>
          <ValidationProvider name="aula" rules="required" v-slot="{ errors }">
            <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
              <div class="bg-orange w-16">
                <i class="fas fa-book-reader"></i>
              </div>
              <select v-model="student.classRoom" class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300">
                <option v-for="classroom of classrooms" :key="classroom.id" :value="classroom.id">{{ classroom.name }}</option>
              </select>
            </span>
            <div class="text-sm">
              <span>{{ errors[0] }}</span>
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
import ClassroomService from "@/services/ClassroomService";

export default {
  name: "StudentForm",
  props: {
    mode: String,
    data: null,
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    student: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      classRoom: '',
    },
    confirmationPassword: '',
    educationalInstitution: '',
    classrooms: [],
  }),
  methods: {
    getResult() {
      return this.student;
    },
    async getValidation() {
      return await this.$refs.form.validate();
    },
    initForm() {
      if (this.mode === 'edit') {
        this.student = {...this.data.student};
        this.student.classRoom = this.data.student.classRoomId;
        this.educationalInstitution = Number(this.data.educationalInstitution);
      } else {
        this.educationalInstitution = Number(this.data);
      }
      this.getClassrooms();
    },
    getClassrooms() {
      ClassroomService.getClassroomByInstitution(this.educationalInstitution).then((response) => {
        if (response.status === 200) {
          this.classrooms = response.data;
        }
      }).catch(() => {
        this.$swal('Error', 'El servicio no está disponible', 'error');
      });
    },
  }
}
</script>

<style scoped>

</style>
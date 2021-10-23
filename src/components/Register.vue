<template>
  <div class="flex items-center min-h-screen bg-gray-100">
    <div class="container mx-auto">
      <div class="max-w-sm mx-auto my-10 bg-white border-2 border-orange shadow-2xl">
        <div class="text-center py-2 text-black-400 bg-orange">
          Registro de cuenta
        </div>
        <div class="m-3">
          <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="register">
              <div class="mb-6"> <!-- username -->
                <label for="username" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Usuario</label>
                <ValidationProvider name="usuario" rules="required" v-slot="{ errors }">
                  <span class="flex items-center leading-normal border-0 text-3xl text-gray-600">
                    <div class="bg-orange px-3">
                      <i class="fas fa-user-circle"></i>
                    </div>
                    <input type="text" name="username" required v-model="newUser.username"
                      class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </span>
                  <div class="text-md">
                    <span>{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div class="mb-6"> <!-- first name -->
                <label for="firstName" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Nombre</label>
                <ValidationProvider name="nombre" rules="required|alpha" v-slot="{ errors }">
                  <span class="flex items-center leading-normal border-0 text-3xl text-gray-600">
                    <div class="bg-orange px-3">
                      <i class="far fa-user"></i>
                    </div>
                    <input type="text" name="firstName" required v-model="newUser.firstName"
                      class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </span>
                  <div class="text-md">
                    <span v-for="(error, index) of errors" v-bind:key="index">{{ error }}</span> 
                  </div>
                </ValidationProvider>
              </div>
              <div class="mb-6"> <!-- last name -->
                <label for="lastName" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Apellidos</label>
                <ValidationProvider name="apellidos" rules="required|alpha" v-slot="{ errors }">
                  <span class="flex items-center leading-normal border-0 text-3xl text-gray-600">
                    <div class="bg-orange px-3">
                      <i class="far fa-user"></i>
                    </div>
                    <input type="text" name="lastName" required v-model="newUser.lastName"
                      class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </span>
                  <div class="text-md">
                    <span v-for="(error, index) of errors" v-bind:key="index">{{ error }}</span> 
                  </div>
                </ValidationProvider>
              </div>
              <div class="mb-6"> <!-- email -->
                <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Correo electrónico</label>
                <ValidationProvider name="correo electrónico" rules="required|email" v-slot="{ errors }">
                  <span class="flex items-center leading-normal border-0 text-3xl text-gray-600">
                    <div class="bg-orange px-3">
                      <i class="fas fa-envelope"></i>
                    </div>
                    <input type="text" name="email" required v-model="newUser.email"
                      class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </span>
                  <div class="text-md">
                    <span v-for="(error, index) of errors" v-bind:key="index">{{ error }}</span> 
                  </div>
                </ValidationProvider>
              </div>
              <div class="mb-6"> <!-- password -->
                <label for="password" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Contraseña</label>
                <ValidationProvider name="contraseña" rules="required|min:8" vid="confirmation" v-slot="{ errors }">
                  <span class="flex items-center leading-normal border-0 text-3xl text-gray-600">
                    <div class="bg-orange px-3">
                      <i class="fas fa-key"></i>
                    </div>
                    <input type="password" name="password" required v-model="newUser.password"
                      class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </span>
                  <div class="text-md">
                    <span>{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div class="mb-6"> <!-- confirmation password -->
                <label for="confirmPassword" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Confirme contraseña</label>
                <ValidationProvider name="confirmación de contraseña" rules="required|confirmed:confirmation|min:8" v-slot="{ errors }">
                  <span class="flex items-center leading-normal border-0 text-3xl text-gray-600">
                    <div class="bg-orange px-3">
                      <i class="fas fa-key"></i>
                    </div>
                    <input type="password" name="confirmPassword" required v-model="confirmationPassword"
                      class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </span>
                  <div class="text-md">
                    <span v-for="(error, index) of errors" v-bind:key="index">{{ error }}</span> 
                  </div>
                </ValidationProvider>
              </div>
              <div class="mb-6"> <!-- key -->
                <label for="newUserCode" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Código de nuevo usuario</label>
                <ValidationProvider name="código de nuevo usuario" rules="required" v-slot="{ errors }">
                  <span class="flex items-center leading-normal border-0 text-3xl text-gray-600">
                    <div class="bg-orange px-3">
                      <i class="fas fa-lock"></i>
                    </div>
                    <input type="text" name="newUserCode" required v-model="newUser.key"
                      class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </span>
                  <div class="text-md">
                    <span>{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div class="mb-6"> <!-- educational institution name -->
                <label for="educationalInstitutionName" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Nombre de la institución educativa</label>
                <ValidationProvider name="institución educativa" rules="required" v-slot="{ errors }">
                  <span class="flex items-center leading-normal border-0 text-3xl text-gray-600">
                    <div class="bg-orange px-3">
                      <i class="fas fa-graduation-cap"></i>
                    </div>
                    <input type="text" name="educationalInstitutionName" required @click="openEducationalInstitutionsDialog" v-model="educationalInstitutionName" readonly
                      class="w-full py-2 placeholder-gray-300 border-2 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </span>
                  <div class="text-md">
                    <span>{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div class="mb-6">
                <button type="button" @click="register" :disabled="invalid" :class="invalid ? 'button-primary-disabled w-full my-3' : 'button-primary w-full my-3'">Crear cuenta</button>
              </div>
            </form>
          </ValidationObserver>
          <div class="mb-6 text-center underline">
            <p class="cursor-pointer" @click="goBack">Cancelar</p>
          </div>
        </div>
        <div class="bg-orange text-right text-xl">
          <i class="fab fa-facebook-square mr-2"></i>
          <i class="fab fa-instagram-square mr-2"></i>
          <i class="fab fa-twitter-square mr-2"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ValidationProvider, ValidationObserver } from 'vee-validate';
  import ProfileService from '../services/ProfileService';
  import AuthService from '../services/AuthService';

  export default {
    name: "Register",
    components: {
      ValidationProvider,
      ValidationObserver
    },
    data: () => ({
      newUser: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        key: '',
        educationalInstitution: '',
      },
      confirmationPassword: '',
      educationalInstitutionName: '',
      educationalInstitutions: [],
    }),
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      openEducationalInstitutionsDialog() {
        ProfileService.getPreregisteredEducationalInstitutions().then((response) => {
          this.educationalInstitutions = response.data;
          const options = this.educationalInstitutions.reduce((a, x) => ({...a, [x.id]: x.name}), {});
          this.$swal({
            title: 'Seleccione una institución',
            icon: 'info',
            showCloseButton: false,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            width: '48rem',
            input: 'radio',
            inputOptions: options,
            inputValidator: (value) => {
              if (value) {
                this.newUser.educationalInstitution = Number(value);
                this.educationalInstitutionName = options[value];
              } else {
                return "Debes escoger una institución para registrarte"
              }
            }
          });
        });
      },
      register() {
        AuthService.createFirstUser(this.newUser).then((response) => {
          if (response.status == 201) {
            this.$swal('La cuenta ha sido creada exitosamente', '', 'success');
            this.$router.push('login');
          }
        }).catch((error) => {
          if (error.response.status == 400) {
            this.$swal('El código proporcionado no pertenece a ninguna institución', '', 'error');
          }
        });
      },
    }
  }
</script>

<style>
  .swal2-radio {
    display: grid !important;
  }
</style>
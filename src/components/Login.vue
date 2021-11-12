<template>
  <div class="flex items-center min-h-screen bg-gray-100">
    <div class="container mx-auto">
      <div class="max-w-sm mx-auto my-10 bg-white border-2 border-orange shadow-2xl">
        <div class="text-center py-2 text-black-400 bg-orange">
          Inicio de sesión
        </div>
        <div class="m-3">
          <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="login">
              <div class="mb-6">
                <label class="block mb-2 text-sm text-gray-600">Usuario</label>
                <ValidationProvider name="usuario" rules="required" v-slot="{ errors }">
                  <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
                    <div class="bg-orange px-3">
                      <i class="fas fa-user-circle"></i>
                    </div>
                    <input type="text" name="username" required v-model="userData.username"
                      class="w-full py-2 placeholder-gray-300 border-2 border-l-0 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </span>
                  <div class="text-md">
                    <span>{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div class="mb-6">
                <label class="block mb-2 text-sm text-gray-600">Contraseña</label>
                <ValidationProvider name="contraseña" rules="required" v-slot="{ errors }">
                  <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
                    <div class="bg-orange px-3">
                      <i class="fas fa-key"></i>
                    </div>
                    <input type="password" name="password" required v-model="userData.password"
                      class="w-full py-2 placeholder-gray-300 border-2 border-l-0 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </span>
                  <div class="text-md">
                    <span>{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div class="mb-6">
                <button @click="login" type="button" :disabled="invalid" :class="invalid ? 'button-primary-disabled w-full my-3' : 'button-primary w-full my-3'">Ingresar</button>
              </div>
            </form>
          </ValidationObserver>
          <div class="mb-6 text-center underline">
            <p class="cursor-pointer" @click="register">Registrar cuenta nueva</p>
            <p class="cursor-pointer" @click="goBack">Regresar</p>
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
  import AuthService from '../services/AuthService';
  import UserService from "@/services/UserService";
  import { ValidationProvider, ValidationObserver } from 'vee-validate';
  import jwtDecode from 'jwt-decode';

  export default {
    name: "Login",
    components: {
      ValidationProvider,
      ValidationObserver
    },
    data: () => ({
      userData: {
        username: '',
        password: ''
      }
    }),
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      register() {
        this.$router.push('register');
      },
      login() {
        AuthService.login(this.userData).then((response) => {
          const decodedToken = jwtDecode(response.data.token);
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('userId', decodedToken.userId);
          this.$store.dispatch('setToken');
          this.$store.dispatch('setUserId');
          this.getUserInfo();
          this.$swal({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: false,
            icon: 'success',
            title: 'Inicio de sesión correcto'
          }).then(() => {
            switch (this.$store.getters.getUserRole) {
              case 'student':
                this.$router.push('student');
                break;
              case 'teacher':
                this.$router.push('teacher');
                break;
              case 'admin':
                break;
            }
          });
        }).catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              this.$swal('Contraseña incorrecta', '', 'warning');
            }
            if (error.response.status === 404) {
              this.$swal('El usuario no existe', '', 'warning');
            }
          }
        });
      },
      getUserInfo() {
        UserService.getUserById(this.$store.getters.getUserId).then((response) => {
          sessionStorage.setItem('userRole', response.data.role);
          this.$store.dispatch('setUserRole');
        }).catch((error) => {
          this.$swal('Error del servicio', error, 'error');
        });
      }
    }
  }


</script>

<style>

</style>

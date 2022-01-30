<template>
  <div class="flex items-center min-h-screen bg-gray-100">
    <div class="container mx-auto">
      <div class="max-w-sm mx-auto my-10 bg-white border-2 border-orange shadow-2xl">
        <img src="http://atrilco.com/wp-content/uploads/2017/11/ef3-placeholder-image.jpg" width="250px" height="100px">
        <div class="text-center py-2 text-black-400 bg-orange">
          Bienvenido
        </div>
        <h1 class="text-black-600 font-bold font-sans text-center text-xl my-3">Másteri</h1>
        <div class="mx-5">
          <button @click="toLogin" type="button" class="button-primary w-full my-3">Ingresar</button>
          <button @click="toThunderTest" type="button" class="button-primary w-full my-1">Prueba relámpago</button>
        </div>
        <div class="my-12"></div>
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
  import '@fortawesome/fontawesome-free/js/all.js';

  export default {
    name: "Home",
    methods: {
      toLogin() {
        this.$router.push('login');
      },
      toThunderTest() {
        this.$router.push('thunder-test');
      }
    }
  }
</script>

<style scoped>

</style>

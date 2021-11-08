<template>
  <nav class="flex w-full items-center justify-between px-6 h-16 bg-orange text-gray-700 border-b border-gray-200 z-10">
    <div class="flex items-center"> <!-- button to open the sidebar -->
      <button class="mr-2" @click="drawer">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-8 h-8">
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <p class="text-2xl pl-3">Masteri</p>
    </div>
    <div class="flex items-center"> <!-- buttons on the right -->
      <div class="hidden md:block md:flex md:justify-between md:bg-transparent">
        <button class="flex items-center p-3 font-medium mr-2 text-center bg-orange rounded hover:bg-white focus:outline-none focus:bg-white">
          <span><i class="fas fa-user"></i></span>
          <span class="mx-2">{{ name }}</span>
        </button>
      </div>
      <div class="hidden md:block md:flex md:justify-between md:bg-transparent">
        <button class="flex items-center p-3 font-medium mr-2 text-center bg-orange rounded hover:bg-white focus:outline-none focus:bg-white">
          <span><i class="fas fa-cog"></i></span>
        </button>
      </div>
      <div class="hidden md:block md:flex md:justify-between md:bg-transparent">
        <button @click="signOut" class="flex items-center p-3 font-medium mr-2 text-center bg-orange rounded hover:bg-white focus:outline-none focus:bg-white">
          <i class="fas fa-power-off"></i>
        </button>
      </div>
    </div>
    <transition enter-class="opacity-0" enter-active-class="ease-out transition-medium" enter-to-class="opacity-100" leave-class="opacity-100" leave-active-class="ease-out transition-medium" leave-to-class="opacity-0">
      <div @keydown.esc="isOpen = false" v-show="isOpen" class="z-10 fixed inset-0 transition-opacity">
        <div @click="isOpen = false" class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
      </div>
    </transition>
    <!-- buttons on left side -->
    <aside class="transform top-0 left-0 w-64 bg-orange-light fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30" :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
      <span @click="isOpen = false" class="flex w-full items-center p-4 border-b">
        <span class="text-3xl mx-auto">
          <i class="fas fa-landmark"></i>
        </span>
      </span>
      <span @click="isOpen = false; home" class="flex items-center p-4 hover:bg-white">
        <span class="mr-2">
          <i class="fas fa-home"></i>
        </span>
        <span>Inicio</span>
      </span>
      <span @click="isOpen = false" class="flex items-center p-4 hover:bg-white">
        <span class="mr-2">
          <i class="fas fa-user-circle"></i>
        </span>
        <span>Perfil</span>
      </span>
      <span @click="isOpen = false" class="flex items-center p-4 hover:bg-white">
        <span class="mr-2">
          <i class="fas fa-book-open"></i>
        </span>
        <span>Material</span>
      </span>
      <span @click="isOpen = false" class="flex items-center p-4 hover:bg-white">
        <span class="mr-2">
          <i class="fas fa-bolt"></i>
        </span>
        <span>Test relámpago</span>
      </span>
      <span @click="isOpen = false" class="flex items-center p-4 md:hidden block hover:bg-white">
        <span class="mr-2">
          <i class="fas fa-cog"></i>
        </span>
        <span>Configuración</span>
      </span>
      <span @click="signOut" class="flex items-center p-4 md:hidden block hover:bg-white">
        <span class="mr-2">
          <i class="fas fa-power-off"></i>
        </span>
        <span>Cerrar sesión</span>
      </span>
      <!--<div class="fixed bottom-0 w-full">
      Bottom buttons
      </div>-->
    </aside>
  </nav>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  name: "StudentNavbar",
  data: () => ({
    isOpen: false,
    name: String
  }),
  methods: {
    drawer() {
      this.isOpen = !this.isOpen
    },
    home() {
      this.$router.push({ name: 'student-home' });
    },
    signOut() {
      this.isOpen = false;
      this.$swal({
        title: '¿Cerrar sesión?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          sessionStorage.clear()
          this.$router.push({ name: 'home' });
        }
      });
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (e.code === 'Escape' && this.isOpen) this.isOpen = false; // modern browsers
    });
  },
  created() {
    this.$store.dispatch('setToken');
    this.$store.dispatch('setUserId');
    UserService.getUserById(this.$store.getters.getUserId).then((response) => {
      if (response.status === 200) {
        this.name = `${response.data.firstName} ${response.data.lastName}`;
      }
    }).catch(() => {
      this.$swal('Error', 'El servicio no está disponible', 'error');
    })
  }
}
</script>

<style scoped>

</style>

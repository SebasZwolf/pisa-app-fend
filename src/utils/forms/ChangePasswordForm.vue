<template>
  <div class="text-center">
    <ValidationObserver v-slot="{ invalid }" ref="form">
      <form @submit.prevent="getResult">
        <div> <!-- password -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Contraseña</label>
          <ValidationProvider name="contraseña" rules="required|min:8" vid="confirmation" v-slot="{ errors }">
            <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
              <div class="bg-orange w-16">
                <i class="fas fa-key"></i>
              </div>
              <input type="password" name="password" required v-model="user.password"
                     class="w-full py-2 placeholder-gray-300 border-2 border-l-0 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </span>
            <div class="text-sm">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div> <!-- confirmation password -->
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Confirme contraseña</label>
          <ValidationProvider name="confirmación de contraseña" rules="required|confirmed:confirmation|min:8" v-slot="{ errors }">
            <span class="flex items-center leading-extra-snug border-0 text-3xl text-gray-600 focus-within:outline-none focus-within:ring focus-within:ring-indigo-100 focus-within:border-indigo-300">
              <div class="bg-orange w-16">
                <i class="fas fa-key"></i>
              </div>
              <input type="password" name="confirmPassword" required v-model="confirmationPassword"
                     class="w-full py-2 placeholder-gray-300 border-2 border-l-0 border-orange focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
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
export default {
  name: "ChangePasswordForm",
  props: {
    mode: null,
  },
  data: () => ({
    user: {
      password: '',
    },
    confirmationPassword: '',
  }),
  methods: {
    getResult() {
      return this.user;
    },
    async getValidation() {
      return await this.$refs.form.validate();
    },
    initForm() {
      this.mode = null
    }
  }
}
</script>

<style scoped>

</style>
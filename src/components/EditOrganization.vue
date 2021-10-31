<template>
  <div>
    <TeacherNavbar></TeacherNavbar>
    <section>
      <div class="flex items-center bg-orange-light justify-between border-0">
        <p class="text-lg py-2.5 ml-4">Resumen organizacional</p>
        <button @click="goToOrganization" class="button-secondary text-right mr-2.5 truncate">Volver a vista general</button>
      </div>
      <div> <!-- Teachers table -->
        <div class="flex items-center justify-between border-b-2 border-dashed m-1">
          <p class="text-md py-2 ml-3">Docentes</p>
          <button @click="newTeacherModal" class="text-right font-extrabold text-xl mr-5 rounded px-1.5 hover:bg-orange-light">+</button>
        </div>
        <div class="md:mx-10 my-4 mx-0">
          <table class="table-fixed w-full">
            <thead>
              <tr class="bg-orange-light">
                <th class="w-1/12 border-2 truncate">#</th>
                <th class="w-1/2 border-2 truncate">Docente</th>
                <th class="w-1/4 border-2 truncate">Usuario</th>
                <th class="w-1/6 border-2 truncate">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-for="(teacher, index) of teachers" :key="teacher.id">
                <td class="truncate">{{ index + 1 }}</td>
                <td class="truncate">{{ teacher.firstName + ' ' + teacher.lastName }}</td>
                <td class="truncate">{{ teacher.username }}</td>
                <td class="truncate">
                  <span class="mr-0.5 md:mr-2 cursor-pointer" @click="teacherProfileModal(teacher)"><i class="fas fa-address-card"></i></span>
                  <span class="mr-0.5 md:mr-2 cursor-pointer" @click="changePassword(teacher)"><i class="fas fa-key"></i></span>
                  <span class="cursor-pointer" @click="deleteTeacher(teacher)"><i class="fas fa-times"></i></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div> <!-- Students table -->
        <div class="flex items-center justify-between border-b-2 border-dashed m-1">
          <p class="text-md py-2 ml-3">Alumnos</p>
          <button class="text-right font-extrabold text-xl mr-5 rounded px-1.5 hover:bg-orange-light">+</button>
        </div>
        <div class="md:mx-10 my-4 mx-0">
          <table class="table-fixed w-full">
            <thead>
            <tr class="bg-orange-light">
              <th class="w-1/12 border-2 truncate">#</th>
              <th class="w-1/3 border-2 truncate">Alumno</th>
              <th class="w-1/4 border-2 truncate">Usuario</th>
              <th class="w-1/6 border-2 truncate">Aula</th>
              <th class="w-1/6 border-2 truncate">Opciones</th>
            </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-for="(student, index) of students" :key="student.id">
                <td class="truncate">{{ index + 1 }}</td>
                <td class="truncate">{{ student.firstName + ' ' + student.lastName }}</td>
                <td class="truncate">{{ student.username }}</td>
                <td class="truncate">{{ student.classRoom }}</td>
                <td class="truncate">
                  <span class="px-2 cursor-pointer"><i class="fas fa-redo-alt"></i></span>
                  <span class="cursor-pointer"><i class="fas fa-times"></i></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div> <!-- Classrooms table -->
        <div class="flex items-center justify-between border-b-2 border-dashed m-1">
          <p class="text-md py-2 ml-3">Aulas</p>
          <button @click="newClassroomModal" class="text-right font-extrabold text-xl mr-5 rounded px-1.5 hover:bg-orange-light">+</button>
        </div>
        <div class="md:mx-10 my-4 mx-0">
          <table class="table-fixed w-full">
            <thead>
            <tr class="bg-orange-light truncate">
              <th class="w-1/12 border-2 truncate">#</th>
              <th class="w-1/4 border-2 truncate">Aula</th>
              <th class="w-1/2 border-2 truncate">Descripción</th>
              <th class="w-1/6 border-2 truncate">Opciones</th>
            </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-for="(classroom, index) of classrooms" :key="classroom.id">
                <td class="truncate">{{ index + 1 }}</td>
                <td class="truncate">{{ classroom.name }}</td>
                <td class="truncate">{{ classroom.description }}</td>
                <td class="truncate">
                  <span class="pr-2 cursor-pointer"><i class="fas fa-user-plus"></i></span>
                  <span class="pr-2 cursor-pointer"><i class="fas fa-redo-alt"></i></span>
                  <span class="cursor-pointer"><i class="fas fa-times"></i></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TeacherNavbar from "@/utils/TeacherNavbar";
import Vue from "vue";
import TeacherForm from "@/utils/forms/TeacherForm";
import TeacherService from "@/services/TeacherService";
import ChangePasswordForm from "@/utils/forms/ChangePasswordForm";
import UserService from "@/services/UserService";
import ClassroomForm from "@/utils/forms/ClassroomForm";
import ClassroomService from "@/services/ClassroomService";

export default {
  name: "EditOrganization",
  components: {
    TeacherNavbar,
  },
  data: () => ({
    teachers: [],
    students: [],
    classrooms: [],
    vueFormInstance: null,
  }),
  methods: {
    getTeachers() {
      TeacherService.getTeachersByInstitution(this.$store.getters.getEducationalInstitution).then((response) => {
        if (response.status === 200) {
          this.teachers = response.data;
        }
      }).catch(() => {
        this.$swal('Error', 'El servicio no está disponible', 'error');
      })
    },
    getClassrooms() {
      ClassroomService.getClassroomByInstitution(this.$store.getters.getEducationalInstitution).then((response) => {
        if (response.status === 200) {
          this.classrooms = response.data;
        }
      }).catch(() => {
        this.$swal('Error', 'El servicio no está disponible', 'error');
      });
    },
    goToOrganization() {
      this.$router.push({ name: 'organization' });
    },
    mountVueComponent(comp, mode, data) {
      let Component = Vue.extend(comp);
      this.vueFormInstance = new Component({
        propsData: { mode: mode, data: data },
      });
      this.vueFormInstance.$mount();
      this.vueFormInstance.initForm();
      document.getElementById(comp.name).appendChild(this.vueFormInstance.$el);
    },
    destroyVueComponent() {
      const data = this.vueFormInstance.getResult();
      this.vueFormInstance.$destroy();
      this.vueFormInstance = null;
      return data;
    },
    // All
    changePassword(user) {
      this.$swal({
        html: '<div id="ChangePasswordForm"></div>',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Cambiar contraseña',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        willOpen: () => {
          this.mountVueComponent(ChangePasswordForm, '', null);
        },
        preConfirm: () => {
          this.vueFormInstance.getValidation().then((validation) => {
            if (!validation) {
              return this.$swal.showValidationMessage("Rellene todos los campos necesarios");
            } else {
              const data = this.destroyVueComponent();
              UserService.changeUserPassword(user.id, data).then((response) => {
                return response.data;
              }).catch(() => {
                return this.$swal.showValidationMessage("Error al cambiar la contraseña");
              });
            }
          });
        },
        allowOutsideClick: () => this.$swal.isLoading()
      }).then((result) => {
        if (result.value) {
          this.$swal('Éxito', 'La contraseña ha sido cambiada correctamente', 'success');
        }
      });
    },
    // Teacher methods
    newTeacherModal() {
      this.$swal({
        html: '<div id="TeacherForm"></div>',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Crear profesor',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        willOpen: () => {
          this.mountVueComponent(TeacherForm, 'new', null);
        },
        preConfirm: () => {
          return this.vueFormInstance.getValidation().then((validation) => {
            if (!validation) {
              throw new Error('not-required');
            } else {
              const data = this.destroyVueComponent();
              data.educationalInstitution = Number(this.$store.getters.getEducationalInstitution);
              TeacherService.createTeacher(data).then((response) => {
                if (response.status === 201) {
                  this.getTeachers();
                  this.$swal('Éxito', 'Profesor ha sido creado correctamente', 'success');
                }
              }).catch(() => {
                return this.$swal.showValidationMessage("Error al crear profesor");
              });
            }
          }).catch(() => {
            this.$swal.showValidationMessage("Rellene todos los campos necesarios")
          });
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      });
    },
    teacherProfileModal(data) {
      this.$swal({
        html: '<div id="TeacherForm"></div>',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        showLoaderOnConfirm: true,
        willOpen: () => {
          this.mountVueComponent(TeacherForm, 'edit', data);
        },
        preConfirm: () => {
          this.vueFormInstance.getValidation().then((validation) => {
            if (!validation) {
              return this.$swal.showValidationMessage("Rellene todos los campos necesarios");
            } else {
              const data = this.destroyVueComponent();
              data.educationalInstitution = Number(this.$store.getters.getEducationalInstitution);
              /*TeacherService.createTeacher(data).then((response) => {
                if (response.status === 201) {
                  return response.status;
                }
              }).catch(() => {
                return this.$swal.showValidationMessage("Error al editar profesor");
              });*/
            }
          });
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      });
    },
    deleteTeacher(teacher) {
      this.$swal({
        title: '¿Está seguro?',
        text: `Se eliminará al profesor ${teacher.firstName} ${teacher.lastName}.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          TeacherService.deleteTeacher(teacher.id).then((response) => {
            if (response.status === 200) {
              this.$swal('Éxito', 'Profesor ha sido eliminado correctamente', 'success').then(() => {
                this.getTeachers();
              });
            }
          });
        }
      });
    },
    // Classroom methods
    newClassroomModal() {
      this.$swal({
        html: '<div id="ClassroomForm"></div>',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Crear aula',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        willOpen: () => {
          this.mountVueComponent(ClassroomForm, 'new', null);
        },
        preConfirm: () => {
          return this.vueFormInstance.getValidation().then((validation) => {
            if (!validation) {
              throw new Error('not-required');
            } else {
              const data = this.destroyVueComponent();
              data.educationalInstitution = Number(this.$store.getters.getEducationalInstitution);
              ClassroomService.createClassroom(data).then((response) => {
                if (response.status === 201) {
                  this.getClassrooms();
                  this.$swal('Éxito', 'Aula ha sido creada correctamente', 'success');
                }
              }).catch(() => {
                return this.$swal.showValidationMessage("Error al crear aula");
              });
            }
          }).catch(() => {
            this.$swal.showValidationMessage("Rellene todos los campos necesarios")
          });
        },
      });
    },
  },
  created() {
    this.$store.dispatch('setToken');
    this.$store.dispatch('setEducationalInstitution');
    this.getTeachers();
    this.getClassrooms();
  },
}
</script>

<style scoped>
/*@media screen and (max-width: 768px) {
  .swal-wide {
    width: 90% !important;
  }
}*/
</style>
<template>
  <div>
    <TeacherNavbar></TeacherNavbar>
    <section>
      <div class="flex items-center bg-orange-light justify-between border-0">
        <p class="text-lg py-2.5 ml-4">Resumen organizacional</p>
        <button @click="goToOrganization" class="button-secondary text-right mr-2.5 truncate">Volver a vista general</button>
      </div>
      <div> <!-- Teachers table -->
        <div class="flex items-center justify-between border-b-2 border-dashed m-1 border-orange-light">
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
        <div class="flex items-center justify-between border-b-2 border-dashed m-1 border-orange-light">
          <p class="text-md py-2 ml-3">Alumnos</p>
          <button @click="newStudentModal" class="text-right font-extrabold text-xl mr-5 rounded px-1.5 hover:bg-orange-light">+</button>
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
                  <span class="px-2 cursor-pointer" @click="editStudentModal(student)"><i class="fas fa-redo-alt"></i></span>
                  <span class="mr-0.5 md:mr-2 cursor-pointer" @click="changePassword(student)"><i class="fas fa-key"></i></span>
                  <span class="cursor-pointer" @click="deleteStudent(student)"><i class="fas fa-times"></i></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div> <!-- Classrooms table -->
        <div class="flex items-center justify-between border-b-2 border-dashed m-1 border-orange-light">
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
                  <span class="pr-2 cursor-pointer" @click="assignTeacherToClassroom(classroom)"><i class="fas fa-user-plus"></i></span>
                  <span class="pr-2 cursor-pointer" @click="editClassroomModal(classroom)"><i class="fas fa-redo-alt"></i></span>
                  <span class="cursor-pointer" @click="deleteClassroom(classroom)"><i class="fas fa-times"></i></span>
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
import TeacherForm from "@/utils/forms/TeacherForm";
import TeacherService from "@/services/TeacherService";
import ChangePasswordForm from "@/utils/forms/ChangePasswordForm";
import UserService from "@/services/UserService";
import ClassroomForm from "@/utils/forms/ClassroomForm";
import ClassroomService from "@/services/ClassroomService";
import StudentForm from "@/utils/forms/StudentForm";
import StudentService from "@/services/StudentService";
import formHandlers from "@/utils/formHandlers";

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
    getStudents() {
      StudentService.getStudentsByInstitution(this.$store.getters.getEducationalInstitution).then((response) => {
        if (response.status === 200) {
          this.students = response.data;
        }
      }).catch(() => {
        this.$swal('Error', 'El servicio no está disponible', 'error');
      });
    },
    goToOrganization() {
      this.$router.push({ name: 'organization' });
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
          formHandlers.mountVueComponents(ChangePasswordForm, '', null);
        },
        preConfirm: () => {
          return formHandlers.getFormInstance().getValidation().then((validation) => {
            if (!validation) {
              throw new Error('not-required');
            } else {
              const data = formHandlers.destroyVueComponent();
              UserService.changeUserPassword(user.id, data).then((response) => {
                return response.data;
              }).catch(() => {
                return this.$swal.showValidationMessage("Error al cambiar la contraseña");
              });
            }
          }).catch(() => {
            this.$swal.showValidationMessage("Rellene todos los campos necesarios")
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
          formHandlers.mountVueComponents(TeacherForm, 'new', null);
        },
        preConfirm: () => {
          return formHandlers.getFormInstance().getValidation().then((validation) => {
            if (!validation) {
              throw new Error('not-required');
            } else {
              const data = formHandlers.destroyVueComponent();
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
          formHandlers.mountVueComponents(TeacherForm, 'edit', data);
        },
        preConfirm: () => {
          formHandlers.getFormInstance().getValidation().then(() => {
            formHandlers.destroyVueComponent();
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
          }).catch(() => {
            this.$swal('Error', 'El profesor no ha podido ser eliminado', 'error');
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
          formHandlers.mountVueComponents(ClassroomForm, 'new', null);
        },
        preConfirm: () => {
          return formHandlers.getFormInstance().getValidation().then((validation) => {
            if (!validation) {
              throw new Error('not-required');
            } else {
              const data = formHandlers.destroyVueComponent();
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
    editClassroomModal(classroom) {
      this.$swal({
        html: '<div id="ClassroomForm"></div>',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Editar aula',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        willOpen: () => {
          formHandlers.mountVueComponents(ClassroomForm, 'edit', classroom);
        },
        preConfirm: () => {
          return formHandlers.getFormInstance().getValidation().then((validation) => {
            if (!validation) {
              throw new Error('not-required');
            } else {
              const data = formHandlers.destroyVueComponent();
              data.educationalInstitution = Number(this.$store.getters.getEducationalInstitution);
              ClassroomService.editClassroom(data, classroom.id).then((response) => {
                if (response.status === 201) {
                  this.getClassrooms();
                  this.$swal('Éxito', `El aula ha sido modificada correctamente`, 'success');
                }
              }).catch(() => {
                return this.$swal.showValidationMessage("Error al modificar aula");
              });
            }
          }).catch(() => {
            this.$swal.showValidationMessage("Rellene todos los campos necesarios");
          });
        },
      });
    },
    deleteClassroom(classroom) {
      this.$swal({
        title: '¿Está seguro?',
        text: `Se eliminará el aula ${classroom.name}.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          ClassroomService.deleteClassroom(classroom.id).then((response) => {
            if (response.status === 200) {
              this.$swal('Éxito', `El aula ${classroom.name} ha sido eliminado correctamente`, 'success').then(() => {
                this.getClassrooms();
              });
            }
          });
        }
      });
    },
    assignTeacherToClassroom(classroom) {
      this.$swal({
        title: '¿Está seguro?',
        text: `Se le asignará al aula ${classroom.name}`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, asignar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          ClassroomService.assignTeacherToClassroom(Number(this.$store.getters.getUserId), classroom.id).then((response) => {
            if (response.status === 201) {
              this.$swal('Éxito', `Ha sido asignado correctamente al aula ${classroom.name}`, 'success');
            }
          }).catch(() => {
            this.$swal('Error', `No se ha podido asignar al aula ${classroom.name}`, 'error');
          });
        }
      });
    },
    // Student methods
    newStudentModal() {
      this.$swal({
        html: '<div id="StudentForm"></div>',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Crear alumno',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        willOpen: () => {
          formHandlers.mountVueComponents(StudentForm, 'new', this.$store.getters.getEducationalInstitution);
        },
        preConfirm: () => {
          return formHandlers.getFormInstance().getValidation().then((validation) => {
            if (!validation) {
              throw new Error('not-required');
            } else {
              const data = formHandlers.destroyVueComponent();
              StudentService.createStudent(data).then((response) => {
                if (response.status === 201) {
                  this.getStudents();
                  this.$swal('Éxito', 'Alumno ha sido creado correctamente', 'success');
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
    editStudentModal(student) {
      this.$swal({
        html: '<div id="StudentForm"></div>',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Editar alumno',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        willOpen: () => {
          formHandlers.mountVueComponents(StudentForm, 'edit', { student, educationalInstitution: this.$store.getters.getEducationalInstitution });
        },
        preConfirm: () => {
          return formHandlers.getFormInstance().getValidation().then((validation) => {
            if (!validation) {
              throw new Error('not-required');
            } else {
              const data = formHandlers.destroyVueComponent();
              delete data.classRoomId;
              StudentService.editStudent(data, student.id).then((response) => {
                if (response.status === 200) {
                  this.getStudents();
                  this.$swal('Éxito', `El alumno ha sido modificado correctamente`, 'success');
                }
              }).catch(() => {
                return this.$swal.showValidationMessage("Error al modificar el alumno");
              });
            }
          }).catch(() => {
            this.$swal.showValidationMessage("Rellene todos los campos necesarios");
          });
        },
      });
    },
    deleteStudent(student) {
      this.$swal({
        title: '¿Está seguro?',
        text: `Se eliminará el alumno ${student.firstName} ${student.lastName}.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          StudentService.deleteStudent(student.id).then((response) => {
            if (response.status === 200) {
              this.$swal('Éxito', `El alumno ${student.firstName} ${student.lastName} ha sido eliminado correctamente`, 'success').then(() => {
                this.getStudents();
              });
            }
          }).catch(() => {
            this.$swal('Error', `El alumno ${student.firstName} ${student.lastName} no ha podido ser eliminado`, 'error');
          });
        }
      });
    },
  },
  created() {
    this.$store.dispatch('setToken');
    this.$store.dispatch('setEducationalInstitution');
    this.getTeachers();
    this.getClassrooms();
    this.getStudents();
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
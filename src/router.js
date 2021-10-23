import Vue from "vue";
import VueRouter from 'vue-router'

import Home from "@/components/Home";
import Login from "@/components/Login";
import Register from "@/components/Register";
import StudentHome from "@/components/StudentHome";
import TeacherHome from "@/components/TeacherHome";

Vue.use(VueRouter)

const routes = [
    { path: "/", name: 'home', component: Home },
    { path: "/home", redirect: "/" },
    { path: "/login", name: 'login', component: Login },
    { path: "/register", name: 'register', component: Register},
    { path: "/teacher", name: 'teacher-home', component: TeacherHome },
    { path: "/student", name: 'student-home', component: StudentHome },
]

const router = new VueRouter({
    mode: "history",
    routes
});
  
export default router;
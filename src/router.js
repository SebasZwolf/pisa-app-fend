import Vue from "vue";
import VueRouter from 'vue-router'

import Home from "@/components/Home";
import Login from "@/components/Login";
import Register from "@/components/Register";
import StudentHome from "@/components/StudentHome";
import TeacherHome from "@/components/TeacherHome";
import Organization from "@/components/Organization";
import EditOrganization from "@/components/EditOrganization";
import TeacherProfile from "@/components/Teacher/TeacherProfile";
import ClassroomProfile from "@/components/ClassroomProfile";
import StudentProfile from "@/components/Student/StudentProfile";
import ExamResolution from "@/components/Student/ExamResolution";
import FinishedExam from "@/components/Student/FinishedExam";
import ThunderTestOptions from "@/components/ThunderTest/ThunderTestOptions";
import ThunderTestResolution from "@/components/ThunderTest/ThunderTestResolution";
import FinishedThunderTest from "@/components/ThunderTest/FinishedThunderTest";
import StudyMaterial from "@/components/Student/StudyMaterial";
import CourseMaterial from "@/components/Student/CourseMaterial";
import TopicMaterial from "@/components/Student/TopicMaterial";

Vue.use(VueRouter)

const routes = [
    { path: "/", name: 'home', component: Home },
    { path: "/home", redirect: "/" },
    { path: "/login", name: 'login', component: Login },
    { path: "/register", name: 'register', component: Register},
    { path: "/teacher", name: 'teacher-home', component: TeacherHome },
    { path: "/student", name: 'student-home', component: StudentHome },
    // Teacher routes
    { path: "/organization", name: 'organization', component: Organization },
    { path: "/organization/edit", name: 'edit-organization', component: EditOrganization },
    { path: "/teacher/profile", name: 'teacher-profile', component: TeacherProfile },
    // Student routes
    { path: "/student/profile", name: 'student-profile', component: StudentProfile, props: true },
    { path: "/student/exam/:id", name: 'student-exam', component: ExamResolution, props: true },
    { path: "/student/exam/finish", name: 'student-exam-finish', component: FinishedExam, props: true},
    // Classroom routes
    { path: "/classroom/:id", name: 'classroom-profile', component: ClassroomProfile, props: true },
    // Thunder tests routes
    { path: "/thunder-test", name: 'thunder-test', component: ThunderTestOptions },
    { path: "/thunder-test/start/:num", name: 'thunder-test-start', component: ThunderTestResolution, props: true },
    { path: "/thunder-test/finish", name: 'thunder-test-finish', component: FinishedThunderTest, props: true },
    // Study material
    { path: "/study-material", name: 'study-material', component: StudyMaterial },
    { path: "/study-material/:areaId", name: 'course-material', component: CourseMaterial, props: true },
    { path: "/study-material/:areaId/topic", name: 'topic-material', component: TopicMaterial, props: true },
]

const router = new VueRouter({
    mode: "history",
    routes
});
  
export default router;

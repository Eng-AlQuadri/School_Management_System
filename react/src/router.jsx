import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "./components/GuestLayout";
import Login from "./view/Login";
import NotFound from "./view/NotFound";
import ParentLayout from "./components/ParentLayout";
import StudentLayout from "./components/StudentLayout";
import TeacherLayout from "./components/TeacherLayout";
import AdminLayout from "./components/AdminLayout";
import Unauthorized from "./view/Unauthorized";
import Admins from "./view/Admins";
import Students from "./view/Students";
import Parents from "./view/Parents";
import Teachers from "./view/Teachers";
import AdminDashboard from "./view/AdminDashboard";
import AdminsForm from "./view/AdminsForm";
import TeacherForm from "./view/TeacherForm";
import StudentForm from "./view/StudentForm";
import ParentForm from "./view/ParentForm";
import Academics from "./view/Academics";
import Classm from "./view/Classm";
import AssignSubject from "./view/AssignSubject";
import Subjects from "./view/Subjects";
import ClassTeacher from "./view/ClassTeacher";
import Options from "./view/Options";
import ClassmForm from "./view/ClassmForm";
import SubjectsForm from "./view/SubjectsForm";
import AssignSubjectForm from "./view/AssignSubjectForm";
import ClassTeacherForm from "./view/ClassTeacherForm";
import Fees from "./view/Fees";
import FeesOptions from "./view/FeesOptions";
import FeesReport from "./view/FeesReport";
import CollectFees from "./view/CollectFees";
import Examination from "./view/Examination";
import ExamOptions from "./view/ExamOptions";
import Exams from "./view/Exams";
import ExamsForm from "./view/ExamsForm";
import Marks from "./view/Marks";
import Chat from "./view/Chat";
import Attendance from "./view/Attendance";
import AttendanceOptions from "./view/AttendanceOptions";
import TakeAttendance from "./view/TakeAttendace";
import AttendanceReport from "./view/AttendanceReport";
import Homework from "./view/Homework";
import HomeworkOptions from "./view/HomeworkOptions";
import HomeworkReport from "./view/HomeworkReport";
import AddingHomework from "./view/AddingHomework";
import MyAccount from "./view/MyAccount";
import MyAccountForm from "./view/MyAccountForm";
import TeacherStudents from "./view/TeacherStudents";
import TeacherExams from "./view/TeacherExams";
import TeacherExamOptions from "./view/TeacherExamOptions";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/login" />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
    {
        path: "parent",
        element: <ParentLayout />,
        children: [{}],
    },
    {
        path: "student",
        element: <StudentLayout />,
        children: [{}],
    },
    {
        path: "teacher",
        element: <TeacherLayout />,
        children: [
            {
                path: "student",
                element: <TeacherStudents />,
            },
            {
                path: "examination",
                element: <Examination />,
                children: [
                    {
                        path: "options",
                        element: <TeacherExamOptions />,
                    },
                    {
                        path: "exams",
                        element: <TeacherExams />,
                    },
                ],
            },
        ],
    },
    {
        path: "admin",
        element: <AdminLayout />,
        children: [
            {
                path: "chats",
                element: <Chat />,
            },
            {
                path: "admins",
                element: <Admins />,
            },
            {
                path: "admins/new",
                element: <AdminsForm key="createAdmin" />,
            },
            {
                path: "admins/:id",
                element: <AdminsForm key="updateAdmin" />,
            },
            {
                path: "students",
                element: <Students />,
            },
            {
                path: "students/new",
                element: <StudentForm key="createStudent" />,
            },
            {
                path: "students/:id",
                element: <StudentForm key="updateStudent" />,
            },
            {
                path: "parents",
                element: <Parents />,
            },
            {
                path: "parents/new",
                element: <ParentForm key="createParent" />,
            },
            {
                path: "parents/:id",
                element: <ParentForm key="updateParent" />,
            },
            {
                path: "teachers",
                element: <Teachers />,
            },
            {
                path: "teachers/new",
                element: <TeacherForm key="createTeacher" />,
            },
            {
                path: "teachers/:id",
                element: <TeacherForm key="updateTeacher" />,
            },
            {
                path: "dashboard",
                element: <AdminDashboard />,
            },
            {
                path: "academics",
                element: <Academics />,
                children: [
                    {
                        path: "options",
                        element: <Options />,
                    },
                    {
                        path: "classms",
                        element: <Classm />,
                    },
                    {
                        path: "classms/new",
                        element: <ClassmForm key="createClass" />,
                    },
                    {
                        path: "classms/:id",
                        element: <ClassmForm key="updateClass" />,
                    },
                    {
                        path: "assign-subjects",
                        element: <AssignSubject />,
                    },
                    {
                        path: "assign-subjects/new",
                        element: <AssignSubjectForm key="create" />,
                    },
                    {
                        path: "assign-subjects/:id",
                        element: <AssignSubjectForm key="update" />,
                    },
                    {
                        path: "subjects",
                        element: <Subjects />,
                    },
                    {
                        path: "subjects/new",
                        element: <SubjectsForm key="createSubject" />,
                    },
                    {
                        path: "subjects/:id",
                        element: <SubjectsForm key="updateSubject" />,
                    },
                    {
                        path: "assign-class-teacher",
                        element: <ClassTeacher />,
                    },
                    {
                        path: "assign-class-teacher/new",
                        element: <ClassTeacherForm key="createT" />,
                    },
                    {
                        path: "assign-class-teacher/:id",
                        element: <ClassTeacherForm key="updateT" />,
                    },
                ],
            },
            {
                path: "fees",
                element: <Fees />,
                children: [
                    {
                        path: "options",
                        element: <FeesOptions />,
                    },
                    {
                        path: "fees-report",
                        element: <FeesReport />,
                    },
                    {
                        path: "collect-fees",
                        element: <CollectFees />,
                    },
                ],
            },
            {
                path: "examination",
                element: <Examination />,
                children: [
                    {
                        path: "options",
                        element: <ExamOptions />,
                    },
                    {
                        path: "exams",
                        element: <Exams />,
                    },
                    {
                        path: "exams/new",
                        element: <ExamsForm key="createExam" />,
                    },
                    {
                        path: "exams/:id",
                        element: <ExamsForm key="updateExam" />,
                    },
                    {
                        path: "marks",
                        element: <Marks />,
                    },
                ],
            },
            {
                path: "attendance",
                element: <Attendance />,
                children: [
                    {
                        path: "options",
                        element: <AttendanceOptions />,
                    },
                    {
                        path: "take-attendance",
                        element: <TakeAttendance />,
                    },
                    {
                        path: "report",
                        element: <AttendanceReport />,
                    },
                ],
            },
            {
                path: "homework",
                element: <Homework />,
                children: [
                    {
                        path: "options",
                        element: <HomeworkOptions />,
                    },
                    {
                        path: "homework-report",
                        element: <HomeworkReport />,
                    },
                    {
                        path: "add-homework",
                        element: <AddingHomework key="createHomework" />,
                    },
                    {
                        path: "add-homework/:id",
                        element: <AddingHomework key="updateHomework" />,
                    },
                ],
            },
            {
                path: "my-account",
                element: <MyAccount />,
            },
            {
                path: "my-account/edit/:id",
                element: <MyAccountForm />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
]);

export default router;

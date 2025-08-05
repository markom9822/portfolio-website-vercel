import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminLogin } from "./pages/AdminLogin";
import { Routes, Route } from "react-router-dom";
import { AdminProjects } from "./pages/AdminProjects";
import { AdminPosts } from "./pages/AdminPosts";
import { AdminEducation } from "./pages/AdminEducation";
import { AdminExperience } from "./pages/AdminExperience";
import ProtectedRoute from "./components/ProtectedRoute";


export default function AdminApp() {

    return (
        <Routes>
            <Route path="login" element={<AdminLogin/>}/>
            <Route path="dashboard" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}/>
            <Route path="projects" element={<ProtectedRoute><AdminProjects/></ProtectedRoute>}/>
            <Route path="posts" element={<ProtectedRoute><AdminPosts/></ProtectedRoute>}/>
            <Route path="education" element={<ProtectedRoute><AdminEducation/></ProtectedRoute>}/>
            <Route path="experience" element={<ProtectedRoute><AdminExperience/></ProtectedRoute>}/>

            <Route path="*" element={<AdminLogin/>}/>
        </Routes>
    )
}
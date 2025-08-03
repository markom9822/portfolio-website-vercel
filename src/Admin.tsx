import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminLogin } from "./pages/AdminLogin";
import { Routes, Route } from "react-router-dom";
import { AdminProjects } from "./pages/AdminProjects";
import { AdminPosts } from "./pages/AdminPosts";
import { AdminEducation } from "./pages/AdminEducation";


export default function AdminApp() {

    return (
        <Routes>
            <Route path="login" element={<AdminLogin/>}/>
            <Route path="dashboard" element={<AdminDashboard/>}/>
            <Route path="projects" element={<AdminProjects/>}/>
            <Route path="posts" element={<AdminPosts/>}/>
            <Route path="education" element={<AdminEducation/>}/>

            <Route path="*" element={<AdminLogin/>}/>
        </Routes>
    )
}
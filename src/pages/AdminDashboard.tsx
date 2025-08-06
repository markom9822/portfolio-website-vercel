import { useNavigate, type NavigateFunction } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";


export const AdminDashboard = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User logged out successfully");
            navigate("/admin/login");

        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const cards = [
        {
            title: "Projects",
            description: "Create, edit, or delete portfolio projects.",
            route: "/admin/projects",
        },
        {
            title: "Posts",
            description: "Create, edit, or delete blog posts.",
            route: "/admin/posts",
        },
        {
            title: "Education",
            description: "Create, edit, or delete education history.",
            route: "/admin/education",
        },
        {
            title: "Experience",
            description: "Create, edit, or delete work history.",
            route: "/admin/experience",
        },
        {
            title: "Message Inbox",
            description: "View pending message requests.",
            route: "/admin/contact",
        },
        {
            title: "Settings",
            description: "New features coming soon.",
            route: "/admin/settings",
        },
    ];


    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white p-6 font-text">
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="flex flex-col justify-between items-center space-y-8">
                    <h1 className="text-4xl font-bold font-text tracking-tight">
                        Dashboard
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="p-2 rounded duration-200 cursor-pointer border-2 border-zinc-600 hover:border-zinc-300 transition">
                        Logout
                    </button>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '16px',
                        }}
                        className="justify-center"
                    >
                        {cards.map(({ title, description, route }, index) => (

                            <DashboardCard key={index} title={title} description={description} route={route} navigateFunction={navigate} />
                        ))}

                    </div>

                </div>
            </div>
        </div>
    );
}


type DashboardCardProps = {

    title: string,
    description: string,
    route: string;
    navigateFunction: NavigateFunction
}

export const DashboardCard = ({ title, description, route, navigateFunction }: DashboardCardProps) => {

    return (

        <button
            className="p-4 w-full rounded duration-200 cursor-pointer border-2 border-zinc-600 hover:border-zinc-300 transition"
            onClick={() => navigateFunction(route)}>

            <div className='flex flex-col w-full'>
                <div className='flex flex-col justify-between'>
                    <h3 className="text-lg font-semibold text-zinc-200 mb-2 font-text">{title}</h3>
                    <h3 className="text-base text-zinc-200 mb-2 font-text">{description}</h3>
                </div>
            </div>

        </button>
    )

}
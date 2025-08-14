import { useNavigate, type NavigateFunction } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";
import type { IconType } from "react-icons";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { GrProjects } from "react-icons/gr";
import { IoSchoolOutline, IoSettingsSharp } from "react-icons/io5";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { PageBinding } from "../components/PageBindings";
import paperClip from '/images/paperclip_less.png'


export interface AboutMeContentDB {
    id: string;

    content: string,
}

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
            title: "About me",
            description: "Edit content about me and skills",
            icon: BsInfoCircle,
            route: "/admin/aboutMe",
        },
        {
            title: "Projects",
            description: "Create, edit, or delete portfolio projects.",
            icon: GrProjects,
            route: "/admin/projects",
        },
        {
            title: "Posts",
            description: "Create, edit, or delete blog posts.",
            icon: MdOutlineLocalPostOffice,
            route: "/admin/posts",
        },
        {
            title: "Education",
            description: "Create, edit, or delete education history.",
            icon: IoSchoolOutline,
            route: "/admin/education",
        },
        {
            title: "Experience",
            description: "Create, edit, or delete work history.",
            icon: LuBriefcaseBusiness,
            route: "/admin/experience",
        },
        {
            title: "Message Inbox",
            description: "View pending message requests.",
            icon: SiMinutemailer,
            route: "/admin/contact",
        },
        {
            title: "Settings",
            description: "New features coming soon.",
            icon: IoSettingsSharp,
            route: "/admin/settings",
        },
    ];


    return (
        <div className="min-h-screen bg-white text-zinc-900 p-6">
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="flex flex-col justify-between items-center space-y-8 w-full">

                    <div className='flex items-center justify-center relative w-full'>
                        <button
                            onClick={handleLogout}
                            className="absolute left-0 p-2 flex flex-row items-center text-zinc-900 hover:text-zinc-700 font-title
                             space-x-2 rounded duration-200 cursor-pointer border-2 border-zinc-800 hover:border-zinc-700 transition">
                            <RiLogoutBoxRFill size={20} />
                            <p>Logout</p>
                        </button>
                        <h1 className=" relative text-5xl font-bold font-title tracking-tight">
                            Dashboard
                        </h1>
                    </div>

                    <div className="bg-[#e9e9e9] rounded relative">
                        <div className="flex flex-row bg-emerald-200 rounded h-full py-2 mx-4 my-1">

                            <div className='absolute w-1/30 left-1/12 sm:left-1/12 md:left-1/15 lg:left-1/13 top-1/400 sm:-top-1/400 md:-top-1/180 lg:-top-1/140 z-0'>
                                <img
                                    src={paperClip} />
                            </div>

                            <PageBinding />

                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '16px',
                                }}
                                className="justify-center m-4 w-11/12"
                            >
                                {cards.map(({ title, description, icon, route }, index) => (

                                    <DashboardCard key={index} title={title} description={description} Icon={icon} route={route} navigateFunction={navigate} />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}


type DashboardCardProps = {

    title: string,
    description: string,
    Icon: IconType,
    route: string;
    navigateFunction: NavigateFunction
}

export const DashboardCard = ({ title, description, Icon, route, navigateFunction }: DashboardCardProps) => {

    return (
        <button
            className="p-4 w-full rounded duration-200 cursor-pointer border-dashed border-3
             border-zinc-800 hover:border-zinc-600 transition bg-emerald-100 hover:bg-emerald-50"
            onClick={() => navigateFunction(route)}>

            <div className='flex flex-col w-full items-center justify-center space-y-2'>
                <div className="flex flex-row items-center space-x-3">
                    {Icon && <Icon size={20} />}
                    <h3 className="text-lg font-semibold text-zinc-900 font-text">{title}</h3>
                </div>
                <h3 className="text-sm text-zinc-800 mb-2 font-type-bold">{description}</h3>
            </div>
        </button>
    )
}
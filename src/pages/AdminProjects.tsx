
import { useState, type ReactElement } from 'react';
import { reactIcon, viteIcon, typescriptIcon, tailwindCSSIcon, gitIcon, figmaIcon, electronIcon, markdownIcon, jotaiIcon, codemirrorIcon, expoIcon } from '../components/Icons';
import markNoteImage from '/images/MarkNote_app_cover.png'
import rugbyRadarImage from '/images/Rugby_Radar_Poster.jpg'
import portfolioWebsiteImage from '/images/portfolio_website_cover.png';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { AlertDialog } from "radix-ui";
import { InputField } from '../ui/InputField';
import { TextAreaField } from '../ui/TextAreaField';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { formatDateToDDMMYYYY } from '../utils/helper';



export const AdminProjects = () => {


    const projects = [
        {
            title: "This portfolio website!",
            description: "A portfolio website built from scratch using React, Vite and Tailwind CSS.",
            projectLink: "https://github.com/markom9822/portfolio-website-vercel",
            startDate: new Date(2025, 6, 28),
            image: portfolioWebsiteImage,
            techUsed: [reactIcon, viteIcon, typescriptIcon, tailwindCSSIcon, gitIcon, figmaIcon],
        },
        {
            title: "MarkNote App",
            description: "A personal desktop Markdown note taking application developed using React and Electron.",
            projectLink: "https://github.com/markom9822/MarkNote-App",
            startDate: new Date(2024, 2, 29),
            image: markNoteImage,
            techUsed: [reactIcon, electronIcon, typescriptIcon, tailwindCSSIcon, markdownIcon, jotaiIcon, codemirrorIcon, gitIcon],
        },
        {
            title: "Rugby Radar App",
            description: "A sports mobile application built with React Native and Expo. Provides real-time information on fixtures, stats, standings and more from 10+ rugby leagues around the world.",
            projectLink: "https://github.com/markom9822/rugbyRadar_app",
            startDate: new Date(2024, 6, 12),
            image: rugbyRadarImage,
            techUsed: [reactIcon, typescriptIcon, expoIcon, gitIcon, figmaIcon],
        },
    ];

    const [projectPanelTitle, setProjectPanelTitle] = useState("");
    const [actionButtonName, setActionButtonName] = useState("");
    const [isDeletePanel, setIsDeletePanel] = useState(false);

    const [currentProjectTitle, setCurrentProjectTitle] = useState("");
    const [currentProjectDesc, setCurrentProjectDesc] = useState("");
    const [currentProjectUrl, setCurrentProjectUrl] = useState("");
    const [currentProjectStartDate, setCurrentProjectStartDate] = useState("");


    const navigate = useNavigate();

    const handlePressAddNewProject = () => {

        setProjectPanelTitle('Add New Project')
        setActionButtonName('Add Project')
        setIsDeletePanel(false)

        setCurrentProjectTitle('')
        setCurrentProjectDesc('')
        setCurrentProjectUrl('')
        setCurrentProjectStartDate('')
    }

    const handlePressEditProject = (projectTitle: string, projectDesc: string, projectUrl: string, projectStartDate: string) => {

        setProjectPanelTitle('Edit Project')
        setActionButtonName('Save Changes')
        setIsDeletePanel(false)

        setCurrentProjectTitle(projectTitle)
        setCurrentProjectDesc(projectDesc)
        setCurrentProjectUrl(projectUrl)
        setCurrentProjectStartDate(projectStartDate)
    }

    const handlePressDeleteProject = (projectTitle: string) => {

        setProjectPanelTitle('Delete Project')
        setActionButtonName('Delete')
        setIsDeletePanel(true)

        setCurrentProjectTitle(projectTitle)
    }

    return (

        <AlertDialog.Root>
            <div className="min-h-screen bg-[#0f0f0f] text-white p-6 font-text">
                <div className="max-w-5xl mx-auto space-y-12">
                    <div className="flex flex-col justify-between items-center space-y-8">
                        <div className='flex items-center relative w-full'>
                            <button
                                onClick={() => navigate('/admin/dashboard')}
                                className='absolute left-0 flex flex-row items-center space-x-2 text-zinc-400 hover:text-zinc-200'>
                                <FaArrowLeft />
                                <p>Dashboard</p>
                            </button>
                            <h1 className=" relative mx-auto text-4xl font-bold font-text tracking-tight">
                                Projects
                            </h1>
                        </div>


                        <div
                            className="mt-10 flex flex-col w-full">

                            {projects.map(({ title, description, projectLink, startDate, image, techUsed }, index) => (

                                <AdminProjectPanel title={title} description={description} projectLink={projectLink}
                                    startDate={startDate} image={image} techUsed={techUsed} index={index} 
                                    OnPressEdit={() => handlePressEditProject(title, description, projectLink, formatDateToDDMMYYYY(startDate))}
                                    OnPressDelete={() => handlePressDeleteProject(title)} />

                            ))}

                        </div>

                        <div>
                            <AlertDialog.Trigger asChild>
                                <button
                                    onClick={() => handlePressAddNewProject()}
                                    className='p-3 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 transition rounded'>
                                    <p>Add New Project</p>
                                </button>
                            </AlertDialog.Trigger>

                            <AlertDialog.Portal>
                                <AlertDialog.Overlay style={{ position: 'fixed', inset: 0 }} className='flex bg-zinc-700/70' />
                                <AlertDialog.Content
                                    style={{ position: 'fixed', top: '50%', left: '50%', padding: '25px', transform: 'translate(-50%, -50%)', }}
                                    className='flex flex-col bg-zinc-900 rounded space-y-4 w-lg'>

                                    <ProjectDialogPanel panelTitle={projectPanelTitle} cancelButtonName='Cancel'
                                        actionButtonName={actionButtonName} titleValue={currentProjectTitle}
                                        descriptionValue={currentProjectDesc} urlValue={currentProjectUrl} startDateValue={currentProjectStartDate}
                                        isDeleteProjectPanel={isDeletePanel} />

                                </AlertDialog.Content>
                            </AlertDialog.Portal>
                        </div>

                    </div>
                </div>
            </div>

        </AlertDialog.Root>
    )
}

type ProjectDialogPanelProps = {

    panelTitle: string,
    cancelButtonName: string,
    actionButtonName: string,
    titleValue: string,
    descriptionValue: string,
    urlValue: string,
    startDateValue: string,
    isDeleteProjectPanel: boolean

}

export const ProjectDialogPanel = ({ panelTitle, cancelButtonName, actionButtonName, titleValue, descriptionValue, urlValue, startDateValue, isDeleteProjectPanel }: ProjectDialogPanelProps) => {

    if (isDeleteProjectPanel) {
        return (
            <>
                <h2 className="text-3xl font-bold mb-4 text-zinc-200 font-text">{panelTitle}</h2>

                <p className='font-text text-zinc-300'>Are you sure you want to delete {titleValue}?</p>

                <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
                    <AlertDialog.Cancel asChild>
                        <button className="font-text text-zinc-400 rounded hover:text-zinc-200 px-2 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 transition">
                            {cancelButtonName}
                        </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <button className="font-text text-red-600 rounded hover:text-red-400 px-2 duration-200 cursor-pointer border-2 border-red-500 hover:border-red-300 transition">
                            {actionButtonName}
                        </button>
                    </AlertDialog.Action>
                </div>
            </>
        )
    }

    return (
        <>
            <h2 className="text-3xl font-bold mb-4 text-zinc-200 font-text">{panelTitle}</h2>

            <InputField className='' placeholder='Project Title' type='text' value={titleValue} />
            <TextAreaField className='' placeholder='Project description' value={descriptionValue} />
            <InputField className='' placeholder='Project url' type='text' value={urlValue} />
            <InputField className='' placeholder='Project start date (dd/mm/yyy)' type='text' value={startDateValue} />


            <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
                <AlertDialog.Cancel asChild>
                    <button className="font-text text-zinc-400 rounded hover:text-zinc-200 px-2 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 transition">
                        {cancelButtonName}
                    </button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                    <button className="font-text text-zinc-400 rounded hover:text-zinc-200 px-2 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 transition">
                        {actionButtonName}
                    </button>
                </AlertDialog.Action>
            </div>
        </>
    )
}


type AdminProjectPanelProps = {

    title: string,
    description: string,
    projectLink: string,
    startDate: Date,
    image: any,
    techUsed: ReactElement[],
    index: number,
    OnPressEdit: () => void,
    OnPressDelete: () => void,

}

export const AdminProjectPanel = ({ title, description, projectLink, startDate, image, techUsed, index, OnPressEdit, OnPressDelete }: AdminProjectPanelProps) => {

    const formattedDate = startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

    return (
        <div
            className="w-full">
            <div
                className="group flex flex-row justify-between items-center p-2 py-4 w-full rounded">
                <div className="border-b-2 border-b-zinc-500 flex flex-row justify-between items-center w-full py-2">

                    <div className="flex flex-row items-center space-x-6">
                        <div className="px-2.5 py-1 text-sm bg-zinc-900 group-hover:bg-zinc-700 font-bold font-text text-zinc-400 group-hover:text-zinc-300 rounded transition">{index + 1}</div>
                        <h3 className="text-xl font-semibold text-zinc-400 group-hover:text-zinc-300 group-hover:translate-x-1 transition font-text">{title}</h3>
                    </div>

                    <div className="flex flex-row items-center space-x-4">

                        <AlertDialog.Trigger asChild>
                            <button
                                onClick={OnPressEdit}
                                title='Edit project'
                                className='p-2 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 text-zinc-400 hover:text-zinc-200 transition rounded'>
                                <FaRegEdit className='' />
                            </button>
                        </AlertDialog.Trigger>

                        <AlertDialog.Trigger asChild>
                            <button
                                onClick={OnPressDelete}
                                title='Delete project'
                                className='p-2 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 text-zinc-400 hover:text-zinc-200 transition rounded'>
                                <RiDeleteBin5Line className='' />
                            </button>
                        </AlertDialog.Trigger>
                    </div>
                </div>
            </div>

        </div>
    )
}
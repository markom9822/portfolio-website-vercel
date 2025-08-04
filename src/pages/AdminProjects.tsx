
import { useEffect, useState, type ChangeEvent, type ReactElement } from 'react';
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
import { AddPanel } from '../components/AddPanel';
import { DeleteItemPanel } from '../components/DeleteItemPanel';
import LoaderScreen from '../components/LoadingScreen';

export type ProjectFormProps = {

    title: string,
    description: string,
    projectLink: string,
    startDate: string,
}

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
    const [currentPanelAction, setCurrentPanelAction] = useState("");
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const [projectForm, setProjectForm] = useState<ProjectFormProps>({
        title: "",
        description: "",
        projectLink: "",
        startDate: "",
    });

    const navigate = useNavigate();

    const handlePressAddNewProject = () => {

        setCurrentPanelAction('add')
        setProjectPanelTitle('Add New Project')
        setActionButtonName('Add Project')
        setIsDeletePanel(false)

        setProjectForm({
            title: "",
            description: "",
            projectLink: "",
            startDate: "",
        })
    }

    const handlePressEditProject = (projectTitle: string, projectDesc: string, projectUrl: string, projectStartDate: string) => {

        setCurrentPanelAction('update')
        setProjectPanelTitle('Edit Project')
        setActionButtonName('Save Changes')
        setIsDeletePanel(false)

        setProjectForm({
            title: projectTitle,
            description: projectDesc,
            projectLink: projectUrl,
            startDate: projectStartDate,
        })
    }

    const handlePressDeleteProject = (projectTitle: string) => {

        setCurrentPanelAction('delete')
        setProjectPanelTitle('Delete Project')
        setActionButtonName('Delete')
        setIsDeletePanel(true)

        setProjectForm({
            title: projectTitle,
            description: "",
            projectLink: "",
            startDate: "",
        })
    }

    // CRUD System

    const createProjectInDatabase = (project: ProjectFormProps) => {

        console.log(`Need to create new project (${project.title}) in database`)


        // read database after
        readProjectsFromDatabase();
    }

    const readProjectsFromDatabase = () => {

    }

    const updateProjectInDatabase = (project: ProjectFormProps) => {

        console.log(`Need to update project (${project.title}) in database`)

        // read database after
        readProjectsFromDatabase();
    }

    const deleteProjectInDatabase = (project: ProjectFormProps) => {

        console.log(`Need to delete project (${project.title}) in database`)
    }

    // read projects from database initially
    useEffect(() => {

        readProjectsFromDatabase();

    }, []);

    return (
        <AlertDialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="min-h-screen bg-[#0f0f0f] text-white p-6 font-text">
                <div className="max-w-5xl mx-auto space-y-12">

                    {loading ? (
                        <LoaderScreen />
                    ) : (

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

                                    <AdminProjectPanel key={index}
                                        title={title} description={description} projectLink={projectLink}
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

                                <AddPanel>
                                    <ProjectDialogPanel currentPanelAction={currentPanelAction} panelTitle={projectPanelTitle} cancelButtonName='Cancel'
                                        actionButtonName={actionButtonName} titleValue={projectForm.title} descriptionValue={projectForm.description}
                                        urlValue={projectForm.projectLink} startDateValue={projectForm.startDate} isDeleteProjectPanel={isDeletePanel}
                                        setDialogOpen={setIsDialogOpen}
                                        createNewProject={createProjectInDatabase} updateNewProject={updateProjectInDatabase} deleteProject={deleteProjectInDatabase} />
                                </AddPanel>
                            </div>

                        </div>
                    )}
                </div>
            </div>

        </AlertDialog.Root>
    )
}

type ProjectDialogPanelProps = {

    currentPanelAction: string,
    panelTitle: string,
    cancelButtonName: string,
    actionButtonName: string,
    titleValue: string,
    descriptionValue: string,
    urlValue: string,
    startDateValue: string,
    isDeleteProjectPanel: boolean,
    setDialogOpen: (open: boolean) => void,
    createNewProject: (project: ProjectFormProps) => void,
    updateNewProject: (project: ProjectFormProps) => void,
    deleteProject: (project: ProjectFormProps) => void,
}

export const ProjectDialogPanel = ({ currentPanelAction, panelTitle, cancelButtonName, actionButtonName, titleValue,
    descriptionValue, urlValue, startDateValue, isDeleteProjectPanel, setDialogOpen, createNewProject, updateNewProject, deleteProject }: ProjectDialogPanelProps) => {

    const [currentTitleValue, setCurrentTitleValue] = useState(titleValue);
    const [currentDescValue, setCurrentDescValue] = useState(descriptionValue);
    const [currentLinkValue, setCurrentLinkValue] = useState(urlValue);
    const [currentStartDateValue, setCurrentStartDateValue] = useState(startDateValue);
    const [warning, setWarning] = useState('');

    const isProjectEntryValid = () => {

        return currentTitleValue != '' &&
        currentDescValue != '' && currentLinkValue != ''
        && currentStartDateValue != '';
    }

    // handle add project
    const handlePressActionButton = () => {

        if(!isProjectEntryValid())
        {
            setWarning('Please complete all fields.');
            return;
        }

        const newProject = {
            title: currentTitleValue,
            description: currentDescValue,
            projectLink: currentLinkValue,
            startDate: currentStartDateValue,
        }

        console.log(newProject)

        // Need to save update here
        if (currentPanelAction == 'action') {
            createNewProject(newProject)
        }
        else if (currentPanelAction == 'update') {
            updateNewProject(newProject)
        }

        setWarning('')
        setDialogOpen(false)
    }

    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => { setCurrentTitleValue(event.target.value) };
    const handleChangeDesc = (event: ChangeEvent<HTMLTextAreaElement>) => { setCurrentDescValue(event.target.value) };
    const handleChangeLink = (event: ChangeEvent<HTMLInputElement>) => { setCurrentLinkValue(event.target.value) };
    const handleChangeStartDate = (event: ChangeEvent<HTMLInputElement>) => { setCurrentStartDateValue(event.target.value) };

    if (isDeleteProjectPanel) {
        return (
            <DeleteItemPanel panelTitle={panelTitle} itemName={titleValue}
                actionButtonName={actionButtonName} cancelButtonName={cancelButtonName}
                OnDelete={() => deleteProject({
                    title: currentTitleValue,
                    description: currentDescValue,
                    projectLink: currentLinkValue,
                    startDate: currentStartDateValue
                })} />
        )
    }

    return (
        <>
            <AlertDialog.Title className='text-3xl font-bold mb-4 text-zinc-200 font-text'>
                {panelTitle}
            </AlertDialog.Title>

            <InputField className='' placeholder='Project Title' type='text' value={currentTitleValue} OnInputChanged={handleChangeTitle} />
            <TextAreaField className='' placeholder='Project description' value={currentDescValue} OnInputChanged={handleChangeDesc} />
            <InputField className='' placeholder='Project url' type='text' value={currentLinkValue} OnInputChanged={handleChangeLink} />
            <InputField className='' placeholder='Project start date (dd/mm/yyy)' type='text' value={currentStartDateValue} OnInputChanged={handleChangeStartDate} />

            {warning && <div className="text-red-500 font-text">{warning}</div>}

            <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
                <AlertDialog.Cancel asChild>
                    <button className="font-text text-zinc-400 rounded hover:text-zinc-200 px-2 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 transition">
                        {cancelButtonName}
                    </button>
                </AlertDialog.Cancel>
                <button
                    onClick={handlePressActionButton}
                    className="font-text text-zinc-400 rounded hover:text-zinc-200 px-2 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 transition">
                    {actionButtonName}
                </button>
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

export const AdminProjectPanel = ({ title, index, OnPressEdit, OnPressDelete }: AdminProjectPanelProps) => {

    //const formattedDate = startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

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
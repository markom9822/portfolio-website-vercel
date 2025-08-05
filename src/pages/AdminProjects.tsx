
import { useEffect, useState, type ChangeEvent } from 'react';
//import { reactIcon, viteIcon, typescriptIcon, tailwindCSSIcon, gitIcon, figmaIcon, electronIcon, markdownIcon, jotaiIcon, codemirrorIcon, expoIcon } from '../components/Icons';
//import markNoteImage from '/images/MarkNote_app_cover.png'
//import rugbyRadarImage from '/images/Rugby_Radar_Poster.jpg'
//import portfolioWebsiteImage from '/images/portfolio_website_cover.png';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { AlertDialog } from "radix-ui";
import { InputField } from '../ui/InputField';
import { TextAreaField } from '../ui/TextAreaField';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { AddPanel } from '../components/AddPanel';
import { DeleteItemPanel } from '../components/DeleteItemPanel';
import LoaderScreen from '../components/LoadingScreen';

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export type ProjectFormProps = {

    title: string,
    description: string,
    projectLink: string,
    startDate: string,
}

interface ProjectDB {
    id: string;

    title: string,
    description: string,
    projectLink: string,
    startDate: string,
}

export const AdminProjects = () => {


    /*const projects = [
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
    ];*/

    const [projectPanelTitle, setProjectPanelTitle] = useState("");
    const [projectPanelDesc, setProjectPanelDesc] = useState("");

    const [allProjects, setAllProjects] = useState<ProjectDB[]>([]);

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
    const [projectID, setProjectID] = useState("");

    const navigate = useNavigate();

    const handlePressAddNewProject = () => {

        setCurrentPanelAction('add')
        setProjectPanelTitle('Add New Project')
        setProjectPanelDesc('Add a new project to the portfolio database.')

        setActionButtonName('Add Project')
        setIsDeletePanel(false)

        setProjectForm({
            title: "",
            description: "",
            projectLink: "",
            startDate: "",
        })
    }

    const handlePressEditProject = (projectID: string, projectTitle: string, projectDesc: string, projectUrl: string, projectStartDate: string) => {

        setCurrentPanelAction('update')
        setProjectPanelTitle('Edit Project')
        setProjectPanelDesc('Edit an existing project in the portfolio database.')

        setActionButtonName('Save Changes')
        setIsDeletePanel(false)

        setProjectForm({
            title: projectTitle,
            description: projectDesc,
            projectLink: projectUrl,
            startDate: projectStartDate,
        })

        setProjectID(projectID)
    }

    const handlePressDeleteProject = (projectID: string, projectTitle: string) => {

        setCurrentPanelAction('delete')
        setProjectPanelTitle('Delete Project')
        setProjectPanelDesc('Delete this project from the portfolio database.')

        setActionButtonName('Delete')
        setIsDeletePanel(true)

        setProjectForm({
            title: projectTitle,
            description: "",
            projectLink: "",
            startDate: "",
        })

        setProjectID(projectID)
    }

    // CRUD System

    const createProjectInDatabase = async (project: ProjectFormProps) => {

        console.log(`Need to create new project (${project.title}) in database`)
        await addDoc(collection(db, "projects"), {
            title: project.title,
            description: project.description,
            projectLink: project.projectLink,
            startDate: project.startDate,
        });

        // read database after
        readProjectsFromDatabase();
    }

    const readProjectsFromDatabase = async (): Promise<void> => {

        console.log("Trying to read projects from database")
        setLoading(true);

        try {
            const snap = await getDocs(collection(db, "projects"));
            const data: ProjectDB[] = snap.docs.map((d) => ({
                id: d.id,
                ...(d.data() as Omit<ProjectDB, "id">), // Type assertion for Firestore data
            }));

            setAllProjects(data);
        }
        catch (error) {
            console.error("Error reading projects:", error);
        }
        finally {
            setLoading(false);
        }
    }

    const updateProjectInDatabase = async (project: ProjectFormProps, projectID: string) => {

        console.log(`Need to update project (${project.title}) in database`)
        await updateDoc(doc(db, "projects", projectID), {
            title: project.title,
            description: project.description,
            projectLink: project.projectLink,
            startDate: project.startDate,
        });

        // read database after
        readProjectsFromDatabase();
    }

    const deleteProjectInDatabase = async (project: ProjectFormProps, projectID: string) => {

        console.log(`Need to delete project (${project.title}, ${projectID}) in database`)
        await deleteDoc(doc(db, "projects", projectID));

        // read database after
        readProjectsFromDatabase();
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

                                {allProjects.length == 0 ? (<p className='text-center text-2xl text-zinc-500'>No Projects Yet</p>) : (
                                    <>
                                        {allProjects.map(({ id, title, description, projectLink, startDate }, index) => (

                                            <AdminProjectPanel key={index}
                                                title={title}
                                                startDate={startDate} index={index}
                                                OnPressEdit={() => handlePressEditProject(id, title, description, projectLink, startDate)}
                                                OnPressDelete={() => handlePressDeleteProject(id, title)} />

                                        ))}
                                    </>
                                )}

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
                                    <ProjectDialogPanel currentPanelAction={currentPanelAction} panelTitle={projectPanelTitle} panelDesc={projectPanelDesc}
                                        cancelButtonName='Cancel' actionButtonName={actionButtonName} projectForm={projectForm} projectID={projectID}
                                        isDeleteProjectPanel={isDeletePanel}
                                        setDialogOpen={setIsDialogOpen} onCreateProject={createProjectInDatabase}
                                        onUpdateProject={updateProjectInDatabase} onDeleteProject={deleteProjectInDatabase} />
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
    panelDesc: string,
    cancelButtonName: string,
    actionButtonName: string,
    projectForm: ProjectFormProps,
    projectID: string,
    isDeleteProjectPanel: boolean,

    setDialogOpen: (open: boolean) => void,
    onCreateProject: (project: ProjectFormProps) => Promise<void>;
    onUpdateProject: (project: ProjectFormProps, projectID: string) => Promise<void>;
    onDeleteProject: (project: ProjectFormProps, projectID: string) => Promise<void>;
}

export const ProjectDialogPanel = ({
    currentPanelAction, panelTitle, panelDesc, cancelButtonName, actionButtonName, projectForm, projectID, isDeleteProjectPanel,
    setDialogOpen, onCreateProject, onUpdateProject, onDeleteProject }: ProjectDialogPanelProps) => {

    const [currentTitleValue, setCurrentTitleValue] = useState(projectForm.title);
    const [currentDescValue, setCurrentDescValue] = useState(projectForm.description);
    const [currentLinkValue, setCurrentLinkValue] = useState(projectForm.projectLink);
    const [currentStartDateValue, setCurrentStartDateValue] = useState(projectForm.startDate);
    const [warning, setWarning] = useState('');

    const isProjectEntryValid = () => {

        return currentTitleValue != '' &&
            currentDescValue != '' && currentLinkValue != ''
            && currentStartDateValue != '';
    }

    // handle add project
    const handlePressActionButton = async () => {

        if (!isProjectEntryValid()) {
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
        console.log(currentPanelAction)

        // Need to save update here
        if (currentPanelAction == 'add') {
            await onCreateProject(newProject)
        }
        else if (currentPanelAction == 'update') {
            await onUpdateProject(newProject, projectID)
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
            <DeleteItemPanel panelTitle={panelTitle} panelDesc={panelDesc} itemName={projectForm.title}
                actionButtonName={actionButtonName} cancelButtonName={cancelButtonName}
                OnDelete={() => onDeleteProject({
                    title: currentTitleValue,
                    description: currentDescValue,
                    projectLink: currentLinkValue,
                    startDate: currentStartDateValue
                }, projectID)} />
        )
    }

    return (
        <>
            <AlertDialog.Title className='text-3xl font-bold mb-2 text-zinc-200 font-text'>
                {panelTitle}
            </AlertDialog.Title>

            <AlertDialog.Description className='text-sm font-text text-zinc-400'>
                {panelDesc}
            </AlertDialog.Description>

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
    startDate: string,
    index: number,
    OnPressEdit: () => void,
    OnPressDelete: () => void,
}

export const AdminProjectPanel = ({ title, startDate, index, OnPressEdit, OnPressDelete }: AdminProjectPanelProps) => {

    return (
        <div
            className="w-full">
            <div
                className="group flex flex-row justify-between items-center p-2 py-4 w-full rounded">
                <div className="border-b-2 border-b-zinc-500 flex flex-row justify-between items-center w-full py-2">

                    <div className="flex flex-row items-center space-x-6">
                        <div className="flex items-center px-2.5 py-1 text-sm bg-zinc-900 group-hover:bg-zinc-700 font-bold font-text text-zinc-400 group-hover:text-zinc-300 rounded transition">
                            {index + 1}
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-400 group-hover:text-zinc-300 group-hover:translate-x-1 transition font-text self-center">
                            {title}
                        </h3>
                        <p className="text-sm pt-1 text-zinc-400 group-hover:text-zinc-300 group-hover:translate-x-1 transition font-text self-center">
                            [ {startDate} ]
                        </p>
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
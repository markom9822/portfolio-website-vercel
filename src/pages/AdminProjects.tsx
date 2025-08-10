import { useEffect, useState, type ChangeEvent } from 'react';
import { AlertDialog } from "radix-ui";
import { InputField } from '../ui/InputField';
import { TextAreaField } from '../ui/TextAreaField';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { AddPanel } from '../components/AddPanel';
import { DeleteItemPanel } from '../components/DeleteItemPanel';
import LoaderScreen from '../components/LoadingScreen';
import {collection,addDoc,getDocs,deleteDoc,doc,updateDoc,} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { TagsInput } from '../ui/TagsInput';
import { getTechNamesArray } from '../store/techUsedOptions';
import { AdminProjectPanel } from './AdminPanelItem';
import { fireStoreCollections } from '../firebase/fireStoreDatabaseCollections';
import { CheckboxField } from '../ui/CheckboxField';

export type ProjectFormProps = {

    title: string,
    description: string,
    projectLink: string,
    startDate: string,
    techUsed: string[],
    imageName: string,
    isWork: boolean,
}

export interface ProjectDB {
    id: string;

    title: string,
    description: string,
    projectLink: string,
    startDate: string,
    techUsed: string[],
    imageName: string,
    isWork: boolean,
}

export const AdminProjects = () => {
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
        techUsed: [],
        imageName: "",
        isWork: false,
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
            techUsed: [],
            imageName: "",
            isWork: false,
        })
    }

    const handlePressEditProject = (projectID: string, projectTitle: string, projectDesc: string,
         projectUrl: string, projectStartDate: string, projectTechUsed: string[], projectImageName: string, projectIsWork: boolean) => {

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
            techUsed: projectTechUsed,
            imageName: projectImageName,
            isWork: projectIsWork,
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
            techUsed: [],
            imageName: "",
            isWork: false,
        })

        setProjectID(projectID)
    }

    // CRUD System
    const createProjectInDatabase = async (project: ProjectFormProps) => {

        console.log(`Need to create new project (${project.title}) in database`)
        await addDoc(collection(db, fireStoreCollections.projectsSection), {
            title: project.title,
            description: project.description,
            projectLink: project.projectLink,
            startDate: project.startDate,
            techUsed: project.techUsed,
            imageName: project.imageName,
            isWork: project.isWork,
        });

        // read database after
        readProjectsFromDatabase();
    }

    const readProjectsFromDatabase = async (): Promise<void> => {

        console.log("Trying to read projects from database")
        setLoading(true);

        try {
            const snap = await getDocs(collection(db, fireStoreCollections.projectsSection));
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
        await updateDoc(doc(db, fireStoreCollections.projectsSection, projectID), {
            title: project.title,
            description: project.description,
            projectLink: project.projectLink,
            startDate: project.startDate,
            techUsed: project.techUsed,
            imageName: project.imageName,
            isWork: project.isWork,
        });

        // read database after
        readProjectsFromDatabase();
    }

    const deleteProjectInDatabase = async (project: ProjectFormProps, projectID: string) => {

        console.log(`Need to delete project (${project.title}, ${projectID}) in database`)
        await deleteDoc(doc(db, fireStoreCollections.projectsSection, projectID));

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
                                    className='duration-200 cursor-pointer absolute left-0 flex flex-row items-center space-x-2 text-zinc-400 hover:text-zinc-200'>
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
                                        {allProjects.map(({ id, title, description, projectLink, startDate, techUsed, imageName, isWork }, index) => (

                                            <AdminProjectPanel key={index}
                                                title={title}
                                                date={startDate} index={index}
                                                OnPressEdit={() => handlePressEditProject(id, title, description, projectLink, startDate, techUsed, imageName, isWork)}
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

    const techUsedOptions = getTechNamesArray();

    const [currentTitleValue, setCurrentTitleValue] = useState(projectForm.title);
    const [currentDescValue, setCurrentDescValue] = useState(projectForm.description);
    const [currentLinkValue, setCurrentLinkValue] = useState(projectForm.projectLink);
    const [currentStartDateValue, setCurrentStartDateValue] = useState(projectForm.startDate);
    const [currentTechUsedValue, setCurrentTechUsedValue] = useState<string[]>(projectForm.techUsed);
    const [currentImageNameValue, setCurrentImageNameValue] = useState<string>(projectForm.imageName);
    const [currentIsWorkValue, setCurrentIsWorkValue] = useState<boolean>(projectForm.isWork);

    const [warning, setWarning] = useState('');

    const isProjectEntryValid = () => {

        return currentTitleValue != '' &&
            currentDescValue != '' && currentLinkValue != ''
            && currentStartDateValue != '' && currentTechUsedValue.length > 0
            && currentImageNameValue != '';
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
            techUsed: currentTechUsedValue,
            imageName: currentImageNameValue,
            isWork: currentIsWorkValue,
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
    const handleChangeImageName = (event: ChangeEvent<HTMLInputElement>) => { setCurrentImageNameValue(event.target.value) };
    const handleChangeIsWork = (event: ChangeEvent<HTMLInputElement>) => { setCurrentIsWorkValue(event.target.checked) };

    if (isDeleteProjectPanel) {
        return (
            <DeleteItemPanel panelTitle={panelTitle} panelDesc={panelDesc} itemName={projectForm.title}
                actionButtonName={actionButtonName} cancelButtonName={cancelButtonName}
                OnDelete={() => onDeleteProject({
                    title: currentTitleValue,
                    description: currentDescValue,
                    projectLink: currentLinkValue,
                    startDate: currentStartDateValue,
                    techUsed: currentTechUsedValue,
                    imageName: currentImageNameValue,
                    isWork: currentIsWorkValue,
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
            <InputField className='' placeholder='Project start date (dd/mm/yyy)' type='date' value={currentStartDateValue} OnInputChanged={handleChangeStartDate} />
            <TagsInput tagOptions={techUsedOptions} value={currentTechUsedValue} onValueChanged={(value) => setCurrentTechUsedValue(value)}/>
            <InputField className='' placeholder='Project image name' type='text' value={currentImageNameValue} OnInputChanged={handleChangeImageName} />
            <div className='flex flex-row w-1/2 items-center space-x-3'>
                <p className='text-sm font-text text-zinc-300'>Is Work Project</p>
                <CheckboxField className='' placeholder='Project image name' type='checkbox' checked={currentIsWorkValue} OnInputChanged={handleChangeIsWork} />
            </div> 

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
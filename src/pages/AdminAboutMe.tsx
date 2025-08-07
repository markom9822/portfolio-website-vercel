
import { useEffect, useState, type ChangeEvent } from 'react';
import { AlertDialog } from "radix-ui";
import { TextAreaField } from '../ui/TextAreaField';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import LoaderScreen from '../components/LoadingScreen';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import { fireStoreCollections } from '../firebase/fireStoreDatabaseCollections';
import { AdminProjectPanel } from './AdminPanelItem';
import { AddPanel } from '../components/AddPanel';
import { DeleteItemPanel } from '../components/DeleteItemPanel';
import { InputField } from '../ui/InputField';
import { getTechNamesArray } from '../store/techUsedOptions';
import { TagsInput } from '../ui/TagsInput';


export interface AboutMeContentDB {
    id: string;

    content: string,
}

export type SkillsFormProps = {

    title: string,
    experience: string,
    techUsed: string[],
}

export interface SkillsDB {
    id: string;

    title: string,
    experience: string,
    techUsed: string[],
}


export const AdminAboutMe = () => {

    const [loading, setLoading] = useState(false);
    const [aboutMeContent, setAboutMeContent] = useState<AboutMeContentDB[]>([]);
    const [currentAboutMeValue, setCurrentAboutMeValue] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [skillPanelTitle, setSkillPanelTitle] = useState("");
    const [skillPanelDesc, setSkillPanelDesc] = useState("");

    const [allSkills, setAllSkills] = useState<SkillsDB[]>([]);

    const [actionButtonName, setActionButtonName] = useState("");
    const [isDeletePanel, setIsDeletePanel] = useState(false);
    const [currentPanelAction, setCurrentPanelAction] = useState("");

    const [skillForm, setSkillForm] = useState<SkillsFormProps>({
        title: "",
        experience: "",
        techUsed: [],
    });
    const [skillID, setSkillID] = useState("");

    const navigate = useNavigate();

    const handlePressAddNewSkill = () => {

        setCurrentPanelAction('add')
        setSkillPanelTitle('Add New Skill')
        setSkillPanelDesc('Add a new skill to the portfolio database.')

        setActionButtonName('Add Skill')
        setIsDeletePanel(false)

        setSkillForm({
            title: "",
            experience: "",
            techUsed: [],
        })
    }

    const handlePressEditSkill = (skillID: string, skillTitle: string, skillExperience: string, skillTechUsed: string[]) => {

        setCurrentPanelAction('update')
        setSkillPanelTitle('Edit Skill')
        setSkillPanelDesc('Edit an existing skill in the portfolio database.')

        setActionButtonName('Save Changes')
        setIsDeletePanel(false)

        setSkillForm({
            title: skillTitle,
            experience: skillExperience,
            techUsed: skillTechUsed,
        })

        setSkillID(skillID)
    }

    const handlePressDeleteSkill = (skillID: string, skillTitle: string) => {

        setCurrentPanelAction('delete')
        setSkillPanelTitle('Delete Skill')
        setSkillPanelDesc('Delete this skill from the portfolio database.')

        setActionButtonName('Delete')
        setIsDeletePanel(true)

        setSkillForm({
            title: skillTitle,
            experience: "",
            techUsed: [],
        })

        setSkillID(skillID)
    }

    // CRUD System

    const readAboutMeContentFromDatabase = async (): Promise<void> => {

        console.log("Trying to read about me content from database")
        setLoading(true);

        try {
            const snap = await getDocs(collection(db, fireStoreCollections.aboutMeSection));
            const data: AboutMeContentDB[] = snap.docs.map((d) => ({
                id: d.id,
                ...(d.data() as Omit<AboutMeContentDB, "id">), // Type assertion for Firestore data
            }));

            setAboutMeContent(data);
            setCurrentAboutMeValue(data[0].content)
        }
        catch (error) {
            console.error("Error reading about me content:", error);
        }
        finally {
            setLoading(false);
        }
    }

    const updateAboutMeContentInDatabase = async (aboutMeContent: string, aboutMeContentID: string) => {

        console.log(`Need to update about me content in database`)
        await updateDoc(doc(db, fireStoreCollections.aboutMeSection, aboutMeContentID), {
            content: aboutMeContent,
        });

        // read database after
        readAboutMeContentFromDatabase();
    }

    // CRUD Skills
    const createSkillInDatabase = async (skill: SkillsFormProps) => {

        console.log(`Need to create new skill (${skill.title}) in database`)
        await addDoc(collection(db, fireStoreCollections.skillsSection), {
            title: skill.title,
            experience: skill.experience,
            techUsed: skill.techUsed,
        });

        // read database after
        readSkillsFromDatabase();
    }

    const readSkillsFromDatabase = async (): Promise<void> => {

        console.log("Trying to read skills from database")
        setLoading(true);

        try {
            const snap = await getDocs(collection(db, fireStoreCollections.skillsSection));
            const data: SkillsDB[] = snap.docs.map((d) => ({
                id: d.id,
                ...(d.data() as Omit<SkillsDB, "id">), // Type assertion for Firestore data
            }));

            setAllSkills(data);
        }
        catch (error) {
            console.error("Error reading skills:", error);
        }
        finally {
            setLoading(false);
        }
    }

    const updateSkillInDatabase = async (skill: SkillsFormProps, skillID: string) => {

        console.log(`Need to update skill (${skill.title}) in database`)
        await updateDoc(doc(db, fireStoreCollections.skillsSection, skillID), {
            title: skill.title,
            experience: skill.experience,
            techUsed: skill.techUsed,
        });

        // read database after
        readSkillsFromDatabase();
    }

    const deleteSkillInDatabase = async (skill: SkillsFormProps, skillID: string) => {

        console.log(`Need to skill post (${skill.title}, ${skillID}) in database`)
        await deleteDoc(doc(db, fireStoreCollections.skillsSection, skillID));

        // read database after
        readSkillsFromDatabase();
    }


    // read projects from database initially
    useEffect(() => {
        readAboutMeContentFromDatabase();

        readSkillsFromDatabase();
    }, []);


    const handleChangeAboutMeContent = (event: ChangeEvent<HTMLTextAreaElement>) => { setCurrentAboutMeValue(event.target.value) };

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
                                    About Me
                                </h1>
                            </div>

                            <div
                                className="flex flex-col w-full space-y-2">

                                <AdminAboutMeContent OnChangesSaved={() => updateAboutMeContentInDatabase(currentAboutMeValue, aboutMeContent[0].id)}
                                    contentValue={currentAboutMeValue} handleInputChanged={handleChangeAboutMeContent} />

                                {allSkills.length == 0 ? (<p className='text-center text-2xl text-zinc-500'>No Skills Yet</p>) : (
                                    <>
                                        <h2 className='text-xl mt-4 px-3'>Skills</h2>

                                        {allSkills.map(({ id, title, experience, techUsed }, index) => (

                                            <AdminProjectPanel key={index}
                                                title={title}
                                                date={experience.toString()} index={index}
                                                OnPressEdit={() => handlePressEditSkill(id, title, experience, techUsed)}
                                                OnPressDelete={() => handlePressDeleteSkill(id, title)} />

                                        ))}
                                    </>
                                )}

                            </div>

                            <div>
                                <AlertDialog.Trigger asChild>
                                    <button
                                        onClick={() => handlePressAddNewSkill()}
                                        className='p-3 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 transition rounded'>
                                        <p>Add New Skill</p>
                                    </button>
                                </AlertDialog.Trigger>

                                <AddPanel>
                                    <SkillDialogPanel currentPanelAction={currentPanelAction} panelTitle={skillPanelTitle} panelDesc={skillPanelDesc}
                                        cancelButtonName='Cancel' actionButtonName={actionButtonName} skillForm={skillForm} skillID={skillID}
                                        isDeleteSkillPanel={isDeletePanel}
                                        setDialogOpen={setIsDialogOpen} onCreateSkill={createSkillInDatabase}
                                        onUpdateSkill={updateSkillInDatabase} onDeleteSkill={deleteSkillInDatabase} />
                                </AddPanel>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AlertDialog.Root>
    )
}

type SkillDialogPanelProps = {

    currentPanelAction: string,
    panelTitle: string,
    panelDesc: string,
    cancelButtonName: string,
    actionButtonName: string,
    skillForm: SkillsFormProps,
    skillID: string,
    isDeleteSkillPanel: boolean,

    setDialogOpen: (open: boolean) => void,
    onCreateSkill: (skill: SkillsFormProps) => Promise<void>;
    onUpdateSkill: (skill: SkillsFormProps, skillID: string) => Promise<void>;
    onDeleteSkill: (skill: SkillsFormProps, skillID: string) => Promise<void>;
}

export const SkillDialogPanel = ({
    currentPanelAction, panelTitle, panelDesc, cancelButtonName, actionButtonName, skillForm, skillID, isDeleteSkillPanel,
    setDialogOpen, onCreateSkill, onUpdateSkill, onDeleteSkill }: SkillDialogPanelProps) => {


    const [currentTitleValue, setCurrentTitleValue] = useState(skillForm.title);
    const [currentExperienceValue, setCurrentExperienceValue] = useState(skillForm.experience);
    const [currentTechUsedValue, setCurrentTechUsedValue] = useState<string[]>(skillForm.techUsed);

    const [warning, setWarning] = useState('');

    const techUsedOptions = getTechNamesArray();

    const isSkillEntryValid = () => {

        return currentTitleValue != '' &&
            currentExperienceValue != '' && currentTechUsedValue.length > 0;
    }

    // handle add skill
    const handlePressActionButton = async () => {

        if (!isSkillEntryValid()) {
            setWarning('Please complete all fields.');
            return;
        }

        const newSkill = {
            title: currentTitleValue,
            experience: currentExperienceValue,
            techUsed: currentTechUsedValue,
        }

        console.log(newSkill)
        console.log(currentPanelAction)

        // Need to save update here
        if (currentPanelAction == 'add') {
            await onCreateSkill(newSkill)
        }
        else if (currentPanelAction == 'update') {
            await onUpdateSkill(newSkill, skillID)
        }

        setWarning('')
        setDialogOpen(false)
    }

    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => { setCurrentTitleValue(event.target.value) };
    const handleChangeExperience = (event: ChangeEvent<HTMLInputElement>) => { setCurrentExperienceValue(event.target.value) };

    if (isDeleteSkillPanel) {
        return (
            <DeleteItemPanel panelTitle={panelTitle} panelDesc={panelDesc} itemName={skillForm.title}
                actionButtonName={actionButtonName} cancelButtonName={cancelButtonName}
                OnDelete={() => onDeleteSkill({
                    title: currentTitleValue,
                    experience: currentExperienceValue,
                    techUsed: currentTechUsedValue,
                }, skillID)} />
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

            <InputField className='' placeholder='Skill Title' type='text' value={currentTitleValue} OnInputChanged={handleChangeTitle} />
            <InputField className='' placeholder='Skill experience (yrs)' type='text' value={currentExperienceValue} OnInputChanged={handleChangeExperience} />
            <TagsInput tagOptions={techUsedOptions} value={currentTechUsedValue} onValueChanged={(value) => setCurrentTechUsedValue(value)} tagLimit={1} />

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


type AdminAboutMeContentProps = {

    OnChangesSaved: () => void,
    contentValue: string,
    handleInputChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void,

}

export const AdminAboutMeContent = ({ OnChangesSaved, contentValue, handleInputChanged }: AdminAboutMeContentProps) => {

    return (
        <div className="flex flex-col space-y-2 font-text mx-3 w-full">

            <h2 className="text-xl">About me header</h2>

            <div>
                <TextAreaField minHeight={200} className="" placeholder="About me text" value={contentValue} OnInputChanged={handleInputChanged} />
                <button
                    onClick={OnChangesSaved}
                    className="text-sm rounded px-2 my-2 text-zinc-400 hover:text-zinc-200 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 transition">
                    Save changes
                </button>
            </div>

        </div>
    )
}
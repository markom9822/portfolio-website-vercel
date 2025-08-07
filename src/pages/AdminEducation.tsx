import { useEffect, useState, type ChangeEvent } from 'react';
import { AlertDialog } from "radix-ui";
import { InputField } from '../ui/InputField';
import { TextAreaField } from '../ui/TextAreaField';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { AddPanel } from '../components/AddPanel';
import { DeleteItemPanel } from '../components/DeleteItemPanel';
import LoaderScreen from '../components/LoadingScreen';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { AdminProjectPanel } from './AdminPanelItem';
import { fireStoreCollections } from '../firebase/fireStoreDatabaseCollections';


export type EducationFormProps = {

    title: string,
    subtitle: string,
    startDate: string,
    endDate: string,
    content: string,
    imageName: string,
}

export interface EducationDB {
    id: string;

    title: string,
    subtitle: string,
    startDate: string,
    endDate: string,
    content: string,
    imageName: string,
}


export const AdminEducation = () => {

    /*const educations = [
        {
            title: "Imperial College London",
            subtitle: "MSc - Biomedical Engineering, Neurotechnology",
            startDate: new Date(2021, 9, 1),
            endDate: new Date(2022, 9, 1),
            content: "Graduated with Merit and received Department of Bioengineering Scholarship.\n" +
                "Masters Thesis: Sensory augmentation with a third eye using Virtual Reality, published in the 2023 IEEE International Conference on Robot and Human Interactive Communication.",
            icon: iclLogo,
        },
        {
            title: "University College Dublin",
            subtitle: "BEng - Biomedical Engineering",
            startDate: new Date(2017, 9, 1),
            endDate: new Date(2021, 9, 1),
            content: "First Class Honors (GPA: 3.72/4.20).\n" +
                "Final Year Thesis: Preliminary and final technical report on sleep stage prediction from wearable sensors using machine learning coded in Python.",
            icon: ucdLogo,
        },
    ];*/

    const [educationPanelTitle, setEducationPanelTitle] = useState("");
    const [educationPanelDesc, setEducationPanelDesc] = useState("");

    const [allEducations, setAllEducation] = useState<EducationDB[]>([]);

    const [actionButtonName, setActionButtonName] = useState("");
    const [isDeletePanel, setIsDeletePanel] = useState(false);
    const [currentPanelAction, setCurrentPanelAction] = useState("");
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [educationForm, setEducationForm] = useState<EducationFormProps>({
        title: "",
        subtitle: "",
        startDate: "",
        endDate: "",
        content: "",
        imageName: "",
    });
    const [educationID, setEducationID] = useState("");

    const navigate = useNavigate();

    const handlePressAddNewEducation = () => {

        setCurrentPanelAction('add')
        setEducationPanelTitle('Add New Education')
        setEducationPanelDesc('Add a new education to the portfolio database.')

        setActionButtonName('Add Education')
        setIsDeletePanel(false)

        setEducationForm({
            title: "",
            subtitle: "",
            startDate: "",
            endDate: "",
            content: "",
            imageName: "",
        })
    }

    const handlePressEditEducation = (educationID: string, educationTitle: string, educationSubtitle: string,
        educationStartDate: string, educationEndDate: string, educationContent: string, educationImageName: string) => {

        setCurrentPanelAction('update')
        setEducationPanelTitle('Edit Education')
        setEducationPanelDesc('Edit an existing education in the portfolio database.')

        setActionButtonName('Save Changes')
        setIsDeletePanel(false)

        setEducationForm({
            title: educationTitle,
            subtitle: educationSubtitle,
            startDate: educationStartDate,
            endDate: educationEndDate,
            content: educationContent,
            imageName: educationImageName,
        })

        setEducationID(educationID)
    }

    const handlePressDeleteEducation = (educationID: string, educationTitle: string) => {

        setCurrentPanelAction('delete')
        setEducationPanelTitle('Delete Education')
        setEducationPanelDesc('Delete this education from the portfolio database.')

        setActionButtonName('Delete')
        setIsDeletePanel(true)

        setEducationForm({
            title: educationTitle,
            subtitle: "",
            startDate: "",
            endDate: "",
            content: "",
            imageName: "",
        })

        setEducationID(educationID)
    }

    // CRUD System
    const createEducationInDatabase = async (education: EducationFormProps) => {

        console.log(`Need to create new education (${education.title}) in database`)
        await addDoc(collection(db, fireStoreCollections.educationSection), {
            title: education.title,
            subtitle: education.subtitle,
            startDate: education.startDate,
            endDate: education.endDate,
            content: education.content,
            imageName: education.imageName,
        });

        // read database after
        readEducationsFromDatabase();
    }

    const readEducationsFromDatabase = async (): Promise<void> => {

        console.log("Trying to read educations from database")
        setLoading(true);

        try {
            const snap = await getDocs(collection(db, fireStoreCollections.educationSection));
            const data: EducationDB[] = snap.docs.map((d) => ({
                id: d.id,
                ...(d.data() as Omit<EducationDB, "id">), // Type assertion for Firestore data
            }));

            setAllEducation(data);
        }
        catch (error) {
            console.error("Error reading education:", error);
        }
        finally {
            setLoading(false);
        }
    }

    const updateEducationInDatabase = async (education: EducationFormProps, educationID: string) => {

        console.log(`Need to update education (${education.title}) in database`)
        await updateDoc(doc(db, fireStoreCollections.educationSection, educationID), {
            title: education.title,
            subtitle: education.subtitle,
            startDate: education.startDate,
            endDate: education.endDate,
            content: education.content,
            imageName: education.imageName,
        });

        // read database after
        readEducationsFromDatabase();
    }

    const deleteEducationInDatabase = async (education: EducationFormProps, educationID: string) => {

        console.log(`Need to delete education (${education.title}, ${educationID}) in database`)
        await deleteDoc(doc(db, fireStoreCollections.educationSection, educationID));

        // read database after
        readEducationsFromDatabase();
    }

    // read projects from database initially
    useEffect(() => {
        readEducationsFromDatabase();
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
                                    Education
                                </h1>
                            </div>

                            <div
                                className="mt-10 flex flex-col w-full">

                                {allEducations.length == 0 ? (<p className='text-center text-2xl text-zinc-500'>No Education Yet</p>) : (
                                    <>
                                        {allEducations.map(({ id, title, subtitle, startDate, endDate, content, imageName }, index) => (

                                            <AdminProjectPanel key={index}
                                                title={title}
                                                date={startDate} index={index}
                                                OnPressEdit={() => handlePressEditEducation(id, title, subtitle, startDate, endDate, content, imageName)}
                                                OnPressDelete={() => handlePressDeleteEducation(id, title)} />

                                        ))}
                                    </>
                                )}

                            </div>

                            <div>
                                <AlertDialog.Trigger asChild>
                                    <button
                                        onClick={() => handlePressAddNewEducation()}
                                        className='p-3 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 transition rounded'>
                                        <p>Add New Education</p>
                                    </button>
                                </AlertDialog.Trigger>

                                <AddPanel>
                                    <EducationDialogPanel currentPanelAction={currentPanelAction} panelTitle={educationPanelTitle} panelDesc={educationPanelDesc}
                                        cancelButtonName='Cancel' actionButtonName={actionButtonName} educationForm={educationForm} educationID={educationID}
                                        isDeleteEducationPanel={isDeletePanel}
                                        setDialogOpen={setIsDialogOpen} onCreateEducation={createEducationInDatabase}
                                        onUpdateEducation={updateEducationInDatabase} onDeleteEducation={deleteEducationInDatabase} />
                                </AddPanel>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </AlertDialog.Root>
    )
}

type EducationDialogPanelProps = {

    currentPanelAction: string,
    panelTitle: string,
    panelDesc: string,
    cancelButtonName: string,
    actionButtonName: string,
    educationForm: EducationFormProps,
    educationID: string,
    isDeleteEducationPanel: boolean,

    setDialogOpen: (open: boolean) => void,
    onCreateEducation: (education: EducationFormProps) => Promise<void>;
    onUpdateEducation: (education: EducationFormProps, educationID: string) => Promise<void>;
    onDeleteEducation: (education: EducationFormProps, educationID: string) => Promise<void>;
}

export const EducationDialogPanel = ({
    currentPanelAction, panelTitle, panelDesc, cancelButtonName, actionButtonName, educationForm, educationID, isDeleteEducationPanel,
    setDialogOpen, onCreateEducation, onUpdateEducation, onDeleteEducation }: EducationDialogPanelProps) => {

    const [currentTitleValue, setCurrentTitleValue] = useState(educationForm.title);
    const [currentSubtitleValue, setCurrentSubtitleValue] = useState(educationForm.subtitle);
    const [currentStartDateValue, setCurrentStartDateValue] = useState(educationForm.startDate);
    const [currentEndDateValue, setCurrentEndDateValue] = useState(educationForm.endDate);
    const [currentContentValue, setCurrentContentValue] = useState(educationForm.content);
    const [currentImageNameValue, setCurrentImageNameValue] = useState<string>(educationForm.imageName);

    const [warning, setWarning] = useState('');

    const isEducationEntryValid = () => {

        return currentTitleValue != '' &&
            currentSubtitleValue != '' && currentEndDateValue != ''
            && currentStartDateValue != '' && currentContentValue != ''
            && currentImageNameValue != '';
    }

    // handle add project
    const handlePressActionButton = async () => {

        if (!isEducationEntryValid()) {
            setWarning('Please complete all fields.');
            return;
        }

        const newEducation = {
            title: currentTitleValue,
            subtitle: currentSubtitleValue,
            startDate: currentStartDateValue,
            endDate: currentEndDateValue,
            content: currentContentValue,
            imageName: currentImageNameValue,
        }

        console.log(newEducation)
        console.log(currentPanelAction)

        // Need to save update here
        if (currentPanelAction == 'add') {
            await onCreateEducation(newEducation)
        }
        else if (currentPanelAction == 'update') {
            await onUpdateEducation(newEducation, educationID)
        }

        setWarning('')
        setDialogOpen(false)
    }

    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => { setCurrentTitleValue(event.target.value) };
    const handleChangeSubtitle = (event: ChangeEvent<HTMLInputElement>) => { setCurrentSubtitleValue(event.target.value) };
    const handleChangeStartDate = (event: ChangeEvent<HTMLInputElement>) => { setCurrentStartDateValue(event.target.value) };
    const handleChangeEndDate = (event: ChangeEvent<HTMLInputElement>) => { setCurrentEndDateValue(event.target.value) };
    const handleChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => { setCurrentContentValue(event.target.value) };
    const handleChangeImageName = (event: ChangeEvent<HTMLInputElement>) => { setCurrentImageNameValue(event.target.value) };

    if (isDeleteEducationPanel) {
        return (
            <DeleteItemPanel panelTitle={panelTitle} panelDesc={panelDesc} itemName={educationForm.title}
                actionButtonName={actionButtonName} cancelButtonName={cancelButtonName}
                OnDelete={() => onDeleteEducation({
                    title: currentTitleValue,
                    subtitle: currentSubtitleValue,
                    startDate: currentStartDateValue,
                    endDate: currentEndDateValue,
                    content: currentContentValue,
                    imageName: currentImageNameValue,
                }, educationID)} />
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

            <InputField className='' placeholder='Education Title' type='text' value={currentTitleValue} OnInputChanged={handleChangeTitle} />
            <InputField className='' placeholder='Education Subtitle' type='text' value={currentSubtitleValue} OnInputChanged={handleChangeSubtitle} />
            <InputField className='' placeholder='Education start date (dd/mm/yyy)' type='date' value={currentStartDateValue} OnInputChanged={handleChangeStartDate} />
            <InputField className='' placeholder='Education end date (dd/mm/yyy)' type='date' value={currentEndDateValue} OnInputChanged={handleChangeEndDate} />
            <TextAreaField className='' placeholder='Education content' value={currentContentValue} OnInputChanged={handleChangeContent} />
            <InputField className='' placeholder='Education image name' type='text' value={currentImageNameValue} OnInputChanged={handleChangeImageName} />

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
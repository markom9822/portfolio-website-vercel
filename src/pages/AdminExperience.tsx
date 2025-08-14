
import { useEffect, useState, type ChangeEvent } from 'react';
import { AlertDialog } from "radix-ui";
import { InputField } from '../ui/InputField';
import { TextAreaField } from '../ui/TextAreaField';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { AddPanel } from '../components/AddPanel';
import { DeleteItemPanel } from '../components/DeleteItemPanel';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { fireStoreCollections } from '../firebase/fireStoreDatabaseCollections';
import LoaderScreen from '../components/LoadingScreen';
import { AdminProjectPanel } from './AdminPanelItem';
import { PageBinding } from '../components/PageBindings';
import paperClip from '/images/paperclip_less.png'


export type ExperiencePositionFormProps = {

    positionName: string,
    positionStartDate: string,
    positionEndDate: string,
    content: string,
}

export type ExperienceFormProps = {

    companyName: string,
    companyIconName: string,
    companyLocation: string,
    companyWebsite: string,
    positions: ExperiencePositionFormProps[],
}

export interface ExperienceDB {
    id: string;

    companyName: string,
    companyIconName: string,
    companyLocation: string,
    companyWebsite: string,
    positions: ExperiencePositionFormProps[],
}

export const AdminExperience = () => {

    const [experiencePanelTitle, setExperiencePanelTitle] = useState("");
    const [experiencePanelDesc, setExperiencePanelDesc] = useState("");

    const [allExperiences, setAllExperiences] = useState<ExperienceDB[]>([]);

    const [actionButtonName, setActionButtonName] = useState("");
    const [isDeletePanel, setIsDeletePanel] = useState(false);
    const [currentPanelAction, setCurrentPanelAction] = useState("");
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [experienceForm, setExperienceForm] = useState<ExperienceFormProps>({
        companyName: "",
        companyIconName: "",
        companyLocation: "",
        companyWebsite: "",
        positions: [],
    });
    const [experienceID, setExperienceID] = useState("");

    const navigate = useNavigate();

    const handlePressAddNewExperience = () => {

        setCurrentPanelAction('add')
        setExperiencePanelTitle('Add New Experience')
        setExperiencePanelDesc('Add a new experience to the portfolio database.')

        setActionButtonName('Add Experience')
        setIsDeletePanel(false)

        setExperienceForm({
            companyName: "",
            companyIconName: "",
            companyLocation: "",
            companyWebsite: "",
            positions: [],
        })
    }

    const handlePressEditExperience = (expID: string, expCompanyName: string, expCompanyIconName: string,
        expCompanyLocation: string, expCompanyWebsite: string, expPositions: ExperiencePositionFormProps[]) => {

        setCurrentPanelAction('update')
        setExperiencePanelTitle('Edit Experience')
        setExperiencePanelDesc('Edit an existing experience in the portfolio database.')

        setActionButtonName('Save Changes')
        setIsDeletePanel(false)

        setExperienceForm({
            companyName: expCompanyName,
            companyIconName: expCompanyIconName,
            companyLocation: expCompanyLocation,
            companyWebsite: expCompanyWebsite,
            positions: expPositions,
        })

        setExperienceID(expID)
    }

    const handlePressDeleteExperience = (expID: string, expCompanyName: string) => {

        setCurrentPanelAction('delete')
        setExperiencePanelTitle('Delete Experience')
        setExperiencePanelDesc('Delete this experience from the portfolio database.')

        setActionButtonName('Delete')
        setIsDeletePanel(true)

        setExperienceForm({
            companyName: expCompanyName,
            companyIconName: "",
            companyLocation: "",
            companyWebsite: "",
            positions: [],
        })

        setExperienceID(expID)
    }

    // CRUD System
    const createExperienceInDatabase = async (experience: ExperienceFormProps) => {

        console.log(`Need to create new experience (${experience.companyName}) in database`)
        await addDoc(collection(db, fireStoreCollections.experienceSection), {
            companyName: experience.companyName,
            companyIconName: experience.companyIconName,
            companyLocation: experience.companyLocation,
            companyWebsite: experience.companyWebsite,
            positions: experience.positions,
        });

        // read database after
        readExperiencesFromDatabase();
    }

    const readExperiencesFromDatabase = async (): Promise<void> => {

        console.log("Trying to read experiences from database")
        setLoading(true);

        try {
            const snap = await getDocs(collection(db, fireStoreCollections.experienceSection));
            const data: ExperienceDB[] = snap.docs.map((d) => ({
                id: d.id,
                ...(d.data() as Omit<ExperienceDB, "id">), // Type assertion for Firestore data
            }));

            setAllExperiences(data);
        }
        catch (error) {
            console.error("Error reading experiences:", error);
        }
        finally {
            setLoading(false);
        }
    }

    const updateExperienceInDatabase = async (experience: ExperienceFormProps, experienceID: string) => {

        console.log(`Need to update experience (${experience.companyName}) in database`)
        await updateDoc(doc(db, fireStoreCollections.experienceSection, experienceID), {
            companyName: experience.companyName,
            companyIconName: experience.companyIconName,
            companyLocation: experience.companyLocation,
            companyWebsite: experience.companyWebsite,
            positions: experience.positions,
        });

        // read database after
        readExperiencesFromDatabase();
    }

    const deleteExperienceInDatabase = async (experience: ExperienceFormProps, experienceID: string) => {

        console.log(`Need to delete experience (${experience.companyName}, ${experienceID}) in database`)
        await deleteDoc(doc(db, fireStoreCollections.experienceSection, experienceID));

        // read database after
        readExperiencesFromDatabase();
    }

    // read experiences from database initially
    useEffect(() => {
        readExperiencesFromDatabase();
    }, []);

    return (
        <AlertDialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="min-h-screen bg-white text-zinc-900 p-6">
                <div className="max-w-5xl mx-auto space-y-12">

                    {loading ? (
                        <LoaderScreen />
                    ) : (

                        <div className="flex flex-col justify-between items-center space-y-8">
                            <div className='flex items-center relative w-full'>
                                <button
                                    onClick={() => navigate('/admin/dashboard')}
                                    className='duration-200 cursor-pointer absolute left-0 flex font-text flex-row items-center space-x-2 text-zinc-800 hover:text-zinc-700'>
                                    <FaArrowLeft />
                                    <p>Dashboard</p>
                                </button>
                                <h1 className="relative mx-auto text-4xl font-bold font-title tracking-tight">
                                    Experience
                                </h1>
                            </div>

                            <div className="bg-[#e9e9e9] rounded relative w-full">

                                <div className='flex flex-row bg-emerald-200 p-4 rounded justify-center mx-4 my-1'>

                                    <div className='absolute w-1/30 left-1/12 sm:left-1/12 md:left-1/15 lg:left-1/13 top-1/400 sm:-top-1/400 md:-top-1/180 lg:-top-1/140 z-0'>
                                        <img
                                            src={paperClip} />
                                    </div>

                                    <PageBinding />

                                    <div
                                        className="flex flex-col space-y-2 justify-center w-11/12">

                                        {allExperiences.length == 0 ? (<p className='text-center text-2xl text-zinc-500'>No Experience Yet</p>) : (
                                            <>
                                                {allExperiences.map(({ id, companyName, companyIconName, companyLocation, companyWebsite, positions }, index) => (

                                                    <AdminProjectPanel key={index}
                                                        title={companyName}
                                                        date={positions[0].positionEndDate} index={index}
                                                        OnPressEdit={() => handlePressEditExperience(id, companyName, companyIconName, companyLocation, companyWebsite, positions)}
                                                        OnPressDelete={() => handlePressDeleteExperience(id, companyName)} />

                                                ))}
                                            </>
                                        )}

                                        <div className='flex justify-center'>
                                            <AlertDialog.Trigger asChild>
                                                <button
                                                    onClick={() => handlePressAddNewExperience()}
                                                    className='p-3 text-lg font-type-bold duration-200 cursor-pointer border-2 border-zinc-800 hover:border-zinc-700 transition rounded'>
                                                    <p>Add New Experience</p>
                                                </button>
                                            </AlertDialog.Trigger>

                                            <AddPanel>
                                                <ExperienceDialogPanel currentPanelAction={currentPanelAction} panelTitle={experiencePanelTitle} panelDesc={experiencePanelDesc}
                                                    cancelButtonName='Cancel' actionButtonName={actionButtonName} experienceForm={experienceForm} experienceID={experienceID}
                                                    isDeleteExpPanel={isDeletePanel}
                                                    setDialogOpen={setIsDialogOpen} onCreateExperience={createExperienceInDatabase}
                                                    onUpdateExperience={updateExperienceInDatabase} onDeleteExperience={deleteExperienceInDatabase} />
                                            </AddPanel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AlertDialog.Root>
    )
}

type ExperienceDialogPanelProps = {

    currentPanelAction: string,
    panelTitle: string,
    panelDesc: string,
    cancelButtonName: string,
    actionButtonName: string,
    experienceForm: ExperienceFormProps,
    experienceID: string,
    isDeleteExpPanel: boolean,

    setDialogOpen: (open: boolean) => void,
    onCreateExperience: (exp: ExperienceFormProps) => Promise<void>;
    onUpdateExperience: (exp: ExperienceFormProps, expID: string) => Promise<void>;
    onDeleteExperience: (exp: ExperienceFormProps, expID: string) => Promise<void>;
}

export const ExperienceDialogPanel = ({
    currentPanelAction, panelTitle, panelDesc, cancelButtonName, actionButtonName, experienceForm, experienceID, isDeleteExpPanel,
    setDialogOpen, onCreateExperience, onUpdateExperience, onDeleteExperience }: ExperienceDialogPanelProps) => {

    const [currentCompanyNameValue, setCurrentCompanyNameValue] = useState(experienceForm.companyName);
    const [currentCompanyIconValue, setCurrentCompanyIconValue] = useState(experienceForm.companyIconName);
    const [currentCompanyLocValue, setCurrentCompanyLocValue] = useState(experienceForm.companyLocation);
    const [currentCompanyWebsiteValue, setCurrentCompanyWebsiteValue] = useState(experienceForm.companyWebsite);
    const [currentCompanyPositionsValue, setCurrentCompanyPositionsValue] = useState<ExperiencePositionFormProps[]>(experienceForm.positions);

    const [warning, setWarning] = useState('');

    const isExpEntryValid = () => {

        return currentCompanyNameValue != '' &&
            currentCompanyIconValue != '' && currentCompanyLocValue != ''
            && currentCompanyWebsiteValue != '' && currentCompanyPositionsValue.length > 0
    }

    // handle add project
    const handlePressActionButton = async () => {

        if (!isExpEntryValid()) {
            setWarning('Please complete all fields.');
            return;
        }

        const newExp = {
            companyName: currentCompanyNameValue,
            companyIconName: currentCompanyIconValue,
            companyLocation: currentCompanyLocValue,
            companyWebsite: currentCompanyWebsiteValue,
            positions: currentCompanyPositionsValue,
        }

        console.log(newExp)
        console.log(currentPanelAction)

        // Need to save update here
        if (currentPanelAction == 'add') {
            await onCreateExperience(newExp)
        }
        else if (currentPanelAction == 'update') {
            await onUpdateExperience(newExp, experienceID)
        }

        setWarning('')
        setDialogOpen(false)
    }

    const handleChangeCompanyName = (event: ChangeEvent<HTMLInputElement>) => { setCurrentCompanyNameValue(event.target.value) };
    const handleChangeCompanyIcon = (event: ChangeEvent<HTMLInputElement>) => { setCurrentCompanyIconValue(event.target.value) };
    const handleChangeCompanyLoc = (event: ChangeEvent<HTMLInputElement>) => { setCurrentCompanyLocValue(event.target.value) };
    const handleChangeCompanyWebsite = (event: ChangeEvent<HTMLInputElement>) => { setCurrentCompanyWebsiteValue(event.target.value) };
    const handleChangePositions = (positions: ExperiencePositionFormProps[]) => { setCurrentCompanyPositionsValue(positions) };

    const handleAddPosition = () => {

        const copy = [...currentCompanyPositionsValue]
        copy.push({
            positionName: "",
            positionStartDate: "",
            positionEndDate: "",
            content: "",
        })

        setCurrentCompanyPositionsValue(copy);
    }

    const handleRemovePosition = () => {

        const copy = [...currentCompanyPositionsValue]
        copy.pop();
        setCurrentCompanyPositionsValue(copy);
    }

    if (isDeleteExpPanel) {
        return (
            <DeleteItemPanel panelTitle={panelTitle} panelDesc={panelDesc} itemName={experienceForm.companyName}
                actionButtonName={actionButtonName} cancelButtonName={cancelButtonName}
                OnDelete={() => onDeleteExperience({
                    companyName: currentCompanyNameValue,
                    companyIconName: currentCompanyIconValue,
                    companyLocation: currentCompanyLocValue,
                    companyWebsite: currentCompanyWebsiteValue,
                    positions: currentCompanyPositionsValue,
                }, experienceID)} />
        )
    }

    return (
        <>
            <AlertDialog.Title className='text-3xl font-bold mb-2 text-zinc-800 font-title'>
                {panelTitle}
            </AlertDialog.Title>

            <AlertDialog.Description className='text-base font-type-bold text-zinc-800'>
                {panelDesc}
            </AlertDialog.Description>

            <InputField className='' placeholder='Company name' type='text' value={currentCompanyNameValue} OnInputChanged={handleChangeCompanyName} />
            <InputField className='' placeholder='Company icon link' type='text' value={currentCompanyIconValue} OnInputChanged={handleChangeCompanyIcon} />
            <InputField className='' placeholder='Company location' type='text' value={currentCompanyLocValue} OnInputChanged={handleChangeCompanyLoc} />
            <InputField className='' placeholder='Company website' type='text' value={currentCompanyWebsiteValue} OnInputChanged={handleChangeCompanyWebsite} />

            <div className='flex flex-row items-center border-b-3 border-dashed border-b-zinc-800 space-x-4'>
                <h3 className="text-xl text-zinc-800 font-title">Positions</h3>
            </div>

            <div className='space-y-6'>
                {currentCompanyPositionsValue.map(({ positionName, positionStartDate, positionEndDate, content }, index) => (

                    <PositionItem key={index} index={index} positionNameValue={positionName} positionStartDateValue={positionStartDate}
                        positionEndDateValue={positionEndDate} contentValue={content} currentPositionsArray={currentCompanyPositionsValue}
                        handlePositionValueChanged={handleChangePositions} />
                ))}

                <div className='flex flex-row'>
                    <button
                        onClick={handleAddPosition}
                        title='Add position'
                        className='flex text-zinc-800 rounded hover:text-zinc-700 duration-200 cursor-pointer transition'>
                        <CiSquarePlus size={30} />
                    </button>

                    {currentCompanyPositionsValue.length > 0 && (
                        <button
                            onClick={handleRemovePosition}
                            title='Remove position'
                            className='flex text-zinc-800 rounded hover:text-zinc-700 duration-200 cursor-pointer transition'>
                            <CiSquareMinus size={30} />
                        </button>
                    )}
                </div>
            </div>

            {warning && <div className="text-red-500 font-title">{warning}</div>}

            <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
                <AlertDialog.Cancel asChild>
                    <button className="font-title text-zinc-800 rounded hover:text-zinc-700 px-2 duration-200 cursor-pointer border-2 border-zinc-800 hover:border-zinc-700 transition">
                        {cancelButtonName}
                    </button>
                </AlertDialog.Cancel>
                <button
                    onClick={handlePressActionButton}
                    className="font-title text-zinc-800 rounded hover:text-zinc-700 px-2 duration-200 cursor-pointer border-2 border-zinc-800 hover:border-zinc-700 transition">
                    {actionButtonName}
                </button>
            </div>
        </>
    )
}

type PositionItemProps = {

    index: number,
    positionNameValue: string,
    positionStartDateValue: string,
    positionEndDateValue: string,
    contentValue: string,
    handlePositionValueChanged: (positions: ExperiencePositionFormProps[]) => void,
    currentPositionsArray: ExperiencePositionFormProps[],
}

export const PositionItem = ({ index, positionNameValue, positionStartDateValue, positionEndDateValue,
    contentValue, handlePositionValueChanged, currentPositionsArray }: PositionItemProps) => {

    const editPositionValue = (updates: Partial<ExperiencePositionFormProps>) => {
        const copy = [...currentPositionsArray];
        copy[index] = {
            ...copy[index], // keep existing properties
            ...updates     // override with updates
        };
        handlePositionValueChanged(copy);
    }

    return (
        <div className='space-y-2 border-b-2 border-b-zinc-600 pb-6'>
            <InputField className='' placeholder='Position title' type='text' value={positionNameValue} OnInputChanged={(e) => editPositionValue({ positionName: e.target.value })} />
            <InputField className='' placeholder='Position start date (dd/mm/yyyy)' type='date' value={positionStartDateValue} OnInputChanged={(e) => editPositionValue({ positionStartDate: e.target.value })} />
            <InputField className='' placeholder='Position end date (dd/mm/yyyy)' type='date' value={positionEndDateValue} OnInputChanged={(e) => editPositionValue({ positionEndDate: e.target.value })} />
            <TextAreaField className='' placeholder='Position content' value={contentValue} OnInputChanged={(e) => editPositionValue({ content: e.target.value })} />
        </div>
    )
}
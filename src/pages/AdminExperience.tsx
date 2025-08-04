
import { useState } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { AlertDialog } from "radix-ui";
import { InputField } from '../ui/InputField';
import { TextAreaField } from '../ui/TextAreaField';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { formatDateToDDMMYYYY } from '../utils/helper';
import { canadaFlagIcon, ukFlagIcon } from '../components/Icons';
import type { PositionProps } from '../components/ExperienceSection';
import { CiSquarePlus } from "react-icons/ci";
import { AddPanel } from '../components/AddPanel';
import { DeleteItemPanel } from '../components/DeleteItemPanel';


export const fundamentalXRIcon = (
    <a href="https://www.fundamentalxr.com/" target="_blank">
        <img title="fundamental XR" width="70" height="70" style={{ borderRadius: '5px' }} src="https://media.licdn.com/dms/image/v2/D4E0BAQErgOdEMxhblQ/company-logo_100_100/B4EZhbLsnvGoAQ-/0/1753876450155/fundamentalxr_logo?e=1756944000&amp;v=beta&amp;t=uiFf15VZzO_rZqm5FJTnbHnSsYlVrJz1UkHqs1UxO8Q">
        </img>
    </a>
)

export const torontoWesternIcon = (
    <a href="https://www.uhn.ca/OurHospitals/TWH" target="_blank">
        <img title="Toronto Western Hospital" width="70" height="70" style={{ borderRadius: '5px' }} src="https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/64x64/d16277a55a092dba9723d56f2303b455"></img>
    </a>
)

export const yCountryCampIcon = (
    <a href="https://ycountrycamp.com/" target="_blank">
        <img title="Y Country Camp" width="70" height="70" style={{ borderRadius: '5px' }} src="https://raisedays-storage.s3.ca-central-1.amazonaws.com/public/00d892f1-61d2-432d-9ca9-40d2f3a1490f.jpeg"></img>
    </a>
)

export const AdminExperience = () => {

    const experiences = [
        {
            companyName: "fundamental XR",
            companyIcon: fundamentalXRIcon,
            companyLocation: "London, United Kingdom",
            locationFlag: ukFlagIcon,
            positions: [
                {
                    positionName: "Software Engineer",
                    positionStartDate: new Date(2024, 4, 1),
                    positionEndDate: new Date(2025, 6, 30),
                    content: "Developed industry leading and reusable tech for haptic arms, this work featured in multiple commercial products delivering highly accurate and realistic VR medical simulations.\n" +
                        "Learnt C++ and implemented Test Driven Development (TDD) into the haptic arm codebase.\n" +
                        "Used version control software (Sourcetree and Git), partook in regular code reviews and pair programming sessions."
                },
                {
                    positionName: "Associate Software Engineer",
                    positionStartDate: new Date(2023, 1, 1),
                    positionEndDate: new Date(2024, 4, 30),
                    content: "Made several presentations to the engineering team and wider company on project progress and my personal work.\n" +
                        "Contributed heavily to award winning commercial products ranging from simulating eyeball surgery replicating real-life scenarios with medical equipment.\n" +
                        "Built interactive and user-friendly user interfaces inside of virtual operating rooms.",
                },
                {
                    positionName: "Intern Software Engineer",
                    positionStartDate: new Date(2022, 9, 1),
                    positionEndDate: new Date(2023, 1, 1),
                    content: "Completed internship training and passed code test within 2 months and worked on a commercial product.\n" +
                        "Developed multiple games in Unity engine through C# and presented the results to colleagues; this included still photos of the games as well as a live demo.\n" +
                        "Completed C# coding course on Codecademy website to improve knowledge.",
                },
            ]
        },
        {
            companyName: "Toronto Western Hospital",
            companyIcon: torontoWesternIcon,
            companyLocation: "Toronto, Ontario, Canada",
            locationFlag: canadaFlagIcon,
            positions: [
                {
                    positionName: "Research Assistant",
                    positionStartDate: new Date(2019, 6, 1),
                    positionEndDate: new Date(2020, 8, 1),
                    content: "Analyzed medical device patents towards an upcoming paper on inventiveness among the interventional radiologist community.\n" +
                        "Generated reports in Excel on medical device patent trends, identifying oversaturated and upcoming markets for potential future devices; this report showed that medical device patents are on an upward trend which was unexpected.\n" +
                        "Presented results from my analysis to Professor Kieran Murphy and a group of medical students; this showed that many patents had expired as the owner failed to pay fees.\n" +
                        "Instructed the medical students involved on how to continue my work including, what database was used, how patents were verified and how to structure the report.\n" +
                        "Constructed a questionnaire for patent holders to obtain unavailable information online alongside other team members."
                }
            ]
        },
        {
            companyName: "Y Country Camp",
            companyIcon: yCountryCampIcon,
            companyLocation: "Montreal, Quebec, Canada",
            locationFlag: canadaFlagIcon,
            positions: [
                {
                    positionName: "Lifeguard/Coach",
                    positionStartDate: new Date(2018, 6, 1),
                    positionEndDate: new Date(2018, 7, 30),
                    content: "Coordinated with lifeguard colleagues to run safe and enjoyable water activities for campers; all campers were safe with no serious injuries or drownings.\n" +
                        "Instructed mixed groups of campers between ages 8 to 16 years in swimming lessons.\n" +
                        "Supervised campers during mealtimes, recreational activities and during the night.\n" +
                        "Organized evening activities for campers such as basketball games or playing board games together; this garnered praise from the Camp Director at the end of camp staff meeting."
                }
            ]
        },
    ];

    const [experiencePanelTitle, setExperiencePanelTitle] = useState("");
    const [experiencePanelDesc, setExperiencePanelDesc] = useState("");

    const [actionButtonName, setActionButtonName] = useState("");
    const [isDeletePanel, setIsDeletePanel] = useState(false);

    const [currentExperienceCompanyName, setCurrentExperienceCompanyName] = useState("");
    const [currentExperienceCompanyLocation, setCurrentExperienceCompanyLocation] = useState("");
    const [currentExperiencePositions, setCurrentExperiencePositions] = useState<PositionProps[]>([]);


    const navigate = useNavigate();

    const handlePressAddNewExperience = () => {

        setExperiencePanelTitle('Add New Experience')
        setExperiencePanelDesc('Add new experience to the portfolio database.')

        setActionButtonName('Add Experience')
        setIsDeletePanel(false)

        setCurrentExperienceCompanyName('')
        setCurrentExperienceCompanyLocation('')
        setCurrentExperiencePositions([])
    }

    const handlePressEditExperience = (experienceCompanyName: string, experienceCompanyLocation: string, experiencePositions: PositionProps[]) => {

        setExperiencePanelTitle('Edit Experience')
        setExperiencePanelDesc('Edit an existing experience to the portfolio database.')

        setActionButtonName('Save Changes')
        setIsDeletePanel(false)

        setCurrentExperienceCompanyName(experienceCompanyName)
        setCurrentExperienceCompanyLocation(experienceCompanyLocation)
        setCurrentExperiencePositions(experiencePositions)
    }

    const handlePressDeleteExperience = (experienceCompanyName: string) => {

        setExperiencePanelTitle('Delete Experience')
        setExperiencePanelDesc('Delete this experience in the portfolio database.')

        setActionButtonName('Delete')
        setIsDeletePanel(true)

        setCurrentExperienceCompanyName(experienceCompanyName)
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
                                Experience
                            </h1>
                        </div>


                        <div
                            className="mt-10 flex flex-col w-full">

                            {experiences.map(({ companyName, companyLocation, positions }, index) => (

                                <AdminExperiencePanel companyName={companyName} companyLocation={companyLocation} index={index}
                                    OnPressEdit={() => handlePressEditExperience(companyName, companyLocation, positions)}
                                    OnPressDelete={() => handlePressDeleteExperience(companyName)} />

                            ))}

                        </div>

                        <div>
                            <AlertDialog.Trigger asChild>
                                <button
                                    onClick={() => handlePressAddNewExperience()}
                                    className='p-3 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 transition rounded'>
                                    <p>Add New Experience</p>
                                </button>
                            </AlertDialog.Trigger>

                            <AddPanel>
                                <ExperienceDialogPanel panelTitle={experiencePanelTitle} panelDesc={experiencePanelDesc} cancelButtonName='Cancel'
                                        actionButtonName={actionButtonName} companyNameValue={currentExperienceCompanyName}
                                        companyLocationValue={currentExperienceCompanyLocation} positionsValue={currentExperiencePositions} isDeleteExperiencePanel={isDeletePanel} />

                            </AddPanel>
                        </div>

                    </div>
                </div>
            </div>

        </AlertDialog.Root>
    )
}

type ExperienceDialogPanelProps = {

    panelTitle: string,
    panelDesc: string,

    cancelButtonName: string,
    actionButtonName: string,
    companyNameValue: string,
    companyLocationValue: string,
    positionsValue: PositionProps[]
    isDeleteExperiencePanel: boolean
}

export const ExperienceDialogPanel = ({ panelTitle, panelDesc, cancelButtonName, actionButtonName, companyNameValue, companyLocationValue, positionsValue, isDeleteExperiencePanel }: ExperienceDialogPanelProps) => {

    if (isDeleteExperiencePanel) {
        return (
            <DeleteItemPanel panelTitle={panelTitle} panelDesc={panelDesc} itemName={companyNameValue} actionButtonName={actionButtonName} cancelButtonName={cancelButtonName}/>
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

            <InputField className='' placeholder='Experience company name' type='text' value={companyNameValue} />
            <InputField className='' placeholder='Experience company location' type='text' value={companyLocationValue} />

            <div className='flex flex-row items-center border-b-2 border-b-zinc-400 space-x-4'>
                <h3 className="text-xl text-zinc-200 font-text">Positions</h3>

                <button 
                title='Add position'
                className='text-zinc-400 rounded hover:text-zinc-200 duration-200 cursor-pointer transition'>
                    <CiSquarePlus size={30} />
                </button>
            </div>

            <div className='space-y-6'>
                {positionsValue.map(({ positionName, positionStartDate, positionEndDate, content }) => (

                    <PositionItem positionNameValue={positionName} positionStartDateValue={formatDateToDDMMYYYY(positionStartDate)}
                        positionEndDateValue={formatDateToDDMMYYYY(positionEndDate)} contentValue={content} />
                ))}
            </div>

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

type PositionItemProps = {

    positionNameValue: string,
    positionStartDateValue: string,
    positionEndDateValue: string,
    contentValue: string,
}

export const PositionItem = ({ positionNameValue, positionStartDateValue, positionEndDateValue, contentValue }: PositionItemProps) => {

    return (
        <div className='space-y-2 border-b-2 border-b-zinc-600 pb-6'>
            <InputField className='' placeholder='Position title' type='text' value={positionNameValue} />
            <InputField className='' placeholder='Position start date (dd/mm/yyyy)' type='text' value={positionStartDateValue} />
            <InputField className='' placeholder='Position end date (dd/mm/yyyy)' type='text' value={positionEndDateValue} />
            <TextAreaField className='' placeholder='Position content' value={contentValue} />
        </div>
    )
}


type AdminExperiencePanelProps = {

    companyName: string,
    companyLocation: string,
    index: number,
    OnPressEdit: () => void,
    OnPressDelete: () => void,

}

export const AdminExperiencePanel = ({ companyName, index, OnPressEdit, OnPressDelete }: AdminExperiencePanelProps) => {

    //const formattedDate = startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

    return (
        <div
            className="w-full">
            <div
                className="group flex flex-row justify-between items-center p-2 py-4 w-full rounded">
                <div className="border-b-2 border-b-zinc-500 flex flex-row justify-between items-center w-full py-2">

                    <div className="flex flex-row items-center space-x-6">
                        <div className="px-2.5 py-1 text-sm bg-zinc-900 group-hover:bg-zinc-700 font-bold font-text text-zinc-400 group-hover:text-zinc-300 rounded transition">{index + 1}</div>
                        <h3 className="text-xl font-semibold text-zinc-400 group-hover:text-zinc-300 group-hover:translate-x-1 transition font-text">{companyName}</h3>
                    </div>

                    <div className="flex flex-row items-center space-x-4">

                        <AlertDialog.Trigger asChild>
                            <button
                                onClick={OnPressEdit}
                                title='Edit education'
                                className='p-2 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 text-zinc-400 hover:text-zinc-200 transition rounded'>
                                <FaRegEdit className='' />
                            </button>
                        </AlertDialog.Trigger>

                        <AlertDialog.Trigger asChild>
                            <button
                                onClick={OnPressDelete}
                                title='Delete education'
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
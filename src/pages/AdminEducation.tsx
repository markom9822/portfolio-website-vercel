
import { useState } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { AlertDialog } from "radix-ui";
import { InputField } from '../ui/InputField';
import { TextAreaField } from '../ui/TextAreaField';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { formatDateToDDMMYYYY } from '../utils/helper';
import iclLogo from '/images/icl_logo.png';
import ucdLogo from '/images/ucd_logo.png';
import { AddPanel } from '../components/AddPanel';
import { DeleteItemPanel } from '../components/DeleteItemPanel';


export const AdminEducation = () => {

    const educations = [
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
    ];

    const [educationPanelTitle, setEducationPanelTitle] = useState("");
    const [actionButtonName, setActionButtonName] = useState("");
    const [isDeletePanel, setIsDeletePanel] = useState(false);

    const [currentEducationTitle, setCurrentEducationTitle] = useState("");
    const [currentEducationSubtitle, setCurrentEducationSubtitle] = useState("");
    const [currentEducationStartDate, setCurrentEducationStartDate] = useState("");
    const [currentEducationEndDate, setCurrentEducationEndDate] = useState("");
    const [currentEducationContent, setCurrentEducationContent] = useState("");

    const navigate = useNavigate();

    const handlePressAddNewEducation = () => {

        setEducationPanelTitle('Add New Education')
        setActionButtonName('Add Project')
        setIsDeletePanel(false)

        setCurrentEducationTitle('')
        setCurrentEducationSubtitle('')
        setCurrentEducationStartDate('')
        setCurrentEducationEndDate('')
        setCurrentEducationContent('')
    }

    const handlePressEditEducation = (educationTitle: string, educationSubtitle: string, educationStartDate: string, educationEndDate: string, educationContent: string) => {

        setEducationPanelTitle('Edit Education')
        setActionButtonName('Save Changes')
        setIsDeletePanel(false)

        setCurrentEducationTitle(educationTitle)
        setCurrentEducationSubtitle(educationSubtitle)
        setCurrentEducationStartDate(educationStartDate)
        setCurrentEducationEndDate(educationEndDate)
        setCurrentEducationContent(educationContent)
    }

    const handlePressDeleteEducation = (educationTitle: string) => {

        setEducationPanelTitle('Delete Education')
        setActionButtonName('Delete')
        setIsDeletePanel(true)

        setCurrentEducationTitle(educationTitle)
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
                                Education
                            </h1>
                        </div>


                        <div
                            className="mt-10 flex flex-col w-full">

                            {educations.map(({ title, subtitle, startDate, endDate, content }, index) => (

                                <AdminEducationPanel title={title} subtitle={subtitle} startDate={startDate}
                                    endDate={endDate} index={index} 
                                    OnPressEdit={() => handlePressEditEducation(title, subtitle, formatDateToDDMMYYYY(startDate), formatDateToDDMMYYYY(endDate), content)}
                                    OnPressDelete={() => handlePressDeleteEducation(title)} />

                            ))}

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
                                <EducationDialogPanel panelTitle={educationPanelTitle} cancelButtonName='Cancel'
                                        actionButtonName={actionButtonName} titleValue={currentEducationTitle}
                                        subtitleValue={currentEducationSubtitle} startDateValue={currentEducationStartDate} endDateValue={currentEducationEndDate}
                                        contentValue={currentEducationContent} isDeleteEducationPanel={isDeletePanel} />
                            </AddPanel>
                        </div>

                    </div>
                </div>
            </div>

        </AlertDialog.Root>
    )
}

type EducationDialogPanelProps = {

    panelTitle: string,
    cancelButtonName: string,
    actionButtonName: string,
    titleValue: string,
    subtitleValue: string,
    startDateValue: string,
    endDateValue: string,
    contentValue: string,
    isDeleteEducationPanel: boolean
}

export const EducationDialogPanel = ({ panelTitle, cancelButtonName, actionButtonName, titleValue, subtitleValue, startDateValue, endDateValue, contentValue, isDeleteEducationPanel }: EducationDialogPanelProps) => {

    if (isDeleteEducationPanel) {
        return (
            <DeleteItemPanel panelTitle={panelTitle} itemName={titleValue} actionButtonName={actionButtonName} cancelButtonName={cancelButtonName}/>
        )
    }

    return (
        <>
            <h2 className="text-3xl font-bold mb-4 text-zinc-200 font-text">{panelTitle}</h2>

            <InputField className='' placeholder='Education Title' type='text' value={titleValue} />
            <InputField className='' placeholder='Education subtitle' type='text' value={subtitleValue} />
            <InputField className='' placeholder='Education start date (dd/mm/yyy)' type='text' value={startDateValue} />
            <InputField className='' placeholder='Education end date (dd/mm/yyy)' type='text' value={endDateValue} />
            <TextAreaField className='' placeholder='Education content' value={contentValue} />

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


type AdminEducationPanelProps = {

    title: string,
    subtitle: string,
    startDate: Date,
    endDate: Date,
    index: number,
    OnPressEdit: () => void,
    OnPressDelete: () => void,

}

export const AdminEducationPanel = ({ title, index, OnPressEdit, OnPressDelete }: AdminEducationPanelProps) => {

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
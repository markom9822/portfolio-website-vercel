
import { useState, type ChangeEvent } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { AlertDialog } from "radix-ui";
import { InputField } from '../ui/InputField';
import { TextAreaField } from '../ui/TextAreaField';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { formatDateToDDMMYYYY } from '../utils/helper';
import healthTrackerImage from '/images/health_tracker.png'
import insideShapesImage from '/images/inside_shape.png';
import intersectionPointImage from '/images/intersection_points.png';
import customGizmoImage from '/images/custom_gizmos.png';
import { AddPanel } from '../components/AddPanel';
import { DeleteItemPanel } from '../components/DeleteItemPanel';


export const AdminPosts = () => {

    const blogPosts = [
        {
            title: "Health Tracker",
            description: "Automated health tracker system to help keep you on track. Presents your data in a readable format with graphs and statistics." +
                "\nThe system uses Google Forms, Google Sheets, Looker Studio and Google Apps Script. Health related data is sent from your Garmin watch and sent to your Google Drive." +
                " At a scheduled time a script is triggered to find the latest data sent, this data is processed and stored in a Google Sheet document along with your daily input into the Google Form.\n" +
                "This is finally displayed with graphs and statistics on a page in Looker Studio.",
            publishDate: new Date(2024, 4, 31),
            blogLink: "https://medium.com/@markomeara98/health-tracker-using-google-forms-sheets-f5107471aec3",
            image: healthTrackerImage,
        },
        {
            title: "Inside Shapes",
            description: "An exploration into algorithms to determine if a point is inside of different shapes.\n" +
                "Built an algorithm to check if a point is inside of a 2D polygon of arbitrary shape and size. This is a well known problem in computer graphics and my approach solves this using a ray cast algorithm." +
                "This works by checking the number of intersections between a ray in one direction and the boundaries of our shape, giving efficient and accurate results.\n" +
                "Also built a method to check if a point is inside of a cuboid using vector projections in 3D space (via the dot product).",
            publishDate: new Date(2023, 5, 5),
            blogLink: "https://medium.com/@markomeara98/check-inside-shapes-in-unity-99253fd3d815",
            image: insideShapesImage,
        },
        {
            title: "Intersection Points",
            description: "Algorithms to calculate intersection points with different shapes.\n",
            publishDate: new Date(2023, 2, 5),
            blogLink: "https://medium.com/@markomeara98/calculating-intersection-points-in-unity-cf010c155491",
            image: intersectionPointImage,
        },
        {
            title: "Custom Gizmo Shapes",
            description: "Creating custom gizmo shapes in Unity.\n",
            publishDate: new Date(2023, 4, 18),
            blogLink: "https://medium.com/@markomeara98/custom-gizmo-shapes-in-unity-8357c254d809",
            image: customGizmoImage,
        },
    ];

    const [postPanelTitle, setPostPanelTitle] = useState("");
    const [postPanelDesc, setPostPanelDesc] = useState("");

    const [actionButtonName, setActionButtonName] = useState("");
    const [isDeletePanel, setIsDeletePanel] = useState(false);

    const [currentPostTitle, setCurrentPostTitle] = useState("");
    const [currentPostDesc, setCurrentPostDesc] = useState("");
    const [currentPostUrl, setCurrentPostUrl] = useState("");
    const [currentPostPublishDate, setCurrentPostPublishDate] = useState("");


    const navigate = useNavigate();

    const handlePressAddNewPost = () => {

        setPostPanelTitle('Add New Post')
        setPostPanelDesc('Add a new post to the portfolio database.')

        setActionButtonName('Add Post')
        setIsDeletePanel(false)

        setCurrentPostTitle('')
        setCurrentPostDesc('')
        setCurrentPostUrl('')
        setCurrentPostPublishDate('')
    }

    const handlePressEditPost = (postTitle: string, postDesc: string, postUrl: string, postStartDate: string) => {

        setPostPanelTitle('Edit Post')
        setPostPanelDesc('Edit an existing post in the portfolio database.')

        setActionButtonName('Save Changes')
        setIsDeletePanel(false)

        setCurrentPostTitle(postTitle)
        setCurrentPostDesc(postDesc)
        setCurrentPostUrl(postUrl)
        setCurrentPostPublishDate(postStartDate)
    }

    const handlePressDeletePost = (postTitle: string) => {

        setPostPanelTitle('Delete Post')
        setPostPanelDesc('Delete this post from the portfolio database.')

        setActionButtonName('Delete')
        setIsDeletePanel(true)

        setCurrentPostTitle(postTitle)
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
                                Posts
                            </h1>
                        </div>


                        <div
                            className="mt-10 flex flex-col w-full">

                            {blogPosts.map(({ title, description, blogLink, publishDate, image }, index) => (

                                <AdminPostPanel title={title} description={description} postLink={blogLink}
                                    publishDate={publishDate} image={image} index={index}
                                    OnPressEdit={() => handlePressEditPost(title, description, blogLink, formatDateToDDMMYYYY(publishDate))}
                                    OnPressDelete={() => handlePressDeletePost(title)} />

                            ))}

                        </div>

                        <div>
                            <AlertDialog.Trigger asChild>
                                <button
                                    onClick={() => handlePressAddNewPost()}
                                    className='p-3 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 transition rounded'>
                                    <p>Add New Post</p>
                                </button>
                            </AlertDialog.Trigger>

                            <AddPanel>
                                <PostDialogPanel panelTitle={postPanelTitle} panelDesc={postPanelDesc} cancelButtonName='Cancel'
                                    actionButtonName={actionButtonName} titleValue={currentPostTitle}
                                    descriptionValue={currentPostDesc} urlValue={currentPostUrl} publishDateValue={currentPostPublishDate}
                                    isDeletePostPanel={isDeletePanel} />
                            </AddPanel>
                        </div>

                    </div>
                </div>
            </div>

        </AlertDialog.Root>
    )
}

type PostDialogPanelProps = {

    panelTitle: string,
    panelDesc: string,

    cancelButtonName: string,
    actionButtonName: string,
    titleValue: string,
    descriptionValue: string,
    urlValue: string,
    publishDateValue: string,
    isDeletePostPanel: boolean
}

export const PostDialogPanel = ({ panelTitle, panelDesc, cancelButtonName, actionButtonName, titleValue, descriptionValue, urlValue, publishDateValue, isDeletePostPanel }: PostDialogPanelProps) => {

    const [currentTitleValue, setCurrentTitleValue] = useState(titleValue);
    const [currentLinkValue, setCurrentLinkValue] = useState(urlValue);
    const [currentDateValue, setCurrentDateValue] = useState(publishDateValue);

    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitleValue(event.target.value)
    };   

    const handleChangeLink = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentLinkValue(event.target.value)
    };

    const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentDateValue(event.target.value)
    };


    if (isDeletePostPanel) {
        return (
            <DeleteItemPanel panelTitle={panelTitle} panelDesc={panelDesc} itemName={titleValue} actionButtonName={actionButtonName} cancelButtonName={cancelButtonName} />
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

            <InputField className='' placeholder='Post Title' type='text' value={currentTitleValue} OnInputChanged={handleChangeTitle} />
            <TextAreaField className='' placeholder='Post description' value={descriptionValue}/>
            <InputField className='' placeholder='Post url' type='text' value={currentLinkValue} OnInputChanged={handleChangeLink}/>
            <InputField className='' placeholder='Post start date (dd/mm/yyy)' type='text' value={currentDateValue} OnInputChanged={handleChangeDate} />


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


type AdminPostPanelProps = {

    title: string,
    description: string,
    postLink: string,
    publishDate: Date,
    image: any,
    index: number,
    OnPressEdit: () => void,
    OnPressDelete: () => void,

}

export const AdminPostPanel = ({ title, index, OnPressEdit, OnPressDelete }: AdminPostPanelProps) => {

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
                                title='Edit post'
                                className='p-2 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 text-zinc-400 hover:text-zinc-200 transition rounded'>
                                <FaRegEdit className='' />
                            </button>
                        </AlertDialog.Trigger>

                        <AlertDialog.Trigger asChild>
                            <button
                                onClick={OnPressDelete}
                                title='Delete post'
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
import { useEffect, useState, type ChangeEvent } from 'react';
import { AlertDialog } from "radix-ui";
import { InputField } from '../ui/InputField';
import { TextAreaField } from '../ui/TextAreaField';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

import { AddPanel } from '../components/AddPanel';
import { DeleteItemPanel } from '../components/DeleteItemPanel';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import LoaderScreen from '../components/LoadingScreen';
import { AdminProjectPanel } from './AdminPanelItem';
import { fireStoreCollections } from '../firebase/fireStoreDatabaseCollections';
import { PageBinding } from '../components/PageBindings';
import paperClip from '/images/paperclip_less.png'


export type PostFormProps = {

    title: string,
    description: string,
    publishDate: string,
    blogLink: string,
    imageName: string,
}

export interface PostDB {
    id: string;

    title: string,
    description: string,
    publishDate: string,
    blogLink: string,
    imageName: string,
}


export const AdminPosts = () => {

    const [postPanelTitle, setPostPanelTitle] = useState("");
    const [postPanelDesc, setPostPanelDesc] = useState("");

    const [allPosts, setAllPosts] = useState<PostDB[]>([]);

    const [actionButtonName, setActionButtonName] = useState("");
    const [isDeletePanel, setIsDeletePanel] = useState(false);
    const [currentPanelAction, setCurrentPanelAction] = useState("");
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [postForm, setPostForm] = useState<PostFormProps>({
        title: "",
        description: "",
        publishDate: "",
        blogLink: "",
        imageName: "",
    });
    const [postID, setPostID] = useState("");

    const navigate = useNavigate();

    const handlePressAddNewPost = () => {

        setCurrentPanelAction('add')
        setPostPanelTitle('Add New Post')
        setPostPanelDesc('Add a new post to the portfolio database.')

        setActionButtonName('Add Post')
        setIsDeletePanel(false)

        setPostForm({
            title: "",
            description: "",
            publishDate: "",
            blogLink: "",
            imageName: "",
        })
    }

    const handlePressEditProject = (postID: string, postTitle: string, postDesc: string,
        postPublishDate: string, postBlogLink: string, postImageName: string) => {

        setCurrentPanelAction('update')
        setPostPanelTitle('Edit Post')
        setPostPanelDesc('Edit an existing post in the portfolio database.')

        setActionButtonName('Save Changes')
        setIsDeletePanel(false)

        setPostForm({
            title: postTitle,
            description: postDesc,
            publishDate: postPublishDate,
            blogLink: postBlogLink,
            imageName: postImageName,
        })

        setPostID(postID)
    }

    const handlePressDeleteProject = (postID: string, postTitle: string) => {

        setCurrentPanelAction('delete')
        setPostPanelTitle('Delete Post')
        setPostPanelDesc('Delete this post from the portfolio database.')

        setActionButtonName('Delete')
        setIsDeletePanel(true)

        setPostForm({
            title: postTitle,
            description: "",
            publishDate: "",
            blogLink: "",
            imageName: "",
        })

        setPostID(postID)
    }

    // CRUD System
    const createPostInDatabase = async (post: PostFormProps) => {

        console.log(`Need to create new post (${post.title}) in database`)
        await addDoc(collection(db, fireStoreCollections.postsSection), {
            title: post.title,
            description: post.description,
            publishDate: post.publishDate,
            blogLink: post.blogLink,
            imageName: post.imageName,
        });

        // read database after
        readPostsFromDatabase();
    }

    const readPostsFromDatabase = async (): Promise<void> => {

        console.log("Trying to read posts from database")
        setLoading(true);

        try {
            const snap = await getDocs(collection(db, fireStoreCollections.postsSection));
            const data: PostDB[] = snap.docs.map((d) => ({
                id: d.id,
                ...(d.data() as Omit<PostDB, "id">), // Type assertion for Firestore data
            }));

            setAllPosts(data);
        }
        catch (error) {
            console.error("Error reading posts:", error);
        }
        finally {
            setLoading(false);
        }
    }

    const updatePostInDatabase = async (post: PostFormProps, postID: string) => {

        console.log(`Need to update post (${post.title}) in database`)
        await updateDoc(doc(db, fireStoreCollections.postsSection, postID), {
            title: post.title,
            description: post.description,
            publishDate: post.publishDate,
            blogLink: post.blogLink,
            imageName: post.imageName,
        });

        // read database after
        readPostsFromDatabase();
    }

    const deletePostInDatabase = async (post: PostFormProps, postID: string) => {

        console.log(`Need to delete post (${post.title}, ${postID}) in database`)
        await deleteDoc(doc(db, fireStoreCollections.postsSection, postID));

        // read database after
        readPostsFromDatabase();
    }

    // read projects from database initially
    useEffect(() => {
        readPostsFromDatabase();
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
                                    className='duration-200 cursor-pointer absolute left-0 flex font-title flex-row items-center space-x-2 text-zinc-800 hover:text-zinc-700'>
                                    <FaArrowLeft />
                                    <p>Dashboard</p>
                                </button>
                                <h1 className=" relative mx-auto text-4xl font-bold font-title tracking-tight">
                                    Posts
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

                                        {allPosts.length == 0 ? (<p className='text-center text-2xl text-zinc-500'>No Posts Yet</p>) : (
                                            <>
                                                {allPosts.map(({ id, title, description, blogLink, publishDate, imageName }, index) => (

                                                    <AdminProjectPanel key={index}
                                                        title={title}
                                                        date={publishDate} index={index}
                                                        OnPressEdit={() => handlePressEditProject(id, title, description, publishDate, blogLink, imageName)}
                                                        OnPressDelete={() => handlePressDeleteProject(id, title)} />

                                                ))}
                                            </>
                                        )}
                                        <div className='flex justify-center'>
                                            <AlertDialog.Trigger asChild>
                                                <button
                                                    onClick={() => handlePressAddNewPost()}
                                                    className='p-3 text-lg font-type-bold duration-200 cursor-pointer border-2 border-zinc-800 hover:border-zinc-700 transition rounded'>
                                                    <p>Add New Post</p>
                                                </button>
                                            </AlertDialog.Trigger>

                                            <AddPanel>
                                                <PostDialogPanel currentPanelAction={currentPanelAction} panelTitle={postPanelTitle} panelDesc={postPanelDesc}
                                                    cancelButtonName='Cancel' actionButtonName={actionButtonName} postForm={postForm} postID={postID}
                                                    isDeletePostPanel={isDeletePanel}
                                                    setDialogOpen={setIsDialogOpen} onCreatePost={createPostInDatabase}
                                                    onUpdatePost={updatePostInDatabase} onDeletePost={deletePostInDatabase} />
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

type PostDialogPanelProps = {

    currentPanelAction: string,
    panelTitle: string,
    panelDesc: string,
    cancelButtonName: string,
    actionButtonName: string,
    postForm: PostFormProps,
    postID: string,
    isDeletePostPanel: boolean,

    setDialogOpen: (open: boolean) => void,
    onCreatePost: (post: PostFormProps) => Promise<void>;
    onUpdatePost: (post: PostFormProps, projectID: string) => Promise<void>;
    onDeletePost: (post: PostFormProps, projectID: string) => Promise<void>;
}

export const PostDialogPanel = ({
    currentPanelAction, panelTitle, panelDesc, cancelButtonName, actionButtonName, postForm, postID, isDeletePostPanel,
    setDialogOpen, onCreatePost, onUpdatePost, onDeletePost }: PostDialogPanelProps) => {


    const [currentTitleValue, setCurrentTitleValue] = useState(postForm.title);
    const [currentDescValue, setCurrentDescValue] = useState(postForm.description);
    const [currentBlogLinkValue, setCurrentBlogLinkValue] = useState(postForm.blogLink);
    const [currentPublishDateValue, setCurrentPublishDateValue] = useState(postForm.publishDate);
    const [currentImageNameValue, setCurrentImageNameValue] = useState<string>(postForm.imageName);

    const [warning, setWarning] = useState('');

    const isPostEntryValid = () => {

        return currentTitleValue != '' &&
            currentDescValue != '' && currentBlogLinkValue != ''
            && currentPublishDateValue != ''
            && currentImageNameValue != '';
    }

    // handle add project
    const handlePressActionButton = async () => {

        if (!isPostEntryValid()) {
            setWarning('Please complete all fields.');
            return;
        }

        const newPost = {
            title: currentTitleValue,
            description: currentDescValue,
            publishDate: currentPublishDateValue,
            blogLink: currentBlogLinkValue,
            imageName: currentImageNameValue,
        }

        console.log(newPost)
        console.log(currentPanelAction)

        // Need to save update here
        if (currentPanelAction == 'add') {
            await onCreatePost(newPost)
        }
        else if (currentPanelAction == 'update') {
            await onUpdatePost(newPost, postID)
        }

        setWarning('')
        setDialogOpen(false)
    }

    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => { setCurrentTitleValue(event.target.value) };
    const handleChangeDesc = (event: ChangeEvent<HTMLTextAreaElement>) => { setCurrentDescValue(event.target.value) };
    const handleChangeBlogLink = (event: ChangeEvent<HTMLInputElement>) => { setCurrentBlogLinkValue(event.target.value) };
    const handleChangePublishDate = (event: ChangeEvent<HTMLInputElement>) => { setCurrentPublishDateValue(event.target.value) };
    const handleChangeImageName = (event: ChangeEvent<HTMLInputElement>) => { setCurrentImageNameValue(event.target.value) };

    if (isDeletePostPanel) {
        return (
            <DeleteItemPanel panelTitle={panelTitle} panelDesc={panelDesc} itemName={postForm.title}
                actionButtonName={actionButtonName} cancelButtonName={cancelButtonName}
                OnDelete={() => onDeletePost({
                    title: currentTitleValue,
                    description: currentDescValue,
                    publishDate: currentPublishDateValue,
                    blogLink: currentBlogLinkValue,
                    imageName: currentImageNameValue,
                }, postID)} />
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

            <InputField className='' placeholder='Post Title' type='text' value={currentTitleValue} OnInputChanged={handleChangeTitle} />
            <TextAreaField className='' placeholder='Post description' value={currentDescValue} OnInputChanged={handleChangeDesc} />
            <InputField className='' placeholder='Post publish date (dd/mm/yyy)' type='date' value={currentPublishDateValue} OnInputChanged={handleChangePublishDate} />
            <InputField className='' placeholder='Post url' type='text' value={currentBlogLinkValue} OnInputChanged={handleChangeBlogLink} />
            <InputField className='' placeholder='Post image name' type='text' value={currentImageNameValue} OnInputChanged={handleChangeImageName} />

            {warning && <div className="text-red-500 font-text">{warning}</div>}

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
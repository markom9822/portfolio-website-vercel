
import { useEffect, useState, type ChangeEvent } from 'react';
import { AlertDialog } from "radix-ui";
import { TextAreaField } from '../ui/TextAreaField';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

import LoaderScreen from '../components/LoadingScreen';

import {
    collection,
    getDocs,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { fireStoreCollections } from '../firebase/fireStoreDatabaseCollections';


export interface AboutMeContentDB {
    id: string;

    content: string,
}


export const AdminAboutMe = () => {

    const [loading, setLoading] = useState(false);
    const [aboutMeContent, setAboutMeContent] = useState<AboutMeContentDB[]>([]);
    const [currentAboutMeValue, setCurrentAboutMeValue] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const navigate = useNavigate();

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

    // read projects from database initially
    useEffect(() => {
        readAboutMeContentFromDatabase();
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
                                className="flex flex-col w-full">

                                <AdminAboutMeContent OnChangesSaved={() => updateAboutMeContentInDatabase(currentAboutMeValue, aboutMeContent[0].id)}
                                    contentValue={currentAboutMeValue} handleInputChanged={handleChangeAboutMeContent} />

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AlertDialog.Root>
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
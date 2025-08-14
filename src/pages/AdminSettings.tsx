
import { useEffect, useState } from 'react';
import { AlertDialog } from "radix-ui";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import LoaderScreen from '../components/LoadingScreen';
import { PageBinding } from '../components/PageBindings';
import paperClip from '/images/paperclip_less.png'


export const AdminSettings = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {

    }, []);


    return (
        <AlertDialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="min-h-screen bg-white text-zinc-900 p-6 font-text">
                <div className="max-w-5xl mx-auto space-y-12">

                    {false ? (
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
                                    Settings
                                </h1>
                            </div>

                            <div className="bg-[#e9e9e9] rounded relative w-full">

                                <div className='flex flex-row h-screen bg-emerald-200 p-4 rounded justify-center mx-4 my-1'>

                                    <div className='absolute w-1/30 left-1/12 sm:left-1/12 md:left-1/15 lg:left-1/13 top-1/400 sm:-top-1/400 md:-top-1/180 lg:-top-1/140 z-0'>
                                        <img
                                            src={paperClip} />
                                    </div>

                                    <PageBinding />

                                    <div
                                        className="flex flex-col space-y-2 justify-center w-11/12">

                                        <p>Not much here yet</p>

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

import { useEffect, useState } from 'react';
import { AlertDialog } from "radix-ui";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import LoaderScreen from '../components/LoadingScreen';

export const AdminSettings = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {

    }, []);


    return (
        <AlertDialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="min-h-screen bg-[#0f0f0f] text-white p-6 font-text">
                <div className="max-w-5xl mx-auto space-y-12">

                    {false ? (
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
                                    Settings
                                </h1>
                            </div>

                            <div className="flex flex-col w-full space-y-2">

                                <p>Not much here yet</p>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AlertDialog.Root>
    )
}
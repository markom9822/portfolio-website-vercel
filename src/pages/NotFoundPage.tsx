import { useNavigate } from "react-router-dom";
import { PageBinding } from "../components/PageBindings";
import tape from '/images/tape.png'


export const NotFoundPage = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 font-title">
            <div
                className="relative w-full flex flex-row justify-center max-w-md p-6 bg-emerald-200 backdrop-blur-md rounded-lg shadow-xl space-y-5">

                <img 
                src={tape} 
                style={{ }}
                className="absolute w-full -top-1/15 sm:-top-1/7 md:-top-1/6 lg:-top-1/3 opacity-90" />

                <PageBinding />
            
                <div className="px-5 w-11/12 font-text">
                    <h1 className="text-2xl font-bold text-zinc-900 text-center py-3">
                        Error - 404
                    </h1>

                    <p>{"Something went wrong :("}</p>
                    <br></br>
                    <p>{"Please return to the homepage with the button below"}</p>


                    <div className="flex flex-col space-y-2 py-5">
                        <button
                            onClick={() => navigate("/")}
                            className="text-zinc-900 bg-emerald-400 hover:bg-emerald-300 p-3 rounded-lg hover:text-zinc-800 duration-200 cursor-pointer transition">
                            <p className="text-lg">Homepage</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
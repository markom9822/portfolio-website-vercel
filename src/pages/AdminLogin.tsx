import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../ui/InputField";
import { signInUser, signInWithGoogle } from "../firebase/firebaseAuth";
import { googleIcon } from "../components/Icons";
import { PageBinding } from "../components/PageBindings";
import tape from '/images/tape.png'


export const AdminLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");


    const navigate = useNavigate();

    const handleSignInPressed = async () => {

        const user = await signInUser(email, password);
        if (user) {
            navigate("/admin/dashboard")
        }
        else {
            setLoginError("Incorrect email or password")
        }
    }

    const handleSignInWithGooglePressed = async () => {

        const user = await signInWithGoogle();
        if (user) {
            navigate("/admin/dashboard")
        }
        else {
            setLoginError("Sign in with Google failed")
        }
    }


    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 font-title">
            <div
                className="relative w-full flex flex-row justify-center max-w-md p-6 bg-emerald-200 backdrop-blur-md rounded-lg shadow-xl space-y-5">

                <img 
                src={tape} 
                style={{ }}
                className="absolute w-full -top-1/15 sm:-top-1/7 md:-top-1/6 lg:-top-1/5 opacity-90" />

                <PageBinding />
            
                <div className="px-5 w-11/12">
                    <h1 className="text-2xl text-zinc-900 text-center py-3">
                        Access the Admin Dashboard
                    </h1>

                    <div className="space-y-3">
                        <InputField className='' placeholder='Email' type='email' value={email} OnInputChanged={(e) => setEmail(e.target.value)} />
                        <InputField className='' placeholder='Password' type='password' value={password} OnInputChanged={(e) => setPassword(e.target.value)} />

                        {loginError && <p className="text-sm text-red-500 text-center">{loginError}</p>}
                    </div>

                    <div className="flex flex-col space-y-2 py-5">
                        <button
                            onClick={handleSignInPressed}
                            className="text-zinc-900 bg-emerald-400 p-3 rounded-lg hover:text-zinc-800 duration-200 cursor-pointer transition">
                            <p className="text-lg font-type-bold">Log In</p>
                        </button>

                        <p className="text-zinc-800 text-center text-sm">Or</p>

                        <button
                            onClick={handleSignInWithGooglePressed}
                            className="text-zinc-800 bg-emerald-300 p-3 rounded-lg hover:text-zinc-700 duration-200 cursor-pointer transition">
                            <div className="flex flex-row items-center justify-center space-x-3">
                                {googleIcon}
                                <p className="text-lg font-type-bold">Sign in with Google</p>
                            </div>
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../ui/InputField";
import { signInUser, signInWithGoogle } from "../firebase/firebaseAuth";
import { googleIcon } from "../components/Icons";


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
        <div className="min-h-screen bg-black flex items-center justify-center px-4 font-text">
            <div
                className="w-full flex flex-col justify-center max-w-md p-6 bg-zinc-900/60 backdrop-blur-md border border-zinc-700 rounded-2xl shadow-xl space-y-5">
                <h1 className="text-2xl text-white text-center font-text">
                    Access the Admin Dashboard
                </h1>

                <div className="space-y-3">
                    <InputField className='' placeholder='Email' type='email' value={email} OnInputChanged={(e) => setEmail(e.target.value)} />
                    <InputField className='' placeholder='Password' type='password' value={password} OnInputChanged={(e) => setPassword(e.target.value)} />

                    {loginError && <p className="text-sm text-red-500 text-center">{loginError}</p>}
                </div>

                <div className="flex flex-col space-y-3">
                    <button
                        onClick={handleSignInPressed}
                        className="text-zinc-700 border-2 border-zinc-500 bg-zinc-400 hover:border-zinc-200 p-3 rounded-lg hover:text-zinc-900 duration-200 cursor-pointer transition">
                        Log In
                    </button>

                    <p className="text-zinc-200 text-center text-sm">Or</p>

                    <button
                        onClick={handleSignInWithGooglePressed}
                        className="text-zinc-400 border-2 border-zinc-500 hover:border-zinc-200 p-3 rounded-lg hover:text-zinc-200 duration-200 cursor-pointer transition">
                        <div className="flex flex-row items-center justify-center space-x-3">
                            {googleIcon}
                            <p>Sign in with Google</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

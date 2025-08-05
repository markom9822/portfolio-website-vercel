import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../ui/InputField";
import { signInUser, signInWithGoogle } from "../firebase/firebaseAuth";


export const AdminLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");


    const navigate = useNavigate();

    const handleSignInPressed = async () => {

        const user = await signInUser(email, password);
        if(user)
        {
            navigate("/admin/dashboard")
        }
        else
        {
            setLoginError("Incorrect email or password")
        }
    }

    const handleSignInWithGooglePressed = async () => {

        const user = await signInWithGoogle();
        if(user)
        {
            navigate("/admin/dashboard")
        }
        else
        {
            setLoginError("Sign in with Google failed")
        }
    }


    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 font-text">
            <div
                className="w-full flex flex-col justify-center max-w-sm p-6 bg-zinc-900/60 backdrop-blur-md border border-zinc-700 rounded-2xl shadow-xl space-y-4">
                <h1 className="text-2xl font-semibold text-white text-center font-text">
                    Access the Admin Dashboard
                </h1>

                <InputField className='' placeholder='Email' type='email' value={email} OnInputChanged={(e) => setEmail(e.target.value)} />
                <InputField className='' placeholder='Password' type='password' value={password} OnInputChanged={(e) => setPassword(e.target.value)} />

                {loginError && <p className="text-sm text-red-500 text-center">{loginError}</p>}

                <button 
                onClick={handleSignInPressed}
                className="text-zinc-400 border-2 border-zinc-500 hover:border-zinc-200 p-3 rounded-lg hover:text-zinc-200 duration-200 cursor-pointer transition">
                    Sign In
                </button>

                <button 
                onClick={handleSignInWithGooglePressed}
                className="text-zinc-400 border-2 border-zinc-500 hover:border-zinc-200 p-3 rounded-lg hover:text-zinc-200 duration-200 cursor-pointer transition">
                    Sign In with Google
                </button>

                
            </div>
        </div>
    )
}

import { useState } from "react";


export const AdminLogin = () => {
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 font-text">
            <div
                className="w-full max-w-sm p-6 bg-zinc-900/60 backdrop-blur-md border border-zinc-700 rounded-2xl shadow-xl space-y-4">
                <h1 className="text-2xl font-bold text-white text-center font-text">
                    Access the Admin Dashboard
                </h1>
            </div>
        </div>
    )
}

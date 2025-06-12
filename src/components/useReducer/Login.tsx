import { useState } from "react";

interface LoginProps {
    dispatch: React.Dispatch<{ type: string; payload?: any }>;
}

const Login = ({dispatch}: LoginProps) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const handleLogin = () => {
        dispatch({ type: 'LOGIN', payload: {name,email} })
    }
    return (
        <>
            <h1>Login</h1>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={() => handleLogin()}>Login</button>
        </>
    )
}

export default Login;
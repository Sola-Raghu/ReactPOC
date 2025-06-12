interface WelcomeProps {
    user: {
        name: string;
        email?: string;
    };
    dispatch: React.Dispatch<{ type: string; payload?: any }>;
}

const Welcome = ({ user, dispatch }: WelcomeProps) => {
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT',payload: null });
        console.log('User logged out');
    };

    return (
        <div>
            <h1>Welcome, {user.name}!</h1>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};


export default Welcome;
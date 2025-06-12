import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./Login";
import Welcome from "./Welcome";

const Entry = () => {
    const { state, dispatch } = useAuth();
    console.log('state', state);
    if (state.isAuthenticated) {
        return <Welcome user={state.user} dispatch={dispatch} />;
    } else if (state.error) {
        return (
            <div>
                <h1>{state.error}</h1>
                <button onClick={() => dispatch({ type: 'SET_ERROR', payload: null })}>Clear Error</button>
            </div>
        );
    } else {
        return <Login dispatch={dispatch} />;
    }
};

const UseReducerDemo = () => (
    <AuthProvider>
        <Entry />
    </AuthProvider>
);

export default UseReducerDemo;
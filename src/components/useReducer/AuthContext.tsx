import { createContext, useContext, useReducer } from "react";

interface actionProps {
    type: string;
    payload?: any;
}
type AuthState = {
    isAuthenticated: boolean;
    user: any;
    error: string | null;
}

function authReducer(state: AuthState, action: actionProps): AuthState {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: null,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null,
};

const AuthContext = createContext<{
    state: AuthState;
    dispatch: React.Dispatch<actionProps>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};


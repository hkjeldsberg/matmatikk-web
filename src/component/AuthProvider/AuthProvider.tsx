import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react';
import Cookies from 'js-cookie';
import {User} from "../../model/User";
import {fetchUser} from "../../service/UserService";

interface AuthContextType {
    isLoggedIn: boolean;
    user?: User;
    token?: string;
    login: (token: string, user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [token, setToken] = useState<string>();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const loadUser = async () => {
            const token = Cookies.get('loginToken');
            if (token) {
                const user = await fetchUser(token);
                login(token, user);
            }
        };
        loadUser();
    }, []);

    const login = (token: string, user: User) => {
        // TODO Update expiry time in prod
        const inTenMinutes = new Date(Date.now() + 599 * 1000);
        Cookies.set('loginToken', token, {expires: inTenMinutes});
        setToken(token);
        setUser(user);
        setLoggedIn(true);
    };

    return (
        <AuthContext.Provider
            value={{isLoggedIn, user, token, login}}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

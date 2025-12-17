import { createContext, useEffect, useState, type PropsWithChildren } from "react"
import { User, users } from '../data/user-mock.data';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated'

interface UserContextProps {
    // State
    authStatus: AuthStatus;
    user: User | null
    isAuthenticated: boolean;

    // Methods
    login: (userId: number) => boolean; 
    logout: () => void;
}


export const UserContext = createContext({} as UserContextProps);   

// HOC
export const UserContextProvider = ({ children }: PropsWithChildren) => {
    const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
    const [user, setUser] = useState<User|null>(null);

    // Inicio de sesion
    const handleLogin = (userId: number) => {
      const user = users.find((user) => user.id === userId);
      // si el usuario no existe
      if(!user){
        console.log(`user not found ${userId}`);
        setUser(null);
        setAuthStatus('not-authenticated');
        return false;
      }
      // si el usuario existe
      setUser(user);
      setAuthStatus('authenticated');
      localStorage.setItem('userId', userId.toString());
      return true;
    }

    // cerrar sesion
    const handleLogout = () => {
        console.log('logout');
        setAuthStatus('not-authenticated');
        setUser(null);
        localStorage.removeItem('userId');
    };

    // limpiar el almacenamiento local
    useEffect(() => {
      const storedUserId = localStorage.getItem('userId');
      if(storedUserId){
        handleLogin(+storedUserId);
        return;
      }
      handleLogout();
    },[])


  return <UserContext value={{
    authStatus: authStatus,
    isAuthenticated: authStatus === 'authenticated',

    user: user,
    login: handleLogin,
    logout:handleLogout,
  }}>{children}</UserContext>
}

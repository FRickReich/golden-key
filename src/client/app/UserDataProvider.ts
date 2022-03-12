import { createContext } from 'react';

export type GlobalContent = {
    user: {
        data: any, 
        loggedIn: boolean;
     },
    setUser:(input : any) => void
}

const UserDataContext = createContext<GlobalContent>({
    user: { data: 'any', loggedIn: false },
    setUser: () =>
    {
        // ...empty function
    }
});

export { UserDataContext };

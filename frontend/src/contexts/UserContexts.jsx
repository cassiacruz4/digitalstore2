import React from 'react'
import { createContext, useState } from 'react'
export const UserContexts = createContext(null)
export const UserProvider = ({children})=> {
    let [user, setUsed] = useState ()
    return (
        <UserContexts.Provider value={{user, setUsed}} >
            {children}
        </UserContexts.Provider>
    )
}

    

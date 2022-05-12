// @ts-nocheck
import React, { createContext, useState} from "react";


export const UserContext = createContext()
const UserProvider = ({children}) => {
    const [dataExported, setDataExported] = useState(false);
    


return(
    <UserContext.Provider 
    value ={{dataExported,
        setDataExported
            }}>
        {children}
    </UserContext.Provider>
)


}

export default UserProvider
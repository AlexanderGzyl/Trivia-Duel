// @ts-nocheck
import {useContext, createContext,useEffect,useState} from 'react';
import { 
    GoogleAuthProvider,
    signInWithRedirect, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../Firebase'

const AuthContext = createContext()

export const AuthContextProvider = ({children})=> {
    const [user, setUser] = useState(null)
    //sign in
    const googleSignIn =()=>{
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth,provider);
    }
    const logOut = () => {
        signOut(auth)
        console.log("bye")
    }
    //
    useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
    })
    return () => {
        unsubscribe();
    }
    },[])
    return(
        <AuthContext.Provider value ={{googleSignIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}
//access through hook
export const UserAuth = ()=>{
    return useContext(AuthContext)
}
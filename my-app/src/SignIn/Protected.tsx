// @ts-nocheck
import React from 'react';
import {Navigate} from 'react-router-dom'
import { UserAuth } from '../Context/AuthContext';
const Protected = ({children}) => {
    const {user} = UserAuth();
    if (!user) {
        console.log(user)
        return<Navigate to ='/'/>
    }
return(
    children
)

}

export default Protected
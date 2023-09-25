import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLogin,selectEmail } from '../../redux/slices/authSlice'

const AdminHidden = ({children}) => {
    const email = useSelector(selectEmail)
    if(email === 'admin2003@gmail.com'){
        return children
    }
    return null;
}

export default AdminHidden
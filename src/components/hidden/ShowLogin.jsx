import React from 'react'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { selectIsLogin } from '../../redux/slices/authSlice'
const ShowLogin = ({children}) => {
    const isLogin = useSelector(selectIsLogin)
    if(isLogin){
        return children
    }
    return null;
}
export const ShowLogout = ({children}) =>{
    const isLogin = useSelector(selectIsLogin)
    if(!isLogin){
        return children
    }
    return null;
}


export default ShowLogin
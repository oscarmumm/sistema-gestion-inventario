import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const ProtectedRoute = ({children, allowedRoles}) => {
    const {user} = useContext(UserContext)
    console.log("User Context:", user);
    if(!user) {
        return <Navigate to='/' replace />
    }
    if(allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to='/unauthorized' replace />
    }
    return children

}
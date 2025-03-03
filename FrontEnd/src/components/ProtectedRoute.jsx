import { useContext, useEffect } from "react";
import {UserDataContext} from '../context/UserContext';
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(UserDataContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login"); 
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null; 
};

export default ProtectedRoute;

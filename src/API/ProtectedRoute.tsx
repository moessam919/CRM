import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkAuth } from "../store/API/act/actGetCheckAuth";
import LoginPopup from "../Pages/LoginPopup";  
const ProtectedRoute = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, loading } = useAppSelector(
        (state) => state.ApiSlice
    );
    const [initialCheckDone, setInitialCheckDone] = useState(false);

    useEffect(() => {
        dispatch(checkAuth()).then(() => {
            setInitialCheckDone(true);
        });
    }, [dispatch]);

    if (!initialCheckDone || loading === "pending") {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-300 border-solid border-opacity-50"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // window.location.href = "http://localhost:8000/auth/login";
        // return null;
           return <LoginPopup />;
            // window.location.href = "https://erp.rashodi.online/auth/login";

    }

    return <Outlet />;
};

export default ProtectedRoute;
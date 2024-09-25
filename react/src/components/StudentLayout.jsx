import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function StudentLayout() {
    const { token, user } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (user.role !== "student") {
        return <Navigate to="/unauthorized" />;
    }

    return (
        <div>
            StudentLayout
            <Outlet />
        </div>
    );
}

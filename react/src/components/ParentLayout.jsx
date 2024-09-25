import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function ParentLayout() {
    const { token, user } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (user.role !== "parent") {
        return <Navigate to="/unauthorized" />;
    }

    return (
        <div>
            ParentLayout
            <Outlet />
        </div>
    );
}

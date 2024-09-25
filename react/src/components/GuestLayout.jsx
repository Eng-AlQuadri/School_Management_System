import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
    const { token, user } = useStateContext();

    if (token) {
        switch (user.role) {
            case "parent":
                return <Navigate to="/parent" />;
            case "admin":
                return <Navigate to="/admin/dashboard" />;
            case "student":
                return <Navigate to="/student" />;
            case "teacher":
                return <Navigate to="/teacher" />;
            default:
                return <Navigate to="*" />;
        }
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}

import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupsIcon from "@mui/icons-material/Groups";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SchoolIcon from "@mui/icons-material/School";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MessageIcon from "@mui/icons-material/Message";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function AdminLayout() {
    const { selectedIndex, setSelectedIndex, notification, setToken, setUser } =
        useStateContext();

    const [isClose, setIsClose] = useState(
        localStorage.getItem("IS_CLOSE") === "true"
    );

    const [isOpen, setIsOpen] = useState(
        localStorage.getItem("IS_OPEN") === "true"
    );

    const navigate = useNavigate();

    const navClick = (index) => {
        // For Logout
        if (index == 13) {
            setNotification("Logout...");
            axiosClient.post("/logout").then(() => {
                setToken("");
                setUser(null);
            });
        }

        // For Messages
        if (index == 1) {
            navigate("/admin/chats");
        }
        setSelectedIndex(index);
        localStorage.setItem("SCHOOL_LIST", index);
    };

    const sidebar = () => {
        if (isClose) {
            setIsClose(false);
            setIsOpen(false);
            localStorage.setItem("IS_CLOSE", "false");
            localStorage.setItem("IS_OPEN", "false");
        } else {
            setIsClose(true);
            setIsOpen(true);
            localStorage.setItem("IS_CLOSE", "true");
            localStorage.setItem("IS_OPEN", "true");
        }
    };

    const { token, user, setNotification } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    // Then check if the user is not an admin
    if (user.role !== "admin") {
        return <Navigate to="/unauthorized" />; // You could redirect to a different route
    }

    return (
        <div className="defaultLayout">
            <div className="upperBar">
                <div className="holder">
                    <span className="icon">
                        <MenuIcon onClick={sidebar} />
                    </span>
                    <span className="settingsHolder">
                        <h4>{user.name}</h4>
                        <div className="logoutIcon">
                            <MessageIcon onClick={() => navClick(1)} />
                        </div>
                        <ul>
                            <li>Account Settings</li>
                            <li>Logout</li>
                        </ul>
                    </span>
                </div>
            </div>
            <div className={isClose ? "aside closed" : "aside"}>
                <ul>
                    <li>
                        <span className="icon">
                            <SchoolIcon />
                        </span>
                        <span className="title">School System</span>
                    </li>
                    <li
                        onClick={() => navClick(2)}
                        className={selectedIndex == 2 ? "selected" : ""}
                    >
                        <Link to="dashboard">
                            <span className="icon">
                                <DashboardIcon />
                            </span>
                            <span className="title">Dashboard</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(3)}
                        className={selectedIndex == 3 ? "selected" : ""}
                    >
                        <Link to="admins">
                            <span className="icon">
                                <AdminPanelSettingsIcon />
                            </span>
                            <span className="title">Admins</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(4)}
                        className={selectedIndex == 4 ? "selected" : ""}
                    >
                        <Link to="teachers">
                            <span className="icon">
                                <GroupsIcon />
                            </span>
                            <span className="title">Teachers</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(5)}
                        className={selectedIndex == 5 ? "selected" : ""}
                    >
                        <Link to="students">
                            <span className="icon">
                                <SchoolIcon />
                            </span>
                            <span className="title">Students</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(6)}
                        className={selectedIndex == 6 ? "selected" : ""}
                    >
                        <Link to="parents">
                            <span className="icon">
                                <FamilyRestroomIcon />
                            </span>
                            <span className="title">Parents</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(7)}
                        className={selectedIndex == 7 ? "selected" : ""}
                    >
                        <Link to="academics/options">
                            <span className="icon">
                                <DesignServicesIcon />
                            </span>
                            <span className="title">Academic</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(8)}
                        className={selectedIndex == 8 ? "selected" : ""}
                    >
                        <Link to="fees/options">
                            <span className="icon">
                                <AttachMoneyIcon />
                            </span>
                            <span className="title">Fees</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(9)}
                        className={selectedIndex == 9 ? "selected" : ""}
                    >
                        <Link to="examination/options">
                            <span className="icon">
                                <AutoStoriesIcon />
                            </span>
                            <span className="title">Examination</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(10)}
                        className={selectedIndex == 10 ? "selected" : ""}
                    >
                        <Link to="attendance/options">
                            <span className="icon">
                                <NotListedLocationIcon />
                            </span>
                            <span className="title">Attendance</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(11)}
                        className={selectedIndex == 11 ? "selected" : ""}
                    >
                        <Link to="homework/options">
                            <span className="icon">
                                <AddHomeWorkIcon />
                            </span>
                            <span className="title">Homework</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(12)}
                        className={selectedIndex == 12 ? "selected" : ""}
                    >
                        <Link to="my-account">
                            <span className="icon">
                                <ManageAccountsIcon />
                            </span>
                            <span className="title">My Account</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(13)}
                        className={selectedIndex == 13 ? "selected" : ""}
                    >
                        <span className="icon">
                            <LogoutIcon />
                        </span>
                        <span className="title">Logout</span>
                    </li>
                </ul>
            </div>
            <div className={isOpen ? "pageContent opened" : "pageContent"}>
                <Outlet />
            </div>
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";

export default function MyAccount() {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState({});

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCurrentUser();
    }, []);

    const getCurrentUser = () => {
        setLoading(true);
        axiosClient
            .get(`/user`)
            .then(({ data }) => {
                setLoading(false);
                setCurrentUser(data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onEdit = (id) => {
        navigate(`edit/${id}`);
    };

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>My Account</h2>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Options</th>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="loading">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            <tr key={currentUser.id}>
                                <td>{currentUser.id}</td>
                                <td>{currentUser.name}</td>
                                <td>{currentUser.email}</td>
                                <td>
                                    {currentUser.status == 0
                                        ? "Offline"
                                        : "Online"}
                                </td>
                                <td className="options">
                                    <button
                                        className="edit"
                                        onClick={() => onEdit(currentUser.id)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Admins() {
    const navigate = useNavigate();

    const addAdmin = () => {
        navigate("/admin/admins/new");
    };

    const [admins, setAdmins] = useState([]);

    const [loading, setLoading] = useState(false);

    const { setNotification, user } = useStateContext();

    useEffect(() => {
        getAdmins();
    }, []);

    const getAdmins = () => {
        setLoading(true);
        axiosClient
            .get("/admins")
            .then(({ data }) => {
                setLoading(false);
                setAdmins(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onEdit = (a) => {
        navigate(`/admin/admins/${a.id}`);
    };

    const onDelete = (a) => {
        if (!window.confirm("Are You Sure?")) return;

        axiosClient
            .delete(`/admins/${a.id}`)
            .then(() => {
                setNotification("Deleted Successfully");
                getAdmins();
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
                window.alert(
                    "Cannot Delete This Admin Because He/She Is Connected With Another Recordes"
                );
            });
    };

    const onSend = () => {};

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>Manage Admins</h2>
                <button className="add-user" onClick={addAdmin}>
                    Add New Admin
                </button>
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
                            {admins
                                .filter(
                                    (item) =>
                                        item.id !== 6 && item.id !== user.id
                                )
                                .map((a) => (
                                    <tr key={a.id}>
                                        <td>{a.id}</td>
                                        <td>{a.user.name}</td>
                                        <td>{a.user.email}</td>
                                        <td>
                                            {a.user.status == 0
                                                ? "Offline"
                                                : "Online"}
                                        </td>
                                        <td className="options">
                                            <button
                                                className="edit"
                                                onClick={() => onEdit(a)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete"
                                                onClick={() => onDelete(a)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="message"
                                                onClick={() => onSend(a)}
                                            >
                                                Send Message
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

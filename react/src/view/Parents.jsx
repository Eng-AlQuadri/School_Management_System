import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Parents() {
    const navigate = useNavigate();

    const addParent = () => {
        navigate("/admin/parents/new");
    };

    const [parents, setParents] = useState([]);

    const [loading, setLoading] = useState(false);

    const { setNotification } = useStateContext();

    useEffect(() => {
        getParents();
    }, []);

    const getParents = () => {
        setLoading(true);
        axiosClient
            .get("/parents")
            .then(({ data }) => {
                setLoading(false);
                setParents(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onEdit = (t) => {
        navigate(`/admin/parents/${t.id}`);
    };

    const onDelete = (a) => {
        if (!window.confirm("Are You Sure?")) return;

        axiosClient
            .delete(`/parents/${a.id}`)
            .then(() => {
                setNotification("Deleted Successfully");
                getParents();
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
                window.alert(
                    "Cannot Delete This Parent Because He/She Is Connected With Another Recordes"
                );
            });
    };

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>Manage Parents</h2>
                <button className="add-user" onClick={addParent}>
                    Add New Parent
                </button>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Status</th>
                        <th>Options</th>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="6" className="loading">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {parents.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.user.name}</td>
                                    <td>{p.user.email}</td>
                                    <td>{p.contact_number}</td>
                                    <td>
                                        {p.user.status == 0
                                            ? "Offline"
                                            : "Online"}
                                    </td>
                                    <td className="options">
                                        <button
                                            className="edit"
                                            onClick={() => onEdit(p)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => onDelete(p)}
                                        >
                                            Delete
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

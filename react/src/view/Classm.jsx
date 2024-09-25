import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Classm() {
    const navigate = useNavigate();

    const addClass = () => {
        navigate("/admin/academics/classms/new");
    };

    const [classes, setClasses] = useState([]);

    const [loading, setLoading] = useState(false);

    const { setNotification } = useStateContext();

    useEffect(() => {
        getClasses();
    }, []);

    const getClasses = () => {
        setLoading(true);
        axiosClient
            .get("/classms")
            .then(({ data }) => {
                setLoading(false);
                setClasses(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onEdit = (c) => {
        navigate(`/admin/academics/classms/${c.id}`);
    };

    const onDelete = (c) => {
        if (!window.confirm("Are You Sure?")) return;

        axiosClient
            .delete(`/classms/${c.id}`)
            .then(() => {
                setNotification("Deleted Successfully");
                getClasses();
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
                window.alert(
                    "Cannot Delete This Class Because It Is Connected With Another Recordes"
                );
            });
    };

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>Manage Classes</h2>
                <button className="add-user" onClick={addClass}>
                    Add New Class
                </button>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Amount</th>
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
                            {classes.map((c) => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.name}</td>
                                    <td>${c.amount}</td>
                                    <td>{c.status}</td>
                                    <td className="options">
                                        <button
                                            className="edit"
                                            onClick={() => onEdit(c)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => onDelete(c)}
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

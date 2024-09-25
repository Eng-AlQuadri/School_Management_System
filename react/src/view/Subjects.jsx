import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Subjects() {
    const navigate = useNavigate();

    const addSubject = () => {
        navigate("/admin/academics/subjects/new");
    };

    const [subjects, setSubjects] = useState([]);

    const [loading, setLoading] = useState(false);

    const { setNotification } = useStateContext();

    useEffect(() => {
        getSubjects();
    }, []);

    const getSubjects = () => {
        setLoading(true);
        axiosClient
            .get("/subjects")
            .then(({ data }) => {
                setLoading(false);
                setSubjects(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onEdit = (s) => {
        navigate(`/admin/academics/subjects/${s.id}`);
    };

    const onDelete = (s) => {
        if (!window.confirm("Are You Sure?")) return;

        axiosClient
            .delete(`/subjects/${s.id}`)
            .then(() => {
                setNotification("Deleted Successfully");
                getSubjects();
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
                window.alert(
                    "Cannot Delete This Subject Because It Is Connected With Another Recordes"
                );
            });
    };

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>Manage Subjects</h2>
                <button className="add-user" onClick={addSubject}>
                    Add New Subject
                </button>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>type</th>
                        <th>Status</th>
                        <th>Created By</th>
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
                            {subjects.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.id}</td>
                                    <td>{s.name}</td>
                                    <td>{s.type}</td>
                                    <td>{s.status}</td>
                                    <td>{s.user.name}</td>
                                    <td className="options">
                                        <button
                                            className="edit"
                                            onClick={() => onEdit(s)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => onDelete(s)}
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

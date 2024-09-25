import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function AssignSubject() {
    const navigate = useNavigate();

    const addClassSubject = () => {
        navigate("/admin/academics/assign-subjects/new");
    };

    const [classSubjects, setClassSubjects] = useState([]);

    const [loading, setLoading] = useState(false);

    const { setNotification } = useStateContext();

    useEffect(() => {
        getClassSubjects();
    }, []);

    const getClassSubjects = () => {
        setLoading(true);
        axiosClient
            .get("/classSubjects")
            .then(({ data }) => {
                setLoading(false);
                setClassSubjects(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onEdit = (s) => {
        navigate(`/admin/academics/assign-subjects/${s.id}`);
    };

    const onDelete = (s) => {
        if (!window.confirm("Are You Sure?")) return;

        axiosClient
            .delete(`/classSubjects/${s.id}`)
            .then(() => {
                setNotification("Deleted Successfully");
                getClassSubjects();
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
                window.alert(
                    "Cannot Delete This Recorde Because It Is Connected With Another Recordes"
                );
            });
    };

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>Manage Class-Subjects</h2>
                <button className="add-user" onClick={addClassSubject}>
                    Add New
                </button>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Class Name</th>
                        <th>Subject Name</th>
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
                            {classSubjects.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.id}</td>
                                    <td>{s.classm.name}</td>
                                    <td>{s.subject.name}</td>
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

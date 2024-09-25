import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Students() {
    const navigate = useNavigate();

    const addStudent = () => {
        navigate("/admin/students/new");
    };

    const [students, setStudents] = useState([]);

    const [loading, setLoading] = useState(false);

    const { setNotification } = useStateContext();

    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = () => {
        setLoading(true);
        axiosClient
            .get("/students")
            .then(({ data }) => {
                setLoading(false);
                setStudents(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onEdit = (s) => {
        navigate(`/admin/students/${s.id}`);
    };

    const onDelete = (s) => {
        if (!window.confirm("Are You Sure?")) return;

        axiosClient
            .delete(`/students/${s.id}`)
            .then(() => {
                setNotification("Deleted Successfully");
                getStudents();
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
                window.alert(
                    "Cannot Delete This Student Because He/She Is Connected With Another Recordes"
                );
            });
    };

    const onSend = () => {};

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>Manage Students</h2>
                <button className="add-user" onClick={addStudent}>
                    Add New Student
                </button>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Class Name</th>
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
                            {students.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.id}</td>
                                    <td>{s.user.name}</td>
                                    <td>{s.user.email}</td>
                                    <td>
                                        {s.user.status == 0
                                            ? "Offline"
                                            : "Online"}
                                    </td>
                                    <td>{s.classm.name}</td>
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
                                        <button
                                            className="message"
                                            onClick={() => onSend(s.user.id)}
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

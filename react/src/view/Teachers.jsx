import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Teachers() {
    const navigate = useNavigate();

    const addTeacher = () => {
        navigate("/admin/teachers/new");
    };

    const [teachers, setTeachers] = useState([]);

    const [loading, setLoading] = useState(false);

    const { setNotification } = useStateContext();

    useEffect(() => {
        getTeachers();
    }, []);

    const getTeachers = () => {
        setLoading(true);
        axiosClient
            .get("/teachers")
            .then(({ data }) => {
                setLoading(false);
                setTeachers(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onEdit = (t) => {
        navigate(`/admin/teachers/${t.id}`);
    };

    const onDelete = (a) => {
        if (!window.confirm("Are You Sure?")) return;

        axiosClient
            .delete(`/teachers/${a.id}`)
            .then(() => {
                setNotification("Deleted Successfully");
                getTeachers();
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
                window.alert(
                    "Cannot Delete This Teacher Because He/She Is Connected With Another Recordes"
                );
            });
    };

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>Manage Teachers</h2>
                <button className="add-user" onClick={addTeacher}>
                    Add New Teacher
                </button>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
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
                            {teachers.map((t) => (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{t.user.name}</td>
                                    <td>{t.user.email}</td>
                                    <td>{t.department}</td>
                                    <td>
                                        {t.user.status == 0
                                            ? "Offline"
                                            : "Online"}
                                    </td>
                                    <td className="options">
                                        <button
                                            className="edit"
                                            onClick={() => onEdit(t)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => onDelete(t)}
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

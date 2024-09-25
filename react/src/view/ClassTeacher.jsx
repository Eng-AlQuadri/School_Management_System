import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function ClassTeacher() {
    const navigate = useNavigate();

    const addClassTeacher = () => {
        navigate("/admin/academics/assign-class-teacher/new");
    };

    const [classTeachers, setClassTeachers] = useState([]);

    const [loading, setLoading] = useState(false);

    const { setNotification } = useStateContext();

    useEffect(() => {
        getClassTeachers();
    }, []);

    const getClassTeachers = () => {
        setLoading(true);
        axiosClient
            .get("/classTeachers")
            .then(({ data }) => {
                setLoading(false);
                setClassTeachers(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onEdit = (s) => {
        navigate(`/admin/academics/assign-class-teacher/${s.id}`);
    };

    const onDelete = (s) => {
        if (!window.confirm("Are You Sure?")) return;

        axiosClient
            .delete(`/classTeachers/${s.id}`)
            .then(() => {
                setNotification("Deleted Successfully");
                getClassTeachers();
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
                <h2>Manage Class-Teachers</h2>
                <button className="add-user" onClick={addClassTeacher}>
                    Add New
                </button>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Class Name</th>
                        <th>Teacher Name</th>
                        <th>Created By</th>
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
                            {classTeachers.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.id}</td>
                                    <td>{s.classm.name}</td>
                                    <td>{s.teacher.user.name}</td>
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

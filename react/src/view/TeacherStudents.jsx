import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function TeacherStudents() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);

    const [loading, setLoading] = useState(false);

    const { setNotification, user } = useStateContext();

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`/students/teacher/${user.id}`)
            .then(({ data }) => {
                setLoading(false);
                setStudents(data);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>My Students</h2>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Class Name</th>
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
                            {students.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.user_id}</td>
                                    <td>{s.user_name}</td>
                                    <td>{s.user_email}</td>
                                    <td>
                                        {s.user_status == 0
                                            ? "Offline"
                                            : "Online"}
                                    </td>
                                    <td>{s.class_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function TeacherExams() {
    const [exams, setExams] = useState([]);

    const [loading, setLoading] = useState(false);

    const { user } = useStateContext();

    useEffect(() => {
        getExamsByTeacher();
    }, []);

    const getExamsByTeacher = () => {
        setLoading(true);
        axiosClient
            .get(`/exams/teacher/${user.id}`)
            .then(({ data }) => {
                setLoading(false);
                setExams(data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>My Exams</h2>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Class Name</th>
                        <th>Subject Name</th>
                        <th>Created By</th>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="4" className="loading">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {exams.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.exam_id}</td>
                                    <td>{s.class_name}</td>
                                    <td>{s.subject_name}</td>
                                    <td>{s.created_by}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

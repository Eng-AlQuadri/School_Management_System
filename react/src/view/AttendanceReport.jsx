import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function AttendanceReport() {
    const [classms, setClassms] = useState([]);

    const [students, setStudents] = useState([]);

    const [selectedClassId, setSelectedClassId] = useState();

    const [loading, setLoading] = useState(false);

    const [isHidden, setIsHidden] = useState(true);

    const { setNotification } = useStateContext();

    useEffect(() => {
        axiosClient.get("/classms").then(({ data }) => {
            setClassms(data.data);
        });
    }, []);

    const handleSearchClick = () => {
        if (selectedClassId === undefined) {
            setNotification("Select Class!");
            return;
        }

        setLoading(true);
        axiosClient
            .get(`/attendance/classm/${selectedClassId}`)
            .then(({ data }) => {
                setIsHidden(false);
                setLoading(false);
                setStudents(data.data);
            });
    };

    return (
        <div className="attendance animated fadeInDown">
            <h2>Attendance Report</h2>
            <div className="search-box">
                <h4 className="search-title">Search</h4>
                <div className="holder">
                    <div className="field">
                        <label>Class</label>
                        <select
                            required
                            value={selectedClassId}
                            onChange={(e) => setSelectedClassId(e.target.value)}
                        >
                            <option value="">Select Class</option>
                            {classms.map((classm) => (
                                <option key={classm.id} value={classm.id}>
                                    {classm.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="options">
                        <button
                            onClick={() => {
                                handleSearchClick();
                            }}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className={isHidden ? "doctors hidden" : "doctors"}>
                <div className="doc-head">
                    <h2>Students List</h2>
                </div>
                <div className="table">
                    <table className="animated fadeInDown">
                        <thead>
                            <th>Name</th>
                            <th>Class Name</th>
                            <th>Date</th>
                            <th>Status</th>
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
                                {students.map((s) => (
                                    <tr key={s.id}>
                                        <td>{s.student.user.name}</td>
                                        <td>{s.classm.name}</td>
                                        <td>{s.date}</td>
                                        <td>{s.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
}

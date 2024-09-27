import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function TeacherTakeAttendance() {
    const [classms, setClassms] = useState([]);

    const [students, setStudents] = useState([]);

    const [selectedClassId, setSelectedClassId] = useState();

    const [loading, setLoading] = useState(false);

    const [isHidden, setIsHidden] = useState(true);

    const [attendance, setAttendance] = useState({});

    const { setNotification, user } = useStateContext();

    const dateRef = useRef();

    useEffect(() => {
        axiosClient.get(`/teacherClass/${user.id}`).then(({ data }) => {
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
            .get(`/students/classes/${selectedClassId}`)
            .then(({ data }) => {
                setIsHidden(false);
                setLoading(false);
                setStudents(data.data);

                // Initialize attendance state for each student
                const initialAttendance = {};
                data.data.forEach((student) => {
                    initialAttendance[student.id] = "present"; // Default value
                });
                setAttendance(initialAttendance);
            });
    };

    // Handle attendance change for each student
    const handleAttendanceChange = (studentId, value) => {
        setAttendance({
            ...attendance,
            [studentId]: value,
        });
    };

    // Submit the attendance to the backend
    const handleSubmit = () => {
        // const classId = classms.id;
        const classId = selectedClassId;

        const attendanceData = students.map((student) => ({
            student_id: student.id,
            status: attendance[student.id],
            date: dateRef.current.value,
            class_id: classId,
        }));

        axiosClient
            .post("/attendance", { attendance: attendanceData })
            .then(() => {
                setNotification("Attendance submitted successfully!");
            })
            .catch(() => {
                // console.error(error);
                setNotification("Failed to submit attendance.");
            });
    };

    return (
        <div className="attendance animated fadeInDown">
            <h2>Student Attendance</h2>
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
                                <option
                                    key={classm.class_id}
                                    value={classm.class_id}
                                >
                                    {classm.class_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="field">
                        <label>Date</label>
                        <input
                            type="date"
                            className="input-date"
                            ref={dateRef}
                            required
                        />
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
                            <th>ID</th>
                            <th>Name</th>
                            <th>Attendance</th>
                        </thead>
                        {loading && (
                            <tbody>
                                <tr>
                                    <td colSpan="3" className="loading">
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
                                        <td className="radio-options">
                                            <div className="field">
                                                <input
                                                    type="radio"
                                                    id={`present-${s.id}`}
                                                    name={`attendance-${s.id}`}
                                                    value="present"
                                                    checked={
                                                        attendance[s.id] ===
                                                        "present"
                                                    }
                                                    onChange={() =>
                                                        handleAttendanceChange(
                                                            s.id,
                                                            "present"
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={`present-${s.id}`}
                                                >
                                                    Present
                                                </label>
                                            </div>
                                            <div className="field">
                                                <input
                                                    type="radio"
                                                    id={`late-${s.id}`}
                                                    name={`attendance-${s.id}`}
                                                    value="late"
                                                    checked={
                                                        attendance[s.id] ===
                                                        "late"
                                                    }
                                                    onChange={() =>
                                                        handleAttendanceChange(
                                                            s.id,
                                                            "late"
                                                        )
                                                    }
                                                />
                                                <label htmlFor={`late-${s.id}`}>
                                                    Late
                                                </label>
                                            </div>
                                            <div className="field">
                                                <input
                                                    type="radio"
                                                    id={`absent-${s.id}`}
                                                    name={`attendance-${s.id}`}
                                                    value="absent"
                                                    checked={
                                                        attendance[s.id] ===
                                                        "absent"
                                                    }
                                                    onChange={() =>
                                                        handleAttendanceChange(
                                                            s.id,
                                                            "absent"
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={`absent-${s.id}`}
                                                >
                                                    Absent
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                    <button className="submit-btn" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

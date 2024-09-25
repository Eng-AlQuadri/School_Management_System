import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function Exams() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [classes, setClasses] = useState([]);

    const [subjects, setSubjects] = useState([]);

    const [exam, setExam] = useState({
        id: null,
        subject: {
            name: "",
            id: null,
        },
        classm: {
            name: "",
            id: null,
        },
        user: {
            name: "",
            email: "",
            password: "",
        },
    });

    const { setNotification, user } = useStateContext();

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get("/classms").then(({ data }) => {
            setClasses(data.data);
        });

        axiosClient.get("/subjects").then(({ data }) => {
            setLoading(false);
            setSubjects(data.data);
        });
    }, []);

    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/exams/${id}`).then(({ data }) => {
                setLoading(false);
                setExam(data);
            });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const examData = {
            class_id: exam.classm.id,
            subject_id: exam.subject.id,
            created_by: user.id,
        };

        const examDataUpdate = {
            id: exam.id,
            class_id: exam.classm.id,
            subject_id: exam.subject.id,
        };

        if (exam.id) {
            setErrors(null);
            axiosClient
                .put(`/exams/${exam.id}`, examDataUpdate)
                .then(() => {
                    setNotification("Exam Was Updated Successfully");

                    navigate("/admin/examination/exams");
                })
                .catch((error) => {
                    const response = error.response;

                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            setErrors(null);
            axiosClient
                .post("/exams", examData)
                .then(() => {
                    setNotification("Exam Was Created Successfully");

                    navigate("/admin/examination/exams");
                })
                .catch((error) => {
                    const response = error.response;

                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                {loading && <div className="loading">Loading...</div>}

                {!loading && (
                    <form className="signup" onSubmit={onSubmit}>
                        {id && <h2>Edit Exam</h2>}
                        {!id && <h2>Add Exam</h2>}
                        <div className="serrors show">
                            {errors &&
                                Object.keys(errors).map((key) => (
                                    <h3 key={key}>{errors[key][0]}</h3>
                                ))}
                        </div>

                        <div className="field">
                            <label>Class Name</label>
                            <select
                                value={exam.classm.id}
                                onChange={(e) =>
                                    setExam({
                                        ...exam,
                                        classm: {
                                            ...exam.classm,
                                            id: e.target.value,
                                        },
                                    })
                                }
                            >
                                <option value="">Select Class</option>
                                {console.log(classes)}
                                {classes.map((classm) => (
                                    <option key={classm.id} value={classm.id}>
                                        {classm.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label>Subject Name</label>
                            <select
                                value={exam.subject.id}
                                onChange={(e) =>
                                    setExam({
                                        ...exam,
                                        subject: {
                                            ...exam.subject,
                                            id: e.target.value,
                                        },
                                    })
                                }
                            >
                                <option value="">Select Subject</option>
                                {subjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="submit"
                            value="Submit"
                            id="submit-btn"
                            name="signup"
                        />
                    </form>
                )}
            </div>
        </div>
    );
}

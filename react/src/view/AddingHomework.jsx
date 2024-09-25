import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function AddingHomework() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [classes, setClasses] = useState([]);

    const [subjects, setSubjects] = useState([]);

    const [classSubjects, setClassSubjects] = useState({
        id: null,
        date: "",
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

    const dateRef = useRef();

    const { setNotification, user } = useStateContext();

    const { id } = useParams();

    const navigate = useNavigate();

    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/homework/${id}`).then(({ data }) => {
                setLoading(false);
                setClassSubjects(data);
            });
        }, []);
    }

    useEffect(() => {
        axiosClient.get("/classms").then(({ data }) => {
            setClasses(data.data);
        });

        axiosClient.get("/subjects").then(({ data }) => {
            setLoading(false);
            setSubjects(data.data);
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const homeworkData = {
            class_id: classSubjects.classm.id,
            subject_id: classSubjects.subject.id,
            assigned_by: user.id,
            date: dateRef.current.value,
        };

        const homeworkDataUpdate = {
            class_id: classSubjects.classm.id,
            subject_id: classSubjects.subject.id,
            date: dateRef.current.value,
        };

        if (classSubjects.id) {
            setErrors(null);
            axiosClient
                .put(`/homework/${classSubjects.id}`, homeworkDataUpdate)
                .then(() => {
                    setNotification("Homework Was Updated Successfully");

                    navigate("/admin/homework/homework-report");
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
                .post("/homework", homeworkData)
                .then(() => {
                    setNotification("Homework Was Created Successfully");

                    navigate("/admin/homework/options");
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
                        {id && <h2>Edit Homework</h2>}
                        {!id && <h2>Add Homework</h2>}
                        <div className="serrors show">
                            {errors &&
                                Object.keys(errors).map((key) => (
                                    <h3 key={key}>{errors[key][0]}</h3>
                                ))}
                        </div>

                        <div className="field">
                            <label>Class Name</label>
                            <select
                                value={classSubjects.classm.id}
                                onChange={(e) =>
                                    setClassSubjects({
                                        ...classSubjects,
                                        classm: {
                                            ...classSubjects.classm,
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
                                value={classSubjects.subject.id}
                                onChange={(e) =>
                                    setClassSubjects({
                                        ...classSubjects,
                                        subject: {
                                            ...classSubjects.subject,
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
                        <div className="field">
                            <label>Date</label>
                            <input
                                type="date"
                                required
                                // value={classSubjects.date}
                                ref={dateRef}
                            />
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

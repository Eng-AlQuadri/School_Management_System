import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function AssignSubjectForm() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [classes, setClasses] = useState([]);

    const [subjects, setSubjects] = useState([]);

    const [classSubjects, setClassSubjects] = useState({
        id: null,
        status: "",
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
            axiosClient.get(`/classSubjects/${id}`).then(({ data }) => {
                setLoading(false);
                setClassSubjects(data);
            });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const classSubjectsData = {
            class_id: classSubjects.classm.id,
            subject_id: classSubjects.subject.id,
            created_by: user.id,
            status: classSubjects.status,
        };

        const classSubjectsDataUpdate = {
            id: classSubjects.id,
            class_id: classSubjects.classm.id,
            subject_id: classSubjects.subject.id,
            status: classSubjects.status,
        };

        if (classSubjects.id) {
            setErrors(null);
            axiosClient
                .put(
                    `/classSubjects/${classSubjects.id}`,
                    classSubjectsDataUpdate
                )
                .then(() => {
                    setNotification("Recorde Was Updated Successfully");

                    navigate("/admin/academics/assign-subjects");
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
                .post("/classSubjects", classSubjectsData)
                .then(() => {
                    setNotification("Recorde Was Created Successfully");

                    navigate("/admin/academics/assign-subjects");
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
                        {id && <h2>Edit Recorde</h2>}
                        {!id && <h2>Add Recorde</h2>}
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
                            <label>Status</label>
                            <input
                                onChange={(e) =>
                                    setClassSubjects({
                                        ...classSubjects,
                                        status: e.target.value,
                                    })
                                }
                                type="text"
                                value={classSubjects.status}
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

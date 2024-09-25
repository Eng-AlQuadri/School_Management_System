import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function SubjectsForm() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [subject, setSubject] = useState({
        id: null,
        name: "",
        type: "",
        status: "",
        user: {
            name: "",
        },
    });

    const { setNotification, user } = useStateContext();

    const { id } = useParams();

    const navigate = useNavigate();

    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/subjects/${id}`).then(({ data }) => {
                setLoading(false);
                setSubject(data);
            });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const subjectData = {
            name: subject.name,
            type: subject.type,
            status: subject.status,
            created_by: user.id,
        };

        const subjectDataUpdate = {
            id: subject.id,
            name: subject.name,
            type: subject.type,
            status: subject.status,
        };

        if (subject.id) {
            setErrors(null);
            axiosClient
                .put(`/subjects/${subject.id}`, subjectDataUpdate)
                .then(() => {
                    setNotification("Subject Was Updated Successfully");

                    navigate("/admin/academics/subjects");
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
                .post("/subjects", subjectData)
                .then(() => {
                    setNotification("Subject Was Created Successfully");

                    navigate("/admin/academics/subjects");
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
                        {id && <h2>Edit Subject</h2>}
                        {!id && <h2>Add Subject</h2>}
                        <h3>Subject: {subject.name}</h3>
                        <div className="serrors show">
                            {errors &&
                                Object.keys(errors).map((key) => (
                                    <h3 key={key}>{errors[key][0]}</h3>
                                ))}
                        </div>

                        <div className="field">
                            <label>Name</label>
                            <input
                                onChange={(e) =>
                                    setSubject({
                                        ...subject,
                                        name: e.target.value,
                                    })
                                }
                                type="text"
                                value={subject.name}
                            />
                        </div>
                        <div className="field">
                            <label>Type</label>
                            <input
                                onChange={(e) =>
                                    setSubject({
                                        ...subject,
                                        type: e.target.value,
                                    })
                                }
                                type="text"
                                value={subject.type}
                            />
                        </div>
                        <div className="field">
                            <label>Status</label>
                            <input
                                onChange={(e) =>
                                    setSubject({
                                        ...subject,
                                        status: e.target.value,
                                    })
                                }
                                type="text"
                                value={subject.status}
                            />
                        </div>
                        {/* <div className="field">
                            <label>Created By</label>
                            <input
                                onChange={(e) =>
                                    setTeacher({
                                        ...teacher,
                                        user: {
                                            ...teacher.user,
                                            password: e.target.value,
                                        },
                                    })
                                }
                                type="text"
                            />
                        </div> */}
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

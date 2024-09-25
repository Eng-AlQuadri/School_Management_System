import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function TeacherForm() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [teacher, setTeacher] = useState({
        id: null,
        department: "",
        user: {
            name: "",
            email: "",
            password: "",
        },
    });

    const { setNotification } = useStateContext();

    const { id } = useParams();

    const navigate = useNavigate();

    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/teachers/${id}`).then(({ data }) => {
                setLoading(false);
                setTeacher(data);
            });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const teacherData = {
            id: teacher.id,
            name: teacher.user.name,
            email: teacher.user.email,
            department: teacher.department,
            password: teacher.user.password,
        };

        if (teacher.id) {
            setErrors(null);
            axiosClient
                .put(`/teachers/${teacher.id}`, teacherData)
                .then(() => {
                    setNotification("Teacher Was Updated Successfully");

                    navigate("/admin/teachers");
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
                .post("/teachers", teacherData)
                .then(() => {
                    setNotification("Teacher Was Created Successfully");

                    navigate("/admin/teachers");
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
                        {id && <h2>Edit Teacher</h2>}
                        {!id && <h2>Add Teacher</h2>}
                        <h3>Teacher: {teacher.user.name}</h3>
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
                                    setTeacher({
                                        ...teacher,
                                        user: {
                                            ...teacher.user,
                                            name: e.target.value,
                                        },
                                    })
                                }
                                type="text"
                                value={teacher.user.name}
                            />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input
                                onChange={(e) =>
                                    setTeacher({
                                        ...teacher,
                                        user: {
                                            ...teacher.user,
                                            email: e.target.value,
                                        },
                                    })
                                }
                                type="text"
                                value={teacher.user.email}
                            />
                        </div>
                        <div className="field">
                            <label>Department</label>
                            <input
                                onChange={(e) =>
                                    setTeacher({
                                        ...teacher,
                                        department: e.target.value,
                                    })
                                }
                                type="text"
                                value={teacher.department}
                            />
                        </div>
                        <div className="field">
                            <label>Password</label>
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

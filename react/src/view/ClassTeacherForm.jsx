import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function ClassTeacherForm() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [classes, setClasses] = useState([]);

    const [teachers, setTeachers] = useState([]);

    const [classTeachers, setClassTeachers] = useState({
        id: null,
        teacher: {
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

        axiosClient.get("/teachers").then(({ data }) => {
            setLoading(false);
            setTeachers(data.data);
        });
    }, []);

    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/classTeachers/${id}`).then(({ data }) => {
                setLoading(false);
                setClassTeachers(data);
            });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const classTeacherData = {
            class_id: classTeachers.classm.id,
            teacher_id: classTeachers.teacher.id,
            created_by: user.id,
        };

        const classTeachersDataUpdate = {
            id: classTeachers.id,
            class_id: classTeachers.classm.id,
            teacher_id: classTeachers.teacher.id,
        };

        if (classTeachers.id) {
            setErrors(null);
            axiosClient
                .put(
                    `/classTeachers/${classTeachers.id}`,
                    classTeachersDataUpdate
                )
                .then(() => {
                    setNotification("Recorde Was Updated Successfully");

                    navigate("/admin/academics/assign-class-teacher");
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
                .post("/classTeachers", classTeacherData)
                .then(() => {
                    setNotification("Recorde Was Created Successfully");

                    navigate("/admin/academics/assign-class-teacher");
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
                                value={classTeachers.classm.id}
                                onChange={(e) =>
                                    setClassTeachers({
                                        ...classTeachers,
                                        classm: {
                                            ...classTeachers.classm,
                                            id: e.target.value,
                                        },
                                    })
                                }
                            >
                                <option value="">Select Class</option>
                                {classes.map((classm) => (
                                    <option key={classm.id} value={classm.id}>
                                        {classm.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label>Teacher Name</label>
                            <select
                                value={classTeachers.teacher.id}
                                onChange={(e) =>
                                    setClassTeachers({
                                        ...classTeachers,
                                        teacher: {
                                            ...classTeachers.teacher,
                                            id: e.target.value,
                                        },
                                    })
                                }
                            >
                                <option value="">Select Teacher</option>
                                {teachers.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.user.name}
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

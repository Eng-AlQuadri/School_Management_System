import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function StudentForm() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [classes, setClasses] = useState([]);

    const [student, setStudent] = useState({
        id: null,
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

    const { setNotification } = useStateContext();

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get("/classms").then(({ data }) => {
            setLoading(false);
            setClasses(data.data);
        });
    }, []);

    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/students/${id}`).then(({ data }) => {
                setLoading(false);
                setStudent(data);
            });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const studentData = {
            id: student.id,
            name: student.user.name,
            email: student.user.email,
            classmID: student.classm.id,
            password: student.user.password,
        };

        if (student.id) {
            setErrors(null);
            axiosClient
                .put(`/students/${student.id}`, studentData)
                .then(() => {
                    setNotification("Student Was Updated Successfully");

                    navigate("/admin/students");
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
                .post("/students", studentData)
                .then(() => {
                    setNotification("Student Was Created Successfully");

                    navigate("/admin/students");
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
                        {id && <h2>Edit Student</h2>}
                        {!id && <h2>Add Student</h2>}
                        <h3>Student: {student.user.name}</h3>
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
                                    setStudent({
                                        ...student,
                                        user: {
                                            ...student.user,
                                            name: e.target.value,
                                        },
                                    })
                                }
                                type="text"
                                value={student.user.name}
                            />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input
                                onChange={(e) =>
                                    setStudent({
                                        ...student,
                                        user: {
                                            ...student.user,
                                            email: e.target.value,
                                        },
                                    })
                                }
                                type="text"
                                value={student.user.email}
                            />
                        </div>
                        <div className="field">
                            <label>Class Name</label>
                            <select
                                value={student.classm.id}
                                onChange={(e) =>
                                    setStudent({
                                        ...student,
                                        classm: {
                                            ...student.classm,
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
                            <label>Password</label>
                            <input
                                onChange={(e) =>
                                    setStudent({
                                        ...student,
                                        user: {
                                            ...student.user,
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

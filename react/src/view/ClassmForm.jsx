import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function ClassmForm() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [classm, setClassm] = useState({
        id: null,
        name: "",
        amount: null,
        status: "",
    });

    const { setNotification } = useStateContext();

    const { id } = useParams();

    const navigate = useNavigate();

    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/classms/${id}`).then(({ data }) => {
                setLoading(false);
                setClassm(data);
            });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const classData = {
            id: classm.id,
            name: classm.name,
            amount: classm.amount,
            status: classm.status,
        };

        if (classm.id) {
            setErrors(null);
            axiosClient
                .put(`/classms/${classm.id}`, classData)
                .then(() => {
                    setNotification("Class Was Updated Successfully");

                    navigate("/admin/academics/classms");
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
                .post("/classms", classData)
                .then(() => {
                    setNotification("Class Was Created Successfully");

                    navigate("/admin/academics/classms");
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
                        {id && <h2>Edit Class</h2>}
                        {!id && <h2>Add Class</h2>}
                        <h3>Class: {classm.name}</h3>
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
                                    setClassm({
                                        ...classm,
                                        name: e.target.value,
                                    })
                                }
                                type="text"
                                value={classm.name}
                            />
                        </div>
                        <div className="field">
                            <label>Amount</label>
                            <input
                                onChange={(e) =>
                                    setClassm({
                                        ...classm,
                                        amount: e.target.value,
                                    })
                                }
                                type="text"
                                value={classm.amount}
                            />
                        </div>
                        <div className="field">
                            <label>Status</label>
                            <input
                                onChange={(e) =>
                                    setClassm({
                                        ...classm,
                                        status: e.target.value,
                                    })
                                }
                                type="text"
                                value={classm.status}
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

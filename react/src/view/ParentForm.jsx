import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function ParentForm() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [parent, setParent] = useState({
        id: null,
        contact_number: "",
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
            axiosClient.get(`/parents/${id}`).then(({ data }) => {
                setLoading(false);
                setParent(data);
                console.log(parent);
            });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const parentData = {
            id: parent.id,
            name: parent.user.name,
            email: parent.user.email,
            contact_number: parent.contact_number,
            password: parent.user.password,
        };

        if (parent.id) {
            setErrors(null);
            axiosClient
                .put(`/parents/${parent.id}`, parentData)
                .then(() => {
                    setNotification("Parent Was Updated Successfully");

                    navigate("/admin/parents");
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
                .post("/parents", parentData)
                .then(() => {
                    setNotification("Parent Was Created Successfully");

                    navigate("/admin/parents");
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
                        {id && <h2>Edit Parent</h2>}
                        {!id && <h2>Add Parent</h2>}
                        <h3>Parent: {parent.user.name}</h3>
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
                                    setParent({
                                        ...parent,
                                        user: {
                                            ...parent.user,
                                            name: e.target.value,
                                        },
                                    })
                                }
                                type="text"
                                value={parent.user.name}
                            />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input
                                onChange={(e) =>
                                    setParent({
                                        ...parent,
                                        user: {
                                            ...parent.user,
                                            email: e.target.value,
                                        },
                                    })
                                }
                                type="text"
                                value={parent.user.email}
                            />
                        </div>
                        <div className="field">
                            <label>Contact Number</label>
                            <input
                                onChange={(e) =>
                                    setParent({
                                        ...parent,
                                        contact_number: e.target.value,
                                    })
                                }
                                type="text"
                                value={parent.contact_number}
                            />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input
                                onChange={(e) =>
                                    setParent({
                                        ...parent,
                                        user: {
                                            ...parent.user,
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

import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function AdminsForm() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [admin, setAdmin] = useState({
        id: null,
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
            axiosClient.get(`/admins/${id}`).then(({ data }) => {
                setLoading(false);
                setAdmin(data);
            });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const adminData = {
            id: admin.id,
            name: admin.user.name,
            email: admin.user.email,
            password: admin.user.password,
        };

        if (admin.id) {
            setErrors(null);
            axiosClient
                .put(`/admins/${admin.id}`, adminData)
                .then(() => {
                    setNotification("Admin Was Updated Successfully");

                    navigate("/admin/admins");
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
                .post("/admins", adminData)
                .then(() => {
                    setNotification("Admin Was Created Successfully");

                    navigate("/admin/admins");
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
                        {id && <h2>Edit Admin</h2>}
                        {!id && <h2>Add Admin</h2>}
                        <h3>Admin: {admin.user.name}</h3>
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
                                    setAdmin({
                                        ...admin,
                                        user: {
                                            ...admin.user,
                                            name: e.target.value,
                                        },
                                    })
                                }
                                type="text"
                                value={admin.user.name}
                            />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input
                                onChange={(e) =>
                                    setAdmin({
                                        ...admin,
                                        user: {
                                            ...admin.user,
                                            email: e.target.value,
                                        },
                                    })
                                }
                                type="text"
                                value={admin.user.email}
                            />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input
                                onChange={(e) =>
                                    setAdmin({
                                        ...admin,
                                        user: {
                                            ...admin.user,
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

import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function MyAccountForm() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [currentUser, setCurrentUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
    });

    const { setNotification } = useStateContext();

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/users/${id}`).then(({ data }) => {
            setLoading(false);
            setCurrentUser(data);
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const currentUserData = {
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            password: currentUser.password,
        };

        setErrors(null);
        axiosClient
            .put(`/users/${currentUser.id}`, currentUserData)
            .then(() => {
                setNotification("User Was Updated Successfully");

                navigate(-1);
            })
            .catch((error) => {
                const response = error.response;

                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                {loading && <div className="loading">Loading...</div>}

                {!loading && (
                    <form className="signup" onSubmit={onSubmit}>
                        <h2>Edit My Account</h2>
                        <h3>Name: {currentUser.name}</h3>
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
                                    setCurrentUser({
                                        ...currentUser,
                                        name: e.target.value,
                                    })
                                }
                                type="text"
                                value={currentUser.name}
                            />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input
                                onChange={(e) =>
                                    setCurrentUser({
                                        ...currentUser,
                                        email: e.target.value,
                                    })
                                }
                                type="text"
                                value={currentUser.email}
                            />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input
                                onChange={(e) =>
                                    setCurrentUser({
                                        ...currentUser,
                                        password: e.target.value,
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

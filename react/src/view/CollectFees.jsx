import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function CollectFees() {
    const [fees, setFees] = useState([]);

    const [loading, setLoading] = useState(false);

    const { setNotification, user } = useStateContext();

    useEffect(() => {
        getFees();
    }, []);

    const getFees = () => {
        setLoading(true);
        axiosClient
            .get("fees/pending")
            .then(({ data }) => {
                setLoading(false);
                setFees(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onCollect = (f) => {
        if (!window.confirm("Are You Sure?")) return;

        const feeData = {
            id: f.id,
            student_id: f.student.id,
            collected_by: user.id,
            status: "paid",
            amount: f.amount,
        };

        axiosClient.post(`fees/collect/${f.id}`, feeData).then(() => {
            getFees();
            setNotification("Collected Successfully");
        });
    };

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>Collect Fees</h2>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Options</th>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="loading">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {fees.map((f) => (
                                <tr key={f.id}>
                                    <td>{f.id}</td>
                                    <td>{f.student.user.name}</td>
                                    <td>$ {f.amount}</td>
                                    <td>{f.status}</td>
                                    <td className="options">
                                        <button
                                            className="edit"
                                            onClick={() => onCollect(f)}
                                        >
                                            Collect
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

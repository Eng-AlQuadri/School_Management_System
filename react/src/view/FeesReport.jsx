import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function FeesReport() {
    const [fees, setFees] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getFees();
    }, []);

    const getFees = () => {
        setLoading(true);
        axiosClient
            .get("/fees")
            .then(({ data }) => {
                setLoading(false);
                setFees(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>Fees Report</h2>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Collected By</th>
                        <th>Amount</th>
                        <th>Status</th>
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
                                    <td>{f.admin.user.name}</td>
                                    <td>$ {f.amount}</td>
                                    <td>{f.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

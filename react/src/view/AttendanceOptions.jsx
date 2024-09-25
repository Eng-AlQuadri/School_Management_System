import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import QueueIcon from "@mui/icons-material/Queue";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AttendanceOptions() {
    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);

    const onCardClick = (card) => {
        switch (card) {
            case 1:
                navigate("/admin/attendance/report");
                break;
            case 2:
                navigate("/admin/attendance/take-attendance");
                break;
        }
    };

    return (
        <div className="dashboard">
            <h1>Attendance</h1>
            {loading && <div className="loading">Loading...</div>}
            {!loading && (
                <div className="card-holder animated fadeInDown">
                    <div className="card" onClick={() => onCardClick(1)}>
                        <h3>Attendance Report</h3>
                        <div className="info">
                            <div className="icon">
                                <TextSnippetIcon />
                            </div>
                        </div>
                    </div>
                    <div className="card" onClick={() => onCardClick(2)}>
                        <h3>Take Attendance</h3>
                        <div className="info">
                            <div className="icon">
                                <QueueIcon />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

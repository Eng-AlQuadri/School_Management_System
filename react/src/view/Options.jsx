import PersonIcon from "@mui/icons-material/Person";
import SubjectIcon from "@mui/icons-material/Subject";
import ClassIcon from "@mui/icons-material/Class";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Options() {
    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);

    const onCardClick = (card) => {
        switch (card) {
            case 1:
                navigate("/admin/academics/classms");
                break;
            case 2:
                navigate("/admin/academics/assign-subjects");
                break;
            case 3:
                navigate("/admin/academics/subjects");
                break;
            case 4:
                navigate("/admin/academics/assign-class-teacher");
                break;
        }
    };

    return (
        <div className="dashboard">
            <h1>Academic</h1>
            {loading && <div className="loading">Loading...</div>}
            {!loading && (
                <div className="card-holder animated fadeInDown">
                    <div className="card" onClick={() => onCardClick(1)}>
                        <h3>Classes</h3>
                        <div className="info">
                            <div className="icon">
                                <ClassIcon />
                            </div>
                        </div>
                    </div>
                    <div className="card" onClick={() => onCardClick(2)}>
                        <h3>Assign Subjects</h3>
                        <div className="info">
                            <div className="icon">
                                <AddCircleIcon />
                            </div>
                        </div>
                    </div>
                    <div className="card" onClick={() => onCardClick(3)}>
                        <h3>Subjects</h3>
                        <div className="info">
                            <div className="icon">
                                <SubjectIcon />
                            </div>
                        </div>
                    </div>
                    <div className="card" onClick={() => onCardClick(4)}>
                        <h3>Assign Teacher</h3>
                        <div className="info">
                            <div className="icon">
                                <PersonIcon />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function Marks() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [students, setStudents] = useState([]);

    const [subjects, setSubjects] = useState([]);

    const [exams, setExams] = useState([]);

    const [mark, setmark] = useState({
        exam_id: null,
        student_id: null,
        subject_id: null,
        grade: null,
    });

    const { setNotification } = useStateContext();

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get("/students").then(({ data }) => {
            setStudents(data.data);
        });

        axiosClient.get("/exams").then(({ data }) => {
            setExams(data.data);
        });

        axiosClient.get("/subjects").then(({ data }) => {
            setLoading(false);
            setSubjects(data.data);
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const markData = {
            exam_id: mark.exam_id,
            student_id: mark.student_id,
            subject_id: mark.subject_id,
            grade: mark.grade,
        };

        setErrors(null);
        axiosClient
            .post("/marks", markData)
            .then(() => {
                setNotification("Mark Was Created Successfully");

                navigate("/admin/examination/marks");
            })
            .catch((error) => {
                const response = error.response;

                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        // <div className="login-signup-form animated fadeInDown">
        //     <div className="form">
        //         {loading && <div className="loading">Loading...</div>}

        //         {!loading && (
        //             <form className="signup" onSubmit={onSubmit}>
        //                 <h2>Add Mark</h2>
        //                 <div className="serrors show">
        //                     {errors &&
        //                         Object.keys(errors).map((key) => (
        //                             <h3 key={key}>{errors[key][0]}</h3>
        //                         ))}
        //                 </div>

        //                 <div className="field">
        //                     <label>Subject Name</label>
        //                     <select
        //                         value={mark}
        //                         onChange={(e) =>
        //                             setExam({
        //                                 ...exam,
        //                                 classm: {
        //                                     ...exam.classm,
        //                                     id: e.target.value,
        //                                 },
        //                             })
        //                         }
        //                     >
        //                         <option value="">Select Class</option>
        //                         {console.log(classes)}
        //                         {classes.map((classm) => (
        //                             <option key={classm.id} value={classm.id}>
        //                                 {classm.name}
        //                             </option>
        //                         ))}
        //                     </select>
        //                 </div>
        //                 <div className="field">
        //                     <label>Subject Name</label>
        //                     <select
        //                         value={exam.subject.id}
        //                         onChange={(e) =>
        //                             setExam({
        //                                 ...exam,
        //                                 subject: {
        //                                     ...exam.subject,
        //                                     id: e.target.value,
        //                                 },
        //                             })
        //                         }
        //                     >
        //                         <option value="">Select Subject</option>
        //                         {subjects.map((subject) => (
        //                             <option key={subject.id} value={subject.id}>
        //                                 {subject.name}
        //                             </option>
        //                         ))}
        //                     </select>
        //                 </div>
        //                 <input
        //                     type="submit"
        //                     value="Submit"
        //                     id="submit-btn"
        //                     name="signup"
        //                 />
        //             </form>
        //         )}
        //     </div>
        // </div>
        <div>hello</div>
    );
}

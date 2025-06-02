import axios from "axios";
import { useEffect, useState } from "react";

const Feedback = () => {
    const [data, setdata] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get('http://localhost:8000/civiceye/feedbackview', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setdata(response.data);

                

            } catch (error) {
                console.error("Error fetching feedback:", error);
            }
        };

        fetch();
    }, []); // Important: empty dependency array to avoid infinite calls

    return (
        <div className='m-0 p-0'>
            <div className="p-4">
                <div className="text-center flex justify-center w-[1250px] ">
                    <h3 className="text-2xl font-semibold">Feedback</h3>
                </div>
            </div>

            <div className="flex gap-4 flex-wrap ms-[130px] mt-10 ">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="bg-blue-300 rounded-2xl shadow-md shadow-gray-400 p-4 h-[200px] w-[250px] flex flex-col justify-center items-center "
                    >
                        <h4 className="text-lg font-medium">{item.message}</h4>
                        <p className="text-sm mt-2">by: {item.userId.name || "Unknown"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feedback;

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loadingGIF from "../../images/loading.gif"

export default function Loading() {
    //state
    const [count, setCount] = useState(3);
    //hooks
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((curentCount) => --curentCount);
        }, 1000)
        // redirect once count is equal to 0
        count === 0 && 
            navigate("/login", {
            state: location.pathname,
            });
        // cleanup
        return ()  => clearInterval(interval);
    }, [count]);

    return (
        <div className="d-flex justify-content-center align-items-center" 
             style={{ height: "90vh"}}
        >
            <img src={loadingGIF} alt="Loading" style={{width: "400px"}} />
            </div>
    )

}
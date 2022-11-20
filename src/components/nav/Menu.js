import { Navigate, NavLink, useNavigation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export default function Menu() {
    //hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        setAuth({...auth, user: null, token: ""});
        localStorage.removeItem("auth");
        Navigate("/login")
    };

    return ( 
    <>
        <ul className="nav d-flex justify-content-end shadow-sm mb-2">
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                    HOME
                </NavLink>
            </li>
        {/* if user is already logged in hide the login and register links */}
            {!auth?.user ? (
            <>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                        LOGIN
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                        REGISTER
                    </NavLink>
                </li>
            </>
            ) : (
                <li className="nav-item pointer">
                    <a onClick={logout} className="nav-link">
                        LOGOUT
                    </a>
            </li>
            )}
        </ul>
    </>
   );
}
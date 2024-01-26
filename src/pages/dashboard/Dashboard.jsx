import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import stringToHash from "../../subfunctions/stringToHash.js";
import dashboard from "../../api/Dashboard.js";
import "./Dashboard.css";

import LoadingScreen from "../../UI/loadingScreen/LoadingScreen";

function DashboardPage({ cookies, removeCookies }) {
    const [navigate, setNavigate] = useState(!cookies.auth ? <Navigate to="/auth" replace={false} /> : null);
    const [guilds, setGuilds] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded && cookies.key) {
            const hash = stringToHash(cookies.key);
            dashboard(cookies.auth, hash, removeCookies, setNavigate, setGuilds);
            setIsLoaded(true);
        }
    }, [isLoaded, cookies, removeCookies])

    return (
        <div className="Dashborad">
            {guilds == [] ? <LoadingScreen /> : guilds}
            {navigate}
        </div>
    )
}

export default DashboardPage;
import React, { useContext, useEffect, useState } from "react";
import dashboard from "../../api/Dashboard.js";
import "./Dashboard.css";
import { NavigateContext } from "../../App.jsx";

import LoadingScreen from "../../components/UI/loadingScreen/LoadingScreen.jsx";

function DashboardPage({ cookies, removeCookies }) {
    const navigate = useContext(NavigateContext);
    const [guilds, setGuilds] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded && cookies.auth) {
            dashboard(cookies.auth, cookies.key, removeCookies, navigate, setGuilds);
            setIsLoaded(true);
        }
    }, [isLoaded, cookies, removeCookies, navigate])

    return (
        <div className="Dashborad">
            {guilds.length === 0 ? <LoadingScreen /> : guilds}
        </div>
    )
}

export default DashboardPage;
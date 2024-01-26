import React from "react";
import style from "./LoadingScreen.module.css";

import loading from "../../assets/loading.svg";

function LoadingScreen() {
    return(
        <div className={style.LoadingScreen}>
            <img src={loading} alt="Loading image" className={style.Loading} />
        </div>
    )
}

export default LoadingScreen;
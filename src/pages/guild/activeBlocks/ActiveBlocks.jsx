import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import activeBlocks from "../../../api/ActiveBlocks.js";

import LoadingScreen from "../../../UI/loadingScreen/LoadingScreen";
import ActiveBlock from "../../../UI/activeBlock/ActiveBlock";
import Nothink from "../../../UI/nothink/Nothink";


function ActiveBlocks({ cookies, removeCookies, setNotify, theme }) {
    const [blocks, setBlocks] = useState([]);

    const [response, setResponse] = useState(null);
    const [blockBody, setBlockBody] = useState(<LoadingScreen />);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        activeBlocks(cookies.auth, cookies.key, params, "get_info", undefined, setResponse, removeCookies, setNotify, navigate);
    }, []);

    useEffect(() => {
        if (response !== null) {
            setBlocks(response.blocks);
        }
    }, [response]);

    useEffect(() => {
        if (blocks.length !== 0) {
            setBlockBody([]);
            for (const block of blocks) {
                setBlockBody(blockBody => [...blockBody, <ActiveBlock onClick={(ev) => {
                    activeBlocks(cookies.auth, cookies.key, params, "remove_block", block.id, undefined, removeCookies, setNotify);
                    setBlocks(blocks => blocks.filter(b => b.id !== block.id));
                }} target={block.target} author={block.author} reasone={block.reasone} data={block.data} theme={theme} key={block.id} />]);
            }
        } else {
            setBlockBody(<Nothink />);
        }
    }, [blocks, theme]);

    return (
        <div className="mainBlock">
            {blockBody}
        </div>
    )
}

export default ActiveBlocks;
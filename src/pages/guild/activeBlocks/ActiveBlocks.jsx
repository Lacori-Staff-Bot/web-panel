import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import activeBlocks from "../../../api/ActiveBlocks.js";
import { NavigateContext } from "../../../App.jsx";

import LoadingScreen from "../../../components/UI/loadingScreen/LoadingScreen";
import ActiveBlock from "../../../components/activeBlock/ActiveBlock";
import Nothink from "../../../components/UI/nothink/Nothink";

function ActiveBlocks({ cookies, removeCookies, setNotify }) {
    const [blocks, setBlocks] = useState([]);

    const [response, setResponse] = useState(null);
    const [blockBody, setBlockBody] = useState(<LoadingScreen />);

    const navigate = useContext(NavigateContext);
    const params = useParams();

    useEffect(() => {
        activeBlocks(cookies.auth, cookies.key, params, "get_info", undefined, setResponse, removeCookies, setNotify, navigate);
    }, [cookies, params, removeCookies, navigate, setNotify]);

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
                    activeBlocks(cookies.auth, cookies.key, params, "remove_block", block.id, undefined, removeCookies, setNotify, navigate);
                    setBlocks(blocks => blocks.filter(b => b.id !== block.id));
                }} target={block.target} author={block.author} reasone={block.reasone} data={block.data} key={block.id} />]);
            }
        } else {
            setBlockBody(<Nothink />);
        }
    }, [cookies, params, removeCookies, navigate, setNotify, blocks]);

    return (
        <div className="mainBlock">
            {blockBody}
        </div>
    )
}

export default ActiveBlocks;
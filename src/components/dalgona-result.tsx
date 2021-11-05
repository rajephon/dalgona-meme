// Copyright (c) 2021. Chanwoo Noh <rajephon@gmail.com>. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

import React from "react";
import Container from "@mui/material/Container";
import {useSelector} from "react-redux";
import {ReducerType} from "../rootReducer";
import {ResultImageState} from "../slices/result-image-state";

const AlwaysScrollToBottom = () => {
    const elementRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => elementRef?.current?.scrollIntoView());
    return <div ref={elementRef} />;
};

const DalgonaResult = () => {
    const resultImageState = useSelector<ReducerType, ResultImageState>(state => state.resultImageState);

    return <Container maxWidth={"lg"} sx={{marginTop: "15px", paddingTop: "15px", borderTop:"1px solid #eee"}}>
        {resultImageState.dataUrl && <>
            <img src={resultImageState.dataUrl} style={{width: "100%"}} alt="result dalgona meme" />
            <AlwaysScrollToBottom/>
        </>}
    </Container>
}

export default DalgonaResult;

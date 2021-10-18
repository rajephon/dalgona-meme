// Copyright (c) 2021. Chanwoo Noh <rajephon@gmail.com>. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

import React from 'react';
import './App.css';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import DalgonaForm from "./components/dalgona-form";
import DalgonaCanvas from "./components/dalgona-canvas";
import DalgonaHeader from "./components/dalgona-header";
import DalgonaFooter from "./components/dalgona-footer";
import DalgonaResult from "./components/dalgona-result";

function App() {
    const [imgBuf, setImgBuf] = React.useState<ArrayBuffer>();

    const onClickGenerate = (newImgBuf: ArrayBuffer) => {
        setImgBuf(newImgBuf);
    }

    return (<>
            <DalgonaHeader />
            <Container maxWidth={"lg"} sx={{marginTop: "15px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <DalgonaCanvas imgBuf={imgBuf} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DalgonaForm onClickGenerate={onClickGenerate} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <DalgonaResult />
                    </Grid>
                </Grid>
            </Container>
            <DalgonaFooter/>
        </>
    );
}

export default App;

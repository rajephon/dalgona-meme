// Copyright (c) 2021. Chanwoo Noh <rajephon@gmail.com>. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

import React from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';

const style: React.CSSProperties = {
    backgroundColor: "#d4366e",
    color: "#222",
    boxShadow: "none",
    borderWidth: "0",
};

const DalgonaHeader = () => {
    return <AppBar position={"static"} style={style}>
        <Toolbar>
            <Typography variant="h5" component="h5" sx={{flexGrow: 1, fontWeight: 600}}>
                <span style={{color: "#F5DCB4FF"}}>Dalgona</span> meme generator
            </Typography>
        </Toolbar>
    </AppBar>;
}

export default DalgonaHeader;

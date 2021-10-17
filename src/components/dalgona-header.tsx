// Copyright (c) 2021. Chanwoo Noh <rajephon@gmail.com>. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

import React from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';

const DalgonaHeader = () => {
    return <AppBar position={"static"}>
        <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Dalgona meme generator
            </Typography>
        </Toolbar>
    </AppBar>;
}

export default DalgonaHeader;

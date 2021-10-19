// Copyright (c) 2021. Chanwoo Noh <rajephon@gmail.com>. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

import React from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';

const DalgonaHeader = () => {
    return <AppBar position={"static"} style={{backgroundColor:"white", color:"#333", boxShadow:"none", border: "1px solid #ddd"}}>
        <Toolbar>
            {/*<h4>Dalgona meme generator</h4>*/}
            <Typography variant="h5" component="h5" sx={{flexGrow: 1, fontWeight:600}}>
                <span style={{color:"#ab9065"}}>Dalgona</span> meme generator
            </Typography>
        </Toolbar>
    </AppBar>;
}

export default DalgonaHeader;

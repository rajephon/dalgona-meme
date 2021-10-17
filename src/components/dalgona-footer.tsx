// Copyright (c) 2021. Chanwoo Noh <rajephon@gmail.com>. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import GitHubIcon from '@mui/icons-material/GitHub';


const DalgonaFooter = () => {
    return <Container id="footer" maxWidth={"lg"} sx={{marginTop: "15px", paddingTop: "15px", borderTop:"1px solid #eee"}}>
        <Typography component="div" sx={{flexGrow: 1}}>
            Developed by <a href="https://rajephon.dev" target="_blank">rajephon</a> / <a href="https://github.com/rajephon/dalgona-meme" target="_blank"><GitHubIcon fontSize="inherit" /> Github</a><br />
            <a href="https://github.com/rajephon/dalgona-meme/issues" target="_blank">Report bug &amp; issue</a>
        </Typography>

    </Container>;
}

export default DalgonaFooter;

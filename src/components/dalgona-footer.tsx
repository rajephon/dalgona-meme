// Copyright (c) 2021. Chanwoo Noh <rajephon@gmail.com>. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import GitHubIcon from '@mui/icons-material/GitHub';
import Grid from "@mui/material/Grid";


const DalgonaFooter = () => {
    // return <Container id="footer" maxWidth={"lg"} sx={{marginTop: "15px", paddingTop: "15px", borderTop:"1px solid #eee"}}>

    // </Container>;
    return <div>
        <Container id="footer" maxWidth={"lg"}
                   sx={{marginTop: "15px"}}>
            <Grid container sx={{borderTop: "1px solid #eee", paddingTop: "15px"}}>
                <Grid item xs={7} md={9}>
                    <Typography component="div" sx={{flexGrow: 1}}>
                        Developed by <a href="https://rajephon.dev" target="_blank">rajephon</a> / <a
                        href="https://github.com/rajephon/dalgona-meme" target="_blank"><GitHubIcon
                        fontSize="inherit"/> Github</a><br/>
                        <a href="https://github.com/rajephon/dalgona-meme/issues" target="_blank">Report
                            bug &amp; issue</a>
                    </Typography>
                </Grid>
                <Grid item xs={5} md={3}>
                    <a href="https://thankyou-for.com/creator/rajephon" target="_blank">
                        <img height="40" style={{border: 0, height: "40px"}}
                             src="https://de56jrhz7aye2.cloudfront.net/banner/black.svg" alt="thank you for button"/>
                    </a>
                </Grid>
            </Grid>
        </Container>
    </div>
}

export default DalgonaFooter;

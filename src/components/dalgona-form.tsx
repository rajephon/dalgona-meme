// Copyright (c) 2021. Chanwoo Noh <rajephon@gmail.com>. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

import React, {FunctionComponent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ReducerType} from "../rootReducer";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Checkbox from "@mui/material/Checkbox";
import {DalgonaState, changeDalgonaState} from "../slices/dalgona-state";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import DownloadIcon from "@mui/icons-material/Download";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CircularProgress from "@mui/material/CircularProgress";
import * as gtag from "../utils/gtag";


declare namespace IDalgonaForm {
    export interface IProp {
        onClickGenerate: (imgBuf: ArrayBuffer) => void,
    }
}

const DalgonaForm: FunctionComponent<IDalgonaForm.IProp> = ({onClickGenerate}) => {
    const [imgFile, setImgFile] = React.useState<File>();
    const [scale, setScale] = React.useState<number | string>(1.0);
    const [lt, setLt] = React.useState<number | string>("");
    const [ut, setUt] = React.useState<number | string>("");
    const dalgonaState = useSelector<ReducerType, DalgonaState>(state => state.dalgonaState);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (typeof scale === "number") {
            const newState = {...dalgonaState};
            newState.scale = scale;
            dispatch(changeDalgonaState(newState));
        }
    }, [scale]);

    React.useEffect(() => {
        if (dalgonaState.lt === lt)
            return;

        setLt(dalgonaState?.lt?.toFixed(2) ?? "");
    }, [dalgonaState.lt]);

    React.useEffect(() => {
        if (dalgonaState.ut === ut)
            return;
        setUt(dalgonaState?.ut?.toFixed(2) ?? "");
    }, [dalgonaState.ut]);

    React.useEffect(() => {
        console.log(`dalgonaState.isLoading: ${dalgonaState.isLoading}`);
    }, [dalgonaState.isLoading])


    const onClickGenerateBtn = async () => {
        if (imgFile === undefined) {
            alert("사용할 이미지를 선택해주세요.");
            return;
        }
        const start = Date.now();

        const imgFileBuf = await imgFile.arrayBuffer();
        onClickGenerate(imgFileBuf);
        const delta = Date.now() - start;
        gtag.event({
            action: "generate",
            category: "click",
            label: JSON.stringify({elapsed:delta}),
            value: 0
        });
    }

    const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        console.log(e.currentTarget.files);
        if (e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];
            setImgFile(file);
        }
    }

    const onChangeSlider = (setValueCallback: (value: number) => void) => {
        return (_: Event, newValue: number | number[]) => {
            if (typeof newValue === "number") {
                setValueCallback(newValue as number);
            } else {
                console.error(`invalid type of newValue (type: ${typeof newValue})`);
            }
        }
    }

    const onChangeInput = (setValueCallback: (value: number | string) => void) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueCallback((e.target.value === "") ? "" : Number(e.target.value));
        }
    }

    const onChangeLowerThreshold = (newLt: number | string) => {
        setLt(newLt);

        const newState: DalgonaState = {...dalgonaState};
        newState.lt = (typeof newLt === "number") ? newLt : undefined;
        dispatch(changeDalgonaState(newState));
    }

    const onChangeUpperThreshold = (newUt: number | string) => {
        setUt(newUt);

        const newState: DalgonaState = {...dalgonaState};
        newState.ut = (typeof newUt === "number") ? newUt : undefined;
        dispatch(changeDalgonaState(newState));
    }

    const onChangeLtAutoCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        const newLt = checked ? "" : 0.01;

        onChangeLowerThreshold(newLt);
    }

    const onChangeUtAutoCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        const newUt = checked ? "" : 0.5;

        onChangeUpperThreshold(newUt);
    }

    const onClickDownloadBtn = () => {
        const newState:DalgonaState = {...dalgonaState};
        newState.download = true;
        dispatch(changeDalgonaState(newState));

        gtag.event({
            action: "download",
            category: "click",
            label: "",
            value: 0
        });
    };

    return (
        <form>
            <input type="file" id="input-photo" accept="image/*" onChange={onChangeFileInput}
                   disabled={dalgonaState.isLoading}/>
            <Tooltip title="Select image">
                <>
                    <label htmlFor="input-photo">
                        <IconButton color="primary" aria-label="upload picture" component="span"
                                    disabled={dalgonaState.isLoading}>
                            <PhotoCamera fontSize="large"/>
                        </IconButton>
                    </label>
                    <Box>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography id="lt-slider" gutterBottom>Lower Threshold (0-1)</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox
                                        disabled={dalgonaState.isLoading}
                                        checked={dalgonaState.lt === undefined}
                                        onChange={onChangeLtAutoCheckbox}
                                    />} label={"auto"}/>
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={10}>
                                <Slider track={false}
                                        aria-labelledby="lt-slider"
                                        valueLabelDisplay="auto"
                                        value={dalgonaState.lt === undefined ? 0.0 : dalgonaState.lt}
                                        onChange={onChangeSlider(onChangeLowerThreshold)}
                                        step={0.01}
                                        min={0}
                                        max={1.0}
                                        disabled={dalgonaState.isLoading}
                                />
                            </Grid>
                            <Grid item xs>
                                <Input
                                    value={lt}
                                    size="small"
                                    inputProps={{
                                        min: 0,
                                        max: 1,
                                        step: 0.01,
                                        type: "number",
                                        'aria-labelledby': "lt-slider",
                                    }}
                                    onChange={onChangeInput(onChangeLowerThreshold)}
                                    disabled={dalgonaState.isLoading}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography id="ut-slider" gutterBottom>
                                    Upper Threshold (0-1)
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox
                                        disabled={dalgonaState.isLoading}
                                        checked={dalgonaState.ut === undefined}
                                        onChange={onChangeUtAutoCheckbox}
                                    />} label={"auto"}/>
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={10}>
                                <Slider track={false}
                                        aria-labelledby="ut-slider"
                                        valueLabelDisplay="auto"
                                        value={dalgonaState?.ut ?? 0.0}
                                        onChange={onChangeSlider(onChangeUpperThreshold)}
                                        step={0.01}
                                        min={0}
                                        max={1.0}
                                        disabled={dalgonaState.isLoading}
                                />
                            </Grid>
                            <Grid item xs>
                                <Input
                                    value={ut}
                                    size="small"
                                    inputProps={{
                                        min: 0,
                                        max: 1,
                                        step: 0.01,
                                        type: "number",
                                        'aria-labelledby': "ut-slider",
                                    }}
                                    onChange={onChangeInput(onChangeUpperThreshold)}
                                    disabled={dalgonaState.isLoading}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Typography id="scale-slider" gutterBottom>
                            Image scale
                        </Typography>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={10}>
                                <Slider track={false}
                                        aria-labelledby="scale-slider"
                                        valueLabelDisplay="auto"
                                        value={typeof scale === "number" ? scale : 1.0}
                                        onChange={onChangeSlider(setScale)}
                                        step={0.1}
                                        min={0.1}
                                        max={2.0}
                                        disabled={dalgonaState.isLoading}
                                />
                            </Grid>
                            <Grid item xs>
                                <Input
                                    value={scale}
                                    size="small"
                                    inputProps={{
                                        min: 0.1,
                                        max: 2,
                                        step: 0.1,
                                        type: "number",
                                        'aria-labelledby': "scale-slider",
                                    }}
                                    onChange={onChangeInput(setScale)}
                                    disabled={dalgonaState.isLoading}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box style={{marginTop:"18px"}}>
                        <Grid container spacing={2} alignItems="center">
                            {dalgonaState.isLoading ?
                                <>
                                    <Grid item xs={5} />
                                    <Grid item xs={2}>
                                        <CircularProgress/>
                                    </Grid>
                                    <Grid item xs={5} />
                                </>
                                :
                                <>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="outlined"
                                            onClick={onClickGenerateBtn}
                                            startIcon={<AutoFixHighIcon/>} >
                                            Generate
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="outlined"
                                                onClick={onClickDownloadBtn}
                                                startIcon={<DownloadIcon/>} >
                                            Download
                                        </Button>
                                    </Grid>
                                </>
                            }

                        </Grid>
                    </Box>
                </>
            </Tooltip>
        </form>
    )
};

export default DalgonaForm;

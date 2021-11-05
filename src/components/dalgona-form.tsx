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

const checkboxStyle:React.CSSProperties = {
    color: "#ddd",
};

const DalgonaForm: FunctionComponent<IDalgonaForm.IProp> = ({onClickGenerate}) => {
    const [imgFile, setImgFile] = React.useState<File>();
    const [scale, setScale] = React.useState<number | string>(1.0);
    const [lt, setLt] = React.useState<number | string>("");
    const [ut, setUt] = React.useState<number | string>("");
    const [needApply, setNeedApply] = React.useState<boolean>(false);
    const dalgonaState = useSelector<ReducerType, DalgonaState>(state => state.dalgonaState);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (typeof scale === "number") {
            const newState = {...dalgonaState};
            newState.scale = scale;
            dispatch(changeDalgonaState(newState));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scale]);

    React.useEffect(() => {
        if (dalgonaState.threshold1 === lt)
            return;

        setLt(dalgonaState?.threshold1?.toFixed(2) ?? "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dalgonaState.threshold1]);

    React.useEffect(() => {
        if (dalgonaState.threshold2 === ut)
            return;
        setUt(dalgonaState?.threshold2?.toFixed(2) ?? "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dalgonaState.threshold2]);

    React.useEffect(() => {
        console.log(`dalgonaState.isLoading: ${dalgonaState.isLoading}`);
    }, [dalgonaState.isLoading])


    const onClickApplyBtn = async () => {
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
            label: JSON.stringify({elapsed: delta}),
            value: 0
        });

        setNeedApply(false);
    }

    const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        console.log(e.currentTarget.files);
        if (e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];
            setImgFile(file);
        }
        setNeedApply(true);
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

    const onChangeLowerThreshold = (newLt: number | string) => {
        setLt(newLt);
        setNeedApply(true);

        const newState: DalgonaState = {...dalgonaState};
        newState.threshold1 = (typeof newLt === "number") ? newLt : undefined;
        dispatch(changeDalgonaState(newState));
    }

    const onChangeUpperThreshold = (newUt: number | string) => {
        setUt(newUt);
        setNeedApply(true);

        const newState: DalgonaState = {...dalgonaState};
        newState.threshold2 = (typeof newUt === "number") ? newUt : undefined;
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

    const onClickGenerateBtn = () => {
        const newState: DalgonaState = {...dalgonaState};
        newState.generate = true;
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
            <Box>
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
                    </>
                </Tooltip>
            </Box>
            <Box>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                        <Typography id="lt-slider" gutterBottom>Threshold 1</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox
                                disabled={dalgonaState.isLoading}
                                checked={dalgonaState.threshold1 === undefined}
                                onChange={onChangeLtAutoCheckbox}
                                style={checkboxStyle}
                            />} label={"auto"}/>
                        </FormGroup>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <Slider track={false}
                                aria-labelledby="lt-slider"
                                valueLabelDisplay="auto"
                                value={dalgonaState.threshold1 === undefined ? 0.0 : dalgonaState.threshold1}
                                onChange={onChangeSlider(onChangeLowerThreshold)}
                                step={1}
                                min={0}
                                max={255}
                                disabled={dalgonaState.isLoading}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                        <Typography id="ut-slider" gutterBottom>
                            Threshold 2
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox
                                disabled={dalgonaState.isLoading}
                                checked={dalgonaState.threshold2 === undefined}
                                onChange={onChangeUtAutoCheckbox}
                                style={checkboxStyle}
                            />} label={"auto"}/>
                        </FormGroup>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Grid container spacing={2} alignItems="center">
                    {/*<Grid item xs={1}/>*/}
                    <Grid item xs={12}>
                        <Slider track={false}
                                aria-labelledby="ut-slider"
                                valueLabelDisplay="auto"
                                value={dalgonaState?.threshold2 ?? 0.0}
                                onChange={onChangeSlider(onChangeUpperThreshold)}
                                step={1}
                                min={0}
                                max={255}
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
                    <Grid item xs>
                        <Slider track={false}
                                aria-labelledby="scale-slider"
                                valueLabelDisplay="auto"
                                value={typeof scale === "number" ? scale : 1.0}
                                onChange={onChangeSlider(setScale)}
                                step={0.1}
                                min={0.1}
                                max={3.0}
                                disabled={dalgonaState.isLoading}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box style={{marginTop: "18px"}}>
                <Grid container spacing={2} alignItems="center">
                    {dalgonaState.isLoading ?
                        <>
                            <Grid item xs={5}/>
                            <Grid item xs={2}>
                                <CircularProgress/>
                            </Grid>
                            <Grid item xs={5}/>
                        </>
                        :
                        <>
                            <Grid item xs={6}>
                                <Button
                                    style={{width: "100%"}}
                                    variant={needApply?"contained":"outlined"}
                                    onClick={onClickApplyBtn}
                                    startIcon={<AutoFixHighIcon/>}>
                                    Apply
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    style={{width: "100%"}}
                                    variant="outlined"
                                    onClick={onClickGenerateBtn}
                                    startIcon={<DownloadIcon/>}>
                                    Generate
                                </Button>
                            </Grid>
                        </>
                    }

                </Grid>
            </Box>
        </form>
    )
};

export default DalgonaForm;

// Copyright (c) 2021. Chanwoo Noh <rajephon@gmail.com>. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

import React, {FunctionComponent} from "react";
import {useDispatch, useSelector} from "react-redux";
import cv from "@techstark/opencv-js";
import {ReducerType} from "../rootReducer";
import {DalgonaState, changeDalgonaState} from "../slices/dalgona-state";
import backgroundImg from "../images/background.png";
import maskImg from "../images/mask.png";
import {changeResultImageState, ResultImageState} from "../slices/result-image-state";

declare namespace IDalgonaCanvas {
    export interface IProps {
        imgBuf?: ArrayBuffer,
    }
}

const toBase64 = (buffer: ArrayBuffer) => {
    const arr = new Uint8Array(buffer)
    return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
}

const convertToImageDataUrl = (imageBuffer: ArrayBuffer) => `data:image/png;base64,${toBase64(imageBuffer)}`

const DalgonaCanvas: FunctionComponent<IDalgonaCanvas.IProps> = ({imgBuf}) => {
    const CANVAS_BASE_WIDTH = 1543;
    const CANVAS_BASE_HEIGHT = 770;

    const BASE_POS_X = 818;
    const BASE_POS_Y = 376;

    // const border
    const DALGONA_BORDER_COLOR = {
        r: 82,
        g: 48,
        b: 12
    }

    const canvasBackgroundRef = React.useRef<HTMLCanvasElement>(null);
    const canvasPictureRef = React.useRef<HTMLCanvasElement>(null);
    const canvasEdgeRef = React.useRef<HTMLCanvasElement>(null);
    const canvasDownloadRef = React.useRef<HTMLCanvasElement>(null);

    const imagePictureRef = React.useRef<HTMLImageElement>(null);
    const imageMaskRef = React.useRef<HTMLImageElement>(null);
    const imageEdgeRef = React.useRef<HTMLImageElement>(null);

    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const [mousePos, setMousePos] = React.useState<{ x: number, y: number }>({x: 0, y: 0});
    const [imageRelativePos, setImageRelativePos] = React.useState<{ x: number, y: number }>({
        x: BASE_POS_X,
        y: BASE_POS_Y
    });

    const dalgonaState = useSelector<ReducerType, DalgonaState>(state => state.dalgonaState);
    const dispatch = useDispatch();


    React.useEffect(() => {
        if (dalgonaState.generate) {
            downloadImage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dalgonaState.generate]);


    React.useEffect(() => {
        buildPictureCanvasAsync(imageRelativePos.x, imageRelativePos.y).then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dalgonaState.scale]);

    const loadImageAsync = async (imageUrl: string): Promise<HTMLImageElement> => {
        return new Promise(((resolve, reject) => {
            const img = new Image()
            img.src = imageUrl
            img.crossOrigin = 'Anonymous'
            img.onload = function () {
                console.timeEnd('loadImage')
                resolve(img)
            }
        }));
    }

    const resetBackgroundAsync = async () => {
        if (typeof canvasBackgroundRef === "undefined") {
            console.time("canvasBackgroundRef is undefined");
            return;
        }
        const canvas = canvasBackgroundRef.current;
        if (canvas === null) {
            console.log("canvasBackgroundRef.current is null");
            return;
        }
        const ctx = canvas.getContext("2d");
        if (ctx === null)
            return;
        ctx.drawImage(await loadImageAsync(backgroundImg), 0, 0);
        ctx.save();
    }


    const buildPictureCanvasAsync = async (fixedX: number, fixedY: number) => {
        if (typeof canvasPictureRef === "undefined" || canvasPictureRef === null) {
            console.time("canvasPictureRef is undefined or null");
            return;
        }
        if (imagePictureRef === null) {
            console.time("imageRef is null");
            return;
        }

        const canvas = canvasPictureRef.current;
        if (canvas === null) {
            console.log("canvasPictureRef.current is null");
            return;
        }

        const ctx = canvas.getContext("2d");
        if (ctx === null)
            return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();

        // mask for clipping
        ctx.drawImage(imageMaskRef.current!, 0, 0);
        ctx.save();

        ctx.translate(CANVAS_BASE_WIDTH / 2, CANVAS_BASE_HEIGHT / 2);

        ctx.globalCompositeOperation = "source-in";

        // // calculate position
        const posX = (-CANVAS_BASE_WIDTH / 2 + fixedX) * dalgonaState.scale;
        const posY = (-CANVAS_BASE_HEIGHT / 2 + fixedY) * dalgonaState.scale;

        console.log(`posX: ${posX}, posY: ${posY}`);

        const edgeImage = imageEdgeRef.current!;
        const imWidth = parseInt(edgeImage.width + '') * dalgonaState.scale;
        const imHeight = parseInt(edgeImage.height + '') * dalgonaState.scale;
        ctx.drawImage(edgeImage, posX, posY, imWidth, imHeight);

        ctx.restore();
    }

    const downloadImage = () => {
        const backgroundCanvas = canvasBackgroundRef.current!;
        const pictureCanvas = canvasPictureRef.current!;

        const downloadCanvas = canvasDownloadRef.current!;
        const downloadContext = downloadCanvas.getContext('2d')!;

        downloadContext.drawImage(backgroundCanvas, 0, 0);
        downloadContext.drawImage(pictureCanvas, 0, 0);

        const newResultImageState:ResultImageState = {
            dataUrl: downloadCanvas.toDataURL()
        };
        dispatch(changeResultImageState(newResultImageState));

        const newDalgonaState:DalgonaState = {...dalgonaState};
        newDalgonaState.generate = false;
        dispatch(changeDalgonaState(newDalgonaState));
    }


    React.useEffect(() => {
        resetBackgroundAsync().then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvasBackgroundRef]);


    React.useEffect(() => {
        if (imgBuf === undefined)
            return;
        if (imagePictureRef === null)
            return;
        if (imageMaskRef === null)
            return;

        onLoading(true);

        dispatch(changeResultImageState({dataUrl:undefined}));

        const imageMask = imageMaskRef.current!;
        imageMask.onload = () => {
            const imagePicture = imagePictureRef.current!;
            imagePicture.onload = () => {
                if (imgBuf === undefined)
                    return;

                const canvas = canvasEdgeRef.current!;
                const ctx = canvas.getContext('2d')!;
                ctx.clearRect(0, 0, imagePicture.width, imagePicture.height);
                canvas.height = imagePicture.height;
                canvas.width = imagePicture.width;
                console.log(`width: ${canvas.width}`);
                console.log(`height: ${canvas.height}`);

                ctx.drawImage(imagePicture, 0, 0, imagePicture.width, imagePicture.height);
                ctx.save();
                // const imageData = ctx!.getImageData(0, 0, imagePicture.width, imagePicture.height);
                // detect(imageData.data as any as Uint8Array, imagePicture.width, imagePicture.height, dalgonaState.threshold1, dalgonaState.threshold2, onDetectCallback);
                processImage();

                console.log("onload");
            };
            imagePicture.src = convertToImageDataUrl(imgBuf);

        }
        imageMask.src = maskImg;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imgBuf, imagePictureRef, imageMaskRef]);

    const onLoading = (isLoading: boolean) => {
        const newDalgonaState:DalgonaState = {...dalgonaState};
        newDalgonaState.isLoading = isLoading;
        dispatch(changeDalgonaState(newDalgonaState));
    }

    const postprocess = (buffer: number[]): Uint8ClampedArray => {
        const pixels = new Uint8ClampedArray(buffer);

        // 색상 반전 및
        for (let i = 0; i < pixels.length; i += 4) {
            // 색상 뒤짚기
            let r = 255 - pixels[i];
            let g = 255 - pixels[i + 1];
            let b = 255 - pixels[i + 2];

            if (r === 255 && g === 255 && b === 255) {
                pixels[i + 3] = 0;
            } else {
                r += DALGONA_BORDER_COLOR.r;
                g += DALGONA_BORDER_COLOR.g;
                b += DALGONA_BORDER_COLOR.b;
            }

            pixels[i] = r;
            pixels[i + 1] = g;
            pixels[i + 2] = b;
        }

        return pixels;
    }

    const processImage = () => {
        const canvasEdge = canvasEdgeRef.current!;

        const threshold1 = dalgonaState.threshold1 ?? 100;
        const threshold2 = dalgonaState.threshold2 ?? 100;

        const img = cv.imread(canvasEdge);

        // to gray scale
        const imgGray = new cv.Mat();
        cv.cvtColor(img, imgGray, cv.COLOR_BGR2GRAY);

        // detect edges using Canny
        const edges = new cv.Mat();
        cv.Canny(imgGray, edges, threshold1, threshold2);
        cv.imshow(canvasEdge, edges);

        const ctx = canvasEdge!.getContext('2d')!;
        const imageData = ctx.getImageData(0, 0, canvasEdge.width, canvasEdge.height);
        ctx.clearRect(0, 0, canvasEdge.width, canvasEdge.height)

        const pixels = postprocess(Array.from(new Uint8Array(imageData.data.buffer)));

        const newImageData = new ImageData(pixels, canvasEdge.width, canvasEdge.height);
        ctx.putImageData(newImageData, 0, 0);

        // 덧칠
        ctx.shadowBlur = 1;
        ctx.shadowColor = `rgb(${DALGONA_BORDER_COLOR.r}, ${DALGONA_BORDER_COLOR.g}, ${DALGONA_BORDER_COLOR.b})`;
        ctx.drawImage(canvasEdge, 0, 0);

        const relativePosX = BASE_POS_X - (canvasEdge.width / 2);
        const relativePosY = BASE_POS_Y - (canvasEdge.height / 2);
        console.log(`relativePosX: ${relativePosX}, relativePosY: ${relativePosY}`);
        setImageRelativePos({x: relativePosX, y: relativePosY});
        setMousePos({x: 0, y: 0});


        const imageEdge = imageEdgeRef.current!;
        imageEdge.onload = async () => {
            await buildPictureCanvasAsync(relativePosX, relativePosY);

            const newState:DalgonaState = {...dalgonaState};
            newState.isLoading = false;
            if (newState.threshold1 === undefined)
                newState.threshold1 = threshold1;
            if (newState.threshold2 === undefined)
                newState.threshold2 = threshold2;

            dispatch(changeDalgonaState(newState));
        }

        imageEdge.src = canvasEdge.toDataURL();

    }

    const onMouseMove = async (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDragging) {
            return;
        }

        const newMousePos = {x: e.pageX, y: e.pageY};
        const gap = {
            x: newMousePos.x - mousePos.x,
            y: newMousePos.y - mousePos.y
        };

        const newImageRelativePos = {
            x: imageRelativePos.x + gap.x,
            y: imageRelativePos.y + gap.y
        }

        setMousePos(newMousePos);
        setImageRelativePos(newImageRelativePos);

        await buildPictureCanvasAsync(newImageRelativePos.x, newImageRelativePos.y);
    }

    const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDragging(true);
        const newMousePos = {x: e.pageX, y: e.pageY};
        setMousePos(newMousePos);

        console.log(`mouse down {x: ${e.pageX}, y: ${e.pageY}}`);
    }
    const onMouseUp = (_: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDragging(false);
        console.log("mouse up")
    }

    return (
        <>
            <div style={{position: "relative", padding: 0, margin: 0}}>
                <canvas ref={canvasBackgroundRef} width={CANVAS_BASE_WIDTH} height={CANVAS_BASE_HEIGHT}
                        style={{position: "relative", width: "100%", zIndex: 1}}/>
                <canvas ref={canvasPictureRef} width={CANVAS_BASE_WIDTH} height={CANVAS_BASE_HEIGHT}
                        style={{position: "absolute", width: "100%", zIndex: 2, top: 0, left: 0}}
                        onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove}/>
                <canvas ref={canvasEdgeRef} width={CANVAS_BASE_WIDTH} height={CANVAS_BASE_HEIGHT}
                        style={{visibility: "hidden", width: "100%", zIndex: 2, display: "none"}}/>
                <canvas ref={canvasDownloadRef} width={CANVAS_BASE_WIDTH} height={CANVAS_BASE_HEIGHT}
                        style={{visibility: "hidden", width: "100%", zIndex: 2, display: "none"}}/>
                <img ref={imagePictureRef} style={{visibility: "hidden", display: "none"}} alt=""/>
                <img ref={imageMaskRef} style={{visibility: "hidden", display: "none"}} alt=""/>
                <img ref={imageEdgeRef} style={{visibility: "hidden", display: "none"}} alt=""/>
            </div>
        </>
    );
}

export default DalgonaCanvas;

// Copyright (c) 2021. Chanwoo Noh <rajephon@gmail.com>. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

import {
    gaussMatrix,
    toConvolution, toDenormalized,
    toGradientMagnitude,
    toGrayscale,
    toNormalized,
    toPixels,
    xMatrix,
    yMatrix
} from "./main";


export function detect(pixels: Uint8Array, width: number, height: number, lowerThreshold: number|undefined,
                      upperThreshold: number|undefined, eventCallback:(data:{type:string,data?:number[], threshold?:{lt:number,ut:number}})=>void) {


    const toConvolutionForImg = toConvolution(width, height);
    const grayscale = toPixels(toGrayscale(pixels, width, height));
    eventCallback({ type: 'grayscale', data: grayscale });

    const normalized = toNormalized(grayscale)
    eventCallback({type: 'normalized'});

    const blurred = toConvolutionForImg(gaussMatrix, 2, normalized)
    eventCallback({ type: 'blurred', data: toPixels(toDenormalized(blurred))});

    const xDerived = toConvolutionForImg(xMatrix, 1, blurred)
    eventCallback({type: 'xAxis', data: toPixels(toDenormalized(xDerived))});

    const yDerived = toConvolutionForImg(yMatrix, 1, blurred)
    eventCallback({type:'yAxis', data:toPixels(toDenormalized(yDerived))});

    if (lowerThreshold) {
        if (lowerThreshold > 1)
            lowerThreshold = 1;

        if (lowerThreshold < 0)
            lowerThreshold = 0;
    }
    if (upperThreshold) {
        if (upperThreshold > 1)
            upperThreshold = 1;

        if (upperThreshold < 0)
            upperThreshold = 0;
    }

    const gradientMagnitude = toGradientMagnitude(xDerived, yDerived, width, height, lowerThreshold, upperThreshold);
    eventCallback({type:'gradientMagnitude', data: toPixels(toDenormalized(gradientMagnitude.data)), threshold: gradientMagnitude.threshold});

}

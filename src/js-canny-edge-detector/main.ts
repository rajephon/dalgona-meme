// implemented from https://github.com/petarjs/js-canny-edge-detector

const MAX_PRECISION = false
const precision = 2

export const gaussMatrix = [
    [0.0121, 0.0261, 0.0337, 0.0261, 0.0121],
    [0.0261, 0.0561, 0.0724, 0.0561, 0.0261],
    [0.0337, 0.0724, 0.0935, 0.0724, 0.0337],
    [0.0261, 0.0561, 0.0724, 0.0561, 0.0261],
    [0.0121, 0.0261, 0.0337, 0.0261, 0.0121]
]

export const xMatrix = [ [ 1, 0, -1 ], [ 2, 0, -2 ], [ 1, 0, -1 ] ]
export const yMatrix = [ [ -1, -2, -1 ], [ 0, 0, 0 ], [ 1, 2, 1 ] ]

export const MAX_IMAGE_HEIGHT = 300

function curry(f: Function, n?: number): Function {
    const args = Array.prototype.slice.call(arguments, 0);
    if (typeof n === 'undefined')
        args[1] = f.length;
    if (n === args.length - 2)
        return f.apply(undefined, args.slice(2));
    return function() {
        // @ts-ignore
        return curry.apply(undefined, args.concat(Array.prototype.slice.call(arguments, 0)));
    };
}

// function loadImage(imageUrl: string) {
//     return new Promise ((resolve, reject) => {
//         console.time('loadImage')
//         const img = new Image()
//         img.src = imageUrl
//         img.crossOrigin = 'Anonymous'
//         img.onload = function () {
//             console.timeEnd('loadImage')
//             resolve(img)
//         }
//     })
// }

function _drawImageOnCanvas(canvas: HTMLCanvasElement, image: CanvasImageSource) {
    canvas.getContext('2d')?.drawImage(image, 0, 0)
    return image
}

const drawImageOnCanvas = curry(_drawImageOnCanvas)

function _setCanvasSizeFromImage(canvas: HTMLCanvasElement, image: HTMLImageElement) {
    const ratio = image.naturalWidth / image.naturalHeight
    canvas.style.width = ''
    canvas.getContext('2d')?.clearRect(0, 0, image.width, image.height);
    canvas.height = image.height
    canvas.width = image.width
    return image
}

const setCanvasSizeFromImage = curry(_setCanvasSizeFromImage)

function _drawBytesOnCanvas(width: number, height: number, canvas: HTMLCanvasElement, bytes: Uint8Array) {
    canvas.getContext('2d')?.putImageData(
            new ImageData(new Uint8ClampedArray(
                bytes
            ), width, height),
            0, 0
        )
}

const drawBytesOnCanvas = curry(_drawBytesOnCanvas)

export function toGrayscale(bytes: Uint8Array, width: number, height: number): Array<number> {
    console.time('toGrayscale')
    const grayscale = []
    for (let i = 0; i < bytes.length; i += 4) {
        var gray = .299 * bytes[i + 2] + .587 * bytes[i + 1] + .114 * bytes[i]
        grayscale.push(gray)
    }
    console.timeEnd('toGrayscale')

    return grayscale
}

function _toConvolution (width: number, height: number, kernel: number[][], radius: number, bytes: Uint8Array): number[] {
    console.time('toConvolution')
    const convolution = []
    let newValue, idxX, idxY, kernx, kerny
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            newValue = 0
            for (let innerI = i - radius; innerI < i + radius + 1; innerI++) {
                for (let innerJ = j - radius; innerJ < j + radius + 1; innerJ++) {
                    idxX = (innerI + width) % width
                    idxY = (innerJ + height) % height

                    kernx = innerI - (i - radius)
                    kerny = innerJ - (j - radius)
                    newValue += bytes[idxY * width + idxX] * kernel[kernx][kerny]

                }
            }
            convolution[j * width + i] = newValue
        }
    }
    console.time('toConvolution')

    return convolution
}

export const toConvolution = curry(_toConvolution)

/**
 * From image bytes (0 - 255) to values between 0 and 1
 * @param  {Array<number>} bytes
 * @return {Array}      normalized values
 */
export function toNormalized(bytes: Array<number>): Array<number> {
    console.time('toNormalized')

    const normalized = []
    for (let i = 0; i < bytes.length; i += 4) {
        normalized.push(bytes[i] / 255)
    }
    console.timeEnd('toNormalized')

    return normalized
}

/**
 * From normalized array that has values from 0 to 1
 * to image data with values between 0 and 255
 * @param  {Array}  normalized
 * @return {Array}  denormlized
 */
export function toDenormalized(normalized: Array<number>): Array<number> {
    console.time('toDenormalized')
    const denormalized =  normalized.map(value => value * 255)
    console.timeEnd('toDenormalized')
    return denormalized
}

export function toGradientMagnitude(
    xDerived: Array<number>,
    yDerived: Array<number>,
    width: number,
    height: number,
    lt = 0,
    ut = 0): any {

    console.time('toGradientMagnitude')
    const gradientMagnitude = []
    const gradientDirection = []

    let index
    let pom

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            index = y * width + x
            gradientMagnitude[index] = Math.sqrt(xDerived[index] * xDerived[index] + yDerived[index] * yDerived[index])
            pom = Math.atan2(xDerived[index], yDerived[index]);
            if ((pom >= -Math.PI / 8 && pom < Math.PI / 8) || (pom <= -7 * Math.PI / 8 && pom > 7 * Math.PI / 8)) {
                gradientDirection[index] = 0;
            } else if ((pom >= Math.PI / 8 && pom < 3 * Math.PI / 8) || (pom <= -5 * Math.PI / 8 && pom > -7 * Math.PI / 8)) {
                gradientDirection[index] = Math.PI / 4;
            } else if ((pom >= 3 * Math.PI / 8 && pom <= 5 * Math.PI / 8) || (-3 * Math.PI / 8 >= pom && pom > -5 * Math.PI / 8)) {
                gradientDirection[index] = Math.PI / 2;
            } else if ((pom < -Math.PI / 8 && pom >= -3 * Math.PI / 8) || (pom > 5 * Math.PI / 8 && pom <= 7 * Math.PI / 8)) {
                gradientDirection[index] = -Math.PI / 4;
            }
        }
    }

    const max = getMax(gradientMagnitude)
    const gradientMagnitudeCapped = gradientMagnitude.map(x => x / max)

    if (!ut && !lt) {
        let res = getThresholds(gradientMagnitudeCapped)
        ut = res.ut
        lt = res.lt
    }

    const gradientMagnitudeLt = gradientMagnitudeCapped.map(value => value < lt ? 0 : value)

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            index = y * width + x

            if (gradientDirection[index] == 0 && (gradientMagnitudeLt[index] <= gradientMagnitudeLt[y * width + x - 1] || gradientMagnitudeLt[index] <= gradientMagnitudeLt[y * width + x + 1]))
                gradientMagnitudeLt[index] = 0;
            else if (gradientDirection[index] == Math.PI / 2 && (gradientMagnitudeLt[index] <= gradientMagnitudeLt[(y - 1) * width + x] || gradientMagnitudeLt[(y + 1) * width + x] >= gradientMagnitudeLt[index]))
                gradientMagnitudeLt[index] = 0;
            else if (gradientDirection[index] == Math.PI / 4 && (gradientMagnitudeLt[index] <= gradientMagnitudeLt[(y + 1) * width + x - 1] || gradientMagnitudeLt[index] <= gradientMagnitudeLt[(y - 1) * width + x + 1]))
                gradientMagnitudeLt[index] = 0;
            else if (gradientDirection[index] == -Math.PI / 4 && (gradientMagnitudeLt[index] <= gradientMagnitudeLt[(y - 1) * width + x - 1] || gradientMagnitudeLt[index] <= gradientMagnitudeLt[(y + 1) * width + x + 1]))
                gradientMagnitudeLt[index] = 0;
        }
    }

    for (let y = 2; y < height - 2; y++) {
        for (let x = 2; x < width - 2; x++) {
            if (gradientDirection[y * width + x] == 0)
                if (gradientMagnitudeLt[y * width + x - 2] > gradientMagnitudeLt[y * width + x] || gradientMagnitudeLt[y * width + x + 2] > gradientMagnitudeLt[y * width + x])
                    gradientMagnitudeLt[y * width + x] = 0;
            if (gradientDirection[y * width + x] == Math.PI / 2)
                if (gradientMagnitudeLt[(y - 2) * width + x] > gradientMagnitudeLt[y * width + x] || gradientMagnitudeLt[(y + 2) * width + x] > gradientMagnitudeLt[y * width + x])
                    gradientMagnitudeLt[y * width + x] = 0;
            if (gradientDirection[y * width + x] == Math.PI / 4)
                if (gradientMagnitudeLt[(y + 2) * width + x - 2] > gradientMagnitudeLt[y * width + x] || gradientMagnitudeLt[(y - 2) * width + x + 2] > gradientMagnitudeLt[y * width + x])
                    gradientMagnitudeLt[y * width + x] = 0;
            if (gradientDirection[y * width + x] == -Math.PI / 4)
                if (gradientMagnitudeLt[(y + 2) * width + x + 2] > gradientMagnitudeLt[y * width + x] || gradientMagnitudeLt[(y - 2) * width + x - 2] > gradientMagnitudeLt[y * width + x])
                    gradientMagnitudeLt[y * width + x] = 0;
        }
    }

    const gradientMagnitudeUt:number[] = gradientMagnitudeLt.map(value => value > ut ? 1 : value)

    // histeresis start
    let pomH = 0
    let pomOld = -1
    let pass = 0

    let nastavi = true
    let gradientMagnitudeCappedBottom:number[] = []
    while ( nastavi ) {
        pass = pass + 1;
        pomOld = pomH;
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                if (gradientMagnitudeUt[y * width + x] <= ut && gradientMagnitudeUt[y * width + x] >= lt) {
                    let pom1 = gradientMagnitudeUt[(y - 1) * width + x - 1];
                    let pom2 = gradientMagnitudeUt[(y - 1) * width + x];
                    let pom3 = gradientMagnitudeUt[(y - 1) * width + x + 1];
                    let pom4 = gradientMagnitudeUt[y * width + x - 1];
                    let pom5 = gradientMagnitudeUt[y * width + x + 1];
                    let pom6 = gradientMagnitudeUt[(y + 1) * width + x - 1];
                    let pom7 = gradientMagnitudeUt[(y + 1) * width + x];
                    let pom8 = gradientMagnitudeUt[(y + 1) * width + x + 1];

                    if (pom1 === 1 || pom2 === 1 || pom3 === 1 || pom4 === 1 || pom5 === 1 || pom6 === 1 || pom7 === 1 || pom8 === 1) {
                        gradientMagnitudeUt[y * width + x] = 1;
                        pomH = pomH + 1;
                    }
                }
            }
        }

        if (MAX_PRECISION) {
            nastavi = pomH != pomOld;
        } else {
            nastavi = pass <= precision;
        }

        gradientMagnitudeCappedBottom = gradientMagnitudeUt.map(x => x <= ut ? 0 : x)
    }

    console.timeEnd('toGradientMagnitude')
    return {
        data: gradientMagnitudeCappedBottom,
        threshold: {
            ut: ut,
            lt: lt
        }
    }

}

function getMax(values: Array<number>): number {
    return values.reduce((prev, now) => now > prev ? now : prev, -1)
}

function getThresholds(gradientMagnitude: Array<number>): { ut: number, lt: number } {
    let sum = 0;
    let count = 0;

    sum = gradientMagnitude.reduce((memo, x) => x + memo, 0)
    count = gradientMagnitude.filter(x => x !== 0).length

    const ut = sum / count
    const lt = 0.4 * ut
    return { ut, lt }
}

/**
 * Takes an array of values (0-255) and returns
 * an expaneded array [x, x, x, 255] for each value.
 *
 * @param  {Array}  values
 * @return {Array}  expanded values
 */
export function toPixels(values: Array<number>): Array<number> {
    console.time('toPixels')
    const expanded:number[] = []
    values.forEach(x => {
        expanded.push(x)
        expanded.push(x)
        expanded.push(x)
        expanded.push(255)
    })

    console.timeEnd('toPixels')
    return expanded
}

// Copyright (c) 2021. Chanwoo Noh <rajephon@gmail.com>. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ResultImageState {
    dataUrl?: string
}

export const resultImageState = createSlice({
    name: "result-image-state",
    initialState: {
        dataUrl: undefined
    } as ResultImageState,
    reducers: {
        changeResultImageState(state, action: PayloadAction<ResultImageState>) {
            return action.payload;
        }
    },
})

export const { changeResultImageState } = resultImageState.actions;
export default resultImageState.reducer;

// Copyright (c) 2021. Chanwoo Noh <rajephon@gmail.com>. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DalgonaState {
    scale: number;
    isLoading: boolean;
    threshold2?: number;
    threshold1?: number;
    download: boolean;
}

export const dalgonaState = createSlice({
    name: "dalgona-state",
    initialState: {
        scale: 1.0,
        isLoading: false,
        download: false,
    } as DalgonaState,
    reducers: {
        changeDalgonaState(state, action: PayloadAction<DalgonaState>) {
            return action.payload;
        }
    },
})

export const { changeDalgonaState } = dalgonaState.actions;
export default dalgonaState.reducer;

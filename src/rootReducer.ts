// Copyright (c) 2021. Chanwoo Noh <rajephon@gmail.com>. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

import { combineReducers } from "@reduxjs/toolkit";
import dalgonaState from './slices/dalgona-state';
import resultImageState from "./slices/result-image-state";

const reducer = combineReducers({
    dalgonaState, resultImageState
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;


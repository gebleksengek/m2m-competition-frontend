import { AppActions, AppActionTypes } from '../actions/app.actions'

export interface AppReducer {
  reducers: AppState
}

export interface AppState {
  title: string,
  loader: {
    text: string
  }
}

const initialState: AppState = {
  title: "",
  loader: {
    text: ""
  }
}

export const reducers = (
  state: AppState = initialState,
  action: AppActions
): AppState => {
  switch (action.type) {
    case AppActionTypes.SET_TITLE:
      return { ...state, title: action.payload }

    case AppActionTypes.SET_LOADER_TEXT:
      return { ...state, loader: { ...state.loader, text: action.payload } }

    default:
      return state
  }
}


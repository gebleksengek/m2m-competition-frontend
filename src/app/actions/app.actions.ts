import { Action } from '@ngrx/store'

export enum AppActionTypes {
  SET_TITLE = '[App Title] Set',
  SET_LOADER_TEXT = "[App Loader Text] Set"
}

export class SetTitle implements Action {
  readonly type = AppActionTypes.SET_TITLE
  constructor(
    public payload: string
  ) { }
}

export class SetLoaderText implements Action {
  readonly type = AppActionTypes.SET_LOADER_TEXT
  constructor(
    public payload: string
  ) { }
}

export type AppActions = SetTitle | SetLoaderText
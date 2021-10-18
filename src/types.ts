import { Action } from 'redux'

/**/
export type ActionStatus = 'start' | 'success' | 'failure'

export type Template<Slice extends string, Action extends string> = `${Slice} [${Action}]`

export type TemplateWithStatus<Slice extends string, Action extends string, Status extends ActionStatus> = `${Template<Slice, Action>} ${Status}`

export interface ParsedType {
  commonType: string
  mode: ActionStatus
}

/**/
export type ActionSimple = Action

export interface ActionPayload<P = unknown> extends ActionSimple {
  payload: P
}

export interface ActionError<E = unknown> extends ActionSimple {
  error: E
}

export type SliceAction = ActionSimple | ActionPayload | ActionError

/**/
export type Waiting = string[]

export type Errors<E = unknown> = Record<string, E>

/**/
interface MetaKey<K = string | number> {
  key: K
}
// TODO: generic
export interface MetaPayload extends MetaKey {}

export type WaitingWithMeta = Array<string | [string, MetaPayload]>

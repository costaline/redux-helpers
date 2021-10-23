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
export interface ActionSimple extends Action {
  meta?: MetaPayload
}

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

export interface ErrorMetaPayload<E> {
  error: E,
  meta: MetaPayload
}

export type SimpleErrors<E> = Record<string, E>
export type MetaErrors<E> = Record<string, Array<ErrorMetaPayload<E>>>
export type MixedErrors<E> = Record<string, Array<E | ErrorMetaPayload<E>>>

export type ErrorsWithMeta<E = unknown> = SimpleErrors<E> | MetaErrors<E> | MixedErrors<E>

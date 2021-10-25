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
interface MetaKey<K = string | number> {
  key: K
}

// TODO: generic
export interface MetaPayload extends MetaKey {
}

export type Waiting = Array<string | [string, MetaPayload]>

export interface ErrorMetaPayload<E> {
  error: E,
  meta: MetaPayload
}

export type SimpleError<E> = E
export type MetaError<E> = ErrorMetaPayload<E>
export type MixedError<E> = SimpleError<E> | MetaError<E>
export type ErrorType<E> = SimpleError<E> | Array<MixedError<E>>

export type Errors<E = unknown> = Record<string, ErrorType<E>>

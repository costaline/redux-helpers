import produce, { castDraft, Immutable } from 'immer'

import { parseType } from './utils'
import {
  ActionError, ActionStatus, ErrorMetaPayload,
  Errors, ErrorType, MetaError,
  MetaPayload,
  SliceAction,
  TemplateWithStatus,
} from './types'

const add = <E>(errors: Errors<E>, type: string, error: E): Errors<E> => {
  return produce(errors, draft => {
    draft[type] = castDraft(error)
  })
}

const addWithMeta = <E>(errors: Errors<E>, type: string, error: E, meta: MetaPayload): Errors<E> => {
  return produce(errors, draft => {
    const errorsByType = draft[type] || []

    if (Array.isArray(errorsByType)) {
      const isExists = !!(errorsByType as Array<MetaError<E>>).find(item => {
        const key = item?.meta?.key

        return !!key && key === meta.key
      })

      if (!isExists) {
        errorsByType.push(castDraft({ error, meta }))
      }
    } else {
      ;(draft[type] as Array<E | ErrorMetaPayload<E>>) = [errorsByType as E]
      ;(draft[type] as Array<E | ErrorMetaPayload<E>>).push({ error, meta })
    }
  })
}

const remove = <E>(errors: Errors<E>, type: string): Errors<E> => {
  return produce(errors, draft => {
    delete draft[type]
  })
}

const removeWithMeta = <E>(errors: Errors<E>, type: string, meta: MetaPayload): Errors<E> => {
  return produce(errors, draft => {
    const errorsByType = draft[type]

    if (Array.isArray(errorsByType) && errorsByType.length) {
      (draft[type] as Array<ErrorMetaPayload<E>>) = (errorsByType as Array<ErrorMetaPayload<E>>)
        .filter(item => {
          const key = item?.meta?.key

          return !!key && key !== meta.key
        })
    }
  })
}

export const updateErrors = <E>(errors: Errors<E>, action: SliceAction): Errors<E> => {
  const { commonType, mode } = parseType(action.type)

  if (!!action.meta) {
    switch (mode) {
      case 'start':
        return removeWithMeta<E>(errors, commonType, action.meta)
      case 'failure':
        return addWithMeta<E>(errors, commonType, (action as ActionError<E>).error, action.meta)
      default:
        return errors
    }
  }

  switch (mode) {
    case 'start':
      return remove<E>(errors, commonType)
    case 'failure':
      return add<E>(errors, commonType, (action as ActionError<E>).error)

    default:
      return errors
  }
}

export const getError = <E>(errors: Immutable<Errors<E>>, type: TemplateWithStatus<string, string, ActionStatus>): Immutable<ErrorType<E>> => {
  const { commonType } = parseType(type)

  return errors[commonType]
}

export const getErrorWithMeta = <E>(errors: Immutable<Errors<E>>, type: TemplateWithStatus<string, string, ActionStatus>): Immutable<ErrorType<E>> => {
  const { commonType } = parseType(type)

  return errors[commonType] || []
}

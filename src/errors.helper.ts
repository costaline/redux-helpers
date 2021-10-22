import produce, { castDraft, Immutable } from 'immer'
import { parseType } from './utils'
import {
  ActionError, ActionStatus, ErrorMetaPayload,
  ErrorsWithMeta,
  MetaPayload,
  SliceAction,
  TemplateWithStatus,
} from './types'

const add = <E>(errors: ErrorsWithMeta<E>, type: string, error: E): ErrorsWithMeta<E> => {
  return produce(errors, draft => {
    draft[type] = castDraft(error)
  })
}

const addWithMeta = <E>(errors: ErrorsWithMeta<E>, type: string, error: E, meta: MetaPayload): ErrorsWithMeta<E> => {
  return produce(errors, draft => {
    const errorsByType = draft[type] || []

    if (Array.isArray(errorsByType)) {
      const isExists = !!errorsByType.find(({ meta: { key } }) => key === meta.key)

      if (!isExists) {
        errorsByType.push(castDraft({ error, meta }))
      }
    } else {
    }

    // TODO: else case
  })
}

const remove = <E>(errors: ErrorsWithMeta<E>, type: string): ErrorsWithMeta<E> => {
  return produce(errors, draft => {
    delete draft[type]
  })
}

const removeWithMeta = <E>(errors: ErrorsWithMeta<E>, type: string, meta: MetaPayload): ErrorsWithMeta<E> => {
  return produce(errors, draft => {
    const errorsByType = draft[type]

    if (Array.isArray(errorsByType) && errorsByType.length) {
      draft[type] = errorsByType.filter(({ meta: { key } }) => key !== meta.key)
    }
  })
}

export const updateErrors = <E>(errors: ErrorsWithMeta<E>, action: SliceAction): ErrorsWithMeta<E> => {
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

export const getError = <E>(errors: Immutable<ErrorsWithMeta<E>>, type: TemplateWithStatus<string, string, ActionStatus>): Immutable<E | Array<ErrorMetaPayload<E>>> => {
  const { commonType } = parseType(type)

  return errors[commonType]
}

export const getErrorWithMeta = <E>(errors: Immutable<ErrorsWithMeta<E>>, type: TemplateWithStatus<string, string, ActionStatus>): Immutable<E | Array<ErrorMetaPayload<E>>> => {
  const { commonType } = parseType(type)

  return errors[commonType] || []
}

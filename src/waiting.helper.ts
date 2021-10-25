import { Immutable, produce } from 'immer'

import {
  ActionStatus,
  MetaPayload,
  SliceAction,
  TemplateWithStatus,
  Waiting,
} from './types'
import { parseType } from './utils'

const add = (waiting: Waiting, commonType: string): Waiting => {
  if (waiting.includes(commonType)) return waiting

  return produce(waiting, draft => {
    draft.push(commonType)
  })
}

const addWithMeta = (waiting: Waiting, commonType: string, meta: MetaPayload): Waiting => {
  const isExists = !!waiting.find((item) => {
    if (Array.isArray(item)) {
      const [w, { key }] = item

      return w === commonType && key === meta.key
    }

    return false
  })

  if (isExists) return waiting

  return produce(waiting, draft => {
    draft.push([commonType, meta])
  })
}

const remove = (waiting: Waiting, commonType: string): Waiting => {
  return produce(waiting, draft => {
    return draft.filter(w => w !== commonType)
  })
}

const removeWithMeta = (waiting: Waiting, commonType: string, meta: MetaPayload): Waiting => {
  try {
    return produce(waiting, draft => {
      return draft.filter((item) => {
        if (Array.isArray(item)) {
          const [w, { key }] = item

          return !(w === commonType && key === meta.key)
        }

        return true
      })
    })
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.warn('Error to update expectations: ', e.toString())
    }

    return waiting
  }
}

export const updateWaiting = (waiting: Waiting, action: SliceAction): Waiting => {
  const { commonType, mode } = parseType(action.type)

  if (!!action.meta) {
    switch (mode) {
      case 'start':
        return addWithMeta(waiting, commonType, action.meta)
      case 'success':
      case 'failure':
        return removeWithMeta(waiting, commonType, action.meta)
      default:
        return waiting
    }
  }

  switch (mode) {
    case 'start':
      return add(waiting, commonType)
    case 'success':
    case 'failure':
      return remove(waiting, commonType)
    default:
      return waiting
  }
}

export const getWaitingWithMeta = (waiting: Immutable<Waiting>, type: TemplateWithStatus<string, string, ActionStatus>): Immutable<Waiting> => {
  const { commonType } = parseType(type)

  return waiting.filter((item) => {
    if (Array.isArray(item)) {
      const [w] = item

      return w === commonType
    }

    return false
  })
}

export const getWaitingStatus = (waiting: Immutable<Waiting>, type: TemplateWithStatus<string, string, ActionStatus>): boolean => {
  const {commonType} = parseType(type)

  return waiting.includes(commonType)
}

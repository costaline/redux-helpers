import { Immutable, produce } from 'immer'

import {
  ActionStatus,
  MetaPayload,
  SliceAction,
  TemplateWithStatus,
  WaitingWithMeta,
} from './types'
import { parseType } from './utils'

const add = (waiting: WaitingWithMeta, commonType: string): WaitingWithMeta => {
  if (waiting.includes(commonType)) return waiting

  return produce(waiting, draft => {
    draft.push(commonType)
  })
}

const addWithMeta = (waiting: WaitingWithMeta, commonType: string, meta: MetaPayload): WaitingWithMeta => {
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

const remove = (waiting: WaitingWithMeta, commonType: string): WaitingWithMeta => {
  return produce(waiting, draft => {
    return draft.filter(w => w !== commonType)
  })
}

const removeWithMeta = (waiting: WaitingWithMeta, commonType: string, meta: MetaPayload): WaitingWithMeta => {
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

export const updateWaiting = (waiting: WaitingWithMeta, action: SliceAction): WaitingWithMeta => {
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

export const getWaitingWithMeta = (waiting: Immutable<WaitingWithMeta>, type: TemplateWithStatus<string, string, ActionStatus>): Immutable<WaitingWithMeta> => {
  const { commonType } = parseType(type)

  return waiting.filter((item) => {
    if (Array.isArray(item)) {
      const [w] = item

      return w === commonType
    }

    return false
  })
}

export const getWaitingStatus = (waiting: Immutable<WaitingWithMeta>, type: TemplateWithStatus<string, string, ActionStatus>): boolean => {
  const {commonType} = parseType(type)

  return waiting.includes(commonType)
}

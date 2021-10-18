import { produce } from 'immer'

import {
  ActionStatus,
  MetaPayload,
  SliceAction,
  TemplateWithStatus,
  WaitingWithMeta,
} from './types'
import { parseType } from './utils'

const add = (waiting: WaitingWithMeta, commonType: string, meta?: MetaPayload): WaitingWithMeta => {
  if (!!meta) {
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

  if (waiting.includes(commonType)) return waiting

  return produce(waiting, draft => {
    draft.push(commonType)
  })

}

const remove = (waiting: WaitingWithMeta, commonType: string, meta?: MetaPayload): WaitingWithMeta => {
  if (!!meta) {
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

  return produce(waiting, draft => {
    return draft.filter(w => w !== commonType)
  })
}

export const updateWaitingWithMeta = (waiting: WaitingWithMeta, action: SliceAction, meta?: MetaPayload): WaitingWithMeta => {
  const { commonType, mode } = parseType(action.type)

  switch (mode) {
    case 'start':
      return add(waiting, commonType, meta)
    case 'success':
    case 'failure':
      return remove(waiting, commonType, meta)
    default:
      return waiting
  }
}

export const getWaitingWithMeta = (waiting: WaitingWithMeta, type: TemplateWithStatus<string, string, ActionStatus>): WaitingWithMeta => {
  const { commonType } = parseType(type)

  return waiting.filter((item) => {
    if (Array.isArray(item)) {
      const [w] = item

      return w === commonType
    }

    return false
  })
}

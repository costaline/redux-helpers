import { ActionStatus, SliceAction, TemplateWithStatus, Waiting } from './types'
import { parseType } from './utils'


const add = (waiting: Waiting, commonType: string): Waiting => {
  if (waiting.includes(commonType)) return waiting

  return [...waiting, commonType]
}

const remove = (waiting: Waiting, commonType: string): Waiting => {
  return waiting.filter((e) => e !== commonType)
}

export const updateWaiting = (waiting: Waiting, action: SliceAction): Waiting => {
  const {commonType, mode} = parseType(action.type)

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

export const getWaitingStatus = (waiting: Readonly<Waiting>, type: TemplateWithStatus<string, string, ActionStatus>): boolean => {
  const {commonType} = parseType(type)

  return waiting.includes(commonType)
}
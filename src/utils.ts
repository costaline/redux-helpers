import { ActionStatus, TemplateWithStatus, ParsedType } from './types'


export const parseType = (actionType: TemplateWithStatus<string, string, ActionStatus>): ParsedType => {
  const [_, commonType, mode] =
  actionType.match(/\[(.+)]\s(start|success|failure)$/) || []

  return {commonType, mode} as ParsedType
}

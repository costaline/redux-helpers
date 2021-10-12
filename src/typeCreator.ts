import { ActionStatus, TemplateWithStatus, Template } from './types'

export const typeCreator = <Slice extends string>(slice: Slice) => {
  function createType<Action extends string, Status extends ActionStatus>(action: Action, status: Status): TemplateWithStatus<Slice, Action, Status>
  function createType<Action extends string>(action: Action): Template<Slice, Action>
  function createType<Action extends string, Status extends ActionStatus>(action: Action, status?: Status): Template<Slice, Action> | TemplateWithStatus<Slice, Action, Status> {
    const base: Template<Slice, Action> = `${slice} [${action}]`

    if (status) return `${base} ${status}`

    return base
  }

  return createType
}

import { produce, castDraft } from 'immer'

import {
  ActionError,
  ActionStatus,
  Errors,
  SliceAction,
  TemplateWithStatus,
} from './types'
import { parseType } from './utils'

const add = <E>(errors: Errors<E>, type: string, error: E): Errors<E> => {
  return produce(errors, draft => {
    draft[type] = castDraft(error)
  })
};

const remove = <E>(errors: Errors<E>, type: string): Errors<E> => {
  return produce(errors, draft => {
    delete draft[type]
  })
};

export const updateErrors = <E>(errors: Errors<E>, action: SliceAction): Errors<E> => {
  const { commonType, mode } = parseType(action.type);

  switch (mode) {
    case 'start':
      return remove<E>(errors, commonType);
    case 'failure':
      return add<E>(errors, commonType, (action as ActionError<E>).error);

    default:
      return errors;
  }
};

export const getError = <E>(errors: Readonly<Errors<E>>, type: TemplateWithStatus<string, string, ActionStatus>): E => {
  const { commonType } = parseType(type);

  return errors[commonType];
};


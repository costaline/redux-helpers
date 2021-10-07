import * as actions from './actions'

export interface PostsState {
  counter: number
}

export type PostsAction = ReturnType<InferValue<typeof actions>>

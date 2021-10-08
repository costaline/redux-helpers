declare type InferValue<T> = T extends { [key: string]: infer U } ? U : never

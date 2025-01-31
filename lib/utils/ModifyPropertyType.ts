export type ModifyPropertyType<T, K extends keyof T, NewType> = {
  [P in keyof T] : P extends K ? NewType : T[P];
}

export type Nullable<T = any> = T | null;

export type PropsWithClassName<T = any> = T & {
  className?: string;
};

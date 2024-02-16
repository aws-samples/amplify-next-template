import { Subscription } from "./subscription";

export type SubNextFunctionParam<T> = {
  items: T[];
  isSynced: boolean;
};

export type LogicalFilters<Model extends Record<any, any>> = {
  and?: ModelFilter<Model> | ModelFilter<Model>[];
  or?: ModelFilter<Model> | ModelFilter<Model>[];
  not?: ModelFilter<Model>;
};

export type AuthMode =
  | "apiKey"
  | "iam"
  | "oidc"
  | "userPool"
  | "lambda"
  | "none";

/**
 * Represents a location in a Source.
 */
export interface SourceLocation {
  readonly line: number;
  readonly column: number;
}

/**
 * See: https://spec.graphql.org/draft/#sec-Errors
 */
export interface GraphQLFormattedError {
  /**
   * A short, human-readable summary of the problem that **SHOULD NOT** change
   * from occurrence to occurrence of the problem, except for purposes of
   * localization.
   */
  readonly message: string;
  /**
   * The AppSync exception category. Indicates the source of the error.
   */
  readonly errorType: string;
  /**
   * Additional error metadata that can be surfaced via error handling resolver utils:
   * * JS - https://docs.aws.amazon.com/appsync/latest/devguide/built-in-util-js.html#utility-helpers-in-error-js
   * * VTL - https://docs.aws.amazon.com/appsync/latest/devguide/utility-helpers-in-util.html#utility-helpers-in-error
   */
  readonly errorInfo: null | {
    [key: string]: unknown;
  };
  /**
   * If an error can be associated to a particular point in the requested
   * GraphQL document, it should contain a list of locations.
   */
  readonly locations?: ReadonlyArray<SourceLocation>;
  /**
   * If an error can be associated to a particular field in the GraphQL result,
   * it _must_ contain an entry with the key `path` that details the path of
   * the response field which experienced the error. This allows clients to
   * identify whether a null result is intentional or caused by a runtime error.
   */
  readonly path?: ReadonlyArray<string | number>;
  /**
   * Reserved for implementors to extend the protocol however they see fit,
   * and hence there are no additional restrictions on its contents.
   */
  readonly extensions?: {
    [key: string]: unknown;
  };
}

export type SingularReturnValue<T> = Promise<{
  data: T;
  errors?: GraphQLFormattedError[];
  extensions?: {
    [key: string]: any;
  };
}>;

export type ListReturnValue<T> = Promise<{
  data: Array<T>;
  nextToken?: string | null;
  errors?: GraphQLFormattedError[];
  extensions?: {
    [key: string]: any;
  };
}>;

/**
 * Request options that are passed to custom header functions.
 * `method` and `headers` are not included in custom header functions passed to
 * subscriptions.
 */
export type RequestOptions = {
  url: string;
  queryString: string;
  method?: string;
};

/**
 * Custom headers that can be passed either to the client or to individual
 * model operations, either as a static object or a function that returns a
 * promise.
 */
export type CustomHeaders =
  | Record<string, string>
  | ((requestOptions?: RequestOptions) => Promise<Record<string, string>>);
export type Prettify<T> = T extends (...args: infer ArgsType) => any
  ? (...args: ArgsType) => ReturnType<T>
  : T extends object
  ? {
      [P in keyof T]: Prettify<T[P]>;
    }
  : T;
export type LazyLoader<Model, IsArray extends boolean> = (
  options?: IsArray extends true
    ? {
        authMode?: AuthMode;
        authToken?: string;
        limit?: number;
        nextToken?: string | null;
        headers?: CustomHeaders;
      }
    : {
        authMode?: AuthMode;
        authToken?: string;
        headers?: CustomHeaders;
      }
) => IsArray extends true
  ? ListReturnValue<Prettify<NonNullable<Model>>>
  : SingularReturnValue<Prettify<Model>>;
/**
 * Filter options that can be used on fields where size checks are supported.
 */
type SizeFilter = {
  between?: [number, number];
  eq?: number;
  ge?: number;
  gt?: number;
  le?: number;
  lt?: number;
  ne?: number;
};

/**
 * Not actually sure if/how customer can pass this through as variables yet.
 * Leaving it out for now:
 *
 * attributeType: "binary" | "binarySet" | "bool" | "list" | "map" | "number" | "numberSet" | "string" | "stringSet" | "_null"
 */
/**
 * Filters options that can be used on string-like fields.
 */
type StringFilter = {
  attributeExists?: boolean;
  beginsWith?: string;
  between?: [string, string];
  contains?: string;
  eq?: string;
  ge?: string;
  gt?: string;
  le?: string;
  lt?: string;
  ne?: string;
  notContains?: string;
  size?: SizeFilter;
};
type NumericFilter = {
  attributeExists?: boolean;
  between?: [number, number];
  eq?: number;
  ge?: number;
  gt?: number;
  le?: number;
  lt?: number;
  ne?: number;
};
type BooleanFilters = {
  attributeExists?: boolean;
  eq?: boolean;
  ne?: boolean;
};
export type ModelFilter<Model extends Record<any, any>> =
  LogicalFilters<Model> & {
    [K in keyof Model as Model[K] extends LazyLoader<any, any>
      ? never
      : K]?: Model[K] extends boolean
      ? BooleanFilters
      : Model[K] extends number
      ? NumericFilter
      : StringFilter;
  };

export type UnwrapArray<T> = T extends any[] ? T[number] : T;

export type ModelPath<
  FlatModel extends Record<string, unknown>,
  Depth extends number = 5, // think of this as the initialization expr. in a for loop (e.g. `let depth = 5`)
  RecursionLoop extends number[] = [-1, 0, 1, 2, 3, 4],
  Field = keyof FlatModel
> = {
  done: Field extends string ? `${Field}.*` : never;
  recur: Field extends string
    ? NonNullable<UnwrapArray<FlatModel[Field]>> extends Record<string, unknown>
      ?
          | `${Field}.${ModelPath<
              NonNullable<UnwrapArray<FlatModel[Field]>>,
              RecursionLoop[Depth]
            >}`
          | `${Field}.*`
      : `${Field}`
    : never;
}[Depth extends -1 ? "done" : "recur"];

export type Query<Model extends Record<any, any>> = {
  filter?: ModelFilter<Model>;
  selectionSet?: ModelPath<Model>[];
};

export type SubscriptionFilter<Model extends Record<any, any>, OutputModel> = (
  nextFn: (output: SubNextFunctionParam<OutputModel>) => void,
  filter?: ModelFilter<Model>
) => Subscription;

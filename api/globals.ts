import { flow, map, join } from "lodash/fp";

/**
 * Represents a location in a Source.
 */
interface SourceLocation {
  readonly line: number;
  readonly column: number;
}

/**
 * See: https://spec.graphql.org/draft/#sec-Errors
 */
interface GraphQLFormattedError {
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

export const handleApiErrors = (
  errors: GraphQLFormattedError[],
  message?: string
) => {
  let errorText = flow(
    map(
      ({ errorType, message }: GraphQLFormattedError) =>
        `${errorType}: ${message}`
    ),
    join("; ")
  )(errors);
  if (message) {
    errorText = `${message}: ${errorText}`;
  }
  alert(errorText);
};

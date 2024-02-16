import { flow, map, join } from "lodash/fp";
import { GraphQLFormattedError } from "../types/api";

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

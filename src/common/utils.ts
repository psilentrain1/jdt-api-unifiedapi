import type { IncomingHttpHeaders } from "http";

export function toWebHeaders(incoming: IncomingHttpHeaders): Headers {
  return new Headers(
    Object.entries(incoming).flatMap(([k, v]) =>
      Array.isArray(v) ? v.map((val) => [k, val]) : v ? [[k, v]] : [],
    ) as [string, string][],
  );
}

/**
 * Converts a try/catch error to a string message.
 * @param error Unknown type error
 * @returns String message
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  return String(error);
}

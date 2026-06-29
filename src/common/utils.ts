import type { IncomingHttpHeaders } from "http";

export function toWebHeaders(incoming: IncomingHttpHeaders): Headers {
  return new Headers(
    Object.entries(incoming).flatMap(([k, v]) =>
      Array.isArray(v) ? v.map((val) => [k, val]) : v ? [[k, v]] : [],
    ) as [string, string][],
  );
}

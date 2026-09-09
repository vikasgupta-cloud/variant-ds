/**
 * DataTable — docs reference tables.
 * DM Sans body styles throughout. Main cells use text/primary; supporting
 * lines use text/secondary (no tertiary). Readable wrapping + bordered shell.
 */
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type DataTableColumnWidth = "sm" | "md" | "lg" | "xl" | "auto";

export type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  /** @deprecated Ignored — tables use DM Sans body styles for all cells. */
  mono?: boolean;
  className?: string;
  width?: DataTableColumnWidth;
  cell: (row: T) => ReactNode;
};

/** Widths use dimension scale (name = px). Prefer measure-prose for copy. */
const WIDTH_CLASS: Record<DataTableColumnWidth, string> = {
  sm: "min-w-80 w-96",
  md: "min-w-128",
  lg: "min-w-128 max-w-measure-prose",
  xl: "min-w-128 w-full max-w-measure-prose",
  auto: "min-w-0",
};

/** Primary line + optional secondary meta (css var, alias source, resolved px). */
export function DataTableStack({
  primary,
  secondary,
}: {
  primary: ReactNode;
  secondary?: ReactNode;
}) {
  return (
    <span className="flex flex-col gap-4">
      <span className="type-body-md text-text-primary">{primary}</span>
      {secondary != null && secondary !== "" ? (
        <span className="type-body-sm text-text-secondary">{secondary}</span>
      ) : null}
    </span>
  );
}

export function DataTableEmpty() {
  return <span className="type-body-md text-text-secondary">—</span>;
}

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  className,
}: {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T, index: number) => string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        // Transparent so Storybook Mode/Context (canvas · surface · raised) shows through.
        "w-full overflow-x-auto rounded-control border border-border-subtle bg-transparent",
        className,
      )}
      tabIndex={0}
    >
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border-subtle bg-transparent">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  "px-16 py-12 text-left type-body-sm-medium text-text-primary",
                  WIDTH_CLASS[col.width ?? "auto"],
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={getRowKey(row, i)}
              className="border-b border-border-subtle last:border-b-0"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "px-16 py-16 align-top type-body-md text-text-primary break-words [overflow-wrap:anywhere]",
                    WIDTH_CLASS[col.width ?? "auto"],
                    col.className,
                  )}
                >
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * DataTable — header on surface/level-1, border/subtle row dividers,
 * cell padding dimension/12 × dimension/16, monospace cells use type-numeric-sm.
 */
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  mono?: boolean;
  className?: string;
  cell: (row: T) => ReactNode;
};

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
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-surface-level-1">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-16 py-12 type-body-sm-medium text-text-secondary",
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
              className="border-b border-border-subtle"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "px-16 py-12 align-top type-body-md text-text-primary",
                    col.mono && "font-mono type-numeric-sm text-text-secondary",
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

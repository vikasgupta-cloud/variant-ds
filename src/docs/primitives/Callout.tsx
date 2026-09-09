/**
 * Callout — wraps Alert for notes and warnings in docs.
 */
import type { ReactNode } from "react";
import { Alert, type AlertProps } from "../../components/Alert";
import { cn } from "../../lib/cn";

export function Callout({
  role = "info",
  title,
  children,
  className,
}: {
  role?: AlertProps["role"];
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Alert
      role={role}
      emphasis="soft"
      {...(title ? { title } : {})}
      className={cn(
        // Prose defaults to text-secondary; on soft role fills that fails AA — inherit Alert ink.
        "[&_.text-text-secondary]:text-current [&_.text-text-primary]:text-current",
        className,
      )}
    >
      {children}
    </Alert>
  );
}

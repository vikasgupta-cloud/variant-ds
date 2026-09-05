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
      className={cn(className)}
    >
      {children}
    </Alert>
  );
}

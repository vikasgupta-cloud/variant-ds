/**
 * PageHeader — eyebrow (body/sm-caps) + title (heading/xl) + description + optional Badge.
 */
import type { ReactNode } from "react";
import { Badge, type BadgeRole } from "../../components/Badge";
import { cn } from "../../lib/cn";
import {
  RELEASE_PHASE_LABEL,
  type ReleasePhase,
} from "../release-phase";

const PHASE_BADGE_ROLE: Record<ReleasePhase, BadgeRole> = {
  stable: "success",
  beta: "info",
  caution: "warning",
  deprecated: "danger",
};

export function PageHeader({
  eyebrow,
  title,
  description,
  phase,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  phase?: ReleasePhase;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "mb-64 flex flex-col gap-layout-section",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-layout-stack">
        {eyebrow ? (
          <p className="type-body-sm-caps text-text-tertiary">{eyebrow}</p>
        ) : null}
        {phase ? (
          <Badge role={PHASE_BADGE_ROLE[phase]} size="sm">
            {RELEASE_PHASE_LABEL[phase]}
          </Badge>
        ) : null}
        {actions}
      </div>
      <h1 className="type-heading-xl text-text-primary">{title}</h1>
      {description ? (
        <div className="max-w-measure-prose type-body-lg text-text-secondary">
          {description}
        </div>
      ) : null}
    </header>
  );
}

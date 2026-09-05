/**
 * ReleasePhaseBadge — wraps the real Badge component (docs must not reimplement chips).
 */
import { Badge, type BadgeRole } from "../components/Badge";
import { cn } from "../lib/cn";
import {
  RELEASE_PHASE_LABEL,
  type ReleasePhase,
} from "./release-phase";

const PHASE_ROLE: Record<ReleasePhase, BadgeRole> = {
  stable: "success",
  beta: "info",
  caution: "warning",
  deprecated: "danger",
};

export function ReleasePhaseBadge({
  phase = "beta",
  className,
}: {
  phase?: ReleasePhase;
  className?: string;
}) {
  return (
    <Badge role={PHASE_ROLE[phase]} size="sm" className={cn(className)}>
      {RELEASE_PHASE_LABEL[phase]}
    </Badge>
  );
}

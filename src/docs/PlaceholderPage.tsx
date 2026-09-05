/**
 * PlaceholderPage — IA stubs using docs primitives only.
 */
import { Badge } from "../components/Badge";
import {
  Callout,
  DocsPage,
  PageHeader,
  Prose,
} from "./primitives";
import type { ReleasePhase } from "./release-phase";

export function PlaceholderPage({
  title,
  section,
  summary,
  phase,
  status = "planned",
}: {
  title: string;
  section: string;
  summary: string;
  phase?: ReleasePhase;
  status?: "planned" | "partial";
}) {
  return (
    <DocsPage>
      <PageHeader
        eyebrow={section}
        title={title}
        description={summary}
        {...(phase ? { phase } : {})}
        actions={
          <Badge role="neutral" size="sm">
            {status === "partial" ? "Partial" : "Placeholder"}
          </Badge>
        }
      />
      <Callout role="warning" title="Not built yet">
        <Prose>
          <span>
            This page is a structural placeholder so the Storybook information
            architecture matches the design-system docs site. Content (or the
            component itself) has not shipped yet — the gap is intentional and
            visible.
          </span>
        </Prose>
      </Callout>
    </DocsPage>
  );
}

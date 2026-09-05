/**
 * Tools / Token export.
 */
import { TokenDownloads } from "../../DownloadSpec";
import {
  DocsPage,
  PageHeader,
  Prose,
  Section,
} from "../../primitives";

export function TokenExportPage() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Tools"
        title="Token export"
        description="Download CSS, JSON, and Figma-shaped token packages generated into public/specs/."
      />

      <Section title="Downloads">
        <TokenDownloads />
      </Section>

      <Section title="Pipeline">
        <Prose>
          <span>
            Exports are produced by <code>pnpm specs:build</code> after{" "}
            <code>pnpm tokens:build</code>. Do not hand-edit files under{" "}
            <code>public/specs/</code> or <code>src/styles/tokens/</code>.
          </span>
        </Prose>
      </Section>
    </DocsPage>
  );
}

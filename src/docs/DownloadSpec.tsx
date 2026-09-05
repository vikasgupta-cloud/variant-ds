/**
 * DownloadSpec — download Markdown / JSON specs via docs primitives + Card.
 */
import { Card } from "../components/Card";
import { getComponentSpec } from "./component-specs";
import { CodeBlock, Prose } from "./primitives";

type DownloadSpecProps = {
  componentId: string;
};

function downloadHref(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

function DownloadLink({
  href,
  download,
  children,
}: {
  href: string;
  download: string;
  children: string;
}) {
  return (
    <a
      className="inline-flex items-center justify-center rounded-control border border-border-subtle bg-bg-surface px-control-padding-x-md py-control-padding-y-md type-body-md-medium text-text-primary hover:bg-surface-level-1"
      href={href}
      download={download}
    >
      {children}
    </a>
  );
}

export function DownloadSpec({ componentId }: DownloadSpecProps) {
  const spec = getComponentSpec(componentId);
  if (!spec) {
    return (
      <Prose>
        <span className="text-text-danger">
          Unknown component spec: {componentId}
        </span>
      </Prose>
    );
  }

  const base = `specs/${spec.id}`;

  return (
    <Card
      header={
        <span className="type-body-md-semibold text-text-primary">
          Download spec
        </span>
      }
    >
      <Prose>
        <span>
          Generated at build time into <code>public/specs/</code>. Instant
          downloads; diffable in git.
        </span>
      </Prose>
      <div className="mt-layout-stack-loose flex flex-wrap gap-8">
        <DownloadLink
          href={downloadHref(`${base}.md`)}
          download={`${spec.id}.md`}
        >
          Markdown
        </DownloadLink>
        <DownloadLink
          href={downloadHref(`${base}.json`)}
          download={`${spec.id}.json`}
        >
          JSON
        </DownloadLink>
      </div>
    </Card>
  );
}

export function TokenDownloads() {
  return (
    <Card
      header={
        <span className="type-body-md-semibold text-text-primary">
          Download tokens
        </span>
      }
    >
      <Prose>
        <span>
          Full token set from the last <code>specs:build</code>.
        </span>
      </Prose>
      <div className="mt-layout-stack-loose flex flex-wrap gap-8">
        <DownloadLink
          href={downloadHref("specs/tokens.css")}
          download="tokens.css"
        >
          CSS
        </DownloadLink>
        <DownloadLink
          href={downloadHref("specs/tokens.json")}
          download="tokens.json"
        >
          JSON
        </DownloadLink>
        <DownloadLink
          href={downloadHref("specs/tokens.figma.json")}
          download="tokens.figma.json"
        >
          Figma JSON
        </DownloadLink>
      </div>
      <CodeBlock className="mt-layout-stack-loose">
        pnpm specs:build
      </CodeBlock>
    </Card>
  );
}

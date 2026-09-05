/**
 * Component doc sections — Usage / Code / Accessibility via docs primitives.
 */
import { Card } from "../components/Card";
import { getComponentSpec, type SpecLayer } from "./component-specs";
import { DownloadSpec } from "./DownloadSpec";
import {
  CodeBlock,
  DataTable,
  DocsList,
  DocsPage,
  PageHeader,
  Prose,
  Section,
  Subsection,
} from "./primitives";
import {
  COMPONENT_RELEASE_PHASE,
  type ReleasePhase,
} from "./release-phase";

const LAYER_ORDER: SpecLayer[] = [
  "component",
  "structure",
  "surface",
  "overlay",
  "role",
  "primitive",
];

function phaseForSpecId(id: string): ReleasePhase {
  const nameMap: Record<string, string> = {
    button: "Button",
    "button-group": "Button group",
    input: "Input",
    dropdown: "Select",
    select: "Select",
    checkbox: "Checkbox",
    radio: "Radio",
    toggle: "Toggle",
    slider: "Slider",
    badge: "Badge",
    tag: "Tag",
    alert: "Alert",
    modal: "Modal",
    tabs: "Tabs",
    "dropdown-menu": "Dropdown menu",
    progress: "Progress bar",
    card: "Card",
    tooltip: "Tooltip",
  };
  const key = nameMap[id] ?? id;
  return COMPONENT_RELEASE_PHASE[key] ?? "beta";
}

type DocProps = { id: string; name?: string };

export function ComponentUsage({ id, name }: DocProps) {
  const spec = getComponentSpec(id);
  if (!spec) {
    return (
      <DocsPage>
        <PageHeader title={`Missing spec · ${id}`} />
        <Prose>
          <span>No component spec registered for “{id}”.</span>
        </Prose>
      </DocsPage>
    );
  }
  const phase = phaseForSpecId(id);
  const displayName = name ?? spec.name;

  return (
    <DocsPage>
      <PageHeader
        eyebrow="Components"
        title={`${displayName} · Usage`}
        description={spec.overview}
        phase={phase}
      />

      <Section title="When to use">
        <DocsList items={spec.whenToUse} />
      </Section>

      <Section title="Do and don’t">
        <div className="grid gap-layout-section sm:grid-cols-2">
          <Card
            header={
              <span className="type-body-md-semibold text-text-success">Do</span>
            }
          >
            <DocsList items={spec.do} />
          </Card>
          <Card
            header={
              <span className="type-body-md-semibold text-text-danger">
                Don&apos;t
              </span>
            }
          >
            <DocsList items={spec.dont} />
          </Card>
        </div>
      </Section>

      <Section title="Anatomy">
        <DocsList items={spec.anatomy} ordered />
      </Section>
    </DocsPage>
  );
}

export function ComponentCode({ id, name }: DocProps) {
  const spec = getComponentSpec(id);
  if (!spec) {
    return (
      <DocsPage>
        <PageHeader title={`Missing spec · ${id}`} />
      </DocsPage>
    );
  }
  const phase = phaseForSpecId(id);
  const displayName = name ?? spec.name;
  const importName = displayName.replace(/\s+/g, "");
  const pkgPath = `@wingify/variant-ds/${importName}`;

  return (
    <DocsPage>
      <PageHeader
        eyebrow="Components"
        title={`${displayName} · Code`}
        phase={phase}
      />
      <DownloadSpec componentId={spec.id} />

      <Section title="Import">
        <CodeBlock>{`import { ${importName} } from "${pkgPath}";`}</CodeBlock>
      </Section>

      <Section title="Snippet">
        <CodeBlock>{`<${importName} />`}</CodeBlock>
      </Section>

      <Section title="Props">
        <DataTable
          columns={[
            { key: "name", header: "Prop", mono: true, cell: (r) => r.name },
            { key: "type", header: "Type", mono: true, cell: (r) => r.type },
            {
              key: "default",
              header: "Default",
              mono: true,
              cell: (r) => r.default ?? "—",
            },
            {
              key: "notes",
              header: "Notes",
              cell: (r) => r.description,
            },
          ]}
          rows={spec.props}
          getRowKey={(r) => r.name}
        />
      </Section>

      <Section title="Tokens consumed">
        {LAYER_ORDER.map((layer) => {
          const list = spec.tokens[layer];
          if (!list?.length) return null;
          return (
            <Subsection key={layer} title={layer}>
              <div className="flex flex-wrap gap-8">
                {list.map((token) => (
                  <span
                    key={token}
                    className="rounded-control bg-surface-level-1 px-control-padding-x-sm py-control-padding-y-xs font-mono type-numeric-sm text-text-secondary"
                  >
                    {token}
                  </span>
                ))}
              </div>
            </Subsection>
          );
        })}
      </Section>

      <Section title="Variant matrix">
        <DataTable
          columns={[
            { key: "axis", header: "Axis", mono: true, cell: (r) => r.axis },
            { key: "values", header: "Values", cell: (r) => r.values },
          ]}
          rows={Object.entries(spec.variants).map(([axis, values]) => ({
            axis,
            values: values.join(" · "),
          }))}
          getRowKey={(r) => r.axis}
        />
      </Section>
    </DocsPage>
  );
}

export function ComponentAccessibility({ id, name }: DocProps) {
  const spec = getComponentSpec(id);
  if (!spec) {
    return (
      <DocsPage>
        <PageHeader title={`Missing spec · ${id}`} />
      </DocsPage>
    );
  }
  const phase = phaseForSpecId(id);
  const displayName = name ?? spec.name;

  return (
    <DocsPage>
      <PageHeader
        eyebrow="Components"
        title={`${displayName} · Accessibility`}
        phase={phase}
      />
      <Section title="Keyboard & ARIA">
        <DocsList items={spec.accessibility} />
      </Section>
      <Section title="Contrast">
        <Prose>
          <span>
            Colour pairs for this component must meet WCAG AA (text ≥4.5:1, UI
            chrome ≥3:1) in light and dark. Use Foundations · Contrast and the
            live token editor after token edits. Status roles on soft fills use{" "}
            <code>text/{"{role}"}</code>; strong fills use{" "}
            <code>text/on-strong</code> (warning uses{" "}
            <code>text/on-strong-warning</code>).
          </span>
        </Prose>
      </Section>
    </DocsPage>
  );
}

/** @deprecated Prefer ComponentUsage / ComponentCode / ComponentAccessibility */
export { ComponentUsage as ComponentDoc };

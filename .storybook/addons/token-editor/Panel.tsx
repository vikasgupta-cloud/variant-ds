/**
 * Runtime token editor panel (spec §8).
 * Overrides → story root via channel; persist per mode; export tokens/diff/css.
 */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AddonPanel } from "storybook/internal/components";
import { useChannel, useGlobals } from "storybook/manager-api";
import catalog from "../../../src/styles/tokens/tokens.json" with { type: "json" };
import type { CatalogToken, TokenCatalog, TokenLayer } from "../../../src/docs/token-types.ts";
import {
  EVENTS,
  loadOverrides,
  saveOverrides,
  type TokenOverrides,
} from "../../../src/docs/token-editor-shared.ts";

const data = catalog as TokenCatalog;
const LAYERS: TokenLayer[] = [
  "primitive",
  "role",
  "surface",
  "structure",
  "overlay",
  "component",
];

function download(filename: string, contents: string, type = "application/json") {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function sourceValue(token: CatalogToken, mode: "light" | "dark"): string {
  if (token.valueByMode) {
    return String(token.valueByMode[mode] ?? token.valueByMode.light ?? "");
  }
  if (token.valueByContext) {
    return String(token.valueByContext[`${mode}/canvas`] ?? Object.values(token.valueByContext)[0] ?? "");
  }
  return token.value !== null && token.value !== undefined ? String(token.value) : "";
}

function isColorToken(token: CatalogToken): boolean {
  return token.type === "color" || /^#|^\{/.test(sourceValue(token, "light"));
}

function TokenRow({
  token,
  mode,
  override,
  onChange,
  onReset,
}: {
  token: CatalogToken;
  mode: "light" | "dark";
  override?: string;
  onChange: (cssVar: string, value: string) => void;
  onReset: (cssVar: string) => void;
}) {
  const original = sourceValue(token, mode);
  const current = override ?? original;
  const modified = override !== undefined;
  const color = isColorToken(token);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "16px 1fr",
        gap: 8,
        padding: "8px 0",
        borderBottom: "1px solid rgba(128,128,128,0.2)",
        alignItems: "start",
      }}
    >
      <span
        title={modified ? "Modified" : undefined}
        style={{
          width: 8,
          height: 8,
          marginTop: 8,
          borderRadius: "50%",
          background: modified ? "#de2d02" : "transparent",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <code style={{ fontSize: 11 }}>{token.cssVar}</code>
          {modified ? (
            <button type="button" onClick={() => onReset(token.cssVar)} style={{ fontSize: 11 }}>
              Reset
            </button>
          ) : null}
        </div>
        {token.alias ? (
          <div style={{ fontSize: 10, opacity: 0.7 }}>
            → {token.alias}
            {modified ? ` · was ${original}` : ""}
          </div>
        ) : modified ? (
          <div style={{ fontSize: 10, opacity: 0.7 }}>was {original}</div>
        ) : null}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {color ? (
            <>
              <input
                type="color"
                value={/^#[0-9a-fA-F]{6}$/.test(current) ? current : "#000000"}
                onChange={(e) => onChange(token.cssVar, e.target.value)}
                style={{ width: 28, height: 28, padding: 0, border: "none" }}
              />
              <input
                type="text"
                value={current}
                onChange={(e) => onChange(token.cssVar, e.target.value)}
                style={{ flex: 1, fontFamily: "monospace", fontSize: 12, padding: "4px 6px" }}
              />
            </>
          ) : (
            <input
              type="text"
              value={current}
              onChange={(e) => onChange(token.cssVar, e.target.value)}
              style={{ flex: 1, fontFamily: "monospace", fontSize: 12, padding: "4px 6px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function TokenEditorPanel({ active }: { active: boolean }) {
  const [globals] = useGlobals();
  const mode = ((globals.mode as string) ?? "light") as "light" | "dark";
  const [overrides, setOverrides] = useState<TokenOverrides>(() => loadOverrides(mode));
  const [search, setSearch] = useState("");
  const [openLayers, setOpenLayers] = useState<Record<string, boolean>>({
    primitive: true,
    role: false,
    surface: false,
    structure: false,
    overlay: false,
    component: false,
  });
  const [warnings, setWarnings] = useState<string[]>([]);

  const emit = useChannel({
    [EVENTS.OVERRIDES_APPLIED]: (payload: { warnings?: string[] }) => {
      if (payload?.warnings) setWarnings(payload.warnings);
    },
  });

  // Sync when mode toolbar changes
  useEffect(() => {
    const next = loadOverrides(mode);
    setOverrides(next);
    emit(EVENTS.SET_OVERRIDES, { mode, overrides: next });
  }, [mode, emit]);

  const apply = useCallback(
    (next: TokenOverrides) => {
      setOverrides(next);
      saveOverrides(mode, next);
      emit(EVENTS.SET_OVERRIDES, { mode, overrides: next });
    },
    [emit, mode],
  );

  const onChange = useCallback(
    (cssVar: string, value: string) => {
      apply({ ...overrides, [cssVar]: value });
    },
    [apply, overrides],
  );

  const onReset = useCallback(
    (cssVar: string) => {
      const next = { ...overrides };
      delete next[cssVar];
      apply(next);
    },
    [apply, overrides],
  );

  const resetAll = useCallback(() => apply({}), [apply]);

  const modifiedCount = Object.keys(overrides).length;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.tokens.filter((t) => {
      if (!q) return true;
      return (
        t.name.includes(q) ||
        t.cssVar.includes(q) ||
        t.description.toLowerCase().includes(q) ||
        (t.alias?.includes(q) ?? false)
      );
    });
  }, [search]);

  const exportDiff = () => {
    const diff = Object.entries(overrides).map(([cssVar, after]) => {
      const token = data.tokens.find((t) => t.cssVar === cssVar);
      return {
        cssVar,
        name: token?.name ?? cssVar.replace(/^--/, ""),
        layer: token?.layer,
        before: token ? sourceValue(token, mode) : null,
        after,
      };
    });
    download("diff.json", JSON.stringify({ mode, changes: diff }, null, 2));
  };

  const exportOverridesCss = () => {
    const body = Object.entries(overrides)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join("\n");
    download(
      "overrides.css",
      `/* variant-ds token overrides (${mode}) */\n[data-mode="${mode}"] {\n${body}\n}\n`,
      "text/css",
    );
  };

  const exportTokensJson = () => {
    const merged = data.tokens.map((t) => {
      const ov = overrides[t.cssVar];
      if (!ov) return t;
      if (t.valueByMode) {
        return {
          ...t,
          valueByMode: { ...t.valueByMode, [mode]: ov },
          alias: ov.startsWith("{") || ov.includes("var(") ? t.alias : null,
        };
      }
      if (t.valueByContext) {
        return {
          ...t,
          valueByContext: { ...t.valueByContext, [`${mode}/canvas`]: ov },
        };
      }
      return { ...t, value: ov, alias: null };
    });
    download(
      "tokens.json",
      JSON.stringify({ ...data, tokens: merged, exportedMode: mode }, null, 2),
    );
  };

  return (
    <AddonPanel active={active}>
      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12, height: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <strong style={{ fontSize: 13 }}>
            Tokens · {mode}
            {modifiedCount > 0 ? ` · ${modifiedCount} modified` : ""}
          </strong>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button type="button" onClick={exportDiff} disabled={!modifiedCount}>
              diff.json
            </button>
            <button type="button" onClick={exportTokensJson}>
              tokens.json
            </button>
            <button type="button" onClick={exportOverridesCss} disabled={!modifiedCount}>
              overrides.css
            </button>
            <button type="button" onClick={resetAll} disabled={!modifiedCount}>
              Reset all
            </button>
          </div>
        </div>

        <input
          type="search"
          placeholder="Search tokens…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "6px 8px", fontSize: 12 }}
        />

        {warnings.length > 0 ? (
          <div
            style={{
              padding: 8,
              background: "rgba(222,45,2,0.12)",
              borderRadius: 4,
              fontSize: 11,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {warnings.map((w) => (
              <div key={w}>{w}</div>
            ))}
          </div>
        ) : null}

        <div style={{ overflow: "auto", flex: 1 }}>
          {LAYERS.map((layer) => {
            const items = filtered.filter((t) => t.layer === layer);
            if (!items.length) return null;
            const open = openLayers[layer];
            return (
              <div key={layer} style={{ marginBottom: 8 }}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenLayers((s) => ({ ...s, [layer]: !s[layer] }))
                  }
                  style={{
                    width: "100%",
                    textAlign: "left",
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    padding: "6px 0",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {open ? "▾" : "▸"} {layer} ({items.length})
                </button>
                {open
                  ? items.map((token) => (
                      <TokenRow
                        key={token.name}
                        token={token}
                        mode={mode}
                        override={overrides[token.cssVar]}
                        onChange={onChange}
                        onReset={onReset}
                      />
                    ))
                  : null}
              </div>
            );
          })}
        </div>
      </div>
    </AddonPanel>
  );
}

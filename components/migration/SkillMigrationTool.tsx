"use client";

import { ChangeEvent, useRef, useState } from "react";
import { unzipSync, zipSync } from "fflate";
import { AlertCircle, ArrowDownToLine, Check, FileArchive, FileText, FolderOpen, ShieldCheck, Upload } from "lucide-react";

const MAX_ARCHIVE_BYTES = 12 * 1024 * 1024;
const MAX_UNPACKED_BYTES = 40 * 1024 * 1024;
const MAX_FILES = 400;

type Result = { kind: "success" | "error" | "warning"; message: string };

function inspectZip(bytes: Uint8Array) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const start = Math.max(0, bytes.byteLength - 65_557);
  let endOffset = -1;
  for (let offset = bytes.byteLength - 22; offset >= start; offset -= 1) {
    if (view.getUint32(offset, true) === 0x06054b50) {
      endOffset = offset;
      break;
    }
  }
  if (endOffset < 0) throw new Error("This file is not a valid ZIP archive.");
  const count = view.getUint16(endOffset + 10, true);
  const directorySize = view.getUint32(endOffset + 12, true);
  const directoryOffset = view.getUint32(endOffset + 16, true);
  if (count === 0xffff || directorySize === 0xffffffff || directoryOffset === 0xffffffff) {
    throw new Error("ZIP64 archives aren’t supported yet. Try a standard ZIP package.");
  }
  if (count > MAX_FILES || directoryOffset + directorySize > endOffset) {
    throw new Error("This archive is too large or has an invalid file directory.");
  }

  let offset = directoryOffset;
  let unpackedBytes = 0;
  for (let index = 0; index < count; index += 1) {
    if (offset + 46 > bytes.byteLength || view.getUint32(offset, true) !== 0x02014b50) {
      throw new Error("This ZIP has an invalid file directory.");
    }
    const flags = view.getUint16(offset + 8, true);
    const size = view.getUint32(offset + 24, true);
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    if (flags & 1) throw new Error("Password-protected archives aren’t supported.");
    if (size === 0xffffffff) throw new Error("ZIP64 archives aren’t supported yet.");
    unpackedBytes += size;
    if (unpackedBytes > MAX_UNPACKED_BYTES) throw new Error("The expanded archive is larger than 40 MB.");
    const next = offset + 46 + nameLength + extraLength + commentLength;
    if (next > bytes.byteLength) throw new Error("This ZIP has an invalid file directory.");
    offset = next;
  }
  if (offset > directoryOffset + directorySize) throw new Error("This ZIP has an invalid file directory.");
}

export function SkillMigrationTool({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [download, setDownload] = useState<{ url: string; name: string } | null>(null);

  function reset() {
    setResult(null);
    if (download) URL.revokeObjectURL(download.url);
    setDownload(null);
  }

  async function processFile(file: File) {
    reset();
    setBusy(true);
    try {
      if (file.size > MAX_ARCHIVE_BYTES) throw new Error(es ? "El archivo debe pesar menos de 12 MB." : "Choose an archive smaller than 12 MB.");
      const bytes = new Uint8Array(await file.arrayBuffer());
      inspectZip(bytes);
      const unpacked = unzipSync(bytes);
      const entries = Object.entries(unpacked).filter(([path]) => !path.endsWith("/"));
      if (entries.length > MAX_FILES) throw new Error(es ? "El archivo contiene demasiados elementos (límite: 400)." : "This archive contains too many files (limit: 400).");
      const totalBytes = entries.reduce((total, [, content]) => total + content.byteLength, 0);
      if (totalBytes > MAX_UNPACKED_BYTES) throw new Error(es ? "El contenido extraído supera los 40 MB." : "The expanded archive is larger than 40 MB.");

      const safeEntries = entries.map(([rawPath, content]) => {
        const path = rawPath.replaceAll("\\", "/");
        if (path.startsWith("/") || path.split("/").some((part) => part === "..")) {
          throw new Error("The archive contains an unsafe file path and cannot be packaged.");
        }
        return [path.replace(/^\.\//, ""), content] as const;
      });
      const skillFiles = safeEntries.filter(([path]) => path.split("/").at(-1)?.toLowerCase() === "skill.md");
      if (skillFiles.length !== 1) {
        throw new Error(skillFiles.length
          ? es ? "El archivo contiene más de un SKILL.md. Prepara un Skill a la vez." : "The archive has more than one SKILL.md. Package one skill at a time."
          : es ? "No se encontró un archivo SKILL.md." : "No SKILL.md was found in this archive.");
      }

      const [skillPath, skillContent] = skillFiles[0];
      const output: Record<string, Uint8Array> = {};
      const parent = skillPath.includes("/") ? skillPath.slice(0, skillPath.lastIndexOf("/") + 1) : "";
      const canFlattenParent = Boolean(parent) && safeEntries.every(([path]) => path.startsWith(parent));
      for (const [path, content] of safeEntries) {
        if (path === skillPath) continue;
        const packagedPath = canFlattenParent ? path.slice(parent.length) : path;
        if (packagedPath) output[packagedPath] = content;
      }
      output["SKILL.md"] = skillContent;

      const skillText = new TextDecoder().decode(skillContent);
      const hasFrontmatter = /^---\s*\n[\s\S]*?\n---(?:\n|$)/.test(skillText);
      const markdownName = file.name.replace(/\.(skill|zip)$/i, "").replace(/[^\p{L}\p{N}._-]+/gu, "-").replace(/^-+|-+$/g, "") || "gemini-skill";
      const blob = new Blob([zipSync(output)], { type: "application/zip" });
      setDownload({ url: URL.createObjectURL(blob), name: `${markdownName}-gemini.zip` });
      setResult({
        kind: hasFrontmatter ? "success" : "warning",
        message: hasFrontmatter
          ? es ? "Listo. SKILL.md está ahora en la raíz del archivo y se conservaron los archivos relacionados." : "Ready. The archive now has SKILL.md at its root; supporting files were kept in place."
          : es ? "El paquete está listo, pero no detectamos metadatos YAML. Comprueba que SKILL.md incluya un nombre y una descripción antes de importarlo." : "Packaged, but no YAML frontmatter was detected. Check that SKILL.md includes a useful name and description before importing.",
      });
    } catch (error) {
      setResult({ kind: "error", message: error instanceof Error ? error.message : es ? "No se pudo leer el archivo. Usa un archivo .zip o .skill válido." : "Could not read this archive. Use a valid .zip or .skill file." });
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function onSelect(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) void processFile(file);
  }

  return (
    <section aria-labelledby="package-heading" className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-google-blue/10 p-2.5 text-google-blue"><FileArchive className="h-5 w-5" /></div>
        <div>
          <h2 id="package-heading" className="text-xl font-semibold tracking-tight">{es ? "Prepara un ZIP de Skill para Gemini Enterprise" : "Make a skill ZIP ready for Gemini Enterprise"}</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">{es ? "Elige un paquete .skill o ZIP. Moveremos SKILL.md a la raíz del archivo y conservaremos sus archivos relacionados." : "Select one Claude-style .skill or ZIP package. We’ll move its SKILL.md to the archive root and keep its supporting files."}</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-dashed border-border bg-muted/30 p-4 sm:p-5">
        <input ref={inputRef} type="file" accept=".zip,.skill,application/zip,application/octet-stream" onChange={onSelect} className="sr-only" aria-label="Choose a skill ZIP archive" />
        {!download ? (
          <button type="button" disabled={busy} onClick={() => inputRef.current?.click()} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-3 text-sm font-semibold text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60">
            {busy ? <><FolderOpen className="h-4 w-4 animate-pulse" />{es ? "Preparando el paquete…" : "Preparing package…"}</> : <><Upload className="h-4 w-4" />{es ? "Elegir un archivo .skill o .zip" : "Choose a .skill or .zip file"}</>}
          </button>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className={`flex items-start gap-2 text-sm ${result?.kind === "warning" ? "text-amber-700 dark:text-amber-300" : "text-foreground"}`}>{result?.kind === "warning" ? <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> : <Check className="mt-0.5 h-4 w-4 shrink-0 text-google-green" />}<span>{result?.message}</span></div>
            <a href={download.url} download={download.name} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-google-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue focus-visible:ring-offset-2"><ArrowDownToLine className="h-4 w-4" />{es ? "Descargar ZIP" : "Download ZIP"}</a>
          </div>
        )}
        {result && !download && <p role="alert" className={`mt-3 flex items-start gap-2 text-sm ${result.kind === "error" ? "text-destructive" : "text-amber-700 dark:text-amber-300"}`}><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{result.message}</p>}
      </div>

      <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-muted-foreground"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-google-green" />{es ? "Los archivos se procesan en este navegador y no se suben al sitio. Límite: 12 MB comprimidos, 40 MB extraídos y 400 archivos." : "Files are processed in this browser and aren’t uploaded to this site. Limit: 12 MB compressed, 40 MB expanded, 400 files."}</p>
      {download && <button type="button" onClick={reset} className="mt-3 text-xs font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground">{es ? "Elegir otro archivo" : "Choose another archive"}</button>}
    </section>
  );
}

export function MigrationChecklist({ locale }: { locale: "en" | "es" }) {
  const spanish = locale === "es";
  const steps = spanish ? [
    ["Inventory what you rely on", "List recurring prompts, Claude Projects, and Skills. Decide which workflows still matter before moving anything."],
    ["Move instructions deliberately", "Copy useful instructions into a SKILL.md, then review names, descriptions, examples, and any references. This tool only fixes ZIP layout; it does not translate prompts or guarantee feature parity."],
    ["Confirm your Gemini edition and access", "Skills have different availability across Gemini apps and Gemini Enterprise editions. In Enterprise, check edition, administrator settings, and account access first."],
    ["Import and test with representative work", "Upload the Markdown or ZIP in Gemini’s Skills area, then test with realistic tasks. Check outputs, permissions, file access, and whether referenced scripts are supported."],
    ["Recreate organization controls", "Set sharing and review expectations with your admin. Recheck data sources and access rules; moving instructions does not move Claude history, integrations, or permissions."],
  ] : [
    ["Inventory what you rely on", "List recurring prompts, Claude Projects, and Skills. Decide which workflows still matter before moving anything."],
    ["Move instructions deliberately", "Copy useful instructions into a SKILL.md, then review names, descriptions, examples, and references. This tool only fixes ZIP layout; it does not translate prompts or guarantee feature parity."],
    ["Confirm your Gemini edition and access", "Skills availability differs across Gemini apps and Gemini Enterprise editions. In Enterprise, check your edition, administrator settings, and account access first."],
    ["Import and test representative work", "Upload the Markdown or ZIP in Gemini’s Skills area, then test realistic tasks. Check outputs, permissions, file access, and whether referenced scripts are supported."],
    ["Recreate organization controls", "Set sharing and review expectations with your administrator. Recheck data sources and access rules; moving instructions does not move Claude history, integrations, or permissions."],
  ];
  return <ol className="divide-y divide-border border-y border-border">{steps.map(([title, detail], index) => <li key={title} className="grid gap-2 py-4 sm:grid-cols-[2.25rem_minmax(0,1fr)] sm:gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold tabular-nums text-muted-foreground">{index + 1}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">{detail}</p></div></li>)}</ol>;
}

export function SkillFormatNotes({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  return <div className="grid gap-5 sm:grid-cols-2">
    <div className="flex gap-3"><FileText className="mt-0.5 h-5 w-5 shrink-0 text-google-blue" /><div><h3 className="font-semibold">{es ? "SKILL.md en la raíz" : "SKILL.md at the root"}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{es ? "Gemini Enterprise extrae el nombre y la descripción desde SKILL.md. Los ZIP con varias carpetas deben tenerlo en el directorio raíz." : "Gemini Enterprise reads the skill name and description from SKILL.md. ZIPs containing folders need that file in the root directory."}</p></div></div>
    <div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-google-green" /><div><h3 className="font-semibold">{es ? "Revisa la disponibilidad" : "Check availability first"}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{es ? "Las funciones dependen del producto y la edición. En Gemini Enterprise, la creación/importación y el uso de Skills varían por edición y configuración del administrador." : "Skills vary by product and edition. In Gemini Enterprise, creation, upload, and use depend on edition and administrator configuration."}</p></div></div>
  </div>;
}

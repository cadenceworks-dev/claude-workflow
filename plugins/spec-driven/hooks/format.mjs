// Formats the file Claude just edited with the formatter the project already uses.
// Never blocks and never installs anything: no formatter found, nothing happens.
// Turn it off for one project with SPEC_DRIVEN_FORMAT=off in .claude/settings.json "env".
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";

const prettierExt = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".md", ".css", ".scss", ".html", ".yml", ".yaml",
]);

function onPath(cmd) {
  try {
    execFileSync("sh", ["-c", `command -v ${cmd}`], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function run(cmd, args, cwd) {
  execFileSync(cmd, args, { cwd, stdio: "ignore", timeout: 20000 });
}

try {
  if (process.env.SPEC_DRIVEN_FORMAT === "off") process.exit(0);
  const input = JSON.parse(readFileSync(0, "utf8"));
  const file = input?.tool_input?.file_path;
  const root = process.env.CLAUDE_PROJECT_DIR ?? input?.cwd ?? process.cwd();
  if (!file || !existsSync(file)) process.exit(0);
  const ext = extname(file);

  const prettier = join(root, "node_modules", ".bin", "prettier");
  const pyproject = join(root, "pyproject.toml");

  if (prettierExt.has(ext) && existsSync(prettier)) {
    run(prettier, ["--write", "--ignore-unknown", "--log-level", "silent", file], root);
  } else if (ext === ".py" && existsSync(pyproject) && readFileSync(pyproject, "utf8").includes("[tool.ruff") && onPath("ruff")) {
    run("ruff", ["format", "--quiet", file], root);
  } else if (ext === ".go" && onPath("gofmt")) {
    run("gofmt", ["-w", file], root);
  } else if (ext === ".rs" && onPath("rustfmt")) {
    run("rustfmt", ["--edition", "2021", file], root);
  } else if ((ext === ".tf" || ext === ".tfvars") && onPath("terraform")) {
    run("terraform", ["fmt", file], root);
  }
} catch {
  // Formatting is a convenience. CI still checks it.
}

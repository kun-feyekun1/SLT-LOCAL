#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const projectRoot = path.resolve(__dirname, "..");
const isWindows = process.platform === "win32";
let hasError = false;

function result(ok, message, required = true) {
  const symbol = ok ? "OK" : required ? "ERROR" : "NOTE";
  console.log(`[${symbol}] ${message}`);
  if (!ok && required) hasError = true;
}

function commandExists(command) {
  const probe = isWindows ? "where" : "which";
  return spawnSync(probe, [command], { stdio: "ignore" }).status === 0;
}

const [nodeMajor, nodeMinor] = process.versions.node.split(".").map(Number);
const supportedNode =
  nodeMajor === 22 ? nodeMinor >= 13 : nodeMajor > 22 && nodeMajor % 2 === 0;
result(
  supportedNode,
  `Node ${process.versions.node} detected; Expo SDK 56 requires Node 22.13+ (use an even-numbered LTS release).`,
);

result(commandExists("npm"), "npm is available on PATH.");
result(
  fs.existsSync(path.join(projectRoot, "node_modules")),
  "Dependencies are installed (run `npm ci` if this fails).",
);

const envPath = path.join(projectRoot, ".env");
result(
  fs.existsSync(envPath),
  ".env exists (copy .env.example to .env if this fails).",
);

if (fs.existsSync(envPath)) {
  const envText = fs.readFileSync(envPath, "utf8");
  const mapboxMatch = envText.match(/^EXPO_PUBLIC_MAPBOX_TOKEN=(.+)$/m);
  result(
    Boolean(mapboxMatch && mapboxMatch[1].trim().startsWith("pk.")),
    "EXPO_PUBLIC_MAPBOX_TOKEN contains a Mapbox public token beginning with `pk.`.",
  );

  const apiMatch = envText.match(/^EXPO_PUBLIC_API_URL=(.+)$/m);
  if (apiMatch) {
    result(
      /^https?:\/\//.test(apiMatch[1].trim()),
      "EXPO_PUBLIC_API_URL is an http(s) URL.",
    );
  } else {
    result(
      false,
      "EXPO_PUBLIC_API_URL is not set; the app will use the shared Railway backend fallback.",
      false,
    );
  }
}

result(
  commandExists("adb"),
  "adb is available on PATH (required for a local Android build; optional for web/iOS-only work).",
  false,
);

if (process.platform === "darwin") {
  result(
    commandExists("pod"),
    "CocoaPods is installed (required for a local iOS build).",
    false,
  );
}

console.log("");
if (hasError) {
  console.error("Setup is incomplete. Fix the ERROR items above, then rerun `npm run setup:check`.");
  process.exit(1);
}

console.log("Core project setup looks ready.");

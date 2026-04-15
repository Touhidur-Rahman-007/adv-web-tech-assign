$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$workspaceRoot = Split-Path -Parent $projectRoot
$binDir = if ($env:PG_BIN_DIR) { $env:PG_BIN_DIR } else { 'E:\PostgreSql\bin' }

$initdbPath = Join-Path $binDir 'initdb.exe'
$dataDir = Join-Path $workspaceRoot 'temp-pg-data'

if (-not (Test-Path $initdbPath)) {
  throw "initdb.exe not found at $initdbPath. Set PG_BIN_DIR environment variable to your PostgreSQL bin path."
}

if (Test-Path (Join-Path $dataDir 'PG_VERSION')) {
  Write-Output "temp-pg-data already initialized at $dataDir"
  exit 0
}

if (Test-Path $dataDir) {
  Remove-Item $dataDir -Recurse -Force
}

New-Item -ItemType Directory -Path $dataDir | Out-Null

& $initdbPath -D $dataDir -U postgres -A trust -E UTF8
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Output "Initialized temporary PostgreSQL data directory at $dataDir"

$ErrorActionPreference = 'Stop'

$workspaceRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$binDir = if ($env:PG_BIN_DIR) { $env:PG_BIN_DIR } else { 'E:\PostgreSql\bin' }

$pgCtlPath = Join-Path $binDir 'pg_ctl.exe'
$dataDir = Join-Path $workspaceRoot 'temp-pg-data'

if (-not (Test-Path $pgCtlPath)) {
  throw "pg_ctl.exe not found at $pgCtlPath. Set PG_BIN_DIR environment variable correctly."
}

if (-not (Test-Path (Join-Path $dataDir 'PG_VERSION'))) {
  Write-Output "No temporary PostgreSQL data directory found. Nothing to stop."
  exit 0
}

& $pgCtlPath -D $dataDir stop -m fast 2>$null
if ($LASTEXITCODE -eq 0) {
  Write-Output "Stopped temporary PostgreSQL."
} else {
  Write-Output "Temporary PostgreSQL was not running or stop command failed."
}

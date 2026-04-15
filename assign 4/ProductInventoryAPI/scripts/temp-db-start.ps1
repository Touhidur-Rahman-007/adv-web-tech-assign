$ErrorActionPreference = 'Stop'

$workspaceRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$binDir = if ($env:PG_BIN_DIR) { $env:PG_BIN_DIR } else { 'E:\PostgreSql\bin' }

$pgCtlPath = Join-Path $binDir 'pg_ctl.exe'
$pgIsReadyPath = Join-Path $binDir 'pg_isready.exe'
$createDbPath = Join-Path $binDir 'createdb.exe'
$dataDir = Join-Path $workspaceRoot 'temp-pg-data'
$logPath = Join-Path $workspaceRoot 'temp-pg.log'
$port = '55432'

if (-not (Test-Path (Join-Path $dataDir 'PG_VERSION'))) {
  throw "temp-pg-data is not initialized. Run npm run db:temp:init first."
}

if (-not (Test-Path $pgCtlPath) -or -not (Test-Path $pgIsReadyPath) -or -not (Test-Path $createDbPath)) {
  throw "PostgreSQL binaries not found under $binDir. Set PG_BIN_DIR to the correct PostgreSQL bin path."
}

& $pgIsReadyPath -h localhost -p $port -U postgres *> $null
if ($LASTEXITCODE -ne 0) {
  & $pgCtlPath -D $dataDir -l $logPath -o "-p $port" start -w
  if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
  }
  Write-Output "Started temporary PostgreSQL on localhost:$port"
} else {
  Write-Output "Temporary PostgreSQL already running on localhost:$port"
}

& $createDbPath -h localhost -p $port -U postgres product_inventory_db 2>$null
if ($LASTEXITCODE -eq 0) {
  Write-Output "Created database: product_inventory_db"
} else {
  Write-Output "Database product_inventory_db already exists (or could not be created). Continuing."
}

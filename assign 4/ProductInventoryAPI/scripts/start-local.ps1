$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
Push-Location $projectRoot

try {
  npm run db:temp:init
  if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
  }

  npm run db:temp:start
  if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
  }

  $env:DB_HOST = 'localhost'
  $env:DB_PORT = '55432'
  $env:DB_USERNAME = 'postgres'
  $env:DB_PASSWORD = 'your_password'
  $env:DB_NAME = 'product_inventory_db'

  Write-Output 'Starting Nest app with temporary PostgreSQL on localhost:55432...'
  npm run start
  exit $LASTEXITCODE
}
finally {
  Pop-Location
}

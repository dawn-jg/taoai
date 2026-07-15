Set-Location D:\ai-nav-site
npx next build
$exitCode = $LASTEXITCODE
Write-Host "Exit code: $exitCode"
exit $exitCode

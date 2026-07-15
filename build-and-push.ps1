Set-Location D:\ai-nav-site
npm run build
if ($LASTEXITCODE -eq 0) {
    git add data/news.json
    git commit -m 'chore: update AI news [cron]'
    git push
}

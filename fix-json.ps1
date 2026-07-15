$content = Get-Content 'D:\ai-nav-site\data\news.json' -Raw -Encoding UTF8
$fixed = $content -replace [char]0x201C, '\u201C' -replace [char]0x201D, '\u201D'
[System.IO.File]::WriteAllText('D:\ai-nav-site\data\news.json', $fixed, [System.Text.UTF8Encoding]::new($false))

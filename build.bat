@echo off
cd /d D:\ai-nav-site
call npm run build
if %ERRORLEVEL% NEQ 0 exit /b %ERRORLEVEL%

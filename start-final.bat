@echo off
title AR/VR Campus Guide - Local Server
color 0B

echo ============================================================
echo           AR/VR Campus Guide - Local Server
echo ============================================================
echo.
echo [Info] Starting local server (using PowerShell)...
echo [Tip] Please visit the following URL in your browser:
echo.
echo ============================================================
echo                                                             
echo        http://localhost:8080                                    
echo                                                             
echo ============================================================
echo.
echo [Tip] Press Ctrl+C to stop the server
echo.
echo ============================================================
echo.

REM Check if PowerShell is available
where powershell >nul 2>&1
if %errorlevel% neq 0 (
    echo [Error] PowerShell not found!
    echo.
    echo Please ensure your system is Windows 7 or later
    echo.
    pause
    exit /b 1
)

echo [Success] PowerShell environment detected
echo.
echo [Info] Starting HTTP server...
echo.

REM Start HTTP server using PowerShell
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server-v2.ps1"

if %errorlevel% neq 0 (
    echo.
    echo [Error] Server failed to start!
    echo.
    pause
    exit /b 1
)

echo.
echo [Info] Server stopped
pause

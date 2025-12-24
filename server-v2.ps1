# AR/VR Campus Guide - HTTP Server
# Usage: Run start-simple-v3.bat

$ErrorActionPreference = "Stop"
$scriptPath = $PSScriptRoot

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "           AR/VR Campus Guide - HTTP Server" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

try {
    # Create HTTP listener
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:8080/")
    $listener.Start()

    Write-Host "[Success] Server started" -ForegroundColor Green
    Write-Host "[Info] Listening on: http://localhost:8080/" -ForegroundColor Cyan
    Write-Host "[Info] Working directory: $scriptPath" -ForegroundColor Cyan
    Write-Host "[Info] Waiting for requests..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host ""

    # Request counter
    $requestCount = 0

    while ($listener.IsListening) {
        try {
            # Get request context
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response

            # Increment request counter
            $requestCount++

            # Get requested URL
            $url = $request.Url.LocalPath

            # Handle root path
            if ($url -eq "/" -or $url -eq "") {
                $url = "/index.html"
            }

            # Build file path
            $filePath = Join-Path $scriptPath $url.TrimStart("/")

            # Check if file exists
            if (Test-Path $filePath -PathType Leaf) {
                # Get file extension
                $extension = [System.IO.Path]::GetExtension($filePath)

                # Set content type
                $contentType = "text/html"
                switch ($extension) {
                    ".css" { $contentType = "text/css" }
                    ".js" { $contentType = "application/javascript" }
                    ".json" { $contentType = "application/json" }
                    ".png" { $contentType = "image/png" }
                    ".jpg" { $contentType = "image/jpeg" }
                    ".jpeg" { $contentType = "image/jpeg" }
                    ".gif" { $contentType = "image/gif" }
                    ".svg" { $contentType = "image/svg+xml" }
                    ".ico" { $contentType = "image/x-icon" }
                    ".woff" { $contentType = "font/woff" }
                    ".woff2" { $contentType = "font/woff2" }
                    ".ttf" { $contentType = "font/ttf" }
                    ".eot" { $contentType = "application/vnd.ms-fontobject" }
                    ".mp4" { $contentType = "video/mp4" }
                    ".webm" { $contentType = "video/webm" }
                    ".ogg" { $contentType = "video/ogg" }
                    ".mp3" { $contentType = "audio/mpeg" }
                    ".wav" { $contentType = "audio/wav" }
                    ".pdf" { $contentType = "application/pdf" }
                    ".zip" { $contentType = "application/zip" }
                    default { $contentType = "application/octet-stream" }
                }

                # Read file content
                $content = [System.IO.File]::ReadAllBytes($filePath)

                # Set response
                $response.ContentType = $contentType
                $response.ContentLength64 = $content.Length
                $response.OutputStream.Write($content, 0, $content.Length)

                # Display request info
                Write-Host "[$requestCount] $url" -ForegroundColor Green
            } else {
                # File not found, return 404
                $response.StatusCode = 404
                $response.StatusDescription = "Not Found"
                $response.ContentType = "text/html"

                $errorHtml = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>404 - Page Not Found</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
        }
        .error-container {
            text-align: center;
            padding: 40px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 {
            color: #ff4d4f;
            font-size: 72px;
            margin: 0 0 20px 0;
        }
        p {
            color: #666;
            font-size: 18px;
            margin: 0 0 30px 0;
        }
        a {
            color: #4a6de5;
            text-decoration: none;
            padding: 10px 20px;
            background: #4a6de5;
            color: white;
            border-radius: 4px;
        }
        a:hover {
            background: #3a5bd5;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>404</h1>
        <p>Page Not Found</p>
        <a href="/">Back to Home</a>
    </div>
</body>
</html>
"@

                $errorBytes = [System.Text.Encoding]::UTF8.GetBytes($errorHtml)
                $response.ContentLength64 = $errorBytes.Length
                $response.OutputStream.Write($errorBytes, 0, $errorBytes.Length)

                # Display error info
                $msg = "404 - " + $url
                Write-Host "[$requestCount] $msg" -ForegroundColor Red
            }

            $response.Close()
        } catch {
            $msg = "Request failed: " + $_.Exception.Message
            Write-Host "[Error] $msg" -ForegroundColor Red
        }
    }
} catch {
    $msg = "Server failed to start: " + $_.Exception.Message
    Write-Host "[Error] $msg" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible reasons:" -ForegroundColor Yellow
    Write-Host "1. Port 8080 is already in use" -ForegroundColor Yellow
    Write-Host "2. Insufficient permissions (try running as administrator)" -ForegroundColor Yellow
    Write-Host "3. PowerShell execution policy restriction" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Solutions:" -ForegroundColor Yellow
    Write-Host "1. Close the program using port 8080" -ForegroundColor Yellow
    Write-Host "2. Right-click start-simple-v3.bat and select 'Run as administrator'" -ForegroundColor Yellow
    Write-Host "3. Run in PowerShell: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to continue"
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
        Write-Host ""
        Write-Host "============================================================" -ForegroundColor Cyan
        Write-Host "[Info] Server stopped" -ForegroundColor Cyan
        $msg = "Total requests processed: " + $requestCount
        Write-Host "[Info] $msg" -ForegroundColor Green
        Write-Host "============================================================" -ForegroundColor Cyan
    }
}

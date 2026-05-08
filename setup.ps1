Write-Host "Setting up SynapseBridge AI Local Environment..." -ForegroundColor Green

# Copy .env
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Created .env file" -ForegroundColor Cyan
}

# Start docker-compose
Write-Host "Building and starting Docker containers..." -ForegroundColor Green
docker-compose up --build -d

Write-Host "Setup complete. Services should be running shortly." -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "AI API: http://localhost:8001/docs" -ForegroundColor Cyan

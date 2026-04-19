# PowerShell script para configurar GitHub CLI e criar repositório

$ErrorActionPreference = "Stop"

Write-Host "🚀 Configurando GitHub para o projeto restech-ai..." -ForegroundColor Cyan

# Verificar se gh está disponível
$ghPath = $null
$PossiblePaths = @(
    "C:\tmp\bin\gh.exe",
    "$env:LOCALAPPDATA\GitHub CLI\gh.exe",
    "$env:ProgramFiles\GitHub CLI\gh.exe",
    "$env:USERPROFILE\bin\gh.exe"
)

foreach ($path in $PossiblePaths) {
    if (Test-Path $path) {
        $ghPath = $path
        break
    }
}

# Se não encontrou, tentar comando
if (-not $ghPath) {
    $ghCheck = Get-Command gh -ErrorAction SilentlyContinue
    if ($ghCheck) {
        $ghPath = $ghCheck.Source
    }
}

if (-not $ghPath) {
    Write-Host "❌ GitHub CLI não encontrado. Baixando..." -ForegroundColor Red

    # Criar diretório
    $installDir = "$env:USERPROFILE\bin"
    if (-not (Test-Path $installDir)) {
        New-Item -ItemType Directory -Path $installDir -Force | Out-Null
    }

    # Download
    $url = "https://github.com/cli/cli/releases/download/v2.90.0/gh_2.90.0_windows_amd64.zip"
    $zipFile = "$env:TEMP\gh-cli.zip"

    Write-Host "📥 Baixando GitHub CLI..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $url -OutFile $zipFile -UseBasicParsing

    # Extrair
    Write-Host "📦 Extraindo..." -ForegroundColor Yellow
    Expand-Archive -Path $zipFile -DestinationPath $env:TEMP -Force

    # Copiar
    Copy-Item "$env:TEMP\bin\gh.exe" "$installDir\gh.exe" -Force

    # Adicionar ao PATH
    $userPath = [Environment]::GetEnvironmentVariable("PATH", "User")
    if ($userPath -notlike "*$installDir*") {
        [Environment]::SetEnvironmentVariable("PATH", "$userPath;$installDir", "User")
        Write-Host "✅ Adicionado ao PATH. Reinicie o terminal após o login." -ForegroundColor Green
    }

    $ghPath = "$installDir\gh.exe"
}

Write-Host "✅ GitHub CLI encontrado em: $ghPath" -ForegroundColor Green

# Verificar autenticação
Write-Host ""
Write-Host "🔐 Verificando autenticação GitHub..." -ForegroundColor Cyan

$authStatus = & $ghPath auth status 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Já está autenticado!" -ForegroundColor Green
} else {
    Write-Host "📝 Você precisa fazer login no GitHub." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Execute manualmente: gh auth login" -ForegroundColor White -BackgroundColor DarkBlue
    Write-Host ""
    Write-Host "Escolha:" -ForegroundColor Yellow
    Write-Host "  - Protocol: HTTPS"
    Write-Host "  - What is your preferred protocol for Git operations? HTTPS"
    Write-Host "  - Authenticate with GitHub (vai abrir navegador) ou use token"
    Write-Host ""
    Write-Host "Após o login, execute este script novamente."
    exit 0
}

# Obter username
$username = & $ghPath api user -q .login
Write-Host "✅ Autenticado como: $username" -ForegroundColor Green

# Verificar se repositório existe
$repoName = "restech-ai"
Write-Host ""
Write-Host "📦 Configurando repositório $repoName..." -ForegroundColor Cyan

$repoExists = $false
try {
    $repoCheck = & $ghPath repo view "$username/$repoName" 2>&1
    if ($LASTEXITCODE -eq 0) {
        $repoExists = $true
    }
} catch {}

if ($repoExists) {
    Write-Host "⚠️  Repositório já existe: https://github.com/$username/$repoName" -ForegroundColor Yellow
} else {
    Write-Host "📦 Criando repositório..." -ForegroundColor Yellow

    # Mudar para diretório do projeto
    $projectDir = "D:\JULIO\PROGRAMACAO\PROJETOS\restech-ai"
    Set-Location $projectDir

    # Criar repo
    & $ghPath repo create $repoName --public --source=. --remote=origin --push
    Write-Host "✅ Repositório criado e código enviado!" -ForegroundColor Green
}

# Configurar remote se necessário
Set-Location "D:\JULIO\PROGRAMACAO\PROJETOS\restech-ai"
$remote = git remote get-url origin 2>&1
if ($LASTEXITCODE -ne 0) {
    git remote add origin "https://github.com/$username/$repoName.git"
    Write-Host "✅ Remote origin configurado" -ForegroundColor Green
}

# Push
Write-Host ""
Write-Host "🚀 Enviando código para GitHub..." -ForegroundColor Cyan
git push -u origin master

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Sucesso! Seu projeto está em:" -ForegroundColor Green
    Write-Host "   https://github.com/$username/$repoName" -ForegroundColor White -BackgroundColor DarkBlue
    Write-Host ""
    Write-Host "💡 O auto-sync está ativado. Cada commit será automaticamente enviado para o GitHub." -ForegroundColor Green
} else {
    Write-Host "⚠️  Erro ao fazer push. Tente manualmente:" -ForegroundColor Red
    Write-Host "   git push -u origin master" -ForegroundColor Yellow
}

Write-Host ""
Pause

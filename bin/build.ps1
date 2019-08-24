#!/usr/bin/env pwsh
$ErrorActionPreference = 'Stop'

$basedir=(Split-Path $MyInvocation.MyCommand.Definition -Parent)
. $basedir/post-layout.ps1

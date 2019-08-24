#!/usr/bin/env pwsh
param (
	[Parameter(Position=1)]
	[String] $Destination = "dist"	# The build destination
)

$ErrorActionPreference = 'Stop'
$basedir = Split-Path (Split-Path $MyInvocation.MyCommand.Definition -Parent) -Parent

if ($PSBoundParameters.ContainsKey('Destination') -or
	![System.IO.Path]::GetFullPath("$basedir/$Destination").StartsWith([System.IO.Path]::GetFullPath($basedir))) {
	if (!(Test-Path "$basedir/$Destination")) {
		git clone -b gh-pages -v "https://${$env:GH_TOKEN}@github.com/ExE-Boss/smwc-style.git" "$basedir/$Destination"
		if ($LASTEXITCODE -ne 0) {
			throw "git clone failed with exit code: $LASTEXITCODE";
		}
	}
	Remove-Item "$basedir/$Destination/*" -Force -Recurse -Exclude ".*"
}

gulp dist --dest "$basedir/$Destination"

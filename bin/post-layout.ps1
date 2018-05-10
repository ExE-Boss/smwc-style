#!/usr/bin/env pwsh

Param(
	[Parameter(Position=1)]
	[String] $Destination = "dist"	# The build destination
);

$basedir=(Split-Path $MyInvocation.MyCommand.Definition -Parent)+'\..'

if (-not [System.IO.Path]::GetFullPath("$basedir/$Destination").StartsWith([System.IO.Path]::GetFullPath($basedir))) {
	if (-not (Test-Path "$basedir/$Destination")) {
		git clone -b gh-pages -v "https://${$env:GH_TOKEN}@github.com/ExE-Boss/smwc-style.git" "$basedir/$Destination"
	}
	Remove-Item "$basedir/$Destination/*" -Force -Recurse -Exclude ".*"
}

yarn run post-layout --dest "$basedir/$Destination"

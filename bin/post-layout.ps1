#!/usr/bin/env pwsh

Param(
	[Parameter(Position=1)]
	[String] $Destination = "./dist"	# The build destination
);

if (-not [System.IO.Path]::GetFullPath($Destination).StartsWith([System.IO.Path]::GetFullPath("."))) {
	if (-not (Test-Path $Destination)) {
		git clone -b gh-pages -v "https://${$env:GH_TOKEN}@github.com/ExE-Boss/smwc-style.git" "$Destination"
	}
	Remove-Item "$Destination/*" -Force -Recurse -Exclude ".*"
}

yarn run post-layout --dest "$Destination"

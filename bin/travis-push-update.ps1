#!/usr/bin/env pwsh
# This should instead probably be done using Travis CI's
# deployments, but I don't know how to actually use those.
# See: https://docs.travis-ci.com/user/deployment/
param (
	# The build destination
	[Parameter(Position=1)]
	[String] $Destination = 'dist'
)

$ErrorActionPreference = 'Stop'

if ("$env:TRAVIS_PULL_REQUEST" -eq "false" -and "$env:TRAVIS_BRANCH" -eq "master" ) {
	Set-Location $Destination
	git add -A
	git config --global user.email "contact@travis-ci.org"
	git config --global user.name "Travis CI"
	git commit -am "CI Update"
	git push
}

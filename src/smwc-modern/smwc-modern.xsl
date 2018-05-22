<?xml version="1.0" encoding="UTF-8"?>
<!--
Copyright (C) 2018 ExE Boss

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns="http://www.w3.org/1999/xhtml" version="1.0">

	<xsl:template match="//*">
		<xsl:element name="{local-name(.)}">
			<xsl:apply-templates select="node()|@*"/>
		</xsl:element>
	</xsl:template>

	<xsl:template match="@*">
		<xsl:attribute name="{name(.)}"><xsl:value-of select="."/></xsl:attribute>
	</xsl:template>

	<xsl:template match="/*">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.css" integrity="sha256-KeWggbCyRNU5k8MgZ7Jf8akh/OtL7Qu/YloCBpayj40=" crossorigin="anonymous" />
				<xsl:apply-templates select="/html/head/*"/>
				<link rel="stylesheet" type="text/css" href="test-profile_files/newcss.css"/>
				<link rel="stylesheet" type="text/css" href="smwc-modern.css"/>
				<style><![CDATA[
					style,
					script { display: none !important; }
				]]></style>
			</head>
			<body>
				<xsl:apply-templates select="/html/body/*"/>
			</body>
		</html>
	</xsl:template>

	<!--root-->
	<xsl:template match="body/table">
		<xsl:apply-templates select="tbody/*"/>
	</xsl:template>

	<xsl:template match="body/table/tbody/tr[1]">
		<h1 class="text-center">
			<xsl:apply-templates select="td/*"/>
		</h1>
	</xsl:template>

	<xsl:template match="body/table/tbody/tr[4]">
		<header class="ropebox-container my-3 d-flex flex-column">
			<xsl:apply-templates select="td/*"/>
		</header>
	</xsl:template>

	<xsl:template match="body/table/tbody/tr[6]">
		<xsl:apply-templates select="td/div/*"/>
	</xsl:template>

	<xsl:template match="body/table/tbody/tr[8]">
		<main class="mt-3">
			<xsl:apply-templates select="td/*"/>
		</main>
	</xsl:template>

	<!-- Stuff to remove -->
	<xsl:template match="body/table/tbody/tr[2]|body/table/tbody/tr[3]|body/table/tbody/tr[5]|body/table/tbody/tr[7]"/>
	<!--/root-->

	<!--ropebox-->
	<xsl:template match="body/table/tbody/tr[4]/td/table">
		<div class="ropebox d-flex justify-content-between align-content-center">
			<xsl:apply-templates select="tbody/tr[2]/td[2]/*"/>
		</div>
		<div class="ropebox d-flex justify-content-between align-content-center">
			<xsl:apply-templates select="tbody/tr[4]/td[2]/*"/>
		</div>
	</xsl:template>

	<xsl:template match="body/table/tbody/tr[4]/td/table/tbody/tr[2]/td[2]/table">
		<small class="col-auto text-left pl-0 my-auto">
			<xsl:apply-templates select="tbody/tr/td[1]/small/node()"/>
		</small>
		<small class="col text-center my-auto">
			<xsl:apply-templates select="tbody/tr/td[2]/small/node()"/>
		</small>
		<small class="col-auto text-right pr-0 my-auto">
			<xsl:apply-templates select="tbody/tr/td[3]/small/node()"/>
		</small>
	</xsl:template>

	<xsl:template match="body/table/tbody/tr[4]/td/table/tbody/tr[4]/td[2]/table">
		<div class="col text-left pl-0 my-auto">
			<xsl:apply-templates select="tbody/tr/td[1]/node()"/>
		</div>
		<div class="col-auto text-right pr-0 my-auto">
			<xsl:apply-templates select="tbody/tr/td[2]/node()"/>
		</div>
	</xsl:template>
	<!--/ropebox-->

	<!--main-layout-->
	<xsl:template match="body/table/tbody/tr[8]/td/table">
		<div class="row">
			<div class="col">
				<xsl:apply-templates select="tbody/tr/td[1]/table"/>
				<xsl:apply-templates select="tbody/tr/td[1]/div"/>
			</div>
			<div class="col-auto pl-0 d-flex flex-column">
				<xsl:apply-templates select="tbody/tr/td[3]/*"/>
			</div>
		</div>
	</xsl:template>

	<xsl:template match="body/table/tbody/tr[8]/td/table/tbody/tr/td[3]/table">
		<nav id="mainmenu" class="pipebox menu">
			<xsl:apply-templates select="tbody/tr[2]/td[2]/*"/>
		</nav>
	</xsl:template>

	<xsl:template match="body/table/tbody/tr[8]/td/table/tbody/tr/td[1]/table">
		<div class="treebox mb-3">
			<xsl:apply-templates select="tbody/tr[2]/td[2]/*"/>
		</div>
	</xsl:template>
	<!--/main-layout-->
</xsl:stylesheet>

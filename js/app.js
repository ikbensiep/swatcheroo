
var palettename;
var svgfileurl;
var svgfile;

function init() {
	$('#loadFile').click(function(){
		svgfileurl = $("#svgFile").val();
		loadFile(svgfileurl);
	});
}

function convertColors(svgfile) {
	
	var boxes = document.getElementsByTagNameNS('http://www.w3.org/2000/svg','rect');

	var hexcolors = [];
	var rgbcolors = [];
	// store hex colors in array
	for (var i = 0; i < boxes.length; i++) {
		hexcolors[i] = boxes[i].style['fill'];
		rgbcolors.push(hex2rgb(hexcolors[i]));
	}

	palettename =  $('#paletteName').val();
	
	$("#debug").html(writeGPLFormat(palettename, rgbcolors, true));
	$("#saveGPLFile").attr("href", "data:application/octet-stream;base64," + window.btoa(writeGPLFormat(palettename, rgbcolors)));
	$("#saveGPLFile").attr("class", "btn btn-primary");

}

function hex2rgb(hex) {
	// Firefox says rgb values, webkit says it's hex.
	if(hex.substring(0,1) !== '#') {
		
		//this is terrible
		hex = hex.substring(4);
		hex = hex.substr(0, hex.length-1);
		hex = hex.split(',');

		var colors = [];

		for(i in hex) {
			colors[i] = hex[i];
		}
		return colors;

	} else {
		
		hex = hex.substr(1,6) + '';
		var r = parseInt(hex.substr(0,2),16);
		var g = parseInt(hex.substr(2,2),16);
		var b = parseInt(hex.substr(4,2),16);
		
		return [r, g, b];
	}
}



function formatNicely(num){
	num = String(num);
	if(num.length == 1) num = '  ' + num;
	if(num.length == 2) num = ' ' + num;
	return num;
}

function writeGPLFormat(name, colors, html){
	var fileheader = '';
	var colorvalues = '';
	var output = ''

	fileheader += 'GIMP Palette' + '\n';
	fileheader += 'Name: ' + name + '\n';
	fileheader += 'Columns: ' + 0 + '\n';
	fileheader += '#\n';

	for (var i=0; i<colors.length; i++) {
		if(html) {
			colorvalues += "<span style='background: rgba(";
			for(var r=0; r<colors[i].length; r++) {
				colorvalues += colors[i][r] + ', ';
			}
			colorvalues += "1);'>";
			colorvalues += "</span>&nbsp; ";
		}
		for(var r=0; r<colors[i].length; r++) {
			colorvalues += formatNicely(colors[i][r]) + ' ';	
		}
		colorvalues += "\n";
		

	}
	//FIXME REPAIR HELP

	output = fileheader + colorvalues;
	return output;

}

function loadFile(svgfileurl){
	//TODO show loader, remove loader in successhandler
	var url = (svgfileurl);
	$.get( url, function( data ) {
	  	$('#svgembed').load(url);
	  	setTimeout(function(){
	  		convertColors(data);
	  	}, 500);
	});
}


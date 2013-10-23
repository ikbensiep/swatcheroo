var hexcolors = [];
var rgbcolors = [];
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
	

	//TODO: implement ajax request for remote svg files
	//TODO: implement sever to accept file uploads
	
	var boxes = svgfile.getElementsByTagName('rect');
	
	// store hex colors in array
	for (var i = 0; i < boxes.length; i++) {
		hexcolors[i] = boxes[i].style['fill'];
		rgbcolors.push(hext2rgb(hexcolors[i]));
	}
	console.log(rgbcolors);
	

}


function hext2rgb(h) {
	// Firefox says rgb values, webkit says it's hex.
	if(h.substring(0,1) !== '#') {
		console.log('oh shit: ' + h);
		//this is terrible
		h = h.substring(4);
		h = h.substr(0, h.length-1);
		h = h.split(',');

		var c = [];

		for(i in h) {
			c[i] = h[i];
		}
		return c;
	} else {
		
		
		h = h.substr(1,6) + '';
		var r = parseInt(h.substr(0,2),16);
		var g = parseInt(h.substr(2,2),16);
		var b = parseInt(h.substr(4,2),16);
		console.log([r, g, b]);
		return [r, g, b];
	}
}

function drawHTMLPreview() {

}

function writeGPLFormat(name, colors){
	var fileheader = '';
	var colorvalues = '';
	var output = ''

	fileheader += 'GIMP Palette' + '\n';
	fileheader += 'Name: ' + name + '\n';
	fileheader += 'Columns: ' + 0 + '\n';
	fileheader += '#\n';

	for (var i=0; i<colors.length; i++) {
		
		colorvalues += "<span style='background: rgba(";
		for(var r=0; r<colors[i].length; r++) {
			colorvalues += colors[i][r] + ', ';
		}
		colorvalues += "1);'>";
		colorvalues += "</span>&nbsp; ";

		for(var r=0; r<colors[i].length; r++) {
			colorvalues += colors[i][r] + ' ';
		}

		colorvalues += '<br />';

	}
	//FIXME REPAIR HELP
	output = fileheader + colorvalues;
	return output;

}

function loadFile(svgfileurl){
	var url = (svgfileurl);
	$("#debug").html ("<h4>loading " + url + "</h4>");

	$.get( url, function( data ) {
	  	//process data;
	  	console.warn(typeof data + ": ajaxed");
	  	console.log(data);
	  	convertColors(data);
	  	$('#svgembed').load(url);
	  	setTimeout(function(){
  			savePalette();
  		}, 200);
	});

	
	
	
	
	
}

function savePalette() {
	palettename =  $('#paletteName').val();
	$("#debug").html(writeGPLFormat(palettename, rgbcolors));
}
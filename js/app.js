
function convertColors() {
	var hexcolors = [];
	var rgbcolors = [];

	//TODO: implement ajax request for remote svg files
	//TODO: implement sever to accept file uploads
	var svg = document.getElementsByTagName('svg')[0];
	var boxes = svg.getElementsByTagName('rect');
	
	// store hex colors in array
	for (var i = 0; i < boxes.length; i++) {
		hexcolors[i] = boxes[i].style['fill'];
		rgbcolors.push(hext2rgb(hexcolors[i]));
	}
	console.log(writeGPLFormat("test", rgbcolors));
//	document.getElementById("debug").value = writeGPLFormat("test", rgbcolors);

}


function hext2rgb(h) {
	// expecting the hex value to start with '#'. if it be like it don't, shit the bed and go home unseen.
	/*
	if(h.substring(0,1) !== '#') {
		console.log(h);
		console.log('oh shit.');
		return;
	}
	*/
	console.log(h);

	h = h.substring(1,6);

	var r = parseInt(h.substring(0,2),16);
	var g = parseInt(h.substring(2,4),16);
	var b = parseInt(h.substring(4,6),16);
	return r + ' ' + g + ' ' + b;
}

function writeGPLFormat(name, colors){
	var fileheader = '';
	var colorvalues = '';
	var output = ''

	fileheader += 'GIMP Palette' + '\n';
	fileheader += 'Name: ' + name + '\n';
	fileheader += 'Columns: ' + name + '\n';
	fileheader += '#\n';

	for (var i=0; i<colors.length; i++) {
		console.log(typeof colors[i]);
		colorvalues += colors[i] + '\n'; //NaN ??
	}

	output = fileheader + colorvalues;
	return output;

}		
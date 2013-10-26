var svgmachine;
var holder = document.getElementById('holder');
var state =  document.getElementById('status');

if (typeof window.FileReader === 'undefined') {
  $(holder).toggleClass('fail');
  $(status).text('Error loading File and/or FileReader API');
} else {
  $(holder).toggleClass('success');
}
 
holder.ondragover = function () { $(holder).addClass('file-hover'); return false; };
holder.ondragend = function () { $(holder).removeClass('well'); return false; };
holder.ondrop = function (e) {
  this.className = 'well file-dropped';
  e.preventDefault();

  var file = e.dataTransfer.files[0],
  reader = new FileReader();
  reader.onload = function (event) {
    //console.warn(event.target);
    holder.style.background = 'url(' + event.target.result + ') no-repeat center';
    //console.warn("testing");
    var svg = $(event.target.result);
    
    
    $('#svgembed').html(svg);
    
    convertColors(svg);
  };

  reader.readAsText(file);
  
  
  return false;
};

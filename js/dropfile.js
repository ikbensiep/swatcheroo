var holder = document.getElementById('holder'),
    state = document.getElementById('status');

if (typeof window.FileReader === 'undefined') {
  state.className = 'fail';
} else {
  state.className = 'success';
  state.innerHTML = 'File API & FileReader available';
}
 
holder.ondragover = function () { this.className = 'hover'; return false; };
holder.ondragend = function () { this.className = ''; return false; };
holder.ondrop = function (e) {
  this.className = '';
  e.preventDefault();

  var file = e.dataTransfer.files[0],
  reader = new FileReader();
  reader.onload = function (event) {
    console.warn(event.target);
    holder.style.background = 'url(' + event.target.result + ') no-repeat center';
    console.warn("testing");
    var svg = $(event.target.result);
    console.log(svg);
  };

  reader.readAsDataURL(file);

  return false;
};

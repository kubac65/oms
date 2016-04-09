'use strict;'
var AsyncOverlay = {};

(function(asyncOverlay){
  var overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0,0,0,0.3)';
  overlay.style.zIndex = 9999;
  overlay.style.display = 'none';

  var image = document.createElement('img');
  image.style.margin = 'auto';
  image.style.position = 'relative';
  image.style.top = '35%';
  image.style.display = 'block';
  image.src = 'img/gears.svg';

  document.body.appendChild(overlay);
  overlay.appendChild(image);

  asyncOverlay.On = function(){
    overlay.style.display = 'block';
  };

  asyncOverlay.Off = function(){
    overlay.style.display = 'none';
  };

})(AsyncOverlay);

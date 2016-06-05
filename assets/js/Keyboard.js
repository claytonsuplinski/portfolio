document.onkeydown = function(e){
	e = e || window.event;
	switch(e.keyCode){
		case 37: // left arrow
			FOLIO.bottomline.step(-1);
			break;
		case 39: // right arrow
			FOLIO.bottomline.step(1);
			break;
	}
};
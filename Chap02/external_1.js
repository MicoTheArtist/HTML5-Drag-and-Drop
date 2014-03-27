var dndSupported;
var sourceID;
var payloads = {
	img1: "I Am a Rock",
	img2: "I Am Paper",
	img3: "I Am Scissors"
}

function detectDragAndDrop() {
	if (navigator.appName == "Microsoft Internet Explorer") {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null) {
			var rv = parseFloat(RegExp.$1);
			return !!(rv >= 6.0) ? true : false;
		}
		return false;
	}
	return !!('draggable' in document.createElement('span')) ? true : false;
}
function handleDragStart(event) {
	sourceID = this.id;
	statusMessage('drag started ('+ payloads[sourceID]+')');
}
function handleDragOver(event) {
	!!(event.preventDefault) ? event.preventDefault() : false;
}
function handleDrop(event) {
	!!(event.preventDefault) ? event.preventDefault() : false;
	statusMessage('recieved drop '+ payloads[sourceID]);
}
function init() {
	if (dndSupported = detectDragAndDrop()) {
		statusMessage('Using HTML5 Drag and Drop');
		element('img1').addEventListener('dragstart', handleDragStart, false);
		element('dz1').addEventListener('dragover', handleDragOver, false);
		element('dz1').addEventListener('drop', handleDrop, false);
	}
	else {
		statusMessage('This browser does not support drag and drop');	
	}
}
window.onload = function() {
	init();
}
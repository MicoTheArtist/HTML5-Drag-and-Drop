	var dndSupported;
	var dndEls = new Array();
	var draggingElement;
	var winners = {
		Rock: 'Paper',
		Paper: 'Scissors',
		Scissors: 'Rock'	
	}
	
	var hoverBorderStyle = '2px dashed #999';
	var normalBorderStyle = '2px solid white';
	
	function detectDragAndDrop() {
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
			if (re.exec(ua) != null) {
				var rv = parseFloat(RegExp.$1);
				if (rv >= 6.0) return true;
			}
			return false;
		}
		return !!('draggable' in document.createElement('span')) ? true : false;
	}
	
	// DnD support
	
	function handleDragStart(e) {
		var rpsType = getRPSType(this);
		draggingElement = this;
		
		draggingElement = this;
		draggingElement.className = 'moving';
		
		statusMessage('Drag ' + rpsType);
		this.style.opacity = '0.4';
		this.style.border = hoverBorderStyle;
		e.dataTransfer.setDragImage(getRPSImg(this), 120, 120);
	}
	function handleDragEnter(e) {
		if (this !== draggingElement) {
			statusMessage('Hover ' + getRPSType(draggingElement) + ' over ' + getRPSType(this));
		}
		this.style.border = hoverBorderStyle;
	}
	function handleDragOver(e) {
		if (e.preventDefault) e.preventDefault();
		this.style.border = hoverBorderStyle;
		return false;
	}
	function handleDrop(e) {
		if (e.stopPropagation) e.stopPropagation();
		if (e.preventDefault) e.preventDefault();
		if (this.id === draggingElement) return;
		else isWinner(this, draggingElement);
	}
	function handleDragLeave(e) {
		this.style.border = normalBorderStyle;
	}
	function handleDragEnd(e) {
		this.style.opacity = '1.0';
		
		// reset the element style
		draggingElement.className = undefined;
		draggingElement = undefined;
		
		// reset all of the elements
		for (var i=0; i<dndEls.length; i++) {
			dndEls[i].style.border = normalBorderStyle;
		}
	}
	
	// utility functions
	
	function isWinner(under, over) {
		var underType = getRPSType(under);
		var overType = getRPSType(over);
		if (overType == winners[underType]) {
			statusMessage(overType + ' Beats ' + underType);
			swapRPS(under, over);
		}
		else {
			statusMessage(overType + ' does not beat ' + underType);
		}
	}
	function getRPSFooter(e) {
		var children = e.childNodes;
		for (var i=0; i<children.length; i++) {
			if (children[i].nodeName.toLowerCase() == 'footer') return children[i];
		}
		return undefined;
	}
	function getRPSImg(e) {
		var children = e.childNodes;
		for (var i=0; i<children.length; i++) {
			if (children[i].nodeName.toLowerCase() == 'img') return children[i];
		}
		return undefined;
	}
	function getRPSType(e) {
		var footer = getRPSFooter(e);
		return !!(footer) ? footer.innerHTML : undefined;
	}
	function swapRPS(a, b) {
		var holding = Object();
		
		holding.img = getRPSImg(a);
		holding.src = holding.img.src;
		holding.footer = getRPSFooter(a);
		holding.type = holding.footer.innerHTML;
		
		// set a img and footer text values
		holding.img.src = getRPSImg(b).src;
		holding.footer.innerHTML = getRPSType(b);
		
		// set b img and footer text values
		getRPSImg(b).src = holding.src;
		getRPSFooter(b).innerHTML = holding.type;
	}
	
	
	// Utility functions
	
	var elStatus;
	function element(id) { return document.getElementById(id); }
	
	function statusMessage(s) {
		if (!elStatus) elStatus = element('statusMessage');
		if (!elStatus) return;
		return !!(s) ? elStatus.innerHTML = s : elStatus.innerHTML = '&nbsp;';
	}
	
	// App lifetime support
	
	function init() {
		if (dndSupported = detectDragAndDrop()) {
			statusMessage('Using HTML5 Drag and Drop');
			dndEls.push(element('rps1'), element('rps2'), element('rps3'));
			for (var i=0; i<dndEls.length; i++) {
				dndEls[i].addEventListener('dragstart', handleDragStart, false);
				dndEls[i].addEventListener('dragenter', handleDragEnter, false);
				dndEls[i].addEventListener('dragover', handleDragOver, false);
				dndEls[i].addEventListener('drop', handleDrop, false);
				dndEls[i].addEventListener('dragleave', handleDragLeave, false);
				dndEls[i].addEventListener('dragend', handleDragEnd, false);				
			}
		}
		else {
			statusMessage('This browser does not support Drag and Drop');
		}
	}
	
	window.onload = function() {
		init();
	}
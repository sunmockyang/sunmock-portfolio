function ContentController() {
	this.introTitle = document.getElementById('introTitle');
	this.introTitleRange = new ScrollRange();

	AddScrollHandler(this.introTitleRange, this.introTitleFader.bind(this));

	this.onresize();
};

ContentController.prototype.onresize = function() {
	this.introTitleRange.start = 0;
	this.introTitleRange.end = this.introTitle.getBoundingClientRect().top;
};

ContentController.prototype.introTitleFader = function(t, currentY) {
	this.introTitle.style.opacity = Mathx.clamp(1 - Math.pow(t, 2), 0, 1);
	this.introTitle.style.marginTop = Mathx.clamp(t, 0, 1) * -10 + "vh";
};


// Scroll range handler
function AddScrollHandler (range, cb) {
	function _cb(e){
		var currentY = window.pageYOffset;
		var t = (currentY - range.start) / (range.end - range.start);
		cb(t, currentY);
	}

	window.addEventListener("scroll", _cb);
};

function ScrollRange(start, end) {
	this.start = start;
	this.end = end;
}

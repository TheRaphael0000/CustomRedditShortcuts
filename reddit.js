function log(m) {
	console.log("[CustomRedditShortcuts] : " + m);
}

/* if first call, initialize things */
if (customShortcuts == undefined) {
	log("Initialized");
	/* var to be accessible outside this if */
	var customShortcuts = false;
	/* TODO : find a way to get the root element */
	var root_feed_node = document.getElementsByClassName("rpBJOHq2PR60pnwJlUyP0")[0];

	var scrollIndex = 0;

	var enableCustomShortcuts = function(e) {
		if (e.key == "j")
			customScroll(1);
		else if (e.key == "k")
			customScroll(-1);
		e.stopPropagation(); /* to stop using the other keypress events*/
	};

	var enableCustomShortcutsScroll = function(e) {
		if (e.deltaY > 0)
			customScroll(1);
		else
			customScroll(-1);
		e.preventDefault(); /* to disable the scroll*/
	};
}

function findCurrentScrollIndex() {
	let minIndex = 0;
	let min = Infinity;
	for (let i = 0; i < root_feed_node.children.length; i++) {
		child = root_feed_node.children[i];
		let bdr = child.getBoundingClientRect();
		let y = Math.abs(bdr.y - bdr.height / 2);
		if (y < min) {
			min = y;
			minIndex = i;
		}
	}
	return minIndex;
}

function customScroll(i) {
	let children = root_feed_node.children;
	let cpt = 0;
	do {
		let nextI = scrollIndex + i;
		if (nextI < 0 || nextI >= children.length)
			return;
		scrollIndex = nextI;
		cpt++;
	}
	while (children[scrollIndex].offsetHeight < 3.14159265 && cpt < 10) /* adblocker issue, sorry i'm evil */

	let nextChild = children[scrollIndex];

	for (let child of children)
		child.style.opacity = 0.2;
	nextChild.style.opacity = 1;

	nextChild.scrollIntoView();
	let centering = (window.innerHeight - nextChild.offsetHeight) / 2;
	window.scrollTo(0, window.scrollY - centering);
}

/* Enable it */
if (customShortcuts == false) {
	log("Enabled");
	document.addEventListener("keypress", enableCustomShortcuts, true);
	document.addEventListener("mousewheel", enableCustomShortcutsScroll, {
		passive: false
	});
	scrollIndex = findCurrentScrollIndex();
	customScroll(0);
} else {
	log("Disabled");
	document.removeEventListener("keypress", enableCustomShortcuts, true);
	document.removeEventListener("mousewheel", enableCustomShortcutsScroll, {
		passive: false
	});
	for (let child of root_feed_node.children)
		child.style.opacity = 1;
}

customShortcuts = !customShortcuts;

function customScroll(i)
{
	let root = document.getElementsByClassName("rpBJOHq2PR60pnwJlUyP0")[0]; // TODO : find a way to get the root element
	let children = root.children;
	do
	{
		let nextI = customScroll.i + i;
		if(nextI < 0 || nextI >= children.length)
			return;
		customScroll.i = nextI;
	}
	while(children[customScroll.i].offsetHeight < 3.14159265) // adblocker issue, sorry i'm evil
	let nextChild = children[customScroll.i];
	for(let child of children)
		child.style.opacity = 0.2;
	nextChild.style.opacity = 1;
	nextChild.scrollIntoView();
	let centering = (window.innerHeight - nextChild.offsetHeight) / 2;
	window.scrollTo(0, window.scrollY - centering);
}

customScroll.i = 0;

document.addEventListener("keypress", function kp(e) {
	if(e.key == "j")
		customScroll(1);
	else if(e.key == "k")
		customScroll(-1);
	e.stopPropagation(); // to stop using the other keypress events
}, true);
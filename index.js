// Function to load header, menu, and footer components
const loadComponent = async (id, url) => {
	const response = await fetch(url);
	const content = await response.text();
	document.getElementById(id).innerHTML = content;
};

// Parse route and remove leading slash if necessary
const parseRouteFromUrl = () => {
	const url = new URL(window.location.href);
	return url.pathname === "/" ? "home" : url.pathname.slice(1); // Remove leading slash
};

// Load content based on the route
const loadContent = async () => {
	const route = `/content/${parseRouteFromUrl()}/index`;
	// console.log("Loading route:", route);
	try {
		const resJson = await fetch(`${route}.json`);
		const resHtml = await fetch(`${route}.html`);
		const resJs = await fetch(`${route}.js`);

		if (!resHtml.ok || !resJson.ok) throw new Error("Resource not found");

		const content = await resHtml.text();
		const data = await resJson.json();
		// console.log(content, data);

		// update the page title and subtitle
		if (data) {
			document.title = data.header.title;
			document.description = data.header.subtitle;
			document.getElementById("title").innerText = data.header.title;
			document.getElementById("subtitle").innerText = data.header.subtitle;
		}
		// add content for this route to the page
		document.getElementById("content").innerHTML = content;

		// find the script for this page. If it exists, update the src attribute and replace the script in the DOM. If not, create a new script element and add to the DOM.
		let currScript = document.getElementById("routeScript");
		newScript = document.createElement("script");
		newScript.src = `${route}.js`;
		if (currScript) {
			currScript.parentNode.replaceChild(newScript, currScript);
		} else {
			newScript.id = "routeScript";
			newScript.type = "text/javascript";
			document.body.appendChild(newScript);
		}
	} catch (error) {
		console.error("Error loading content:", error);
	}
};

// Intercept link clicks and use the History API to navigate
const setupRouter = () => {
	document.body.addEventListener("click", (event) => {
		const target = event.target.closest("a"); // Find the nearest anchor element
		if (target && target.getAttribute("href").startsWith("/")) {
			event.preventDefault(); // Prevent the browser from navigating
			const path = target.getAttribute("href");
			history.pushState(null, "", path); // Change URL without reloading the page
			loadContent(); // Load content based on the new route
		}
	});

	// Handle back/forward browser navigation
	window.addEventListener("popstate", loadContent);
};

// Load initial components and content
loadComponent("header", "header.html");
loadComponent("menu", "menu.html");
setupRouter();
loadContent();

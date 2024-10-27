let inputContents = [];
const contentListElem = document.getElementById("content-list");

document.getElementById("textareaContent").addEventListener("input", (event) => {
	console.log(event.target.value);
	inputContents = event.target.value
		.split("\n")
		.map((question) => question.replace(/^\d+\.\s*/, "").trim())
		.filter((question) => question !== "");
	contentListElem.innerHTML = "";
	render();
});

const render = () => {
	inputContents.forEach((item) => {
		// const container = document.createElement("div");
		// container.classList.add("w-full", "md:w-1/2");
		const card = document.createElement("div");
		card.classList.add("bg-white", "border", "border-gray-200", "rounded-lg", "shadow", "p-8", "my-3", "mr-3");
		const cardTitle = document.createElement("h2");
		cardTitle.classList.add("text-lg", "font-semibold");
		cardTitle.innerText = item;
		card.appendChild(cardTitle);
		contentListElem.appendChild(card);
		// contentListElem.appendChild(container);
		// container.appendChild(card);
	});
};

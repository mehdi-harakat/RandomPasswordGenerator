const check = document.querySelectorAll('input[type="checkbox"]');
const mainBtn = document.querySelector(".gene-btn");
const rangeInp = document.querySelector("#inpRange");
const mainInput = document.querySelector("#mainInp");
const counter = document.querySelector(".counter");
const sudoElem = document.querySelector(".sudo-elem");
const copyElm = document.querySelector(".form-container .inp .icons span")

counter.innerHTML = rangeInp.value;
beforElementFunction();

let objLists = {
	lower: "abcdefghijklmnopqrstuvwxyz",
	upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	numbers: "0123456789",
	symbols: "!-$@+?",
	space: [
		"  ",
		"  ",
		"  ",
		"  ",
		"  ",
		"  ",
		"  ",
	],
};

// THE BUTTON FUNCTION
mainBtn.onclick = createList;
// THE CHECKBOX FUNCTION
check.forEach((e) => {
	e.addEventListener("click", createList);
});
// THE RANGE INPUT FUNCTION
let mouseIsDown = false;
rangeInp.addEventListener("mousedown", function () {
	mouseIsDown = true;
});

rangeInp.addEventListener("mouseup", function () {
	mouseIsDown = false;
  createList();
});

rangeInp.addEventListener("mousemove", function () {
	if (mouseIsDown) {
		createList();
	}
});

// THE MAIN FUNCTION FOR CREATE THE LIST INPUT
function createList() {
	let test = [];
	let hello = "";

	check.forEach((e) => {
		if (e.checked) {
			if (e.dataset.count === "low") {
				test.push(...objLists.lower);
			} else if (e.dataset.count === "uppe") {
				test.push(...objLists.upper);
			} else if (e.dataset.count === "num") {
				test.push(...objLists.numbers);
			} else if (e.dataset.count === "sym") {
				test.push(...objLists.symbols);
			} else if (e.dataset.count === "spa") {
				test.push(...objLists.space);
			}
		}
	});


  hello = randomFunc(test, hello);

	if (test.length !== 0) {
		mainInput.value = hello;
	} else {
		mainInput.value = "";
	}

	counter.innerHTML = rangeInp.value;
	beforElementFunction();
}



function randomFunc(gg, hello) {
	let randomnum = [];
	for (let i = 0; i < parseInt(rangeInp.value); i++) {
    let fil = Math.floor(Math.random() * gg.length);
    randomnum.push(fil)
    hello += gg[parseInt(randomnum[i])];
	}
  return hello
}



function beforElementFunction() {
	if (parseInt(rangeInp.value) < 10) {
		sudoElem.style.backgroundColor = "#E74C3C";
	} else if (parseInt(rangeInp.value) >= 10 && parseInt(rangeInp.value) < 20) {
		sudoElem.style.backgroundColor = "#F1C40F";
	} else if (parseInt(rangeInp.value) > 20) {
		sudoElem.style.backgroundColor = "#4285f4";
	}

	sudoElem.style.width = `${(parseInt(rangeInp.value) * 100) / 30}%`;
}


copyElm.addEventListener('mousemove' , () => {
  if (mainInput.value === "") {
		copyElm.style.cursor = "no-drop";
	} else {
		copyElm.style.cursor = "pointer";
  }
})

copyElm.addEventListener("click", () => {
  if (mainInput.value !== "") {
		navigator.clipboard.writeText(mainInput.value);
		copyElm.classList.remove("active");
		copyElm.nextElementSibling.classList.add("active");
		setTimeout(() => {
			copyElm.classList.add("active");
			copyElm.nextElementSibling.classList.remove("active");
		}, 500);
	} 
});


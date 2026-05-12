const container = document.getElementById("rätsel-container");
const zoomContainer = document.getElementById("zoom-container");

let size = 10;
let halfsize = 10;
let realsize = 10;
if (mobileCheck()) {
	size = 14;
	halfsize = 7;
}

const grid = [];
let zoomGrid = [];

/* GRID ERSTELLEN */

function drawGrid() {
	for (let r = 0; r < size; r++) {
		grid[r] = [];

		for (let c = 0; c < halfsize; c++) {
			const div = document.createElement("div");
			div.className = "box";
			div.dataset.row = r;
			div.dataset.col = c;

			container.appendChild(div);
			grid[r][c] = { el: div };

			for (let ir = 0; ir < realsize; ir++) {
				grid[r][c][ir] = [];

				for (let ic = 0; ic < realsize; ic++) {
					const insidediv = document.createElement("div");

					insidediv.className = "inside-box";
					insidediv.dataset.row = ir;
					insidediv.dataset.col = ic;

					div.appendChild(insidediv);
					grid[r][c][ir][ic] = { el: insidediv };
				}
			}

			randomInnerFields(r, c);
		}
	}
}

function randomInnerFields(r, c) {
	let factor = 0;
	let alternate = 1;
	if (!mobileCheck()) {
		factor = 13;
	} else {
		factor = 17;
		alternate = 2;
	}
	for (let j = 0; j <= 5; j++) {
		for (let k = 0; k <= 5; k++) {
			let randomNum = Math.floor(Math.random() * factor);

			if (c % alternate !== 0) {
				if (randomNum < r + 1) {
					grid[r][c][k][j].el.classList.add("black");
					let mirrorJ = 9 - j;
					let mirrorK = 9 - k;
					grid[r][c][mirrorJ][mirrorK].el.classList.add("black");
					grid[r][c][k][mirrorJ].el.classList.add("black");
					grid[r][c][mirrorJ][k].el.classList.add("black");
				}
			} else {
				if (randomNum >= r + 3) {
					grid[r][c][k][j].el.classList.add("black");
					let mirrorJ = 9 - j;
					let mirrorK = 9 - k;
					grid[r][c][mirrorJ][mirrorK].el.classList.add("black");
					grid[r][c][k][mirrorJ].el.classList.add("black");
					grid[r][c][mirrorJ][k].el.classList.add("black");
				}
			}
		}
	}
}

drawGrid();

function redraw(e) {
	let r = Number(e.target.dataset.row);
	let c = Number(e.target.dataset.col);

	clearInnerBox(r, c);
	randomInnerFields(r, c);
}

function clearInnerBox(r, c) {
	for (let ir = 0; ir < realsize; ir++) {
		for (let ic = 0; ic < realsize; ic++) {
			const cell = grid[r][c][ir][ic].el;

			cell.classList.remove("black");
		}
	}
}

const body = document.querySelector("body");

container.addEventListener("click", (e) => {
	if (!e.target.dataset.row) return;
	if (!mobileCheck()) {
		redraw(e);
	} else {
		zoomGrid = [];
		zoomContainer.innerHTML = "";

		zoomContainer.classList.remove("hidden");
		body.classList.add("dark");

		for (let r = 0; r < realsize; r++) {
			zoomGrid[r] = [];
			for (let c = 0; c < realsize; c++) {
				const row = e.target.dataset.row;
				const col = e.target.dataset.col;
				const div = document.createElement("div");
				div.className = "zoom-box";

				if (grid[row][col][r][c].el.classList.contains("black")) {
					div.classList.add("black");
				}
				zoomContainer.appendChild(div);
				zoomGrid[r][c] = { el: div };
			}
		}
	}
});

zoomContainer.addEventListener("click", () => {
	zoomContainer.classList.add("hidden");
	body.classList.remove("dark");
	zoomGrid = [];
	zoomContainer.innerHTML = "";
});

function mobileCheck() {
	let check = false;
	(function (a) {
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
				a,
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4),
			)
		)
			check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
}

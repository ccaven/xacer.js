/**
 * The Input class represents all forms of user input
 */
export default class Input {

	static HORIZONTAL = 0;
	static VERTICAL = 1;
	static MOUSEX = 2;
	static MOUSEY = 3;

	static mouseX = 0;
	static mouseY = 0;

	static movementX = 0;
	static movementY = 0;

	static mousePressed = 0;

	static keys = {};

	static initialize () {

		let self = this;

		document.onmousemove = e => {
			self.mouseX = e.x;
			self.mouseX = e.y;

			self.movementX = e.movementX;
			self.movementY = e.movementY;
		};

		document.onmousedown = e => {
			self.mousePressed = 1;
		};

		document.onmouseup = e => {
			self.mousePressed = 0;
		};
	}

	static update () {

		this.movementX = 0;
		this.movementY = 0;

	}

	static getAxis (axis) {
		switch (axis) {
			case this.MOUSEX:
				return this.movementX;
			case this.MOUSEY:
				return this.movementY;
			case this.HORIZONTAL:
				return this.keys.d - this.keys.a;
			case this.VERTICAL:
				return this.keys.w - this.keys.s;
		}
	}

}
import GameObject from "../gameobject.js";

export default class Component {
	/**
	 * Create a new Component instance
	 * @param {GameObject} gameObject - The parent of the component
	 */
	constructor (gameObject) {
		this.gameObject = gameObject;
	}

	/**
	 * The start method is called the very first frame
	 */
	start () {
		console.log("Start method call");
	}

	/**
	 * The update method is called every frame
	 */
	update () {
		console.log("Update method call");
	}
}
import GameObject from "../gameobject.js";

export default class Component {
	/**
	 * Create a new Component instance
	 * @param {GameObject} gameObject - The parent of the component
	 */
	constructor (gameObject) {
		this.gameObject = gameObject;
		this.transform = gameObject.transform;
		this.init();
	}

	init () {
		this.name = "New Component";
	}
}
import GameObject from "./gameobject.js";

/**
 * The Scene class represents all the gameObjects in a single scene
 */
export default class Scene {
	/**
	 * Create a new Scene instance
	 * @param {String} name - The name of the scene
	 */
	constructor(name="New Scene") {

		this.name = name;

		/**
		 * Stores the list of gameObjects
		 * @type {GameObject[]}
		 */
		this.gameObjects = [];
	}

	/**
	 * Create a new GameObject
	 * @param {typeof GameObject} Prefab
	 */
	createGameObject (Prefab) {
		this.gameObjects.push(new Prefab(this));
	}

	/**
	 * Start each gameObject
	 */
	start () {
		this.gameObjects.forEach(e => e.startComponents());
	}

	/**
	 * Update each gameObject in the scene
	 */
	update () {
		this.gameObjects.forEach(e => e.updateComponents());
	}
}


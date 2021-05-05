import Engine from "../engine.js";
import GameObject from "./gameobject.js";

/**
 * The Scene class represents all the gameObjects in a single scene
 */
export default class Scene {
	/**
	 * Create a new Scene instance
	 * @param {Engine} engine - The parent engine object
	 */
	constructor(engine) {
		/**
		 * Stores the list of gameObjects
		 * @type {GameObject[]}
		 */
		this.gameObjects = [];

		this.name = "New Scene";

		this.hasStarted = false;

		this.engine = engine;

		this.init();
	}

	init () {
		console.log("New Scene created!");
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
		if (!this.hasStarted) this.gameObjects.forEach(e => e.startComponents());
	}

	/**
	 * Update each gameObject in the scene
	 */
	update () {
		this.gameObjects.forEach(e => e.updateComponents());
	}
}


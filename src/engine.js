import Scene from "./engine/scene";
import Renderer from "./gl/renderer";
import RenderPipeline from "./gl/renderpipeline";

/**
 * The Engine represents the whole darn thing
 */
export default class Engine {

	/**
	 * Create a new Engine object
	 */
	constructor() {

		/**
		 * @type {Scene[]}
		 * The list of scenes
		 */
		this.scenes = [];
		this.sceneIndexReference = {};
		this.currentScene = 0;

		/**
		 * Represents the rendering pipeline of the engine
		 */
		this.rp = new RenderPipeline();

	}

	/**
	 * Add a scene
	 * @param {typeof Scene} ScenePrefab - class extending Scene
	 */
	addScene (ScenePrefab) {
		const newScene = new ScenePrefab(this);
		this.sceneIndexReference[newScene.name] = this.scenes.length;
		this.scenes.push(newScene);
	}

	/**
	 * Set the engine to run a specific scene
	 * @param {Number} index - Which scene to set to
	 */
	setScene (index) {
		this.currentScene = index;
		this.scenes[this.currentScene].start();
	}

	/**
	 * Set the engine to run a scene that has a name
	 * @param {String} name - The name of the scene to run
	 */
	setSceneByName (name) {
		if (this.sceneIndexReference.hasOwnProperty(name))
			this.setScene(this.sceneIndexReference[name]);
	}

	/**
	 * Update the engine
	 */
	update () {
		this.scenes[this.currentScene].update();
	}

}
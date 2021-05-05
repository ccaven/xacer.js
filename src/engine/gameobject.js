
import Vector3 from "../math/vector3.js";

import Quat from "../math/quat.js";

import Matrix4 from "../math/mat4.js";

import Transform from "./transform.js";

import Component from "./components/component.js";

import Scene from "./scene.js";

/**
 * The GameObject class represents any object in the game.
 * You're welcome.
 */
export default class GameObject {

	/**
	 * Create a new GameObject instance
	 * @param {Scene} scene - The parent scene object
	 */
	constructor (scene) {

		this.scene = scene;

		this.transform = new Transform(null, this);

		/**
		 * The list of every component attached to the gameobject
		 * @type {Component[]}
		 */
		this.components = {};

		this.init();
	}

	/**
	 * Initialize the components of the gameObject
	 */
	init () {
		return null;
	}

	/**
	 * Add a component to the GameObject
	 * @param {typeof Component} ComponentConstructor
	 */
	addComponent (ComponentConstructor) {
		let name = ComponentConstructor.name;
		this.components[name] = new ComponentConstructor(this);
	}

	/**
	 * Get the component of a GameObject
	 * @param {String} name - The name of the component
	 * @returns {Component} the component
	 */
	getComponent (name) {
		return this.components[name];
	}

	/**
	 * Run the start method of every component
	 */
	startComponents () {
		for (let component in this.components) {
			this.components[component].start();
		}
	}

	/**
	 * Run the update method of every component
	 */
	updateComponents () {
		for (let component in this.components) {
			this.components[component].update();
		}
	}

}
import Component from "./component.js";

export default class Behavior extends Component {

	init () {
		this.name = "New Behavior";
		this.enabled = true;
	}

	/**
	 * The Awake function is called when the script is loaded
	 */
	awake () {
		return;
	}

	/**
	 * The Start function is called the first frame the GameObject is active.
	 */
	start () {
		return;
	}

	/**
	 * The Update function is called every frame the GameObject is updated
	 */
	update () {
		return;
	}

}
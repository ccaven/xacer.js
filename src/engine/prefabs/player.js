import Collider from "../components/collider.js";
import GameObject from "../gameobject.js";

export default class Player extends GameObject {
	constructor() {
		super();

		this.addComponent(new Collider(this));
	}
}
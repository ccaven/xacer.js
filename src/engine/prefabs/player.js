import Collider from "../components/collider.js";
import PlayerController from "../components/playercontroller.js";
import GameObject from "../gameobject.js";

export default class Player extends GameObject {
	constructor() {
		super();

		this.addComponent(Collider);
		this.addComponent(PlayerController);
	}
}
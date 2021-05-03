import Collider from "../components/collider.js";
import PlayerController from "../components/playercontroller.js";
import GameObject from "../gameobject.js";

/**
 * The Player class represents the player.
 */
export default class Player extends GameObject {
	init () {
		console.log("Initializing player!");

		this.addComponent(PlayerController);
	}
}
import Player from "../prefabs/player.js";
import Scene from "../scene.js";

/**
 * The GameScene represents where the actual game will take place
 */
export default class GameScene extends Scene {
	init () {
		this.createGameObject(Player);
	}
}
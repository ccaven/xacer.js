import Mesh from "../../gl/mesh.js";
import Component from "./component.js";

export default class MeshComponent extends Component {

	start () {

		// Generate mesh
		let engine = this.gameObject.scene.engine;

		this.rp = engine.rp;

	}

	update () {

		// Display mesh

	}

}

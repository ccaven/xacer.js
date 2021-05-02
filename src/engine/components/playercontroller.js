import Input from "../input";
import Component from "./component";

export default class PlayerController extends Component {
	start () {
		this.collider = this.gameObject.getComponent("Collider");

		this.transform = this.gameObject.transform;

		this.rigidbody = this.gameObject.getComponent("Rigidbody");
	}

	update () {

		if (Input.getAxis(Input.HORIZONTAL)) {
			this.rigidbody.applyForce(this.transform.getForward());
		}

	}
}
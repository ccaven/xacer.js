import Input from "../input.js";


import Component from "./component.js";

export default class MyComponent extends Component {
	start () {
		this.rigidbody = this.gameObject.getComponent("Rigidbody");
	}

	update () {

	}
}



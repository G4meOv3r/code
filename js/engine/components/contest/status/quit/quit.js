class ContestStatusQuitComponent extends Component {
	constructor(objParent, root, updateDelay) {
		super(objParent, root, updateDelay);
		//CSS
		this.elCSS = $("head").append("<link id='contestStatusQuit' href='/js/engine/components/contest/status/quit/quit.css' rel='stylesheet'>").find("#contestStatusQuit");

		//JS Handlers

		//HTML Preload
		this.preload();

	}

	preload() {
		this.elHTML = this.elRoot.append("<input class='contestStatusQuit' type='button' value='Выход'>").find(".contestStatusQuit");

		//Other Components

		this.ready(true);
	}
}
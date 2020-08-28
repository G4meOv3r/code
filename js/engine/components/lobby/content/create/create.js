class LobbyContentCreateComponent extends Component {
	constructor(objParent, root, updateDelay) {
		super(objParent, root, updateDelay);

		//CSS
		this.elCSS = $("head").append("<link id='lobbyContentCreate' href='/js/engine/components/lobby/content/create/create.css' rel='stylesheet'>").find("#lobbyContentCreate");

		//JS Handlers

		//HTML Preload
		this.preload();
	}

	preload() {
		let html = "<div class='lobbyCreate'> </div>"
		this.elHTML = this.elRoot.append(html).find(".lobbyCreate");

		this.ready(true);
    }
}
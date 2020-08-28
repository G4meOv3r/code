class ContestTeamComponent extends Component {
	constructor(objParent, root, updateDelay) {
		super(objParent, root, updateDelay);
		//CSS
		this.elCSS = $("head").append("<link id='contestTeam' href='/js/engine/components/contest/team/team.css' rel='stylesheet'>").find("#contestTeam");

		//JS Handlers

		//HTML Preload
		this.preload();

	}

	preload() {
		this.elHTML = this.elRoot.append("<div class='contestTeam' style='opacity: 0'> </div>").find(".contestTeam");

		//Other Components
		//...
		this.ready(true);
	}
}
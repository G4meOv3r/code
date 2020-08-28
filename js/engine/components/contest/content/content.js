class ContestContentComponent extends Component {
	constructor(objParent, root, updateDelay) {
		super(objParent, root, updateDelay);
		//CSS
		this.elCSS = $("head").append("<link id='contestContent' href='/js/engine/components/contest/content/content.css' rel='stylesheet'>").find("#contestContent");

		//JS Handlers

		//HTML Preload
		this.preload();

	}

	preload() {
		this.elHTML = this.elRoot.append("<div class='contestContent' style='opacity: 0'> </div>").find(".contestContent");

		//Other Components
		this.objComponents.ContestContentTaskComponent = new ContestContentTaskComponent(this, this.elHTML, 100);

		this.ready(true);
	}
}
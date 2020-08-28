class ContestStatusTimerComponent extends Component {
	constructor(objParent, root, updateDelay) {
		super(objParent, root, updateDelay);
		//CSS
		this.elCSS = $("head").append("<link id='contestStatusTimer' href='/js/engine/components/contest/status/timer/timer.css' rel='stylesheet'>").find("#contestStatusTimer");

		//JS Handlers

		//HTML Preload
		this.preload();

	}

	preload() {
		this.elHTML = this.elRoot.prepend("<div class='contestStatusTimer' style='opacity: 0'> <p> </p> </div>").find(".contestStatusTimer");

		window.engine.newAJAX("/php/API.php", { "component": "contestStatusTimer", "type": 0, "data": {} },
			function (json) {
				let component = window.engine.objPage.findComponent("ContestStatusTimerComponent");
				switch (json.exit) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						component.elHTML.find("p").html(window.engine.parseToTime(json.data.timer));
						component.ready(true);
						break;
				}
			});
	}

	update() {
		window.engine.newAJAX("/php/API.php", { "component": "contestStatusTimer", "type": 0, "data": {} },
			function (json) {
				let component = window.engine.objPage.findComponent("ContestStatusTimerComponent");
				switch (json.exit) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						component.elHTML.find("p").html(window.engine.parseToTime(json.data.timer));
						break;
				}
			});
    }
}
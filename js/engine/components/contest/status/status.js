class ContestStatusComponent extends Component {
	constructor(objParent, root, updateDelay) {
		super(objParent, root, updateDelay);
		//CSS
		this.elCSS = $("head").append("<link id='contestStatus' href='/js/engine/components/contest/status/status.css' rel='stylesheet'>").find("#contestStatus");

		//JS Handlers

		//HTML Preload
		this.preload();

	}

	preload() {
		this.elHTML = this.elRoot.append("<div class='contestStatus' style='opacity: 0'> <p> В процессе </p> </div>").find(".contestStatus");

		window.engine.newAJAX("/php/API.php", { "component": "contestStatus", "type": 0, "data": {} },
			function (json) {
				let component = window.engine.objPage.findComponent("ContestStatusComponent");
				switch (json.exit) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						switch (json.data.type) {
							case 0:
								$(".contestStatus > p").html("Подготовка");
								break;
							case 1:
								$(".contestStatus > p").html("В процессе");
								break;
							case 2:
								$(".contestStatus > p").html("Завершено");
								break;
                        }

						//Other Components
						component.objComponents.ContestStatusTimerComponent = new ContestStatusTimerComponent(component, component.elHTML, 100);
						component.objComponents.ContestStatusQuitComponent = new ContestStatusQuitComponent(component, component.elHTML, 100);
						component.ready(true);
						break;
				}
			});
	}

	update() {
		window.engine.newAJAX("/php/API.php", { "component": "contestStatus", "type": 0, "data": {} },
			function (json) {
				let component = window.engine.objPage.findComponent("ContestStatusComponent");
				switch (json.exit) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						switch (json.data.type) {
							case 0:
								$(".contestStatus > p").html("Подготовка");
								break;
							case 1:
								$(".contestStatus > p").html("В процессе");
								break;
							case 2:
								$(".contestStatus > p").html("Завершен");
								break;
						}

						component.ready(true);
						break;
				}
			});
    }
}
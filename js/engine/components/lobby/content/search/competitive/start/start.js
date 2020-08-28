class LobbyContentSearchCompetitiveStartComponent extends Component {
	constructor(objParent, elRoot, numUpdateDalay) {
		super(objParent, elRoot, numUpdateDalay);
		this._bDisabled = false;

		//CSS
		this.elCSS = $("head").append("<link id='lobbyContentSearchCompetitiveStart' href='/js/engine/components/lobby/content/search/competitive/start/start.css' rel='stylesheet'>").find("#lobbyContentSearchCompetitiveStart");

		//JS Handlers
		this.objHandlers["startClick"] = {
			strEvent: "click",
			strSelector: ".lobbyContentSearchCompetitiveStart",
			objData: {},
			funcHandler: function () {
				window.engine.newAJAX("/php/API.php", { "component": "lobbyContentSearchCompetitiveStart", "type": 1, "data": {} },
					function (json) {
						switch (json.exit) {
							case -1:
								window.engine.autherizationError();
								break;
							case 0:

								break;
						}
					}
				);
			}
		};;

		//HTML Preload
		this.preload();
	}

	get disabled() {
		return this._bDisabled;
	}
	set disabled(bDisabled) {
		if (this._bDisabled != bDisabled) {
			this._bDisabled = bDisabled;
			this.handlers(!bDisabled);
			this.elHTML.prop("disabled", this._bDisabled);
		}
		return this._bDisabled;
    }

	preload() {
		let html = "<input class='lobbyContentSearchCompetitiveStart' type='button' value='НАЧАТЬ' name='start' style='opacity: 0'>";
		this.elHTML = this.elRoot.append(html).find(".lobbyContentSearchCompetitiveStart");

		window.engine.newAJAX("/php/API.php", { "component": "lobbyContentSearchCompetitiveStart", "type": 0, "data": {} },
			function (json) {
				let component = window.engine.objPage.findComponent("LobbyContentSearchCompetitiveStartComponent");
				switch (json.exit) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						component.ready(true);
						break;
				}
			});
	}

	update(component) {
		window.engine.newAJAX("/php/API.php", { "component": "lobbyContentSearchCompetitiveStart", "type": 0, "data": {} },
			function (json) {
				let component = window.engine.objPage.findComponent("LobbyContentSearchCompetitiveStartComponent");
				switch (json.exit) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						component.active(json.data.permission);
						if (json.data.status == 0) {
							component.disabled = json.data.disabled;
                        }
						break;
				}
			});
	}
}
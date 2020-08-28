class LobbyContentSearchCompetitiveInfoComponent extends Component {
	constructor(objParent, elRoot, numUpdateDalay) {
		super(objParent, elRoot, numUpdateDalay);
		this._numTimer = 0;
		this._numSearchers = 0;
		this._numDuration = 0;

		//CSS
		this.elCSS = $("head").append("<link id='lobbyContentSearchCompetitiveInfo' href='/js/engine/components/lobby/content/search/competitive/info/info.css' rel='stylesheet'>").find("#lobbyContentSearchCompetitiveInfo");

		//JS Handlers
		this.objHandlers["cancelClick"] = {
			strEvent: "click",
			strSelector: ".lobbyContentSearchCompetitiveInfoCancel",
			objData: {},
			funcHandler: function () {
				window.engine.newAJAX("/php/API.php", { "component": "lobbyContentSearchCompetitiveInfo", "type": 1, "data": {} },
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
		};

		//HTML Preload
		this.preload();
	}

	get timer() {
		return window.engine.parseToTime(this._numTimer);
	}
	set timer(numTimer) {
		if (this._numTimer != numTimer) {
			this._numTimer = numTimer;
			this.elHTML.find(".lobbyContentSearchCompetitiveInfoTimer p").html(window.engine.parseToTime(this._numTimer));
		}
		return this._numTimer;
	}

	get searchers() {
		return window.engine.parseToTime(this._numSearchers);
	}
	set searchers(numSearchers) {
		if (this._numSearchers != numSearchers) {
			this._numSearchers = numSearchers;
			$(this.elHTML.find(".lobbyContentSearchCompetitiveInfoInfo p i")[0]).html(this._numSearchers);
		}
		return this._numSearchers;
    }

	get duration() {
		return window.engine.parseToTime(this._numDuration);
	}
	set duration(numDuration) {
		if (this._numDuration != numDuration) {
			this._numDuration = numDuration;
			$(this.elHTML.find(".lobbyContentSearchCompetitiveInfoInfo p i")[1]).html(window.engine.parseToTime(this._numDuration));
		}
		return this._numDuration;
	}

	preload() {
		let html = "<div class='lobbyContentSearchCompetitiveInfo' style='opacity: 0'> <div class='lobbyContentSearchCompetitiveInfoTimer'> <p> 00:00 </p> </div> <div class='lobbyContentSearchCompetitiveInfoInfo'> <p> В поиске: <i> - </i> </p> <p> Среднее время ожидания: <i> --:-- </i> </p> </div> <div class='lobbyContentSearchCompetitiveInfoCancel'> <input type='button' value='ОТМЕНА' name='cancel'> </div> </div>";
		this.elHTML = this.elRoot.append(html).find(".lobbyContentSearchCompetitiveInfo");

		window.engine.newAJAX("/php/API.php", { "component": "lobbyContentSearchCompetitive", "type": 0, "data": {} },
			function (json) {
				let component = window.engine.objPage.findComponent("LobbyContentSearchCompetitiveInfoComponent");
				switch (json.exit) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						component.active(json.data.permission);
						if (json.data.status != 0) {
							component.timer = json.data.timer;
							component.searchers = json.data.searchers;
							component.duration = json.data.duration;
						}

						component.ready(true);
						break;
				}
			});
	}

	update(component) {
		window.engine.newAJAX("/php/API.php", { "component": "lobbyContentSearchCompetitiveInfo", "type": 0, "data": {} },
			function (json) {
				let component = window.engine.objPage.findComponent("LobbyContentSearchCompetitiveInfoComponent");
				switch (json.exit) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						component.active(json.data.permission);
						if (json.data.status != 0) {
							component.timer = json.data.timer;
							component.searchers = json.data.searchers;
							component.duration = json.data.duration;
                        }
						break;
				}
			});
    }
}
class LobbyContentSearchCompetitiveComponent extends Component {
	constructor(objParent, elRoot, numUpdateDalay) {
		super(objParent, elRoot, numUpdateDalay);
		this._bSearch = false;
		this._bFound = false;
		this._bConfirmed = false;
		this._bPermission = true;
		this._numStatus = 0;

        //CSS
        this.elCSS = $("head").append("<link id='lobbyContentSearchCompetitive' href='/js/engine/components/lobby/content/search/competitive/competitive.css' rel='stylesheet'>").find("#lobbyContentSearchCompetitive");

        //JS Handlers

        //HTML Preload
        this.preload();
	}

	get search() {
		return this._bSearch;
	}
	set search(bSearch) {
		if (this._bSearch != bSearch) {
			this._bSearch = bSearch;
			if (this._bSearch) {
				this.objComponents.LobbyContentSearchCompetitiveInfoComponent = this.replaceComponent("LobbyContentSearchCompetitiveStartComponent", LobbyContentSearchCompetitiveInfoComponent);
			} else {
				this.objComponents.LobbyContentSearchCompetitiveStartComponent = this.replaceComponent("LobbyContentSearchCompetitiveInfoComponent", LobbyContentSearchCompetitiveStartComponent);
            }
		}
		return this._bSearch;
    }

	get found() {
		return this._bFound;
	}
	set found(bFound) {
		if (this._bFound != bFound) {
			this._bFound = bFound;
			if (this._bFound) {
				for (let i = 1; i <= 5; i++) {
					this.removeComponent("LobbyContentSearchCompetitiveCardComponent" + i);
				}
				this.objComponents.LobbyContentSearchCompetitiveFoundComponent = new LobbyContentSearchCompetitiveFoundComponent(this, $(".lobbyContentSearchCompetitiveCards"), 500);
			} else {
				this.removeComponent("LobbyContentSearchCompetitiveFoundComponent");
				this.objComponents.LobbyContentSearchCompetitiveCardComponent1 = new LobbyContentSearchCompetitiveCardComponent(this, $(".lobbyContentSearchCompetitiveCards"), 500, { numComponentNumber: 1, strComponentStyle: "flex: 0 0 888px; margin: 0 5px 10px 5px" });
				for (let i = 2; i <= 5; i++) {
					this.objComponents["LobbyContentSearchCompetitiveCardComponent" + i] = new LobbyContentSearchCompetitiveCardComponent(this, $(".lobbyContentSearchCompetitiveCards"), 500, { numComponentNumber: i, strComponentStyle: "" });
				}
            }
		}
		return this._bFound;
    }

	get status() {
		return this._numStatus;
	}
	set status(numStatus) {
		if (this._numStatus != numStatus) {
			this._numStatus = numStatus;
			switch (this._numStatus) {
				case 0:
					this.search = false;
					this.found = false;
					break;
				case 1:
					this.search = true;
					this.found = false;
					break;
				case 2:
					this.search = true;
					this.found = true;
					break;
            }
		}
		return this._numStatus;
    }

	preload() {
		let html = "<div class='lobbyContentSearchCompetitive' style='opacity: 0'> <div class='lobbyContentSearchCompetitiveCards'> </div> </div>";
        this.elHTML = this.elRoot.append(html).find(".lobbyContentSearchCompetitive");

		//Other Components
		this.objComponents.LobbyContentSearchCompetitiveCardComponent1 = new LobbyContentSearchCompetitiveCardComponent(this, $(".lobbyContentSearchCompetitiveCards"), 500, { numComponentNumber: 1, strComponentStyle: "flex: 0 0 888px; margin: 0 5px 10px 5px" });
		for (let i = 2; i <= 5; i++) {
			this.objComponents["LobbyContentSearchCompetitiveCardComponent" + i] = new LobbyContentSearchCompetitiveCardComponent(this, $(".lobbyContentSearchCompetitiveCards"), 500, { numComponentNumber: i, strComponentStyle: "" });
		}
		this.objComponents.LobbyContentSearchCompetitiveStartComponent = new LobbyContentSearchCompetitiveStartComponent(this, $(".lobbyContentSearchCompetitive"), 500);

		window.engine.newAJAX("/php/API.php", { "component": "lobbyContentSearchCompetitive", "type": 0, "data": {} },
			function (json) {
				let component = window.engine.objPage.objComponents["LobbyContentComponent"].objComponents["LobbyContentSearchComponent"].objComponents["LobbyContentSearchCompetitiveComponent"];
				switch (json.exit) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						component.status = json.data.status;

						component.ready(true);
						break;
				}
			});

    }

	update(component) {
		window.engine.newAJAX("/php/API.php", { "component": "lobbyContentSearchCompetitive", "type": 0, "data": {} },
			function (json) {
				let component = window.engine.objPage.objComponents.LobbyContentComponent.objComponents.LobbyContentSearchComponent.objComponents.LobbyContentSearchCompetitiveComponent;
				switch (json.exit) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						component.status = json.data.status;

						break;
				}
			});
    }
}
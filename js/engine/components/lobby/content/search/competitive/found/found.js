class LobbyContentSearchCompetitiveFoundComponent extends Component {
    constructor(objParent, elRoot, numUpdateDalay) {
        super(objParent, elRoot, numUpdateDalay);
        this._bConfirmed;
        this._numRemaining = 0;

        //CSS
        this.elCSS = $("head").append("<link id='lobbyContentSearchCompetitiveFound' href='/js/engine/components/lobby/content/search/competitive/found/found.css' rel='stylesheet'>")
            .find("#lobbyContentSearchCompetitiveFound");

        //JS Handlers

        //HTML Preload
        this.preload();
    }

    get confirmed() {
        this._bConfirmed;
    }
    set confirmed(bConfirmed) {
        if (this._bConfirmed != bConfirmed) {
            this._bConfirmed = bConfirmed;
            if (this._bConfirmed) {
                if (this.objComponents.LobbyContentSearchCompetitiveFoundConfirmComponent) {
                    this.objComponents.LobbyContentSearchCompetitiveFoundInfoComponent = this.replaceComponent("LobbyContentSearchCompetitiveFoundConfirmComponent", LobbyContentSearchCompetitiveFoundInfoComponent, { numMembersCount: 2 });
                }
            } else {
                if (this.objComponents.LobbyContentSearchCompetitiveFoundInfoComponent) {
                    this.objComponents.LobbyContentSearchCompetitiveFoundConfirmComponent = this.replaceComponent("LobbyContentSearchCompetitiveFoundInfoComponent", LobbyContentSearchCompetitiveFoundConfirmComponent);
                }
            }
        }
        return this.confirmed;
    }

    get remaining() {
        return this._numRemaining;
    }
    set remaining(numRemaining) {
        if (this._numRemaining != numRemaining && numRemaining >= 0) {
            this._numRemaining = numRemaining;
            this.elHTML.find("h3").html(window.engine.parseToTime(this._numRemaining));
        }
        return this.remaining;
    }

    preload() {
        let html = "<div class='lobbyContentSearchCompetitiveFound' style='opacity: 0'> <h1> КОНТЕСТ НАЙДЕН! </h1> <h2> Нажмине ПРИНЯТЬ, чтобы продолжить </h2> <div class='lobbyContentSearchCompetitiveFoundInner'> </div> <h3>00:00</h3> <h4> <i> Внимание! </i> Если вы <u>не примите</u> этот матч, то будете временно заблокированны в системе поиска. </h4> <h4> <i> Внимание! </i> Если вы <u>примите</u> этот матч, но выйдете до его завершения, то будете временно заблокированны в системе поиска. </h4> </div>";
        this.elHTML = this.elRoot.append(html).find(".lobbyContentSearchCompetitiveFound");

        window.engine.newAJAX("/php/API.php", { "component": "lobbyContentSearchCompetitiveFound", "type": 0, "data": {} },
            function (json) {
                let component = window.engine.objPage.objComponents.LobbyContentComponent.objComponents.LobbyContentSearchComponent.objComponents.LobbyContentSearchCompetitiveComponent.objComponents.LobbyContentSearchCompetitiveFoundComponent;
                switch (json.exit) {
                    case -1:
                        window.engine.autherizationError();
                        break;
                    case 0:
                        if (json.data.selfStatus == 0) {
                            component.objComponents.LobbyContentSearchCompetitiveFoundConfirmComponent = new LobbyContentSearchCompetitiveFoundConfirmComponent(component, $(".lobbyContentSearchCompetitiveFoundInner"), 500);
                            component._bConfirmed = false;
                        } else {
                            component.objComponents.LobbyContentSearchCompetitiveFoundInfoComponent = new LobbyContentSearchCompetitiveFoundInfoComponent(component, $(".lobbyContentSearchCompetitiveFoundInner"), 500);
                            component._bConfirmed = true;
                        }
                        component.remaining = json.data.remaining;
                        component.ready(true);
                        if (json.data.contestStatus) {
                            window.engine.newRequest("/contest");
                        }
                        break;
                }
            });

    }

    update(component) {
        window.engine.newAJAX("/php/API.php", { "component": "lobbyContentSearchCompetitiveFound", "type": 0, "data": {} },
			function (json) {
                let component = window.engine.objPage.objComponents.LobbyContentComponent.objComponents.LobbyContentSearchComponent.objComponents.LobbyContentSearchCompetitiveComponent.objComponents.LobbyContentSearchCompetitiveFoundComponent;
                switch (json.exit) {
                    case -1:
                        window.engine.autherizationError();
                        break;
                    case 0:
                        component.confirmed = json.data.selfStatus;
                        component.remaining = json.data.remaining;
                        if (json.data.contestStatus) {
                            window.engine.newRequest("/contest");
                        }
                        break;
                }
			});
    }
}
class LobbyContentSearchCompetitiveFoundInfoComponent extends Component {
    constructor(objParent, elRoot, numUpdateDalay) {
        super(objParent, elRoot, numUpdateDalay);
        this._numConfirmedCount = 0;

        //CSS
        this.elCSS = $("head").append("<link id='lobbyContentSearchCompetitiveFoundInfo' href='/js/engine/components/lobby/content/search/competitive/found/info/info.css' rel='stylesheet'>")
            .find("#lobbyContentSearchCompetitiveFoundInfo");

        //JS Handlers

        //HTML Preload
        this.preload();
    }

    get confirmedCount() {
        return this._numConfirmedCount;
    }
    set confirmedCount(numConfirmedCount) {
        if (this._numConfirmedCount != numConfirmedCount) {
            this._numConfirmedCount = numConfirmedCount;
            for (let numDivNumber = 0; numDivNumber < this.elHTML.find("div").length; numDivNumber++) {
                if (numDivNumber < this._numConfirmedCount) {
                    $(this.elHTML.find("div")[numDivNumber]).css("background-color", "var(--primary-color)");
                } else {
                    $(this.elHTML.find("div")[numDivNumber]).css("background-color", "var(--secondary-color)");
                }
            }
        }
        return this.confirmedCount;
    }

    preload() {
        window.engine.newAJAX("/php/API.php", { "component": "lobbyContentSearchCompetitiveFoundInfo", "type": 0, "data": {} },
            function (json) {
                let component = window.engine.objPage.findComponent("LobbyContentSearchCompetitiveFoundInfoComponent");
                switch (json.exit) {
                    case -1:
                        window.engine.autherizationError();
                        break;
                    case 0:
                        let html = "<div class='lobbyContentSearchCompetitiveFoundInfo' style='opacity: 0'>";
                        for (let numNumber = 0; numNumber < json.data.membersCount; numNumber++) {
                            html += "<div> </div>";
                        }
                        html += "</div>";
                        component.elHTML = component.elRoot.append(html).find(".lobbyContentSearchCompetitiveFoundInfo");

                        component.ready(true);
                        break;
                }
            });
    }

    update(component) {
        window.engine.newAJAX("/php/API.php", { "component": "lobbyContentSearchCompetitiveFoundInfo", "type": 0, "data": {} },
            function (json) {
                let component = window.engine.objPage.findComponent("LobbyContentSearchCompetitiveFoundInfoComponent");
                switch (json.exit) {
                    case -1:
                        window.engine.autherizationError();
                        break;
                    case 0:
                        component.confirmedCount = json.data.confirmedCount;
                        break;
                }
            });
    }
}
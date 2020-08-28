class LobbyContentSearchCompetitiveFoundConfirmComponent extends Component {
    constructor(objParent, elRoot, numUpdateDalay) {
        super(objParent, elRoot, numUpdateDalay);

        //CSS
        this.elCSS = $("head").append("<link id='lobbyContentSearchCompetitiveFoundConfirm' href='/js/engine/components/lobby/content/search/competitive/found/confirm/confirm.css' rel='stylesheet'>")
            .find("#lobbyContentSearchCompetitiveFoundConfirm");

        //JS Handlers
        this.objHandlers["confirmClick"] = {
            strEvent: "click",
            strSelector: ".lobbySearchCompetitiveFoundConfirm",
            objData: { component: this },
            funcHandler: function (e) {
                window.engine.newAJAX("/php/API.php", { "component": "lobbyContentSearchCompetitiveFoundConfirm", "type": 1, "data": {} },
                    function (json) {
                    });
            }
        };

        //HTML Preload
        this.preload();
    }

    preload() {
        let html = "<input class='lobbySearchCompetitiveFoundConfirm' type='button' value='ПРИНЯТЬ' style='opacity: 0'>";
        this.elHTML = this.elRoot.append(html).find(".lobbySearchCompetitiveFoundConfirm");

        this.ready(true);
    }
}
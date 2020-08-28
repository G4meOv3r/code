class LobbyContentSearchComponent extends Component {
    constructor(objParent, elRoot, numUpdateDelay) {
        super(objParent, elRoot, numUpdateDelay);

        //CSS Link
        this.elCSS = $("head").append("<link id='lobbyContentSearch' href='/js/engine/components/lobby/content/search/search.css' rel='stylesheet'>").find("#lobbyContentSearch");

        //JS Handlers
        this.objHandlers["searchClick"] = {
            strEvent: "click",
            strSelector: ".lobbySearchMenu > input[type=button]",
            objData: { component: this },
            funcHandler: function (e) {
                let component = e.data.component;
                $(".lobbySearchMenu > input[type=button]").prop("disabled", false);
                $(this).prop("disabled", true);
                history.pushState(null, null, $(this).attr("href"));
                switch ($(this).attr("name")) {
                    case "competitive":
                        break;
                    case "custom":
                        break;
                }
            }
        };

        //HTML Preload
        this.preload();

        //Other Components
        this.elHTML.find("input[name=" + window.location.pathname.split("/")[3] + "]").prop("disabled", true);
        switch (window.location.pathname.split("/")[3]) {
            case "competitive":
                this.objComponents.LobbyContentSearchCompetitiveComponent = new LobbyContentSearchCompetitiveComponent(this, $(".lobbyContentSearch"), 100);
                break;
            case "custom":
                //this.objComponents.LobbySearchCustomComponent = new LobbySearchCustomComponent($(".lobbySearchInner"), 100);
                break;
        }
    }

    preload() {
        let html = "<div class='lobbyContentSearch' style='opacity: 0'> <div class='lobbyContentSearchMenu'> <input type='button' value='Соревновательный' name='competitive' href='/lobby/search/competitive'> <input type='button' value='Пользовательский' name='custom' href='/lobby/search/custom'> </div> </div>"
        this.elHTML = this.elRoot.append(html).find(".lobbyContentSearch");

        this.ready(true);
    }
}
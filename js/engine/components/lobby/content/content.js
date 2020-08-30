class LobbyContentComponent extends Component {
    constructor(objParent, elRoot, numUpdateDelay) {
        super(objParent, elRoot, numUpdateDelay);

        //CSS
        this.elCSS = $("head").append("<link id='lobbyContent' href='/js/engine/components/lobby/content/content.css' rel='stylesheet'>").find("#lobbyContent");

        //JS Handlers
        this.objHandlers["menuClick"] = {
            strEvent: "click",
            strSelector: ".lobbyContentMenu > input[type=button]",
            objData: { component: this },
            funcHandler: function (e) {
                let component = e.data.component;
                $(".lobbyContentMenu > input[type=button]").prop("disabled", false);
                $(this).prop("disabled", true);
                history.pushState(null, null, $(this).attr("href"));
                switch ($(this).attr("name")) {
                    case "search":
                        component.objComponents.LobbyContentSearchComponent = component.replaceComponent("LobbyContentCreateComponent", LobbyContentSearchComponent);

                        break;
                    case "create":
                        component.objComponents.LobbyContentCreateComponent = component.replaceComponent("LobbyContentSearchComponent", LobbyContentCreateComponent);

                        break;
                }
            }
        };

        //HTML Preload
        this.preload();

        //Other Components
        this.elHTML.find("input[name=" + window.location.pathname.split("/")[2] + "]").prop("disabled", true);
        switch (window.location.pathname.split("/")[2]) {
            case "search":
                this.objComponents.LobbyContentSearchComponent = new LobbyContentSearchComponent(this, $(".lobbyContent"), null);
                break;
            case "create":
                this.objComponents.LobbyContentCreateComponent = new LobbyContentCreateComponent(this, $(".lobbyContent"), 500);
                break;
        }
    }

    preload() {
        let html = "<div class='lobbyContent' style='opacity: 0'> <div class='lobbyContentMenu'> <input type='button' value='ПОИСК' name='search' href='/lobby/search/competitive'> <input type='button' value='СОЗДАНИЕ' name='create' href='/lobby/create'> </div> </div>";
        this.elHTML = this.elRoot.append(html).find(".lobbyContent");

        this.ready(true);
    }
}
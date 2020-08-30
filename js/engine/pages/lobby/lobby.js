class LobbyPage extends Page {
    constructor() {
        super();
        this.elCSS = $("head").append("<link id='lobby' href='/js/engine/pages/lobby/lobby.css' rel='stylesheet'>").find("#lobby");
        this.elHTML = $("body").append("<div class='page' style='opacity: 0'> <div class='pageMenu'> </div> <div class='pageInner'> <div class='pageInnerLeft'> </div> <div class='pageInnerCentral'> </div> <div class='pageInnerRight'> </div> </div> </div>").find(".page");

        this.objComponents.MenuComponent = new MenuComponent(this, this.elHTML.find(".pageMenu"), null);
        this.objComponents.LobbyComponent = new LobbyComponent(this, this.elHTML.find(".pageInnerCentral"), 500);
        this.objComponents.LobbyContentComponent = new LobbyContentComponent(this, this.elHTML.find(".pageInnerCentral"), null);
    }

}
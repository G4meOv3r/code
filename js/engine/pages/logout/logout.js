class LogoutPage extends Page {
    constructor() {
        super();
        this.elCSS = $("head").append("<link id='logout' href='/js/engine/pages/logout/logout.css' rel='stylesheet'>").find("#logout");
        this.elHTML = $("body").append("<div class='page'> </div>").find(".page");

        this.objComponents["LogoutComponent"] = new LogoutComponent(this, this.elHTML, null);
    }
}
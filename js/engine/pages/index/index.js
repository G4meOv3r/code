class IndexPage extends Page {
    constructor() {
        super();
        this.elCSS = $("head").append("<link id='auth' href='/js/engine/pages/index/index.css' rel='stylesheet'>").find("#auth");
        this.elHTML = $("body").append("<div class='page'> </div>").find(".page");

        this.objComponents["MenuComponent"] = new MenuComponent(this, this.elHTML, null);
    }
}
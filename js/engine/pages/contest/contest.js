class ContestPage extends Page {
    constructor() {
        super();
        this.elCSS = $("head").append("<link id='contest' href='/js/engine/pages/contest/contest.css' rel='stylesheet'>").find("#contest");
        this.elHTML = $("body").append("<div class='page' style='opacity: 0'> <div class='pageMenu'> </div> <div class='pageInner'> <div class='pageInnerLeft'> </div> <div class='pageInnerCentral'> </div> <div class='pageInnerRight'> </div> </div> </div>").find(".page");

        this.objComponents.NotificationComponent = new NotificationComponent(this, $(".page"));
        this.objComponents.MenuComponent = new MenuComponent(this, this.elHTML.find(".pageMenu"), null);
        this.objComponents.ContestStatusComponent = new ContestStatusComponent(this, this.elHTML.find(".pageInnerCentral"), 100);
        this.objComponents.ContestTeamComponent = new ContestTeamComponent(this, this.elHTML.find(".pageInnerCentral"), null);
        this.objComponents.ContestContentComponent = new ContestContentComponent(this, this.elHTML.find(".pageInnerCentral"), null);
    }
}
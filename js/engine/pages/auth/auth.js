class AuthPage extends Page {
    constructor() {
        super();
        this.elCSS = $("head").append("<link id='auth' href='/js/engine/pages/auth/auth.css' rel='stylesheet'>").find("#auth");
        this.elHTML = $("body").append("<div class='page'> </div>").find(".page");

        this.objComponents.NotificationComponent = new NotificationComponent(this, $(".page"));
        switch (window.engine.objRequest[2]) {
            case "login":
                this.objComponents["AuthLoginComponent"] = new AuthLoginComponent(this, this.elHTML, null);
                break;
            case "registration":
                this.objComponents["AuthRegistrationComponent"] = new AuthRegistrationComponent(this, this.elHTML, null);
                break;
        }
    }
}
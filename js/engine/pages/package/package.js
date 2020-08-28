class PackagePage extends Page {
    constructor() {
        super();
        this.elCSS = $("head").append("<link id='package' href='/js/engine/pages/package/package.css' rel='stylesheet'>").find("#package");
        this.elHTML = $("body").append("<div class='page' style='opacity: 0'> <div class='pageMenu'> </div> <div class='pageInner'> <div class='pageInnerLeft'> </div> <div class='pageInnerCentral'> <h1> 28e44d2d7baa143649a1 </h1> <div> </div> </div> <div class='pageInnerRight'> </div> </div> </div>").find(".page");

        this.objComponents.MenuComponent = new MenuComponent(this, this.elHTML.find(".pageMenu"), null);
        this.objComponents.PackageCodeComponent = new PackageCodeComponent(this, this.elHTML.find(".pageMenu > div"), null);
    }
}
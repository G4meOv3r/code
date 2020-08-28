class Page {
    constructor() {
        this.objComponents = {};
        this.elHTML;
        this.elCSS;

        this._bShow = false;
        this._bReady = false;
    }

    show(bShow = null, funcCallback = function () { }, ...args) {
        if (bShow != null) {
            if (this._bShow != bShow) {
                this._bShow = bShow;
                if (this._bShow) {
                    this.elHTML.animate({ "opacity": "1" }, 200);
                } else {
                    this.elHTML.animate({ "opacity": "0" }, 200);
                }
                setTimeout(funcCallback, 200, args);
            } else {
                funcCallback(args);
            }
        } else {
            return this._bShow;
        }
    }

    ready(bReady = null, funcCallback = function () { }, ...args) {
        if (bReady != null) {
            if (this._bReady != bReady) {
                this._bReady = bReady;
                this.show(true, funcCallback, args);
            } else {
                funcCallback(args);
            }
            return this._bReady;
        } else {
            return this._bReady;
        }
    }

    remove(funcCallBack) {
        this.elHTML.animate({ opacity: 0 }, 100, function () {
            for (let objKey in window.engine.objPage.objComponents) {
                window.engine.objPage.objComponents[objKey].remove();
            }
            window.engine.objPage.elHTML.remove();
            window.engine.objPage.elCSS.remove();
            funcCallBack();
        });
    }

    findComponent(strComponentName) {
        let result = [];
        for (let componentName in this.objComponents) {
            if (componentName == strComponentName) {
                result = result.concat(this.objComponents[componentName]);
            }
            result = result.concat(this.objComponents[componentName].findComponent(strComponentName));
        }
        if (result.length == 1) {
            result = result[0];
        }
        return result;
    }


}
class LobbyContentSearchCompetitiveCardComponent extends Component {
    constructor(objParent, elRoot, numUpdateDalay, objOther) {
        super(objParent, elRoot, numUpdateDalay, objOther);
        this.numComponentNumber = objOther.numComponentNumber;
        this._numDuration = 0;

        this._bChecked = false;
        this._bDisabled = false;

        //CSS
        this.elCSS = $("head").append("<link id='lobbyContentSearchCompetitiveCard' href='/js/engine/components/lobby/content/search/competitive/card/card.css' rel='stylesheet'>")
            .find("#lobbyContentSearchCompetitiveCard");

        //JS Handlers
        this.objHandlers["cardFocus"] = {
            strEvent: "focus",
            strSelector: ".lobbySearchCompetitiveCardCheck input[value=" + this.numComponentNumber + "]",
            objData: { component: this},
            funcHandler: function (e) {
                console.log(1);
                e.data.component.elHTML.find(".lobbySearchCompetitiveCardCheck div").css("border-bottom", "double");
            }
        };
        this.objHandlers["cardBlur"] = {
            strEvent: "blur",
            strSelector: ".lobbySearchCompetitiveCardCheck input[value=" + this.numComponentNumber + "]",
            objData: { component: this },
            funcHandler: function (e) {
                console.log(2);
                e.data.component.elHTML.find(".lobbySearchCompetitiveCardCheck div").css("border-bottom", "1px solid var(--primary-color)");
            }
        };
        this.objHandlers["cardClick"] = {
            strEvent: "click",
            strSelector: "#lobbySearchCompetitiveCard" + this.numComponentNumber,
            objData: { component: this },
            funcHandler: function (e) {
                let elCheckBox;
                if ($(e.target).attr("type") != "checkbox") {
                    elCheckBox = $(this).find("input[type=checkbox]");
                    elCheckBox.prop("checked", !elCheckBox.prop("checked"));
                } else {
                    elCheckBox = $(e.target);
                }
                window.engine.newAJAX("/php/API.php", { "component": "lobbyContentSearchCompetitiveCard", "type": 1, "data": { "number": elCheckBox.val(), "value": elCheckBox.prop("checked") } },
                    function (json) {
                    }
                );
            }
        };

        //HTML Preload
        this.preload();
    }

    get duration() {
        return window.engine.parseToTime(this._numDuration);
    }
    set duration(numDuration) {
        if (this._numDuration != numDuration) {
            this._numDuration = numDuration;
            this.elHTML.find(".lobbySearchCompetitiveCardType h2 i").html(window.engine.parseToTime(this._numDuration));
        }
        return this._numDuration;
    }

    get checked() {
        return this._bChecked;
    }
    set checked(bChecked) {
        if (this._bChecked != bChecked) {
            this._bChecked = bChecked;
            this.elHTML.find("input[type=checkbox]").prop("checked", this._bChecked);
            if (this._bChecked) {
                this.elHTML.css("background-color", "var(--primary-color)");
                this.elHTML.find("h1, h2").css("color", "var(--secondary-color)");
                this.elHTML.find(".lobbySearchCompetitiveCardDiscription h1, .lobbySearchCompetitiveCardDiscription h2").css("text-shadow", "0px 3px rgb(100, 100, 110)");
            } else {
                this.elHTML.css("background-color", "var(--secondary-color)");
                this.elHTML.find("h1, h2").css("color", "var(--primary-color)");
                this.elHTML.find(".lobbySearchCompetitiveCardDiscription h1, .lobbySearchCompetitiveCardDiscription h2").css("text-shadow", "0px 3px rgb(200, 200, 210)");
            }
        }
        return this._bChecked;
    }

    get disabled() {
        return this._bDisabled; 
    }
    set disabled(bDisabled) {
        if (this._bDisabled != bDisabled) {
            this._bDisabled = bDisabled;
            if (this._bDisabled) {
                this.active(false);
                this.checked = false;
            } else {
                this.active(true);
            }
        }
        return this._bDisabled;
    }

    preload() {
        let html = "<div id='lobbySearchCompetitiveCard" + this.numComponentNumber + "' class='lobbySearchCompetitiveCard' style='opacity: 0; " + this.objOther.strComponentStyle + "'> <div class='lobbySearchCompetitiveCardCheck'> <input type='checkbox' value='" + this.numComponentNumber + "'> <div> </div> </div> <div class='lobbySearchCompetitiveCardDiscription'> <h1> " + this.numComponentNumber + " </h1> <h2> vs </h2> <h1> " + this.numComponentNumber + " </h1> </div> <div class='lobbySearchCompetitiveCardType'> <h1> Командный рейтинг </h1> <h2> Среднее время ожидания: <i> 00:00 </i> </h2> </div> </div>";
        this.elHTML = $(this.elRoot.append(html).find(".lobbySearchCompetitiveCard")[this.numComponentNumber - 1]);

        this.ready(true);
    }

    update(component) {
        window.engine.newAJAX("/php/API.php", { "component": "lobbyContentSearchCompetitiveCard", "type": 0, "data": { "number": component.numComponentNumber } },
            function (json) {
                let component = window.engine.objPage.findComponent("LobbyContentSearchCompetitiveCardComponent" + json.data.number);
                switch (json.exit) {
                    case -1:
                        window.engine.autherizationError();
                        break;
                    case 0:
                        if (json.data.permission) {
                            component.disabled = json.data.disabled;
                            component.checked = json.data.checked;
                            component.duration = json.data.duration; 
                        } else {
                            component.active(json.data.permission);
                            component.checked = json.data.checked;
                            component.duration = json.data.duration; 
                        }
                        break;
                }
            });
    }
}
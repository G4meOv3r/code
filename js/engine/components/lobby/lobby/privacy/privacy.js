class LobbyPrivacyComponent extends Component {
	constructor(objParent, root, updateDelay) {
		super(objParent, root, updateDelay);
		this._numPrivacy = null;

		//CSS
		this.elCSS = $("head").append("<link id='lobbyPrivacy' href='/js/engine/components/lobby/lobby/privacy/privacy.css' rel='stylesheet'>").find("#lobbyPrivacy");

		//JS Handlers
		this.objHandlers["privacyFocus"] = {
			strEvent: "focus",
			strSelector: ".lobbyPrivacySetting input[type=radio]",
			objData: {},
			funcHandler: function () {
				$($(this).parent()).find("p").css("text-decoration", "underline");
			}
		}
		this.objHandlers["privacyBlur"] = {
			strEvent: "blur",
			strSelector: ".lobbyPrivacySetting input[type=radio]",
			objData: {},
			funcHandler: function () {
				$($(this).parent()).find("p").css("text-decoration", "none");
			}
		}
		this.objHandlers["privacyClick"] = {
			strEvent: "click",
			strSelector: ".lobbyPrivacySetting",
			objData: {},
			funcHandler: function () {
				window.engine.newAJAX("/php/API.php", { "component": "lobby", "type": 1, "data": { "privacy": $(this).find("input[name=privacy]").val() } },
					function (json) {
					});
			}
		}

		//HTML Preload
		this.preload();
	}

	get privacy() {
		return this._numPrivacy;
	}
	set privacy(numPrivacy) {
		if (this._numPrivacy != numPrivacy) {
			this._numPrivacy = numPrivacy;
			this.elHTML.find(`input[value=${this._numPrivacy}]`).prop("checked", true);

			$(".lobbyPrivacySetting").each(function () {
				if ($(this).find("input[type=radio]").prop("checked")) {
					$(this).find("div").css("background-color", "var(--primary-color)");
				} else {
					$(this).find("div").css("background-color", "var(--secondary-color)");
				}
			});
		}
		return this._numPrivacy;
    }

	preload() {
		let html = "<div class='lobbyPrivacy'> <div class='lobbyPrivacyTitle'> <p> Приватность: </p> </div> <div class='lobbyPrivacySetting'> <input type='radio' name='privacy' value='0'> <div> </div> <p> Открытое лобби </p> </div> <div class='lobbyPrivacySetting'> <input type='radio' name='privacy' value='1'> <div> </div> <p> По приглашениям </p> </div> <div class='lobbyPrivacySetting'> <input type='radio' name='privacy' value='2'> <div> </div> <p> Закрытое лобби </p> </div> </div>";
		this.elHTML = this.elRoot.append(html).find(".lobbyPrivacy");

		this.ready(true);
	}
}
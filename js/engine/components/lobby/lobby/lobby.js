class LobbyComponent extends Component {
	constructor(objParent, root, updateDelay) {
		super(objParent, root, updateDelay);
		//CSS
		this.elCSS = $("head").append("<link id='lobby' href='/js/engine/components/lobby/lobby/lobby.css' rel='stylesheet'>").find("#lobby");

		//JS Handlers
		this.objHandlers["privacyFocus"] = {
			strEvent: "focus",
			strSelector: ".lobbySettingsInnerSetting input[type=radio]",
			objData: {},
			funcHandler: function () {
				$($(this).parent()).find("p").css("text-decoration", "underline");
			}
		}
		this.objHandlers["privacyBlur"] = {
			strEvent: "blur",
			strSelector: ".lobbySettingsInnerSetting input[type=radio]",
			objData: {},
			funcHandler: function () {
				$($(this).parent()).find("p").css("text-decoration", "none");
			}
		}
		this.objHandlers["privacyClick"] = {
			strEvent: "click",
			strSelector: ".lobbySettingsInnerSetting",
			objData: {},
			funcHandler: function () {
				$(this).find("input[type=radio]").prop("checked", true);
				$(this).find("input[name=privacy]").change();

				let parser = { "open": 0, "invite": 1, "close": 2 };
				window.engine.newAJAX("/php/API.php", { "component": "lobby", "type": 1, "data": { "privacy": parser[$(this).find("input[type=radio]").val()] } },
					function (json) {
					});
			}
		}
		this.objHandlers["privacyChange"] = {
			strEvent: "change",
			strSelector: ".lobbySettingsInnerSetting input[name=privacy]",
			objData: {},
			funcHandler: function () {
				$(".lobbySettingsInnerSetting input[name=privacy]").each(function (index) {
					if ($(this).prop("checked")) {
						$($(this).parent()).find("div").css("background-color", "var(--primary-color)");
					} else {
						$($(this).parent()).find("div").css("background-color", "var(--secondary-color)");
					}
				});
			}
		}

		//HTML Preload
		this.preload();

	}

	preload() {
		this.elHTML = this.elRoot.append("<div class='lobby' style='opacity: 0'> </div>").find(".lobby");

		//Other Components
		this.objComponents.LobbyPrivacyComponent = new LobbyPrivacyComponent(this, this.elHTML, null);
		this.objComponents.LobbyMembersComponent = new LobbyMembersComponent(this, this.elHTML, null);

		window.engine.newAJAX("/php/API.php", { "component": "lobby", "type": 0 },
			function (json) {
				let component = window.engine.objPage.objComponents["LobbyComponent"];
				switch (json["exit"]) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						if (json.type) {
							component.objComponents.LobbyPrivacyComponent.active(false);
						}

						component.objComponents.LobbyPrivacyComponent.privacy = json.data.privacy;
						component.objComponents.LobbyMembersComponent.members = json.data.members;

						//$(".lobby").append("<div class='lobbyMembers'> </div>");
						//json.data.members.forEach(function (strElement) {
						//	$(".lobbyMembers").append("<div id='" + strElement + "' class='lobbyMembersMember'> </div>");
						//});

						$(".lobby").append("<div class='lobbyOther'> <input type='button' value='Выход'> </div>");
						break;
				}
				component.ready(true);
			});
	}

	update(component) {
		window.engine.newAJAX("/php/API.php", { "component": "lobby", "type": 0 },
			function (json) {
				let component = window.engine.objPage.objComponents["LobbyComponent"];
				switch (json.exit) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						if (json.type) {
							component.objComponents.LobbyPrivacyComponent.active(false);
						}

						component.objComponents.LobbyPrivacyComponent.privacy = json.data.privacy;
						component.objComponents.LobbyMembersComponent.members = json.data.members;

						break;
                }
			});
    }
}
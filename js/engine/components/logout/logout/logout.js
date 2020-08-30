class LogoutComponent extends Component {
	constructor(objParent, root, updateDelay) {
		super(objParent, root, updateDelay);

		//CSS
		this.elCSS = $("head").append("<link id='logout' href='/js/engine/components/logout/logout/logout.css' rel='stylesheet'>").find("#logout");

		//JS Handlers
		this.objHandlers["submitClick"] = {
			strEvent: "click",
			strSelector: ".logoutAccount input[type=button]",
			objData: {},
			funcHandler: function () {
				window.engine.newAJAX("/php/API.php", { "component": "logout", "type": 1, "data": {} },
					function (json) {
						if (json.exit) {
						} else {
							$(".logout").animate({ opacity: 0 }, 100);
							window.engine.newRequest("/");
						}
					}
				);
			}
		};
		this.objHandlers["navigateClick"] = {
			strEvent: "click",
			strSelector: ".logout input[type='button']",
			objData: {},
			funcHandler: function () {
				if ($(this).attr("href")) {
					window.engine.newRequest($(this).attr("href"));
				}
			}
		};

		//HTML Preload
		this.preload();
	}

	preload() {
		let html = "<div class='logout' style='opacity: 0'> <div class='logoutLogo'> <h1> CODE </h1> </div> </div>";
		this.elHTML = this.elRoot.append(html).find(".logout");

		window.engine.newAJAX(
			"/php/API.php",

			{ "component": "logout", "type": 0 },

			function (json) {
				let component = window.engine.objPage.objComponents["LogoutComponent"];
				switch (json.exit) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						$(".logout").append("<div class='logoutAccount'> <div> <p style='font-weight: 800'> " + json.data.email + " </p> <p style='font-size: 12px; font-style: italic;'> Авторизован </p> </div> <input type='button' value='Выйти'> </div>");
						$(".logout").append("<div class='logoutNavigate'> <p> Хотите сменть аккаунт? </p> <input type='button' href='/migrate' value='Аккаунты, которые мы запомнили — " + json.data.rememberCount + "'> <input type='button' href='/' value='<— Главная' style='margin: 30px 0 0 0'> </div>");
						break;
				}
				component.ready(true);
            }
		)
	}
}
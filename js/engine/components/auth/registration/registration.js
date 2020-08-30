class AuthRegistrationComponent extends Component {
	constructor(objParent, root, updateDelay) {
		super(objParent, root, updateDelay);
		//CSS
		this.elCSS = $("head").append("<link id='authRegistration' href='/js/engine/components/auth/registration/registration.css' rel='stylesheet'>").find("#authRegistration");

		//JS Handlers
		this.objHandlers["rememberFocus"] = {
			strEvent: "focus",
			strSelector: ".authRegistrationRemember input[type=checkbox]",
			objData: {},
			funcHandler: function () {
				$(".authRegistrationRemember div").css("border-bottom", "double");
			}
		};
		this.objHandlers["rememberBlur"] = {
			strEvent: "blur",
			strSelector: ".authRegistrationRemember input[type=checkbox]",
			objData: {},
			funcHandler: function () {
				$(".authRegistrationRemember div").css("border-bottom", "2px solid var(--primary-color)");
			}
		};
		this.objHandlers["rememberClick"] = {
			strEvent: "click",
			strSelector: ".authRegistrationRemember div",
			objData: {},
			funcHandler: function () {
				if ($(".authRegistrationRemember input[type=checkbox]").prop("checked")) {
					$(".authRegistrationRemember input[type=checkbox]").prop("checked", false);
				} else {
					$(".authRegistrationRemember input[type=checkbox]").prop("checked", true);
				}

				$(".authRegistrationRemember input[type=checkbox]").change();
			}
		};
		this.objHandlers["rememberChange"] = {
			strEvent: "change",
			strSelector: ".authRegistrationRemember input[type=checkbox]",
			objData: {},
			funcHandler: function () {
				if ($(this).prop("checked")) {
					$(".authRegistrationRemember div").css("background-color", "var(--primary-color)");
				} else {
					$(".authRegistrationRemember div").css("background-color", "var(--secondary-color)");
				}
			}
		};

		this.objHandlers["submitClick"] = {
			strEvent: "click",
			strSelector: ".authRegistrationSubmit input[type='button']",
			objData: { component: this },
			funcHandler: function (e) {
				var bNeedRemember = 0;
				if ($(".authRegistrationRemember input[type=checkbox]").prop("checked")) {
					bNeedRemember = 1;
				}
				window.engine.newAJAX(
					"/php/API.php",

					{ "component": "authRegistration", "type": 1, "data": { "email": $(e.data.component.elRoot.find("input[type=email]")).val(), "password": $(e.data.component.elRoot.find("input[type=password]")).val(), "confirmpassword": $(e.data.component.elRoot.find("input[type=password]")[1]).val(), "remember": bNeedRemember } },

					function (json) {
						if (json.exit) {
							var strErrorMessage = "";
							switch (json.exit) {
								case 1:
									strErrorMessage = "Аккаунт с такой электронной почтой уже существует!";
									break;
								case 2:
									strErrorMessage = "Пароль слишком простой!";
									break;
								case 3:
									strErrorMessage = "Пароли не совпадают!";
									break;
								case 4:
									strErrorMessage = "Неподходящая электронная почта!";
									break;
							}
							$(".authRegistrationSubmit p").stop().animate({ opacity: 0 }, 100, function () {
								$(".authRegistrationSubmit p").html(strErrorMessage);
								$(".authRegistrationSubmit p").stop().animate({ opacity: 1 }, 100);
							});
						} else {
							$(".authRegistration").animate({ opacity: 0 }, 100, function () {
								window.engine.newRequest("/");
							});
						}
					});
			}
		};

		this.objHandlers["navigateClick"] = {
			strEvent: "click",
			strSelector: ".authRegistration input[type='button']",
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
		let html = "<div class='authRegistration' style='opacity: 0'> <div class='authRegistrationLogo'> <h1> CODE </h1> </div> <div class='authRegistrationTypes'> <input id='login' type='button' href='/auth/login' value='Войти' style='font-weight: 100'> <input id='register' type='button' value='Зарегистрироваться' style='font-family: Whitney'> </div> <div class='authRegistrationInner'> <input type='email' placeholder='Электронная почта'> <input type='password' placeholder='Пароль'> <input type='password' style='opacity: 1' placeholder='Повторите пароль'> </div> <div class='authRegistrationSubmit'> <p style='opacity: 1'>  </p> <input type='button' value='Отправить'> </div> <div class='authRegistrationRemember'> <input type='checkbox' value='remember'> <div> </div> <p> Запомнить меня в системе </p> </div> <div class='authRegistrationNavigate'> <input type='button' href='/migrate' value='Аккаунты, которые мы запомнили'> <input type='button' href='/' value='<— Главная'> </div> </div>";
		this.elHTML = this.elRoot.append(html).find(".authRegistration");
		window.engine.newAJAX(
			"/php/API.php",

			{ "component": "authRegistration", "type": 0 },

			function (json) {
				let component = window.engine.objPage.objComponents["AuthRegistrationComponent"];
				$($(".authRegistrationNavigate input[type=button]")[0]).val("Аккаунты, которые мы запомнили — " + json.data.rememberCount);
				component.ready(true);
			}

		)
	}
}
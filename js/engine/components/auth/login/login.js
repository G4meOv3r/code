class AuthLoginComponent extends Component {
	constructor(objParent, root, updateDelay) {
		super(objParent, root, updateDelay);
		//CSS
		this.elCSS = $("head").append("<link id='authLogin' href='/js/engine/components/auth/login/login.css' rel='stylesheet'>").find("#authLogin");

		//JS Handlers
		this.objHandlers["rememberFocus"] = {
			strEvent: "focus",
			strSelector: ".authLoginRemember input[type=checkbox]",
			objData: {},
			funcHandler: function () {
				$(".authLoginRemember div").css("border-bottom", "double");
			}
		};
		this.objHandlers["rememberBlur"] = {
			strEvent: "blur",
			strSelector: ".authLoginRemember input[type=checkbox]",
			objData: {},
			funcHandler: function () {
				$(".authLoginRemember div").css("border-bottom", "2px solid rgb(50, 50, 55)");
			}
		};
		this.objHandlers["rememberClick"] = {
			strEvent: "click",
			strSelector: ".authLoginRemember div",
			objData: {},
			funcHandler: function () {
				if ($(".authLoginRemember input[type=checkbox]").prop("checked")) {
					$(".authLoginRemember input[type=checkbox]").prop("checked", false);
				} else {
					$(".authLoginRemember input[type=checkbox]").prop("checked", true);
				}

				$(".authLoginRemember input[type=checkbox]").change();
			}
		};
		this.objHandlers["rememberChange"] = {
			strEvent: "change",
			strSelector: ".authLoginRemember input[type=checkbox]",
			objData: {},
			funcHandler: function () {
				if ($(this).prop("checked")) {
					$(".authLoginRemember div").css("background-color", "var(--primary-color)");
				} else {
					$(".authLoginRemember div").css("background-color", "var(--secondary-color)");
				}
			}
		};

		this.objHandlers["submitClick"] = {
			strEvent: "click",
			strSelector: ".authLoginSubmit input[type='button']",
			objData: {},
			funcHandler: function () {
				var bNeedRemember = 0;
				if ($(".authLoginRemember input[type=checkbox]").prop("checked")) {
					bNeedRemember = 1;
				}

				window.engine.newAJAX(
					"/php/API.php",

					{ "component": "authLogin", "type": 1, "data": { "email": $("input[type=email]").val(), "password": $("input[type=password]").val(), "remember": bNeedRemember } },

					function (json) {
						if (json.exit) {
							var strErrorMessage = "";
							switch (json.exit) {
								case 1:
									strErrorMessage = "Неверная электронная почта или пароль!";
									break;

								case 2:
									strErrorMessage = "Неподходящая электронная почта!";
									break;
							}
							$(".authLoginSubmit p").stop().animate({ opacity: 0 }, 100, function () {
								$(".authLoginSubmit p").html(strErrorMessage);
								$(".authLoginSubmit p").stop().animate({ opacity: 1 }, 100);
							});
						} else {
							$(".authLogin").animate({ opacity: 0 }, 100, function () {
								window.engine.newRequest("/");
							});
						}
					});
			}
		};

		this.objHandlers["navigateClick"] = {
			strEvent: "click",
			strSelector: ".authLogin input[type='button']",
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
		let html = "<div class='authLogin' style='opacity: 0'> <div class='authLoginLogo'>  <img src='/logo.svg'> </div> <div class='authLoginTypes'> <input id='authLogin' type='button' value='Войти' style='font-family: Whitney'> <input id='register' href='/auth/registration' type='button' value='Зарегистрироваться' style='font-weight: 100'> </div> <div class='authLoginInner'> <input type='email' placeholder='Электронная почта'> <p> Забыли электронную почту? </p> <input type='password' placeholder='Пароль'> <p> Забыли пароль? </p> </div> <div class='authLoginSubmit'> <p style='opacity: 0'></p> <input type='button' value='Отправить'> </div> <div class='authLoginRemember'> <input type='checkbox' value='remember'> <div> </div> <p> Запомнить меня в системе </p> </div> <div class='authLoginNavigate'> <input type='button' href='/migrate' value='Аккаунты, которые мы запомнили'> <input type='button' href='/' value='<— Главная'> </div> </div>";
		this.elHTML = this.elRoot.append(html).find(".authLogin");
		window.engine.newAJAX(
			"/php/API.php",

			{ "component": "authLogin", "type": 0 },

			function (json) {
				let component = window.engine.objPage.objComponents["AuthLoginComponent"];
				$($(".authLoginNavigate input[type=button]")[0]).val("Аккаунты, которые мы запомнили — " + json.data.rememberCount);
				component.ready(true);
			}

		)
	}
}
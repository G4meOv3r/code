class MenuComponent extends Component {
	constructor(objParent, root, updateDelay) {
		super(objParent, root, updateDelay);
		//CSS
		this.elCSS = $("head").append("<link id='menu' href='/js/engine/components/common/menu/menu.css' rel='stylesheet'>").find("#menu");

		//JS Handlers
		this.objHandlers["inputClick"] = {
			strEvent: "click",
			strSelector: ".menu input[type=button]",
			objData: {},
			funcHandler: function () {
				console.log(1);
				window.engine.newRequest($(this).attr("href"));
			}
		}

		//HTML Preload
		this.preload();
	}

	preload() {
		let html = "";
		if (window.engine.getCookie("USID")) {
			html += "<div class='menu' style='opacity: 0'> <div class='menuLogo'> <img src='/logo.svg'> </div> <input type='button' href='/lobby/search/competitive' value='Новый матч'> <input type='button' href='/lobby/search/competitive' value='Ваши матчи'> <input type='button' href='/blog' value='Блог'> <input type='button' href='/profile' value='Профиль'> <input type='button' href='/logout' value='Выход'> </div>";
		} else {
			html += "<div class='menu' style='opacity: 0'> <div class='menuLogo'> <img src='/logo.svg'> </div> <input type='button' href='/auth/login' value='Вход'> <input type='button' href='/auth/registration' value='Регистрация'>";
		}
		this.elHTML = this.elRoot.append(html).find(".menu");
		this.ready(true);
    }

	update(component) {
	}

}
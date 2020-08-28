class Engine {
	constructor() {
		this.strRequest;
		this.objRequest;
		this.objPage;
	}

	//JS
	newRequest(request) {
		this.strRequest = request;

		var funcAfterRemove = function () {
			history.pushState(null, null, window.engine.strRequest);
			window.engine.objRequest = window.location.pathname.split("/");
			switch (window.engine.objRequest[1]) {
				case "":
					window.engine.objPage = new IndexPage();
					break;
				case "auth":
					window.engine.objPage = new AuthPage();
					break;
				case "logout":
					window.engine.objPage = new LogoutPage();
					break;
				case "lobby":
					window.engine.objPage = new LobbyPage();
					break;
				case "contest":
					window.engine.objPage = new ContestPage();
					break;
				case "package":
					window.engine.objPage = new PackagePage();
					break;
			}
        }

		if (this.objPage) {
			this.objPage.remove(funcAfterRemove);
		} else {
			funcAfterRemove()
        }
	}

	//Global Errors
	autherizationError() {
		if (this.strRequest) {
			this.newRequest("/auth/login");
        }
	}

	//Time Parsers
	parseFromTime(strTime) {
		let arrTime = strTime.split(":");
		let numTime = 0;
		arrTime.forEach(function (value, index) {
			numTime += value * 60 ** (arrTime.length - index - 1);
		});
		return numTime;
	}
	parseToTime(numTime) {
		let strHours = "";
		strHours += Math.floor(numTime / 60);
		if (strHours.length < 2) {
			strHours = "0" + strHours;
        }

		let strMinutes = "";
		strMinutes += numTime % 60;
		if (strMinutes.length < 2) {
			strMinutes = "0" + strMinutes;
		}

		return strHours + ":" + strMinutes;
    }

	//PHP
	newAJAX(strURL, objData, funcSuccess, bConsoleLog = false) {
		$.ajax({
			url: strURL,
			type: "POST",
			data: objData,
			success: function (response) {

				if (bConsoleLog) {
					console.log(response);
				}

				var json = JSON.parse(response);
				funcSuccess(json)
            }
		});
    }

	//Cookie
	getCookie(name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	deleteCookie(name) {
		document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	}
}
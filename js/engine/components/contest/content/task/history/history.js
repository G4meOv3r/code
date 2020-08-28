class ContestContentTaskHistoryComponent extends Component {
	constructor(objParent, root, updateDelay, objOther) {
		super(objParent, root, updateDelay);
		this._arrPackages = [];
		this._numTaskNumber = objOther.numTaskNumber;
		//CSS
		this.elCSS = $("head").append("<link id='contestContentTaskHistory' href='/js/engine/components/contest/content/task/history/history.css' rel='stylesheet'>").find("#contestContentTaskHistory");

		//JS Handlers

		//HTML Preload
		this.preload();

	}

	number(numTaskNumber = null) {
		if (numTaskNumber != null) {
			if (this._numTaskNumber != numTaskNumber) {
				this.show(false, function (args) {
					let component = args[0];
					component._numTaskNumber = numTaskNumber;
					component.show(true);
				}, this);
            }
		} else {
			return this._numTaskNumber;
        }
    }

	get packages() {
		return this._arrPackages;
	}
	set packages(arrPackages) {
		for (let packageNumber in arrPackages) {
			if (packageNumber < this._arrPackages.length) {
				if (this._arrPackages[packageNumber].id == arrPackages[packageNumber].id) {
					if (this._arrPackages[packageNumber].result != arrPackages[packageNumber].result) {
						this._arrPackages[packageNumber].result = arrPackages[packageNumber].result;
						let elTd = $(this.elHTML.find("table").find("tr")[parseInt(packageNumber) + 1]).find("td[name='result']");
						window.engine.objPage.findComponent("NotificationComponent").message(`<h1> Сообщение! </h1> <p> Посылка ${this._arrPackages[packageNumber].id} была проверена, результат проверки: ${this._arrPackages[packageNumber].result} </p>`);
						elTd.css("opacity", 0);
						setTimeout(function (component, elTd) {
							elTd.html(arrPackages[packageNumber].result);
							elTd.css("opacity", 1);
						}, 200, this, elTd);

					}
				} else {
					let elTr = $(this.elHTML.find("table").find("tr")[parseInt(packageNumber) + 1]);
					this._arrPackages[packageNumber].id = arrPackages[packageNumber].id;
					this._arrPackages[packageNumber].date = arrPackages[packageNumber].date;
					this._arrPackages[packageNumber].compiler = arrPackages[packageNumber].compiler;
					this._arrPackages[packageNumber].result = arrPackages[packageNumber].result;

					elTr.css("opacity", 0);
					setTimeout(function (component, elTr) {
						elTr.find("td[name='id']").html(component._arrPackages[packageNumber].id);
						elTr.find("td[name='date']").html(component._arrPackages[packageNumber].date);
						elTr.find("td[name='compiler']").html(component._arrPackages[packageNumber].compiler);
						elTr.find("td[name='result']").html(component._arrPackages[packageNumber].result);
						elTr.css("opacity", 1);
					}, 200, this, elTr);
                }
			} else {
				this._arrPackages.push(arrPackages[packageNumber]);
				let elTr = $(this.elHTML.find("table").append("<tr> <td name='id'> </td> <td name='date'> </td> <td name='compiler'> </td> <td name='result'> </td> </tr>").find("tr")[parseInt(packageNumber) + 1]);
				elTr.css("opacity", 0);
				setTimeout(function (component, elTr) {
					elTr.find("td[name='id']").html(component._arrPackages[packageNumber].id);
					elTr.find("td[name='date']").html(component._arrPackages[packageNumber].date);
					elTr.find("td[name='compiler']").html(component._arrPackages[packageNumber].compiler);
					elTr.find("td[name='result']").html(component._arrPackages[packageNumber].result);
					elTr.css("opacity", 1);
				}, 200, this, elTr);
            }
		}

		if (arrPackages.length < this._arrPackages.length) {
			$(this.elHTML.find("table").find("tr").slice(arrPackages.length + 1)).remove();
			this._arrPackages = this._arrPackages.slice(arrPackages.length + 1);
        }
		return this.packages;
    }

	preload() {
		let html = "<div class='contestContentTaskHistory' style='opacity: 0'> <h1> ПОСЫЛКИ </h1> <hr/> <table> <tr> <th> Посылка </th> <th> Дата </th> <th> Компилятор </th> <th> Результат </th> </tr> </table> </div>";
		this.elHTML = this.elRoot.append(html).find(".contestContentTaskHistory");

		window.engine.newAJAX("/php/API.php", { "component": "contestContentTaskHistory", "type": 0, "data": { "number": this._numTaskNumber } },
			function (json) {
				let component = window.engine.objPage.findComponent("ContestContentTaskHistoryComponent");
				switch (json["exit"]) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						component.packages = json.data.packages;
						component.ready(true);
						break;
				}
			});
	}

	update() {
		let component = window.engine.objPage.findComponent("ContestContentTaskHistoryComponent");
		window.engine.newAJAX("/php/API.php", { "component": "contestContentTaskHistory", "type": 0, "data": { "number": component._numTaskNumber } },
			function (json) {
				let component = window.engine.objPage.findComponent("ContestContentTaskHistoryComponent");
				switch (json["exit"]) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						component.packages = json.data.packages;
						break;
				}
			});
    }
}
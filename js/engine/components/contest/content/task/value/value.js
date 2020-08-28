class ContestContentTaskValueComponent extends Component {
	constructor(objParent, root, updateDelay, objOther) {
		super(objParent, root, updateDelay);
		this._test;
		this._numTaskNumber = objOther.numTaskNumber;
		//CSS
		this.elCSS = $("head").append("<link id='contestContentTasksValue' href='/js/engine/components/contest/content/task/value/value.css' rel='stylesheet'>").find("#contestContentTasksValue");

		//JS Handlers

		//HTML Preload
		this.preload();

	}

	number(numTaskNumber = null) {
		if (numTaskNumber != null) {
			if (this._numTaskNumber != numTaskNumber) {
				this._numTaskNumber = numTaskNumber;
				this.show(false, function (args) {
					let component = args[0];
					window.engine.newAJAX("/php/API.php", { "component": "contestContentTaskValue", "type": 0, "data": { "number": component._numTaskNumber } },
						function (json) {
							let component = window.engine.objPage.findComponent("ContestContentTaskValueComponent");
							switch (json["exit"]) {
								case -1:
									window.engine.autherizationError();
									break;
								case 0:
									component.elHTML.html("<h1> УСЛОВИЕ </h1> <hr/>" + json.data.value);
									break;
							}
							component.show(true);
						});
				}, this);
            }
		} else {
			return this._numTaskNumber;
        }
    }

	get number() {
		return this._numTaskNumber;
	}
	set number(numTaskNumber) {
		if (this._numTaskNumber != numTaskNumber) {
			this._numTaskNumber = numTaskNumber;
			this.show(false, function (args) {
				let component = args[0];
				window.engine.newAJAX("/php/API.php", { "component": "contestContentTaskValue", "type": 0, "data": { "number": component._numTaskNumber } },
					function (json) {
						let component = window.engine.objPage.findComponent("ContestContentTaskValueComponent");
						switch (json["exit"]) {
							case -1:
								window.engine.autherizationError();
								break;
							case 0:
								component.elHTML.html("<h1> УСЛОВИЕ </h1> <hr/>" + json.data.value);
								break;
						}
						component.show(true);
					});
			}, this);
        }
		return this.number;
    }

	preload() {
		let html = "<div class='contestContentTaskValue' style='opacity: 0'> </div>";
		this.elHTML = this.elRoot.append(html).find(".contestContentTaskValue");

		window.engine.newAJAX("/php/API.php", { "component": "contestContentTaskValue", "type": 0, "data": { "number": this._numTaskNumber } },
			function (json) {
				let component = window.engine.objPage.findComponent("ContestContentTaskValueComponent");
				switch (json["exit"]) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						component.elHTML.html("<h1> УСЛОВИЕ </h1> <hr/>" + json.data.value);
						component.ready(true);
						break;
				}
			});
	}
}
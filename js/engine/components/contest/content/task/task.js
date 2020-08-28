class ContestContentTaskComponent extends Component {
	constructor(objParent, root, updateDelay) {
		super(objParent, root, updateDelay);
		this._numTaskNumber;
		this._bProgress = false;
		//CSS
		this.elCSS = $("head").append("<link id='contestContentTasks' href='/js/engine/components/contest/content/task/task.css' rel='stylesheet'>").find("#contestContentTasks");

		//JS Handlers
		this.objHandlers["inputClick"] = {
			strEvent: "click",
			strSelector: ".contestContentTaskMenu input[type=button]",
			objData: { component: this },
			funcHandler: function (e) {
				let component = e.data.component;
				component.number($(this).prop("name"));
				$(".contestContentTaskMenu input[type=button]").prop("disabled", false);
				$(this).prop("disabled", true);
			}
		};

		//HTML Preload
		this.preload();

	}

	number(numTaskNumber = null) {
		if (numTaskNumber != null) {
			this._numTaskNumber = numTaskNumber;
			this.objComponents.ContestContentTaskValueComponent.number(this._numTaskNumber);
			this.objComponents.ContestContentTaskCodeComponent.number(this._numTaskNumber);
			this.objComponents.ContestContentTaskHistoryComponent.number(this._numTaskNumber);
			history.pushState(null, null, "/contest/" + this._numTaskNumber);
		} else {
			return this._numTaskNumber;
        }
	}

	progress(bProgress = null) {
		if (bProgress != null) {
			if (this._bProgress != bProgress) {
				this._bProgress = bProgress;
				if (!this._bProgress) {
					if (this.objComponents.ContestContentTaskCodeComponent) {
						this.objComponents.ContestContentTaskCodeComponent.show(false);
                    }
					this.objComponents.ContestContentTaskHistoryComponent.show(false, function (args) {
						let component = args[0];
						if (component.objComponents.ContestContentTaskCodeComponent) {
							component.removeComponent("ContestContentTaskCodeComponent");
						}
						component.objComponents.ContestContentTaskHistoryComponent.show(true);
					}, this);
                }
			}
		} else {
			return this._bProgress;
        }
    }

	preload() {
		let html = "<div class='contestContentTask' style='opacity: 0'> <div class='contestContentTaskMenu'> </div> <div class='contestContentTaskInner'> </div> </div>";
		this.elHTML = this.elRoot.append(html).find(".contestContentTask");

		window.engine.newAJAX("/php/API.php", { "component": "contestContentTask", "type": 0, "data": {} },
			function (json) {
				let component = window.engine.objPage.findComponent("ContestContentTaskComponent");
				switch (json["exit"]) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						let html = "";
						for (let numTaskNumber = 0; numTaskNumber < json.data.count; numTaskNumber++) {
							html += "<input type='button' value='ЗАДАЧА " + String.fromCharCode(65 + numTaskNumber) + " — 0(0)' name='" + numTaskNumber + "'>";
                        }
						component.elHTML.find(".contestContentTaskMenu").html(html);

						//Other Components
						parseInt(window.location.pathname.split("/")[2]) ? component._numTaskNumber = window.location.pathname.split("/")[2] : component._numTaskNumber = 0;
						component.elHTML.find("input[name=" + component._numTaskNumber + "]").prop("disabled", true);
						component.objComponents.ContestContentTaskValueComponent = new ContestContentTaskValueComponent(component, component.elHTML.find(".contestContentTaskInner"), null, { numTaskNumber: component._numTaskNumber });
						if (parseInt(json.data.progress)) {
							component.objComponents.ContestContentTaskCodeComponent = new ContestContentTaskCodeComponent(component, component.elHTML.find(".contestContentTaskInner"), null, { numTaskNumber: component._numTaskNumber });
							component._bProgress = true;
                        }
						component.objComponents.ContestContentTaskHistoryComponent = new ContestContentTaskHistoryComponent(component, component.elHTML.find(".contestContentTaskInner"), 100, { numTaskNumber: component._numTaskNumber });

						component.ready(true);
						break;
				}
			});
	}

	update() {
		window.engine.newAJAX("/php/API.php", { "component": "contestContentTask", "type": 0, "data": {} },
			function (json) {
				let component = window.engine.objPage.findComponent("ContestContentTaskComponent");
				switch (json["exit"]) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						component.progress(parseInt(json.data.progress));
						break;
				}
			});
	}
}
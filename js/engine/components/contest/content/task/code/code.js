class ContestContentTaskCodeComponent extends Component {
	constructor(objParent, root, updateDelay, objOther) {
		super(objParent, root, updateDelay);
		this._numTaskNumber = objOther.numTaskNumber;
		this.codemirror;
		//CSS
		this.elCSS = $("head").append("<link id='contestContentTaskCode' href='/js/engine/components/contest/content/task/code/code.css' rel='stylesheet'>").find("#contestContentTaskCode");

		//JS Handlers
		this.objHandlers["codemirrorChange"] = {
			strEvent: "change",
			strSelector: "#codemirror",
			objData: { component: this },
			funcHandler: function (e) {
				let component = e.data.component;
				console.log(this);
			}
		};

		this.objHandlers["submitClick"] = {
			strEvent: "click",
			strSelector: ".contestContentTaskCodeUpload input[type=submit]",
			objData: { component: this },
			funcHandler: function (e) {
				let strSolution = e.data.component.codemirror.getValue();
				let componentNotification = window.engine.objPage.findComponent("NotificationComponent");
				if (strSolution != "") {
					window.engine.newAJAX("/php/API.php", { "component": "contestContentTaskCode", "type": 1, "data": { "number": e.data.component._numTaskNumber, "solution": strSolution, "compiler": e.data.component.objComponents.ContestContentTaskCodeCompilerComponent.compiler() } },
						function (json) {
							let component = window.engine.objPage.findComponent("ContestStatusComponent");
							switch (json.exit) {
								case -1:
									window.engine.autherizationError();
									break;
								case 0:
									componentNotification.success("<h1> Успех! </h1> <p> Отправленное решение принято и ожидает компиляции! </p>")
									break;
								case 1:
									componentNotification.error("<h1> Ошибка! </h1> <p> Контест завершен, решения не принимаются! </p>")
									break;
							}
						});
				} else {
					componentNotification.error("<h1> Ошибка! </h1> <p> Код решения для отправки не был найден! </p>");
                }
			}
		};

		//HTML Preload
		this.preload();

	}

	number(numTaskNumber = null) {
		if (numTaskNumber != null) {
			if (this._numTaskNumber != numTaskNumber) {
				this._numTaskNumber = numTaskNumber;
				this.show(false, function (args) {
					let component = args[0];
					if (localStorage.getItem("task" + component._numTaskNumber)) {
						component.codemirror.setValue(localStorage.getItem("task" + component._numTaskNumber));
					} else {
						component.codemirror.setValue("");
					}
					component.show(true);
				}, this);
            }
		} else {
			return this._numTaskNumber;
        }
    }

	preload() {
		let code = "";
		if (localStorage.getItem("task" + this._numTaskNumber)) {
			code = localStorage.getItem("task" + this._numTaskNumber);
        }
		let html = "<div class='contestContentTaskCode' style='opacity: 0'> <h1> РЕШЕНИЕ </h1> <hr/> <textarea id='codemirror'>" + code + "</textarea> <div class='contestContentTaskCodeUpload'> <input type='submit' value='ОТПРАВИТЬ'> </div> </div>";
		this.elHTML = this.elRoot.append(html).find(".contestContentTaskCode");

		//Other Components
		this.codemirror = CodeMirror.fromTextArea(document.getElementById("codemirror"), {
			mode: "text/x-python",
			lineNumbers: true,
			theme: "rosecode", 
			tabSize: 4,
		});
		this.codemirror.on("change", function () {
			let component = window.engine.objPage.findComponent("ContestContentTaskCodeComponent");
			localStorage.setItem("task" + component._numTaskNumber, component.codemirror.getValue());
		});
		this.objComponents.ContestContentTaskCodeCompilerComponent = new ContestContentTaskCodeCompilerComponent(this, this.elHTML.find(".contestContentTaskCodeUpload"), null);
		this.objComponents.ContestContentTaskCodeFileComponent = new ContestContentTaskCodeFileComponent(this, this.elHTML.find(".contestContentTaskCodeUpload"), null);

		this.ready(true);
	}
}
class ContestContentTaskCodeCompilerComponent extends Component {
	constructor(objParent, root, updateDelay, objOther) {
		super(objParent, root, updateDelay);
		this._strCompiler;
		this._arrAllCompilers = [];
		//CSS
		this.elCSS = $("head").append("<link id='contestContentTaskCodeCompiler' href='/js/engine/components/contest/content/task/code/compiler/compiler.css' rel='stylesheet'>").find("#contestContentTaskCodeCompiler");

		//JS Handlers
		this.objHandlers["inputClick"] = {
			strEvent: "click",
			strSelector: ".contestContentTaskCodeCompiler > input[type=button]",
			objData: { component: this },
			funcHandler: function (e) {
				let component = e.data.component;
				$(this).remove();
				component.elHTML.append("<div class='contestContentTaskCodeCompilerList' style='opacity: 0'> </div>");
				component._arrAllCompilers.forEach(function (strCompiler) {
					this.elHTML.find(".contestContentTaskCodeCompilerList").append(`<input type='button' value='${strCompiler}'>`);
				}, component)
				component.elHTML.find(".contestContentTaskCodeCompilerList").animate({ opacity: 1 }, 200);
			}
		};
		this.objHandlers["compilerClick"] = {
			strEvent: "click",
			strSelector: ".contestContentTaskCodeCompilerList > input[type=button]",
			objData: { component: this },
			funcHandler: function (e) {
				let component = e.data.component;
				$(this).remove();
				component.compiler($(this).val());
				component.elHTML.find(".contestContentTaskCodeCompilerList").remove();
				component.elHTML.append(`<input type='button' value='${$(this).val()}' style='opacity: 0'>`);
				component.elHTML.find("input[type=button]").animate({ opacity: 1 }, 200);
			}
		};

		//HTML Preload
		this.preload();

	}

	compiler(strCompiler = null) {
		if (strCompiler != null) {
			if (this._strCompiler != strCompiler) {
				this._strCompiler = strCompiler;
				let component = window.engine.objPage.findComponent("ContestContentTaskCodeComponent");
				switch (this._strCompiler) {
					case "Python 3.8":
						component.codemirror.setOption("mode", "text/x-python");
						break;
					case "GNU C++ 17":
						component.codemirror.setOption("mode", "text/x-c++src");
						break;
                }
			}
		} else {
			return this._strCompiler;
        }
    }

	preload() {
		let html = "<div class='contestContentTaskCodeCompiler'> <input type='button' value=''> </div>";
		this.elHTML = this.elRoot.prepend(html).find(".contestContentTaskCodeCompiler");
		window.engine.newAJAX("/php/API.php", { "component": "contestContentTaskCodeCompiler", "type": 0, "data": {} },
			function (json) {
				let component = window.engine.objPage.findComponent("ContestContentTaskCodeCompilerComponent");
				switch (json["exit"]) {
					case -1:
						window.engine.autherizationError();
						break;
					case 0:
						component._arrAllCompilers = json.data.compilers;
						component.compiler(component._arrAllCompilers[0]);
						component.elHTML.find("input[type=button]").val(component.compiler());
						component.ready(true);
						break;
				}
			});
	}
}
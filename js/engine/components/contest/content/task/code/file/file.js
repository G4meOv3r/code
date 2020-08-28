class ContestContentTaskCodeFileComponent extends Component {
	constructor(objParent, root, updateDelay, objOther) {
		super(objParent, root, updateDelay);
		//CSS
		this.elCSS = $("head").append("<link id='contestContentTaskCodeFile' href='/js/engine/components/contest/content/task/code/file/file.css' rel='stylesheet'>").find("#contestContentTaskCodeFile");

		//JS Handlers
		this.objHandlers["buttonClick"] = {
			strEvent: "click",
			strSelector: ".contestContentTaskCodeFile input[type=button]",
			objData: { component: this },
			funcHandler: function (e) {
				$(".contestContentTaskCodeFile input[type=file]").click();
			}
		};
		this.objHandlers["fileChange"] = {
			strEvent: "change",
			strSelector: ".contestContentTaskCodeFile input[type=file]",
			objData: { component: this },
			funcHandler: function (e) {
				let fr = new FileReader();
				fr.onload = function (e) {
					let component = window.engine.objPage.findComponent("ContestContentTaskCodeComponent");
					component.codemirror.setValue(e.target.result);
				};
				fr.readAsText(this.files[0]);
				$(this).val("");
			}
		};
		//HTML Preload
		this.preload();

	}

	preload() {
		let html = "<div class='contestContentTaskCodeFile'> <input type='file' name='solution'> <input type='button' value='Загрузить файл'> </div>";
		this.elHTML = this.elRoot.prepend(html).find(".contestContentTaskCodeFile");

		this.ready(true);
	}
}
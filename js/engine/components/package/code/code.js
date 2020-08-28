class PackageCodeComponent extends Component {
	constructor(objParent, root, updateDelay, objOther) {
		super(objParent, root, updateDelay);
		this._numTaskNumber = objOther.numTaskNumber;
		this.codemirror;
		//CSS
		this.elCSS = $("head").append("<link id='packageCode' href='/js/engine/components/package/code/code.css' rel='stylesheet'>").find("#packageCode");

		//JS Handlers

		//HTML Preload
		this.preload();

	}

	preload() {
		let html = "<div class='packageCode' style='opacity: 0'> <textarea id='codemirror'>" + code + "</textarea> </div>";
		this.elHTML = this.elRoot.append(html).find(".packageCode");

		//Other Components
		this.codemirror = CodeMirror.fromTextArea(document.getElementById("codemirror"), {
			mode: "text/x-python",
			lineNumbers: true,
			theme: "rosecode", 
			tabSize: 4,
		});

		this.ready(true);
	}
}
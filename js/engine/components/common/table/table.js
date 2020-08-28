class TableComponent extends Component {
	constructor(objParent, root, updateDelay, objOther) {
		super(objParent, root, updateDelay, objOther);
		this.objColumns = objOther.objColumns;
		//CSS
		this.elCSS = $("head").append("<link id='table' href='/js/engine/components/common/table/table.css' rel='stylesheet'>").find("#table");

		//JS Handlers

		//HTML Preload
		this.preload();
	}

	preload() {
		let html = "";
		html += "<table class='table'> <tr> </tr> </table>";
		this.elHTML = this.elRoot.append(html).find(".table");
		for (let strColumnName in this.objColumns) {
			$(this.elHTML.find("tr")[0]).append(`<th name='${strColumnName}'> ${this.objColumns[strColumnName]} </th>`);
        }
		this.ready(true);
	}



}
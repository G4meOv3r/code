class TableRowCellComponent extends Component {
	constructor(objParent, root, updateDelay, objOther) {
		super(objParent, root, updateDelay, objOther);
		this.strValue = objOther.strValue;
		//CSS

		//JS Handlers

		//HTML Preload
		this.preload();
	}

	value(strValue = null, funcCallback = function () { }, ...args) {
		if (strValue != null) {
			this.show(false, function () {
			})
		} else {
			return this.strValue;
        }
    }

	preload() {
		let html = "";
		html += `<td> ${this.strValue} </td>`;
		this.elHTML = this.elRoot.append(html).find(".table");
		this.ready(true);
	}



}
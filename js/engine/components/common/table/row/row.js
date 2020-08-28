class TableRowComponent extends Component {
	constructor(objParent, root, updateDelay, objOther) {
		super(objParent, root, updateDelay, objOther);
		this.objCells = objOther.objCells;
		//CSS

		//JS Handlers

		//HTML Preload
		this.preload();
	}

	cells(objCells = null, funcCallback = function () { }, ...args) {
		if (objCells != null) {
			for (strCellName in objCells) {
				if (this.objCells[strCellName] != objCells[strCellName]) {
					this.elHTML.find(`td[name=${strCellName}]`).animate({ opacity: 0 }, 200);

                }
            }
		} else {
			return this.objCells;
        }
    }

	preload() {
		let html = "";
		html += "<tr> </tr>";
		this.elHTML = this.elRoot.append(html).find(".tr");
		for (let strCellName in this.objCells) {
			this.elHTML.append(`<td name='${strCellName}'> ${this.objCells[strCellName]} </td>`);
		}
		this.ready(true);
	}



}
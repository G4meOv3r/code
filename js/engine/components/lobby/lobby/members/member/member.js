class LobbyMembersMemberComponent extends Component {
	constructor(objParent, root, updateDelay, objOther) {
		super(objParent, root, updateDelay, objOther);
		this.numComponentNumber = objOther.numComponentNumber;
		this._strId = "";
		this._strName = "";
		this._strAvatar = "";
		this._numRank = 0;

		//CSS
		this.elCSS = $("head").append("<link id='lobbyMembersMember" + this.numComponentNumber + "' href='/js/engine/components/lobby/lobby/members/member/member.css' rel='stylesheet'>").find("#lobbyMembersMember" + this.numComponentNumber);

		//JS Handlers
		this.objHandlers["memberMouseenter"] = {
			strEvent: "mouseenter",
			strSelector: ".lobbyMembersMember",
			objData: {},
			funcHandler: function () {
				$(this).find("img").css("box-shadow", "0 0 5px var(--primary-color)");
			}
		}
		this.objHandlers["memberMouseleave"] = {
			strEvent: "mouseleave",
			strSelector: ".lobbyMembersMember",
			objData: {},
			funcHandler: function () {
				$(this).find("img").css("box-shadow", "0 0 0px var(--primary-color)");
			}
		}
		this.objHandlers["memberClick"] = {
			strEvent: "click",
			strSelector: ".lobbyMembersMember",
			objData: {},
			funcHandler: function () {
				window.engine.newRequest("/profile/" + $(this).attr("name"));
			}
		}

		//HTML Preload
		this.preload();
	}

	get id() {
		return this._strId;
	}
	set id(strId) {
		if (this._strId != strId) {
			this._strId = strId;
			this.elHTML.attr("name", this._strName);
		}
		return this._strId;
    }

	get name() {
		return this._strName;
    }
	set name(strName) {
		if (this._strName != strName) {
			this._strName = strName;
			this.elHTML.find("h1").css("opacity", 0);
			setTimeout(function (objComponent) {
				objComponent.elHTML.find("h1").html(objComponent._strName);
				objComponent.elHTML.find("h1").css("opacity", 1);
			}, 200, this);
		}
		return this._strName;
    }

	get avatar() {
		return this._strAvatar;
	}
	set avatar(strAvatar) {
		if (this._strAvatar != strAvatar) {
			this._strAvatar = strAvatar;
			this.elHTML.find("img").css("opacity", 0);
			setTimeout(function (objComponent) {
				objComponent.elHTML.find("img").attr("href", objComponent._strAvatar);
				objComponent.elHTML.find("img").css("opacity", 1);
			}, 200, this);
		}
		return this._strAvatar;
	}

	get rank() {
		return this._numRank;
	}
	set rank(numRank) {
		if (this._numRank != numRank) {
			this._numRank = numRank;
			this.elHTML.find("h2").css("opacity", 0);
			setTimeout(function (objComponent) {
				objComponent.elHTML.find("h2").html(objComponent._numRank);
				objComponent.elHTML.find("h2").css("opacity", 1);
			}, 200, this);
		}
		return this._numRank;
    }

	get entity() {
		return { strId: this._strId, strName: this._strName, strAvatar: this._strAvatar, numRank: this._numRank }
	}
	set entity(objEntity) {
		this.id = objEntity.strId;
		this.name = objEntity.strName;
		this.avatar = objEntity.strAvatar;
		this.rank = objEntity.numRank;

		return this.entity;
    }

	preload() {
		let html = "<div id='lobbyMembersMember" + this.numComponentNumber + "' class='lobbyMembersMember' style='opacity: 0'> <img href=''> <h1> </h1> <h2> </h2> </div>";
		this.elHTML = this.elRoot.append(html).find("#lobbyMembersMember" + this.numComponentNumber);

		if (this.objOther.objEntity) {
			this.entity = this.objOther.objEntity;
		}

		this.ready(true);
	}

	update(component) {
		this.show(false);
		setTimeout(() => super.remove(), 400);
    }
}
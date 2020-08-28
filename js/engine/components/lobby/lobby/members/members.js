class LobbyMembersComponent extends Component {
	constructor(objParent, root, updateDelay) {
		super(objParent, root, updateDelay);
		this.numMembersCount = 0;

		//CSS
		this.elCSS = $("head").append("<link id='lobbyMembers' href='/js/engine/components/lobby/lobby/members/members.css' rel='stylesheet'>").find("#lobbyMembers");

		//JS Handlers
		this.objHandlers["membersRightClick"] = {
			strEvent: "contextmenu",
			strSelector: ".lobbyMembers",
			objData: {},
			funcHandler: function () {
			}
		}

		//HTML Preload
		this.preload();
	}

	get members() {
		let arrMembers = [];
		for (let numMemberNumber = 0; numMemberNumber < this.numMembersCount; numMemberNumber++) {
			arrMembers.push(this.objComponents["LobbyMembersMemberComponent" + numMemberNumber]);
        }
		return arrMembers;
	}
	set members(arrMembers) {
		if (arrMembers.length > this.numMembersCount) {
			for (let numMemberNumber = 1; numMemberNumber <= arrMembers.length; numMemberNumber++) {
				if (numMemberNumber <= this.numMembersCount) {
					this.objComponents["LobbyMembersMemberComponent" + numMemberNumber].entity = arrMembers[numMemberNumber - 1];
				} else {
					this.objComponents["LobbyMembersMemberComponent" + numMemberNumber] = new LobbyMembersMemberComponent(this, this.elHTML, null, { numComponentNumber: numMemberNumber, objEntity: arrMembers[numMemberNumber - 1] });
					this.numMembersCount++;
				}
			}
		} else {
			for (let numMemberNumber = 1; numMemberNumber <= this.numMembersCount; numMemberNumber++) {
				if (numMemberNumber <= arrMembers.length) {
					this.objComponents["LobbyMembersMemberComponent" + numMemberNumber].entity = arrMembers[numMemberNumber - 1];
				} else {
					this.removeComponent("LobbyMembersMemberComponent" + numMemberNumber);
					this.numMembersCount--;
				}
			}
        }
		return this.members;
    }

	preload() {
		let html = "<div class='lobbyMembers' style='opacity: 0'> </div>";
		this.elHTML = this.elRoot.append(html).find(".lobbyMembers");

		this.ready(true);
	}

	update(component) {

    }
}
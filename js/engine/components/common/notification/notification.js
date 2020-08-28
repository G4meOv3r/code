class NotificationComponent extends Component {
	constructor(objParent, root, updateDelay, objOther) {
		super(objParent, root, updateDelay, objOther);
		//CSS
		this.elCSS = $("head").append("<link id='notification' href='/js/engine/components/common/notification/notification.css' rel='stylesheet'>").find("#notification");

		//JS Handlers
		this.objHandlers["notificationClick"] = {
			strEvent: "click",
			strSelector: ".notification",
			objData: { component: this },
			funcHandler: function (e) {
				let component = e.data.component;
				clearTimeout(component.objTimeouts.timer)
				component.show(false, function (args) {
					let elHTML = $(args[0]);
					elHTML.css("display", "none");
				}, this);
			}
		};

		//HTML Preload
		this.preload();
	}

	success(strSuccess) {
		this.message(strSuccess, "success");
	}

	error(strError) {
		this.message(strError, "error");
    }

	message(strMessage, strMessageType = "message") {
		this.show(false, function (args) {
			let strMessage = args[0];
			let strMessageType = args[1];
			let component = args[2];
			component.elHTML.removeClass("success");
			component.elHTML.removeClass("message");
			component.elHTML.removeClass("error");
			component.elHTML.addClass(strMessageType);


			component.elHTML.find(".notificationInner").html('');
			component.elHTML.find(".notificationInner").append(strMessage);

			component.elHTML.css("display", "flex");
			component.elHTML.find(".notificationStatus").css("width", "0%");
			component.elHTML.find(".notificationStatus").stop().animate({ "width": "100%" }, 4000);

			clearInterval(component.objTimeouts.timer);
			component.objTimeouts.timer = setTimeout(function (component) {
				component.elHTML.click();
			}, 4000, component);
			component.show(true);
		}, strMessage, strMessageType, this)
    }

	preload() {
		let html = "<div class='notification' style='display: none; opacity: 0;'> <div class='notificationStatus'> </div> <div class='notificationInner'> </div> </div>";
		this.elHTML = this.elRoot.append(html).find(".notification");
		this._bReady = true;
	}



}
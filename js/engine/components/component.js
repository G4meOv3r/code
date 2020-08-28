class Component {
	constructor(objParent = window.engine.objPage, elRoot = $("body"), numUpdateDelay = null, objOther = {}) {
		this.objParent = objParent;
		this.elRoot = elRoot;
		this.elHTML;
		this.elCSS;

		this.numUpdateDelay = numUpdateDelay;

		this._bReady = false;
		this._bActive = true;
		this._bShow = false;
		this._bHandlers = false;
		this._bUpdating = false;

		this.objComponents = {};
		this.objIntervals = {};
		this.objTimeouts = {};
		this.objHandlers = {};
		this.objOther = objOther;
		/* .. Other Variables .. */
	}

	show(bShow = null, funcCallback = function () { }, ...args) {
		if (bShow != null) {
			if (this._bShow != bShow) {
				this._bShow = bShow;
				this.handlers(true);
				if (this._bShow) {
					this.elHTML.animate({ "opacity": "1" }, 200);
				} else {
					this.elHTML.animate({ "opacity": "0" }, 200);
				}
				setTimeout(funcCallback, 200, args);
			} else {
				funcCallback(args);
            }
			return this._bShow;
		} else {
			return this._bShow;
        }
    }

	ready(bReady = null, funcCallback = function () { }, ...args) {
		if (bReady != null) {
			if (this._bReady != bReady) {
				if (bReady) {
					let bComponentsReady = true;
					for (let strComponentName in this.objComponents) {
						let objComponent = this.objComponents[strComponentName];
						bComponentsReady = (bComponentsReady && objComponent.ready());
						if (!bComponentsReady) {
							break;
						}
					}
					if (bComponentsReady) {
						this._bReady = bReady;
						this.objParent.ready(true);
						this.updating(true);
						this.show(true, funcCallback, args);
					} else {
                    }
				} else {
					this._bReady = bReady;
					this.updating(false);
					this.show(false, funcCallback, args);
                }
			} else {
				funcCallback(args);
            }
			return this._bReady;
		} else {
			return this._bReady;
		}
	}

	active(bActive = null, funcCallback = function () { }, ...args) {
		if (bActive != null) {
			if (this._bActive != bActive) {
				this._bActive = bActive;
				if (this._bActive) {
					this.elHTML.find("input").prop("disabled", false);
					this.handlers(true);
					this.elHTML.animate({ "opacity": "1" }, 200);
				} else {
					this.elHTML.find("input").prop("disabled", true);
					this.handlers(false);
					this.elHTML.animate({ "opacity": "0.7" }, 200);
				}
				setTimeout(funcCallback, 200, args);
			} else {
				funcCallback(args);
            }
			return this._bActive;
		} else {
			return this._bActive;
        }
    }

	handlers(bHandlers = null) {
		if (bHandlers != null) {
			if (this._bHandlers != bHandlers) {
				this._bHandlers = bHandlers;
				for (let strHandlerName in this.objHandlers) {
					let objHandler = this.objHandlers[strHandlerName];
					if (this._bHandlers) {
						$("body").off(objHandler.strEvent, objHandler.strSelector).on(objHandler.strEvent, objHandler.strSelector, objHandler.objData, objHandler.funcHandler);
					} else {
						$("body").off(objHandler.strEvent, objHandler.strSelector);
					}
				}
            }
			return this._bHandlers;
		} else {
			return this._bHandlers;
        }
    }

	updating(bUpdating = null) {
		if (bUpdating != null) {
			if (this._bUpdating != bUpdating) {
				if (this.numUpdateDelay) {
					this._bUpdating = bUpdating;
					if (this._bUpdating) {
						this.objIntervals.update = setInterval(this.update, this.numUpdateDelay, this);
					} else {
						clearInterval(this.objIntervals["update"]);
					}
				}
			}
			return this._bUpdating;
		} else {
			return this._bUpdating;
		}
	}

	remove() {
		//Remove Timeouts
		for (let timeout in this.objTimeouts) {
			clearTimeout(this.objTimeouts[timeout]);
			delete this.objTimeouts[timeout];
		}
		//Remove Intervals
		for (let interval in this.objIntervals) {
			clearInterval(this.objIntervals[interval]);
			delete this.objIntervals[interval];
		}

		//Remove Components
		for (let component in this.objComponents) {
			this.objComponents[component].remove();
		}

		//Remove This
		this.elHTML.remove();
		this.elCSS.remove();
		this.handlers(false);
    }

	removeComponent(strComponentName) {
		this.objComponents[strComponentName].remove();
		delete this.objComponents[strComponentName];
    }

	replace(clsComponent, objOther = {}) {
		this.remove();
		return new clsComponent(this.objParent, this.elRoot, this.numUpdateDelay, objOther);
    }

	replaceComponent(strComponentName, clsComponent, objOther = {}) {
		let component = this.objComponents[strComponentName].replace(clsComponent, objOther);
		delete this.objComponents[strComponentName];
		return component;
	}

	findComponent(strComponentName) {
		let arrResult = [];
		if (this.objComponents[strComponentName]) {
			arrResult.push(this.objComponents[strComponentName]);
		}
		for (let strThisComponentName in this.objComponents) {
			arrResult = arrResult.concat(this.objComponents[strThisComponentName].findComponent(strComponentName));
		}
		return arrResult;
    }

	preload() {
    }

	update() {
    }
}
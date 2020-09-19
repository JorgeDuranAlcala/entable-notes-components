export class EventEmitter {
	events:any = {};
	constructor() {
		this.events = {};
	}

	_getEventListByName(eventName:string) {
		if (typeof this.events[eventName] === 'undefined') {
			this.events[eventName] = new Set();
		}
		return this.events[eventName];
	}

	on(eventName:string, fn: Function) {
		this._getEventListByName(eventName).add(fn);
	}

	once(eventName:string, fn: Function) {
		const self = this;

		const onceFn = (...args:any) => {
			self.removeListener(eventName, onceFn);
			fn.apply(self, args);
		};
		this.on(eventName, onceFn);
	}

	emit(eventName:string, ...args:any) {
		this._getEventListByName(eventName).forEach(
			// eslint-disable-next-line func-names
			function(fn: Function) {
				// @ts-ignore
				fn.apply(this, args);
			}.bind(this)
		);
	}

	removeListener(eventName:string, fn:Function) {
		this._getEventListByName(eventName).delete(fn);
	}
}
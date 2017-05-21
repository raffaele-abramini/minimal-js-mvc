export default {
	listen(DOMElem, controllerInstance){
		const eventsMap = controllerInstance.properties.__eventsMap;

		eventsMap.forEach(event => {
			if(!this._isFunction(event.method, controllerInstance)) return;

			DOMElem.querySelector(`[_id="${event.id}"]`)
				.addEventListener('click', controllerInstance[event.method].bind(controllerInstance))
		})
	},

	_isFunction(methodName, instance){
		return typeof instance[methodName] !== 'function';
	}
}
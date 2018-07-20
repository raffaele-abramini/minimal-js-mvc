/*
 Helper for attaching events to rendered html.

 It requires the controller instance to have a properties.__eventsMap property.
*/

export default {
  /**
   * Attach events listeners to dom elements following a pre-defined eventsMap object.
   * @param DOMElem DOMElement
   * @param controllerInstance Controller
   */
  listen(DOMElem, controllerInstance) {
    const eventsMap = controllerInstance.properties.__eventsMap
    eventsMap.forEach((event) => {
      if (!this._isFunction(event.method, controllerInstance)) return

      DOMElem.querySelector(`[_id="${event.id}"]`)
        .addEventListener(
          event.name,
          controllerInstance[event.method].bind(controllerInstance),
        )
    })
  },

  /**
   * Check if a variable is a function.
   * @param methodName String
   * @param controllerInstance Controller
   * @returns {boolean}
   * @private
   */
  _isFunction(methodName, controllerInstance) {
    return typeof controllerInstance[methodName] === 'function'
  },
}

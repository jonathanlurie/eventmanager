/**
 * This is borrowed from https://gist.github.com/jed/982883
 * because the uuid most popular package is using a node dep
 */

 function b(
  a                  // placeholder
){
  return a           // if the placeholder was passed, return
    ? (              // a random number from 0 to 15
      a ^            // unless b is 8,
      Math.random()  // in which case
      * 16           // a random number from
      >> a/4         // 8 to 11
      ).toString(16) // in hexadecimal
    : (              // or otherwise a concatenated string:
      [1e7] +        // 10000000 +
      -1e3 +         // -1000 +
      -4e3 +         // -4000 +
      -8e3 +         // -80000000 +
      -1e11          // -100000000000,
      ).replace(     // replacing
        /[018]/g,    // zeroes, ones, and eights with
        b            // random hex digits
      )
}

function b(a){
  return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)
}

/**
 * The EventManager deals with events, create them, call them.
 * This class is mostly for being inherited from.
 */
class EventManager {
  /**
   * Constructor
   * @param {boolean} enabled - if true (default), the events emitting is enabled, if false, they won't be fired.
   */
  constructor(enabled=true) {
    this._events = {};
    this._enabled = enabled;

    // by event hash, stores the even name and the callback, in order to remove it
    // efficiently
    this._eventIndex = {};
  }


  /**
   * This way, the events are not emitted
   */
  disableEvents() {
    this._enabled = false;
  }


  /**
   * This way, the events are properly emitted
   */
  enableEvents() {
    this._enabled = true;
  }

  /**
   * Define an event, with a name associated with a function
   * @param  {String} eventName - Name to give to the event
   * @param  {Function} callback - function associated to the even
   * @return {string|null} the eventId (useful to remove it) or null if the event couldnt be added
   */
  on(eventName, callback) {
    if (typeof callback === 'function') {
      if (!(eventName in this._events)) {
        this._events[eventName] = [];
      }

      let eventId = b();
      this._eventIndex[eventId] = {
        eventName: eventName,
        callback: callback
      };

      this._events[eventName].push(eventId);

      return eventId
    } else {
      console.warn('The callback must be of type Function');
    }

    return null
  }


  emit(eventName, args = []) {
    if(!this._enabled){
      return
    }

    // the event must exist and be non null
    if ((eventName in this._events) && (this._events[eventName].length > 0)) {
      const events = this._events[eventName];
      for (let i = 0; i < events.length; i += 1) {
        this._eventIndex[events[i]].callback(...args);
      }
    }
  }


  /**
   * Delete an event using its id
   * @param {string} id - id of the event (returned by the `.on()` method)
   */
  delete(eventId) {
    if(!(eventId in this._eventIndex)){
      console.log(`No event of id ${eventId}.`);
      return
    }

    // array of events of the same name as eventId
    let eventOfSameName = this._events[this._eventIndex[eventId].eventName];
    let index = eventOfSameName.indexOf(eventId);

    delete this._eventIndex[eventId];

    if(index !== -1) {
      eventOfSameName.splice(index, 1);
    }
  }


}

export default EventManager;
//# sourceMappingURL=eventmanager.js.map

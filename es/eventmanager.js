/**
 * This is borrowed from https://gist.github.com/jed/982883
 * because the uuid most popular package is using a node dep
 */

function uuidv4(a){
  return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuidv4)
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
   * Tells how many events are registered under this event name
   * @return {number}
   */
  countEvents(eventName){
    if(eventName in this._events){
      return this._events[eventName].length
    }else{
      return 0
    }
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

      let eventId = uuidv4();
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


  /**
   * Emit the event, run the functions attached to it
   * @param {string} eventName - the name of the event to run
   * @param {Array} args - array of arguments the event callbacks are going to be called with (with destructuring operator)
   */
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
   * Emit the event, run the functions attached to it in a async fashion
   * @param {string} eventName - the name of the event to run
   * @param {Array} args - array of arguments the event callbacks are going to be called with (with destructuring operator)
   */
   async emitAsync(eventName, args = []) {
    if(!this._enabled){
      return
    }

    // the event must exist and be non null
    if ((eventName in this._events) && (this._events[eventName].length > 0)) {
      const events = this._events[eventName];
      for (let i = 0; i < events.length; i += 1) {
        await this._eventIndex[events[i]].callback(...args);
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

    if(eventOfSameName.length === 0){
      delete this._events[this._eventIndex[eventId].eventName];
    }
  }


}

export default EventManager;
//# sourceMappingURL=eventmanager.js.map

// eventManager.js

const EventEmitter = require("events");
const eventStore = require("./eventStore");

class EventManager extends EventEmitter {
  emit(eventName, data) {
    eventStore.increment(eventName);
    return super.emit(eventName, data);
  }
}

module.exports = new EventManager();

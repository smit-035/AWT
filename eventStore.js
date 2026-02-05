// eventStore.js

class EventStore {
  constructor() {
    this.eventCounts = {};
  }

  increment(eventName) {
    if (!this.eventCounts[eventName]) {
      this.eventCounts[eventName] = 0;
    }
    this.eventCounts[eventName]++;
  }

  getSummary() {
    return this.eventCounts;
  }
}

module.exports = new EventStore();

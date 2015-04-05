var events = require('events');
var util = require('util');
var debug = require('debug')('schedule:job');

/**
 * Job contstructor
 */
var Job = function Job(name, fn, rate) {
    "use strict";

    // job unique name
    this.name = name;
    // time between executions
    this.rate = rate;
    // job interval timer
    this.interval = null;
    // total process jobs
    this.count = 0;

    function process() {
        fn();
        // emit events
        this.emit('tick', this);
        // debug
        debug('process tick for %s:%s at %s', this.name, this.count, Date.now());
    }

    this.interval = setInterval(process.bind(this), rate);
}
util.inherits(Job, events.EventEmitter);

module.exports = Job;

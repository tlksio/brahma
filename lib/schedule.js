var events = require('events');
var util = require('util');
var debug = require('debug')('schedule');

var Job = require('./job');

/**
 * Schedule constructor
 */
var Schedule = function Schedule() {
    "use strict";

    // persist active jobs
    var jobs = {};

    // total process ticks
    this.count = 0;

    /**
     * Starts a job
     *
     * Adds a new job to the list of active jobs
     * Installs a rate interval for job execution
     *
     * @param name  string      unique job name
     * @param fn    function    callback job function to process
     * @param rate  int         time rate delay execution
     */
    this.start = function(name, fn, rate) {
        // create job object
        var job = new Job(name, fn, rate);
        // add job to schedule
        jobs[name] = job;
        // emit events
        this.emit('schedule', job);
        // debug
        debug('start %s, rate:%sms', name, rate);
        return this;
    };

    /**
     * Lists active job names
     */
    this.list = function() {
        return Object.keys(jobs);
    };

    /**
     * Stops an active job
     *
     * Removes a job from the list of active jobs by its name
     * Uninstalls the rate interval job execution
     *
     * @param name  string  unique job name
     */
    this.stop = function(name) {
        // get the job
        var job = jobs[name];
        // clear job's timer
        clearInterval(job.interval);
        // delete job
        delete jobs[name];
        // emit events
        this.emit('stop', job);
        // debug
        debug('stop %s', name);
        return this;
    };

    /**
     * Reset schedule instance
     *
     * Stops all active jobs
     */
    this.reset = function() {
        // stop all jobs
        var list = this.list();
        list.forEach(this.stop, this);
        // emit events
        this.emit('reset');
        // debug
        debug('reset');
        return this;
    };
}
util.inherits(Schedule, events.EventEmitter);

module.exports = Schedule;

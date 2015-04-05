var should = require("should");
var Schedule = require('../lib/schedule');

describe('Scheduler', function() {

    var _1sec = 1000;

    var schedule;

    before(function(done) {
        schedule = new Schedule();
        done();
    });

    it('should have 0 processed jobs', function(done) {
        should.equal(0, schedule.count);
        done();
    });

    it('should not have any active jobs', function(done) {
        var list = schedule.list();
        list.should.be.empty;
        done();
    });

    describe('Add a job "sample-job"', function() {

        before(function(done) {
            var fn = function() {};
            schedule.start('sample-job', fn, _1sec);
            done();
        });

        it('should have one active job', function(done) {
            var list = schedule.list();
            list.should.have.length(1);
            done();
        });

        it('job should be named "sample-job"', function(done) {
            var list = schedule.list();
            list.should.containEql('sample-job');
            done();
        });

    });

    describe('Add additional jobs', function() {

        before(function(done) {
            var fn = function() {};
            schedule.start('sample-job-2', fn, _1sec);
            schedule.start('sample-job-3', fn, _1sec);
            schedule.start('sample-job-4', fn, _1sec);
            done();
        });

        it('should have 4 active job', function(done) {
            var list = schedule.list();
            list.should.have.length(4);
            done();
        });

    });

    /*
    describe('Stop job "sample-job"', function() {

        before(function(done) {
            var fn = function() {};
            schedule.stop('sample-job', fn, 1000);
            done();
        });

        it('should have 3 active jobs', function(done) {
            var list = schedule.list();
            list.should.have.length(3);
            done();
        });

        it('should not contain "sample-job"', function(done) {
            var list = schedule.list();
            list.should.not.containEql('sample-job');
            done();
        });

    });
    */

    describe('Reset scheduler', function(done) {

        before(function(done) {
            schedule.reset();
            done();
        });

        it('should have 0 active jobs', function(done) {
            var list = schedule.list();
            list.should.have.length(0);
            done();
        });

    });

    /*
    describe('1 job that wait for 5 seconds', function() {

        before(function(done) {
            this.timeout(0);
            var fn = function() { };
            schedule.start('sample-job', fn, 1000);
            setTimeout(function() { done(); }, 5000);
        });

        it('should have 1 active jobs', function(done) {
            var list = schedule.list();
            list.should.have.length(1);
            done();
        });

        it('should have 4 executions', function(done) {
            should.equal(4, schedule.count);
            done();
        });

        it('job should have 4 executions', function(done) {
            var job = schedule.jobs['sample-job'];
            should.equal(4, job.count);
            done();
        });

    });

    /*
    describe('3 jobs waiting for 5 seconds', function() {

        before(function(done) {
            schedule.reset();
            this.timeout(0);
            var fn = function() { };
            schedule.start('sample-job-1', fn, 1000);
            schedule.start('sample-job-2', fn, 1000);
            schedule.start('sample-job-3', fn, 1000);
            setTimeout(function() { done(); }, 5000);
        });

        it('should have 3 active jobs', function(done) {
            var list = schedule.list();
            list.should.have.length(3);
            done();
        });

        it('should have 12 executions', function(done) {
            should.equal(12, schedule.count);
            done();
        });

        it('job should have 4 executions', function(done) {
            var job1 = schedule.jobs['sample-job-1'];
            var job2 = schedule.jobs['sample-job-2'];
            var job3 = schedule.jobs['sample-job-3'];
            should.equal(4, job1.count);
            should.equal(4, job2.count);
            should.equal(4, job3.count);
            done();
        });

    });
    */

});

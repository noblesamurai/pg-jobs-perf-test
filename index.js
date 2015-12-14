var jobs = require('pg-jobs')({ db: process.env.DATABASE_URL }),
    async = require('async'),
    grand = require('grand');

var q = async.queue(function(task, callback) {
  jobs.create(task, null, callback);
}, 20);

for (var i = 0; i < process.env.NUM_JOBS; i++) {
  var payload = {
    name: grand.name(),
    locale: grand.locale(),
    email: grand.emailAddress(),
    things: {
      one: grand.sentence(20),
      two: grand.sentence(20),
      three: grand.sentence(30),
      four: grand.sentence(100)
    },
    timezone: grand.timezone()
  };

  q.push(payload);
}

q.drain = function() {
  console.log('all items have been processed');
};

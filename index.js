var jobs = require('pg-jobs')({ db: process.env.DATABASE_URL }),
    async = require('async'),
    uuid = require('uuid')

var q = async.queue(function(task, callback) {
  jobs.create(task, null, callback);
}, 20);

for (var i = 0; i < process.env.NUM_JOBS; i++) {
  var payload = {
    name: uuid.v4(),
    locale: uuid.v4(),
    email: uuid.v4(),
    things: {
      one: uuid.v4(),
      two: uuid.v4(),
      three: uuid.v4(),
      four: uuid.v4()
    },
    timezone: uuid.v4()
  };

  q.push(payload);
}

q.drain = function() {
  console.log('all items have been processed');
};

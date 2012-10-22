
loader.register('tests/ember-skeleton_tests', function(require) {
require('ember-skeleton/core');

module("ember-skeleton");

test("App is defined", function () {
  ok(typeof App !== 'undefined', "App is undefined");
});

});

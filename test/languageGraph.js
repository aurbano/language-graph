var should = require('should');

describe('Languages Graph', function() {
  it('Should use valid JSON data', function(done) {
    try {
      var data = require('../data/languages.json');
      done();
    } catch (e) {
      done(e);
    }
  });

  it('Should not have duplicate languages/categories', function(done) {
    try {
      var data = require('../data/languages.json'),
        languages = [],
        categories = [];

      function walkData(lang) {
        if (lang.type === 'language') {
          var found = languages.indexOf(lang.name);
          found.should.be.below(0);
          if (found < 0) {
            languages.push(lang.name);
            if (lang.children) {
              lang.children.forEach(function(child) {
                walkData(child);
              });
            }
          }
        } else {
          var found = categories.indexOf(lang.name);
          found.should.be.below(0);
          if (found < 0) {
            categories.push(lang.name);
            if (lang.children) {
              lang.children.forEach(function(child) {
                walkData(child);
              });
            }
          }
        }
      }

      walkData(data);

      done();
    } catch (e) {
      done(e);
    }
  });
});

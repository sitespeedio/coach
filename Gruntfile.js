var combine = require('./lib/dom/combine');
var bookmarklet = require('./lib/dom/bookmarklet');
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bookmarklet_wrapper: {
      default_options: {
        files: {
          'dist/coach.bookmarklet.js': ['dist/bookmarklet.js']
        }
      }
    },
    uglify: {
      options: {
        // banner: '/*! Sitespeed.io <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
        mangle: true,
        compress: {negate_iife:false}
      },
      dist: {
        files: {
          'dist/coach.min.js': ['dist/coach.js']
        }
      }
    },
    eslint: {
      target: ['lib/dom/*/**.js']
    },
    'http-server': {
        dev: {
            root: "test/http-server",
            port: 8282,
            host: "0.0.0.0",
            cache: 10, // seconds
            showDir : false,
            // server default file extension
            ext: "html",
            runInBackground: true,
            logFn: function() { },
            openBrowser : false
        }
    },
    mochacli: {
      api: ["test/api/*Tests.js"],
      combined: ["test/dom/combinedTest.js"],
      advice: ["test/dom/adviceTest.js"],
      dom: ["test/dom/**/*Test.js"],
      har: ["test/har/performance/*Test.js"],
      all: ["test/dom/adviceTest.js", "test/dom/*/*Test.js", "test/api/*/*Tests.js", "test/har/performance/*Test.js","test/merge/*Test.js", "test/dom/combinedTest.js"]
    },
   jsdoc : {
        dist : {
            src: ['README.md','lib/dom/**/*.js'],
            options: {
                destination: 'dist/doc'
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks("grunt-mocha-cli");
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-bookmarklet-wrapper');

  grunt.registerTask('default', ['eslint', 'combine', 'uglify', 'bookmarklet','http-server','mochacli','jsdoc']);

  grunt.registerTask('dom', ['combine', 'uglify']);
  grunt.registerTask('test', ['http-server','mochacli']);

  grunt.registerTask('combine', 'Combine all the javascripts', function() {
    grunt.file.mkdir('dist');
    combine('dist/coach.js');
  });

  grunt.registerTask('create-bookmarklet', 'Create the bookmarklet', function() {
    grunt.file.mkdir('dist');
    bookmarklet('dist/bookmarklet.js');
  });

  grunt.registerTask('bookmarklet', ['create-bookmarklet', 'bookmarklet_wrapper']);

};

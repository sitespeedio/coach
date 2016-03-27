var combine = require('./lib/dom/combine'),
  bookmarklet = require('./lib/dom/bookmarklet');
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
        compress: {
          negate_iife: false
        }
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

    connect: {
      server: {
        options: {
          port: 8282,
          base: 'test/http-server'
        }
      }
    },

    mochacli: {
      all: ["test/dom/*/*Test.js", "test/har/**/*Test.js", "test/api/**/*Test.js", "test/merge/*Test.js"]
    },
    jsdoc: {
      dist: {
        src: ['README.md', 'lib/dom/**/*.js'],
        options: {
          destination: 'dist/doc'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks("grunt-mocha-cli");
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-bookmarklet-wrapper');

  grunt.registerTask('default', ['eslint', 'combine', 'uglify', 'bookmarklet', 'connect', 'mochacli', 'jsdoc']);

  grunt.registerTask('dom', ['combine', 'uglify']);
  grunt.registerTask('test', ['connect', 'mochacli']);

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

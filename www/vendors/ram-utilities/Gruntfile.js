/**
 * Created by dschreiber on 12/22/2014.
 */

module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-jsdoc');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			jsFilesForTesting: [
				'vendor/jquery/jquery.js',
				'vendor/angular/angular.js',
				'vendor/angular-bootstrap/ui-bootstrap-tpls-0.6.0.js',
				'vendor/angular-ui-router/release/angular-ui-router.js',
				'vendor/angular-mocks/angular-mocks.js',
				'vendor/lodash/dist/lodash.js',
				'src/**/*.spec.js'
			]
		},

		karma: {
			development: {
				configFile: 'karma.conf.js',
				options: {
					files: [
						'<%= meta.jsFilesForTesting %>',
						'src/**/*.js'
					]
				}
			},
			dist: {
				options: {
					configFile: 'karma.conf.js',
					files: [
						'<%= meta.jsFilesForTesting %>',
						'dist/<%= pkg.namelower %>-<%= pkg.version %>.js'
					]
				}
			},
			minified: {
				options: {
					configFile: 'karma.conf.js',
					files: [
						'<%= meta.jsFilesForTesting %>',
						'dist/<%= pkg.namelower %>-<%= pkg.version %>.min.js'
					]
				}
			}
		},

		jshint: {
			beforeconcat: ['src/**/*.js', '!src/components/popover/*.js'],
			ignore_warning: {
				options: {
					'-W030': true
				}
			}
		},

		concat: {
			dist: {
				src: ['src/module.js','src/**/*.js', '!src/**/*.spec.js'],
				dest: 'dist/<%= pkg.namelower %>-<%= pkg.version %>.js'
			},
			dist_css: {
				src:['src/assets/css/**/*.css'],
				dest:'dist/<%= pkg.namelower %>-<%= pkg.version %>.css'
			}
		},
		cssmin: {
			dist_css:{
				src: 'dist/<%= pkg.namelower %>-<%= pkg.version %>.css',
				dest: 'dist/<%= pkg.namelower %>-<%= pkg.version %>.min.css'
			}
		},

		uglify: {
			options: {
				mangle: false
			},
			dist: {
				files: {
					'dist/<%= pkg.namelower %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.namelower %>-<%= pkg.version %>.js']
				}
			}
		},

		jsdoc: {
			src: ['src/**/*.js'],
			options: {
				destination: 'doc'
			}
		}
	});

	grunt.registerTask('test', ['karma:development']);
	grunt.registerTask('build',
		[
			'jshint',
			'karma:development',
			'concat',
			'concat:dist_css',
			'karma:dist',
			'uglify',
			'cssmin:dist_css',
			'karma:minified',
			'jsdoc'
		]);
	grunt.registerTask('build_dev',
		[
			'jshint',
			'karma:development',
			'concat',
			'concat:dist_css',
			'karma:dist',
			'uglify',
			'cssmin:dist_css',
			'karma:minified',
			'jsdoc'
		]);
	grunt.registerTask('build_no_tests',
		[
			'jshint',
			'concat',
			'concat:dist_css',
			'uglify',
			'cssmin:dist_css'
		]);
};
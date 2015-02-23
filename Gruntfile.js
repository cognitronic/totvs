/**
 * Created by Danny Schreiber on 12/30/2014.
 */
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            jsFilesForTesting: [
                'www/vendors/jquery/dist/jquery.js',
                'www/vendors/jasmine-jquery/lib/jasmine-jquery.js',
                'www/vendors/angular/angular.js',
                'www/vendors/angular-bootstrap/ui-bootstrap-tpls.js',
	            'www/vendors/angular-animate/angular-animate.js',
	            'www/vendors/angularjs-toaster/toaster.js',
                'www/vendors/angular-ui-router/release/angular-ui-router.js',
                'www/vendors/angular-mocks/angular-mocks.js',
                'www/vendors/lodash/dist/lodash.js',
                'www/vendors/ram-utilities/dist/ram-utilities-0.0.1.js',
                'www/fixtures/setup.js',
                'www/fixtures/**/*.js',
                {
                    pattern: 'www/fixtures/**/*.json',
                    watched: true,
                    served: true,
                    included: false
                },
	            'www/src/modules.js',
                'www/src/app.js',
                'www/src/**/*.spec.js'
            ]
        },

        karma: {
            development: {
                configFile: 'karma.conf.js',
                options: {
                    files: [
                        '<%= meta.jsFilesForTesting %>',
                        'www/src/**/*.js'
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
            beforeconcat: ['www/src/**/*.js'],
	        options: {
		        smarttabs: true
	        },
            ignore_warning: {
                options: {
                    '-W030': true
                }
            }
        },

        concat: {
            dist: {
                src: ['www/src/config.js',
	                'www/src/modules.js',
	                'www/src/app.js',
	                'www/src/**/*.js',
	                '!www/src/**/*.spec.js'],
                dest: 'dist/<%= pkg.namelower %>-<%= pkg.version %>.js'
            },
            dist_css: {
                src:['www/src/assets/css/**/*.css', '!www/src/assets/css/<%= pkg.namelower %>-<%= pkg.version %>.*'],
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
            },
	        dist_services: {
		        files: {
			        'dist/<%= pkg.namelower %>-services-<%= pkg.version %>.min.js': ['dist/<%= pkg.namelower %>-services-<%= pkg.version %>.js']
		        }
	        }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['<%= pkg.namelower %>-<%= pkg.version %>.js','<%= pkg.namelower %>-<%= pkg.version %>.min.js'],
                        dest: 'www/vendors/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['<%= pkg.namelower %>-<%= pkg.version %>.css','<%= pkg.namelower %>-<%= pkg.version %>.min.css'],
                        dest: 'www/src/assets/css/'
                    }
                ]
            }
        },
        jsdoc: {
            src: ['www/src/**/*.js'],
            options: {
                destination: 'doc'
            }
        }
    });

    grunt.registerTask('test', ['karma:development']);
    grunt.registerTask('build', [
        'jshint',
        'concat',
        'concat:dist_css',
        'uglify:dist',
	    'uglify:dist_services',
        'cssmin:dist_css',
        'copy:dist'
    ]);
    grunt.registerTask('build_with_tests',
        [
            'jshint',
            'karma:development',
            'concat',
            'concat:dist_css',
            'karma:dist',
            'uglify:dist',
	        'uglify:dist_services',
            'karma:minified',
            'cssmin:dist_css',
            'copy:dist',
            'jsdoc'
        ]);
};

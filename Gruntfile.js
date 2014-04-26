/**
 * - `Makefile` if for `make`
 * - `Rakefile` is for `rake`,
 * - `Gruntfile` is for `grunt` :)
 */

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: ['lib/melonJS-1.0.0-min.js', 'lib/plugins/*.js', 'js/game.js', 'js/resources.js','js/**/*.js'],
				dest: 'build/js/app.js'
			}
		},
		copy: {
			dist: {
				files: [{
					src: 'css/**/*',
					dest: 'build/'
				},{
					src: 'data/**/*',
					dest: 'build/'
				}]
			}
		},
		processhtml: {
			dist: {
				options: {
					process: true,
					data: {
						title: 'My app',
						message: 'This is production distribution'
					}
				},
				files: {
					'build/index.html': ['index.html']
				}
			}
		},
		uglify: {
			options: {
				report: 'min',
				preserveComments: 'some'
			},
			dist: {
				files: {
					'build/js/app.min.js': [
						'build/js/app.js'
					]
				}
			}
		},

		// Synchronize all the data on `build`
		// directory to a remote server.
		// Configure it here
		rsync: {
			options: {
				recursive: true
			},
			dist: {
				options: {
					src: 'build/',
					dest: '/home/alexd075/public_html/tmp',
					host: 'alexd075@alexdantas.net',
					port: 2222,
					syncDestIgnoreExcl: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-rsync');

	// Things that will run by default
	grunt.registerTask('default', [
		'concat',
		'uglify',
		'copy',
		'processhtml',
		'rsync'
	]);
};


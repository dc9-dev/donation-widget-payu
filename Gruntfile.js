module.exports = function (grunt) {
  grunt.initConfig({
    clean: ["assets/js/*", "assets/css/*", "assets/dist"],
    browserify: {
      frontend: {
        src: "./src/frontend/js/main.ts",
        dest: "./assets/js/frontend.js",
      },
      options: {
        browserifyOptions: {
          debug: true,
        },
        configure: function (bundler) {
          bundler.plugin(require("tsify"));
          bundler.transform(require("babelify"), {
            presets: ["@babel/preset-env"],
            extensions: [".ts"],
          });
        },
      },
    },
    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      dist: {
        files: {
          "./assets/js/frontend.min.js": ["./assets/js/frontend.js"],
        }
      }
    },
    sass: {                             
      dist: {                   
        options: {                      
          style: "compressed"
        },
        files: {                         
          "assets/css/frontend.css": "src/frontend/sass/main.scss",   
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.registerTask("default", ["clean", "browserify", "uglify", "sass"]);
};

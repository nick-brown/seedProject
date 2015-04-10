/*globals __dirname*/

// MODULES
//==============================================================================

var browserify = require('browserify')
,   del        = require('del')
,   gulp       = require('gulp')
,   csslint    = require('gulp-csslint')
,   gulpif     = require('gulp-if')
,   imagemin   = require('gulp-imagemin')
,   inject     = require('gulp-inject')
,   jade       = require('gulp-jade')
,   jshint     = require('gulp-jshint')
,   livereload = require('gulp-livereload')
,   mincss     = require('gulp-minify-css')
,   rev        = require('gulp-rev')
,   sass       = require('gulp-sass')
,   streamify  = require('gulp-streamify')
,   uglify     = require('gulp-uglify')
,   gutil      = require('gulp-util')
,   pngquant   = require('imagemin-pngquant')
,   series     = require('stream-series')
,   source     = require('vinyl-source-stream')
,   transform  = require('vinyl-transform')
,   argv       = require('yargs').argv;


// CONSTANTS
//==============================================================================

var PROD           = !!(!!argv.production || !!argv.prod)
,   PUBLIC         = __dirname + '/client'
,   DIST           = __dirname + '/dist'
,   BOWER_HOME     = PUBLIC + '/bower_components'
,   POINT_OF_ENTRY = PUBLIC + '/js/app.js';

var PATHS = {
    src: {
        js: PUBLIC + '/js/**/*.js',
        imgs: PUBLIC + '/images/*',
        fonts: BOWER_HOME + '/bootstrap-sass/assets/fonts/**/*.*',
        html: [
            PUBLIC + '/**/*.html',
            PUBLIC + '/**/*.jade',
        ],
        css: [
            PUBLIC + '/scss/*.scss',
            BOWER_HOME + '/angular-motion/dist/angular-motion.css'
        ],
        bower: [
            BOWER_HOME + '/**/*.css',
            BOWER_HOME + '/**/*.css.map',
            '!' + BOWER_HOME + '/**/*.min.css'
        ]
    },

    dest: {
        js     : DIST + '/js',
        css    : DIST + '/css' ,
        //vendor : DIST + '/vendor',
        imgs   : DIST + '/images',
        fonts  : DIST + '/fonts',
        fonts  : DIST + '/fonts'
    }
};


// STREAMS
//==============================================================================

var bundler = browserify()
    .add(POINT_OF_ENTRY)
    .on('log', gutil.log);

var jsStream = function() {
    'use strict';
    
    // TODO: add sourcemaps
    return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error: Bundle not built'))
        .pipe( source( 'app.js' ) )
        .pipe( gulpif( PROD, streamify( uglify() ) ) )
        .pipe( streamify( rev() ) )
        .pipe( gulp.dest( PATHS.dest.js ) );
};

var cssStream = function() {
   'use strict';
   return gulp.src( PATHS.src.css )
        .pipe( gulpif(/[.]scss$/, sass()) )
        .pipe( csslint() )
        // TODO: make the reporter report on sass
        //.pipe( csslint.reporter() )
        .pipe( gulpif( PROD, mincss() ) )
        .pipe( streamify( rev() ) )
        .pipe( gulp.dest( PATHS.dest.css ) );
};

var fontStream = function() {
    'use strict';

    return gulp.src( PATHS.src.fonts )
        .pipe( gulp.dest( PATHS.dest.fonts ) );
};

// TODO: decide whether assets need to be deployed to a vendor directory separately
//var vendorStream = function() {
//    'use strict';
//    // Collect css map files for vendor assets
//    gulp.src( BOWER_HOME + '/**/*.css.map' )
//        .pipe( rename( {dirname: ''} ) )
//        .pipe( gulp.dest( PATHS.dest.vendor ) );
//
//    gulp.src( BOWER_HOME + '/bootstrap/fonts/**/*.*')
//        .pipe( gulp.dest( PATHS.dest.fonts ) );
//
//    return gulp.src( PATHS.src.bower )
//        .pipe( concat( 'vendor.css' ) )
//        .pipe( gulpif( PROD, mincss() ) )
//        .pipe( gulp.dest( PATHS.dest.vendor ) );
//};

var imageStream = function() {
    'use strict';
    return gulp.src( PATHS.src.imgs)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe( gulp.dest( PATHS.dest.imgs ) );
};


// TASKS
//==============================================================================
gulp.task('default', ['compile', 'imagemin', 'watch', 'serve']);

gulp.task('watch', function() {
    'use strict';
    // TODO: Prevent PATHS.src.html watching from triggering a circular trigger
    livereload.listen();
    gulp.watch([PATHS.src.imgs], ['imagemin']);
    gulp.watch([
        PATHS.src.css,
        PATHS.src.js,
        PATHS.src.html],
        ['compile']
    );
});

gulp.task('lint:js', function() {
    'use strict';
    return gulp.src( PATHS.src.js )
        .pipe( jshint() )
        .pipe( jshint.reporter('jshint-stylish') );
});

gulp.task('serve', function() {
    'use strict';
    var server = require('./server');
    server.listen( server.get('port'), function() {
        var msg = 'Node server started.  Listening on port ' + server.get('port') + '...';
        gutil.log( gutil.colors.cyan(msg) );
    });
});

gulp.task('imagemin', imageStream);

gulp.task('compile', ['lint:js'], function() {
    'use strict';

    del( DIST, function() {
        var injector = inject( series( fontStream(), jsStream(), cssStream() ), {
            ignorePath: '/dist',
        });
        
        // minify images
        imageStream();

        return gulp.src( PATHS.src.html )
            .pipe( injector )
            .pipe( gulpif(/[.]jade$/, jade({ pretty: true })) )
            .pipe( gulp.dest( DIST ) )
            .pipe( livereload() );
    });
});

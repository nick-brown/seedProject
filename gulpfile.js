/*globals __dirname*/

// MODULES
//==============================================================================

var gulp       = require('gulp')
,   browserify = require('browserify')
,   transform  = require('vinyl-transform')
,   series     = require('stream-series')
,   argv       = require('yargs').argv
,   del        = require('del')
,   pngquant   = require('imagemin-pngquant')
,   sass       = require('gulp-sass')
,   uglify     = require('gulp-uglify')
,   streamify  = require('gulp-streamify')
,   jshint     = require('gulp-jshint')
,   csslint    = require('gulp-csslint')
,   livereload = require('gulp-livereload')
,   jade       = require('gulp-jade')
,   rev        = require('gulp-rev')
,   mincss     = require('gulp-minify-css')
,   imagemin   = require('gulp-imagemin')
,   gulpif     = require('gulp-if')
,   inject     = require('gulp-inject')
,   concat     = require('gulp-concat')
,   rename     = require('gulp-rename')
,   gutil      = require('gulp-util')
,   ignore     = require('gulp-ignore');


// CONSTANTS
//==============================================================================

var PROD           = !!(!!argv.production || !!argv.prod)
,   PUBLIC         = __dirname + '/public'
,   DIST           = __dirname + '/dist'
,   BOWER_HOME     = PUBLIC + '/bower_components'
,   POINT_OF_ENTRY = PUBLIC + '/js/app.js';

var PATHS = {
    src: {
        js    : PUBLIC + '/js/**/*.js',
        imgs  : PUBLIC + '/images/*',
        fonts : BOWER_HOME + '/bootstrap-sass/assets/fonts/**/*.*',
        html  : [
            PUBLIC + '/**/*.html',
            PUBLIC + '/**/*.jade',
        ],
        css   : [
            PUBLIC + '/**/*.scss',
            PUBLIC + '/**/*.css',
        ],
        bower : [
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

var jsStream = function() {
    'use strict';
    var browserified = transform(function(filename) {
        // TODO: bundle only on production compile
        return browserify(filename).bundle();
    });

    return gulp.src(POINT_OF_ENTRY)
        .pipe( browserified )
        .pipe( gulpif ( PROD, streamify( uglify() ) ) )
        .pipe( streamify( rev() ) )
        .pipe( gulp.dest( PATHS.dest.js ));
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

gulp.task('clean', function() {
    'use strict';
    return del( DIST );
});

gulp.task('serve', function() {
    'use strict';
    var server = require('./server')
    server.listen( server.get('port'), function() {
        var msg = 'Node server started.  Listening on port ' + server.get('port') + '...';
        gutil.log( gutil.colors.cyan(msg) );
    });
});

gulp.task('imagemin', imageStream);

gulp.task('compile', ['lint:js', 'clean'], function() {
    'use strict';

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

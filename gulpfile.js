 const {src, dest, watch, series} = require('gulp')
 const sass = require('gulp-sass')(require('sass'))
 // ova linija povezuje gulp sa sassom
 // i sad sa ovim const sass dobijamo funkciju koju mozemo da korsitimo u 
 // Gulp taskovima za kompajliranje scss fajlova u css
 const purgecss = require('gulp-purgecss')
 
 // purge redukuje index.css fajl, i onda index.css ima samo 
 // upotrebljene propertije

 function buildStyles()
 {
    return src('shinobi/**/*.scss')
        .pipe(sass())
        .pipe(purgecss({ content: ['*.html'] }))
        .pipe(dest('css'))
 }

 // funkcija za kompajliranje iz sass u css i smesti u css folder

 function watchTask()
 {
   // koristimo * umesto index.scss jer se to onda sa *
   // odnosi na bilo koji fajl sa .scss ekstenzijom
    watch(['shinobi/**/*.scss', '*.html'], buildStyles)
 }

// ova funkcija posmatra scss fajl i cim se nesto promeni ona uradi buildstyles
// i na taj nacin je nas css uvek up-to-date

exports.default = series(buildStyles, watchTask)
// series je za izvodjenje vise taskova jedan z
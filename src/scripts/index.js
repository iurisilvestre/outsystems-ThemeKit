/* ===================================================================== */
/*  Providers                                                            */
/* ===================================================================== */

/* ===================================================================== */
/*  Patterns                                                             */
/* ===================================================================== */
import newPattern from './patterns/newPattern';

alert('Theme launched');

var MyTheme = MyTheme || {};
((namespace) => {
	namespace.patterns = {};
	namespace.MyComponentFoo = MyComponentFoo;
	namespace.patterns.newPattern = newPattern;
})(MyTheme);

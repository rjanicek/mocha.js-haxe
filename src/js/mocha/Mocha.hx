package js.mocha;

using js.mocha.Mocha;
using Reflect;
using Std;

enum Ui {
	BDD;
	EXPORTS;
	QUNIT;
	TDD;
}

enum Reporter {
	DOC;
	DOT;
	HTML;
	HTMLCOV;
	JSON;
	JSONCOV;
	JSONSTREAM;
	LANDING;
	LIST;
	MIN;
	NYAN;
	PROGRESS;
	SPEC;
	TAP;
	TEAMCITY;
	XUNIT;
}

/**
 * Haxe bindings for Mocha.js - simple, flexible, fun javascript test
 * framework for node.js & the browser. (BDD, TDD, QUnit styles via
 * interfaces)
 *
 * @see https://github.com/visionmedia/mocha
 * @author Richard Janicek
 */
class Mocha {

	private static var _mocha : Dynamic = untyped __js__("mocha");
	
	/**
	 * Setup mocha with options.
	 * -reporter does not work in browser, HTML is used by default
	 * -grep is broken in browser
	 * @param timeout in milliseconds (optional)
	 */
	public static function setup( opts : {ui : Ui, ?reporter : Reporter, ?globals : Array<String>, ?timeout : Int, ?ignoreLeaks : Bool, ?grep : String} ) : Void {
		
		opts.setField("ui", opts.ui.string().toLowerCase());

		if (opts.hasField("reporter"))
			opts.setField("reporter", opts.reporter.string().toLowerCase());
			
		_mocha.setup(opts);
	}
	
	/**
	 * Run tests.
	 */
	public static function run() : Void {
		patchString();
		_mocha.run();
	}
	
	/**
	 * trim() error in <= IE8
	 * @see https://github.com/visionmedia/mocha/issues/501
	 */
	public static function patchString() untyped {
		if(!String.prototype.trim) {
			String.prototype.trim = function () {
				return __js__("this.replace(/^\\s+|\\s+$/g,'')");
			};  
		} 	
	}
}

@:native("this")
extern class This {
	/**
	 * Set test-specific timeouts, or disable the timeout all-together with
	 * timeout(0).
	 *
	 * @param milliseconds timeout in milliseconds or 0 to disable the timeout
	 */
	public static function timeout( milliseconds : Int ) : Void; 
}

class M {
	
	// ------------------------------------------------------------------------
	// BDD
	
	public static function describe( description : String, spec : Void -> Void ) : Void {
		untyped __js__("describe(description, spec)");
	}

	@:overload(function( description : String, func : (Void->Void)->Void ) : Void{})
	public static function it( description : String, func : Void -> Void ) : Void {
		untyped __js__("it(description, func)");
	}

	@:overload(function( func : (Void->Void)->Void ) : Void{})
	public static function before( func : Void -> Void ) : Void {
		untyped __js__("before(func)");
	}

	@:overload(function( func : (Void->Void)->Void ) : Void{})
	public static function after( func : Void -> Void ) : Void {
		untyped __js__("after(func)");
	}
	
	@:overload(function( func : (Void->Void)->Void ) : Void{})
	public static function beforeEach( func : Void -> Void ) : Void {
		untyped __js__("beforeEach(func)");
	}
	
	
	@:overload(function( func : (Void->Void)->Void ) : Void{})
	public static function afterEach( func : Void -> Void ) : Void {
		untyped __js__("afterEach(func)");
	}
	
	// ------------------------------------------------------------------------
	// TDD
	
	public static function suite( description : String, suite : Void -> Void ) : Void {
		untyped __js__("suite(description, suite)");
	}

	public static function setup( func : Void -> Void ) : Void {
		untyped __js__("setup(func)");
	}

	public static function test( description : String, test : Void -> Void ) : Void {
		untyped __js__("test(description, test)");
	}
	
	public static function teardown( func : Void -> Void ) : Void {
		untyped __js__("teardown(func)");
	}	
}

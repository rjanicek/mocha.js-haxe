(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
var MainBrowser = function() { }
MainBrowser.__name__ = true;
MainBrowser.main = function() {
	if(haxe.Firebug.detect()) haxe.Firebug.redirectTraces();
	js.mocha.Mocha.setup({ ui : js.mocha.Ui.BDD});
	new specs.MochaSpec();
	new specs.ExpectSpec();
	js.mocha.Mocha.run();
}
var Reflect = function() { }
Reflect.__name__ = true;
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
var haxe = {}
haxe.Firebug = function() { }
haxe.Firebug.__name__ = true;
haxe.Firebug.detect = function() {
	try {
		return console != null && console.error != null;
	} catch( e ) {
		return false;
	}
}
haxe.Firebug.redirectTraces = function() {
	haxe.Log.trace = haxe.Firebug.trace;
	js.Lib.onerror = haxe.Firebug.onError;
}
haxe.Firebug.onError = function(err,stack) {
	var buf = err + "\n";
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		buf += "Called from " + s + "\n";
	}
	haxe.Firebug.trace(buf,null);
	return true;
}
haxe.Firebug.trace = function(v,inf) {
	var type = inf != null && inf.customParams != null?inf.customParams[0]:null;
	if(type != "warn" && type != "info" && type != "debug" && type != "error") type = inf == null?"error":"log";
	console[type]((inf == null?"":inf.fileName + ":" + inf.lineNumber + " : ") + Std.string(v));
}
haxe.Log = function() { }
haxe.Log.__name__ = true;
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Lib = function() { }
js.Lib.__name__ = true;
js.expect = {}
js.expect.E = function() { }
js.expect.E.__name__ = true;
js.expect.E.expect = function(actual) {
	return js.expect.E._expect(actual);
}
js.expect.E.should = function(actual) {
	return js.expect.E._expect(actual);
}
js.expect.E.getVersion = function() {
	return js.expect.E._expect.version;
}
js.expect.ExpectMixins = function() { }
js.expect.ExpectMixins.__name__ = true;
js.expect.ExpectMixins.toBe = function(e,expected) {
	return e.be(expected);
}
js.expect.ExpectMixins.match = function(e,pattern,modifiers) {
	return e.match(new RegExp(pattern,modifiers));
}
js.expect.ExpectMixins.throwExceptionMatch = function(e,pattern,modifiers) {
	return e.throwException(new RegExp(pattern,modifiers));
}
js.mocha = {}
js.mocha.Ui = { __ename__ : true, __constructs__ : ["BDD","EXPORTS","QUNIT","TDD"] }
js.mocha.Ui.BDD = ["BDD",0];
js.mocha.Ui.BDD.toString = $estr;
js.mocha.Ui.BDD.__enum__ = js.mocha.Ui;
js.mocha.Ui.EXPORTS = ["EXPORTS",1];
js.mocha.Ui.EXPORTS.toString = $estr;
js.mocha.Ui.EXPORTS.__enum__ = js.mocha.Ui;
js.mocha.Ui.QUNIT = ["QUNIT",2];
js.mocha.Ui.QUNIT.toString = $estr;
js.mocha.Ui.QUNIT.__enum__ = js.mocha.Ui;
js.mocha.Ui.TDD = ["TDD",3];
js.mocha.Ui.TDD.toString = $estr;
js.mocha.Ui.TDD.__enum__ = js.mocha.Ui;
js.mocha.Mocha = function() { }
js.mocha.Mocha.__name__ = true;
js.mocha.Mocha.setup = function(opts) {
	opts.ui = Std.string(opts.ui).toLowerCase();
	if(Reflect.hasField(opts,"reporter")) opts.reporter = Std.string(opts.reporter).toLowerCase();
	js.mocha.Mocha._mocha.setup(opts);
}
js.mocha.Mocha.run = function() {
	js.mocha.Mocha._mocha.run();
}
js.mocha.M = function() { }
js.mocha.M.__name__ = true;
js.mocha.M.describe = function(description,spec) {
	describe(description, spec);
}
js.mocha.M.it = function(description,func) {
	it(description, func);
}
js.mocha.M.before = function(func) {
	before(func);
}
js.mocha.M.after = function(func) {
	after(func);
}
js.mocha.M.beforeEach = function(func) {
	beforeEach(func);
}
js.mocha.M.afterEach = function(func) {
	afterEach(func);
}
js.mocha.M.setup = function(func) {
	setup(func);
}
var specs = {}
specs.ExpectSpec = function() {
	js.mocha.M.describe("Expect",function() {
		js.mocha.M.it("ok: asserts that the value is truthy or not",function() {
			js.expect.E.expect(1).to.be.ok();
			js.expect.E.expect(true).to.be.ok();
			js.expect.E.expect({ }).to.be.ok();
			js.expect.E.expect(0).to.not.be.ok();
		});
		js.mocha.M.it("be / equal: asserts === equality",function() {
			js.expect.ExpectMixins.toBe(js.expect.E.expect(1),1);
			js.expect.E.expect(Math.NaN).not.to.equal(Math.NaN);
			js.expect.ExpectMixins.toBe(js.expect.E.expect(1).not,true);
			js.expect.ExpectMixins.toBe(js.expect.E.expect("1").not,1);
		});
		js.mocha.M.it("eql: asserts loose equality that works with objects",function() {
			js.expect.E.expect({ a : "b"}).to.eql({ a : "b"});
			js.expect.E.expect(1).to.eql("1");
		});
		js.mocha.M.it("a/an: asserts typeof with support for array type and instanceof",function() {
			js.expect.E.expect(5).to.be.a("number");
			js.expect.E.expect([]).to.be.an("array");
			js.expect.E.expect([]).to.be.an("object");
			js.expect.E.expect({ }).to.be.an("object");
			js.expect.E.expect({ }).not.to.be.an("array");
		});
		js.mocha.M.it("match: asserts String regular expression match",function() {
			js.expect.ExpectMixins.match(js.expect.E.expect(js.expect.E.getVersion()).to,"[0-9]+\\.[0-9]+\\.[0-9]+");
		});
		js.mocha.M.it("contain: asserts indexOf for an array or string",function() {
			js.expect.E.expect([1,2]).to.contain(1);
			js.expect.E.expect("hello world").to.contain("world");
		});
		js.mocha.M.it("length: asserts array .length",function() {
			js.expect.E.expect([]).to.have.length(0);
			js.expect.E.expect([1,2,3]).to.have.length(3);
		});
		js.mocha.M.it("empty: asserts that an array is empty or not",function() {
			js.expect.E.expect([]).to.be.empty();
			js.expect.E.expect([1,2,3]).to.not.be.empty();
		});
		js.mocha.M.it("property: asserts presence of an own property (and value optionally)",function() {
			js.expect.E.expect({ a : null}).to.have.property("a");
			js.expect.E.expect({ a : "b"}).to.have.property("a","b");
		});
		js.mocha.M.it("key/keys: asserts the presence of a key. Supports the only modifier",function() {
			js.expect.E.expect({ a : "b"}).to.have.key("a");
			js.expect.E.expect({ a : "b", c : "d"}).to.only.have.keys("a","c");
			js.expect.E.expect({ a : "b", c : "d"}).to.only.have.keys(["a","c"]);
		});
		js.mocha.M.it("throwException: asserts that the Function throws or not when called",function() {
			js.expect.E.expect(function() {
				throw "knife";
			}).to.throwException();
			js.expect.E.expect(function() {
				throw "axe";
			}).to.throwException(function(str) {
				js.expect.ExpectMixins.toBe(js.expect.E.expect(str),"axe");
			});
			js.expect.ExpectMixins.throwExceptionMatch(js.expect.E.expect(function() {
				throw "grenade...BOOM!";
			}).to,"grenade");
			js.expect.E.expect(function() {
			}).to.not.throwException();
		});
		js.mocha.M.it("within: asserts a number within a range",function() {
			js.expect.E.expect(1).to.be.within(0,Math.POSITIVE_INFINITY);
		});
		js.mocha.M.it("greaterThan/above: asserts >",function() {
			js.expect.E.expect(3).to.be.above(0);
			js.expect.E.expect(5).to.be.greaterThan(3);
		});
		js.mocha.M.it("lessThan/below: asserts <",function() {
			js.expect.E.expect(0).to.be.below(3);
			js.expect.E.expect(1).to.be.lessThan(3);
		});
		js.mocha.M.it("should allow chaining with `and`",function() {
			js.expect.ExpectMixins.toBe(js.expect.E.expect(5).to.be.a("number").and,5);
		});
		js.mocha.M.it("should allow 'should' mixin grammer",function() {
			js.expect.E.should(true).be.ok();
		});
	});
};
specs.ExpectSpec.__name__ = true;
specs.MochaSpec = function() {
	js.mocha.M.describe("Mocha",function() {
		js.mocha.M.it("should test synchronous code",function() {
			js.expect.E.should(true).be.ok();
		});
		js.mocha.M.it("should test asynchronous code",function(done) {
			var mochaIsCool = 0;
			specs.Timer.delay(function() {
				mochaIsCool++;
				js.expect.E.should(mochaIsCool).equal(1);
				done();
			},250);
			js.expect.E.should(mochaIsCool).equal(0);
		});
		js.mocha.M.it("should allow setting timeout",function(done) {
			this.timeout(5000);
			specs.Timer.delay(function() {
				done();
			},2500);
		});
		js.mocha.M.describe("hooks",function() {
			var before = false;
			js.mocha.M.before(function() {
				before = true;
			});
			var beforeAsync = false;
			js.mocha.M.before(function(done) {
				specs.Timer.delay(function() {
					beforeAsync = true;
					done();
				},250);
			});
			var after = false;
			js.mocha.M.after(function() {
				after = true;
			});
			js.mocha.M.describe("before / after",function() {
				js.mocha.M.it("should run before tests",function() {
					js.expect.E.should(before).be.ok();
					js.expect.E.should(after).not.be.ok();
				});
				js.mocha.M.it("should run before tests asynchronously",function() {
					js.expect.E.should(beforeAsync).be.ok();
				});
			});
			js.mocha.M.describe("beforeEach / afterEach",function() {
				var beforeEach = false;
				js.mocha.M.beforeEach(function() {
					beforeEach = true;
				});
				var beforeEachAsync = false;
				js.mocha.M.beforeEach(function(done) {
					specs.Timer.delay(function() {
						beforeEachAsync = true;
						done();
					},250);
				});
				var afterEach = false;
				js.mocha.M.afterEach(function() {
					afterEach = true;
				});
				js.mocha.M.it("should run before each test",function() {
					js.expect.E.should(beforeEach).be.ok();
					js.expect.E.should(afterEach).not.be.ok();
				});
				js.mocha.M.it("should run before each test asynchronously",function() {
					js.expect.E.should(beforeEachAsync).be.ok();
				});
			});
		});
	});
};
specs.MochaSpec.__name__ = true;
specs.Timer = function() { }
specs.Timer.__name__ = true;
specs.Timer.delay = function(f,delayMs) {
	if(typeof setTimeout === 'undefined') window.setTimeout(f,delayMs); else setTimeout(f,delayMs);
}
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.__name__ = true;
Array.__name__ = true;
if(typeof document != "undefined") js.Lib.document = document;
if(typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}
if(typeof expect !== 'undefined') js.expect.E._expect = expect; else if(typeof require !== 'undefined') js.expect.E._expect = require('expect.js'); else throw "make sure to include expect.js";
js.mocha.Mocha._mocha = mocha;
MainBrowser.main();
})();

//@ sourceMappingURL=mocha-haxe-test-browser.js.map
var $estr = function() { return js.Boot.__string_rec(this,''); };
var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IntIter = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = true;
IntIter.prototype = {
	next: function() {
		return this.min++;
	}
	,hasNext: function() {
		return this.min < this.max;
	}
	,__class__: IntIter
}
var Main = function() { }
Main.__name__ = true;
Main.main = function() {
	if(haxe.Firebug.detect()) haxe.Firebug.redirectTraces();
	js.Mocha.setup({ ui : js.Ui.BDD});
	new specs.MochaSpec();
	new specs.ExpectSpec();
	js.Mocha.run();
}
var Reflect = function() { }
Reflect.__name__ = true;
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && (v.__name__ || v.__ename__);
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
}
var Std = function() { }
Std.__name__ = true;
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
var haxe = haxe || {}
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
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = window.setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = true;
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
}
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
}
haxe.Timer.prototype = {
	run: function() {
	}
	,stop: function() {
		if(this.id == null) return;
		window.clearInterval(this.id);
		this.id = null;
	}
	,__class__: haxe.Timer
}
var js = js || {}
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
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.isClass = function(o) {
	return o.__name__;
}
js.Boot.isEnum = function(e) {
	return e.__ename__;
}
js.Boot.getClass = function(o) {
	return o.__class__;
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
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.E = function() { }
js.E.__name__ = true;
js.E.__properties__ = {get_version:"getVersion"}
js.E.expect = function(actual) {
	return expect(actual);
}
js.E.should = function(actual) {
	return expect(actual);
}
js.E.getVersion = function() {
	return expect.version;
}
js.ExpectMixins = function() { }
js.ExpectMixins.__name__ = true;
js.ExpectMixins.toBe = function(e,expected) {
	return e.be(expected);
}
js.ExpectMixins.match = function(e,pattern,modifiers) {
	return e.match(new RegExp(pattern,modifiers));
}
js.ExpectMixins.throwExceptionMatch = function(e,pattern,modifiers) {
	return e.throwException(new RegExp(pattern,modifiers));
}
js.Lib = function() { }
js.Lib.__name__ = true;
js.Lib.debug = function() {
	debugger;
}
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Ui = { __ename__ : true, __constructs__ : ["BDD","EXPORTS","QUNIT","TDD"] }
js.Ui.BDD = ["BDD",0];
js.Ui.BDD.toString = $estr;
js.Ui.BDD.__enum__ = js.Ui;
js.Ui.EXPORTS = ["EXPORTS",1];
js.Ui.EXPORTS.toString = $estr;
js.Ui.EXPORTS.__enum__ = js.Ui;
js.Ui.QUNIT = ["QUNIT",2];
js.Ui.QUNIT.toString = $estr;
js.Ui.QUNIT.__enum__ = js.Ui;
js.Ui.TDD = ["TDD",3];
js.Ui.TDD.toString = $estr;
js.Ui.TDD.__enum__ = js.Ui;
js.Reporter = { __ename__ : true, __constructs__ : ["DOC","DOT","HTML","HTMLCOV","JSON","JSONCOV","JSONSTREAM","LANDING","LIST","MIN","NYAN","PROGRESS","SPEC","TAP","TEAMCITY","XUNIT"] }
js.Reporter.DOC = ["DOC",0];
js.Reporter.DOC.toString = $estr;
js.Reporter.DOC.__enum__ = js.Reporter;
js.Reporter.DOT = ["DOT",1];
js.Reporter.DOT.toString = $estr;
js.Reporter.DOT.__enum__ = js.Reporter;
js.Reporter.HTML = ["HTML",2];
js.Reporter.HTML.toString = $estr;
js.Reporter.HTML.__enum__ = js.Reporter;
js.Reporter.HTMLCOV = ["HTMLCOV",3];
js.Reporter.HTMLCOV.toString = $estr;
js.Reporter.HTMLCOV.__enum__ = js.Reporter;
js.Reporter.JSON = ["JSON",4];
js.Reporter.JSON.toString = $estr;
js.Reporter.JSON.__enum__ = js.Reporter;
js.Reporter.JSONCOV = ["JSONCOV",5];
js.Reporter.JSONCOV.toString = $estr;
js.Reporter.JSONCOV.__enum__ = js.Reporter;
js.Reporter.JSONSTREAM = ["JSONSTREAM",6];
js.Reporter.JSONSTREAM.toString = $estr;
js.Reporter.JSONSTREAM.__enum__ = js.Reporter;
js.Reporter.LANDING = ["LANDING",7];
js.Reporter.LANDING.toString = $estr;
js.Reporter.LANDING.__enum__ = js.Reporter;
js.Reporter.LIST = ["LIST",8];
js.Reporter.LIST.toString = $estr;
js.Reporter.LIST.__enum__ = js.Reporter;
js.Reporter.MIN = ["MIN",9];
js.Reporter.MIN.toString = $estr;
js.Reporter.MIN.__enum__ = js.Reporter;
js.Reporter.NYAN = ["NYAN",10];
js.Reporter.NYAN.toString = $estr;
js.Reporter.NYAN.__enum__ = js.Reporter;
js.Reporter.PROGRESS = ["PROGRESS",11];
js.Reporter.PROGRESS.toString = $estr;
js.Reporter.PROGRESS.__enum__ = js.Reporter;
js.Reporter.SPEC = ["SPEC",12];
js.Reporter.SPEC.toString = $estr;
js.Reporter.SPEC.__enum__ = js.Reporter;
js.Reporter.TAP = ["TAP",13];
js.Reporter.TAP.toString = $estr;
js.Reporter.TAP.__enum__ = js.Reporter;
js.Reporter.TEAMCITY = ["TEAMCITY",14];
js.Reporter.TEAMCITY.toString = $estr;
js.Reporter.TEAMCITY.__enum__ = js.Reporter;
js.Reporter.XUNIT = ["XUNIT",15];
js.Reporter.XUNIT.toString = $estr;
js.Reporter.XUNIT.__enum__ = js.Reporter;
js.Mocha = function() { }
js.Mocha.__name__ = true;
js.Mocha.setup = function(opts) {
	opts.ui = Std.string(opts.ui).toLowerCase();
	if(Reflect.hasField(opts,"reporter")) opts.reporter = Std.string(opts.reporter).toLowerCase();
	mocha.setup(opts);
}
js.Mocha.run = function() {
	mocha.run();
}
js.M = function() { }
js.M.__name__ = true;
js.M.describe = function(description,spec) {
	describe(description, spec);
}
js.M.it = function(description,func) {
	it(description, func);
}
js.M.before = function(func) {
	before(func);
}
js.M.after = function(func) {
	after(func);
}
js.M.beforeEach = function(func) {
	beforeEach(func);
}
js.M.afterEach = function(func) {
	afterEach(func);
}
js.M.suite = function(description,suite) {
	suite(description, suite);
}
js.M.setup = function(func) {
	setup(func);
}
js.M.test = function(description,test) {
	test(description, test);
}
js.M.teardown = function(func) {
	teardown(func);
}
var specs = specs || {}
specs.ExpectSpec = function() {
	js.M.describe("Expect",function() {
		js.M.it("ok: asserts that the value is truthy or not",function() {
			js.E.expect(1).to.be.ok();
			js.E.expect(true).to.be.ok();
			js.E.expect({ }).to.be.ok();
			js.E.expect(0).to.not.be.ok();
		});
		js.M.it("be / equal: asserts === equality",function() {
			js.ExpectMixins.toBe(js.E.expect(1),1);
			js.E.expect(Math.NaN).not.to.equal(Math.NaN);
			js.ExpectMixins.toBe(js.E.expect(1).not,true);
			js.ExpectMixins.toBe(js.E.expect("1").not,1);
		});
		js.M.it("eql: asserts loose equality that works with objects",function() {
			js.E.expect({ a : "b"}).to.eql({ a : "b"});
			js.E.expect(1).to.eql("1");
		});
		js.M.it("a/an: asserts typeof with support for array type and instanceof",function() {
			js.E.expect(5).to.be.a("number");
			js.E.expect([]).to.be.an("array");
			js.E.expect([]).to.be.an("object");
			js.E.expect({ }).to.be.an("object");
			js.E.expect({ }).not.to.be.an("array");
		});
		js.M.it("match: asserts String regular expression match",function() {
			js.ExpectMixins.match(js.E.expect(js.E.getVersion()).to,"[0-9]+\\.[0-9]+\\.[0-9]+");
		});
		js.M.it("contain: asserts indexOf for an array or string",function() {
			js.E.expect([1,2]).to.contain(1);
			js.E.expect("hello world").to.contain("world");
		});
		js.M.it("length: asserts array .length",function() {
			js.E.expect([]).to.have.length(0);
			js.E.expect([1,2,3]).to.have.length(3);
		});
		js.M.it("empty: asserts that an array is empty or not",function() {
			js.E.expect([]).to.be.empty();
			js.E.expect([1,2,3]).to.not.be.empty();
		});
		js.M.it("property: asserts presence of an own property (and value optionally)",function() {
			js.E.expect({ a : null}).to.have.property("a");
			js.E.expect({ a : "b"}).to.have.property("a","b");
		});
		js.M.it("key/keys: asserts the presence of a key. Supports the only modifier",function() {
			js.E.expect({ a : "b"}).to.have.key("a");
			js.E.expect({ a : "b", c : "d"}).to.only.have.keys("a","c");
			js.E.expect({ a : "b", c : "d"}).to.only.have.keys(["a","c"]);
		});
		js.M.it("throwException: asserts that the Function throws or not when called",function() {
			js.E.expect(function() {
				throw "knife";
			}).to.throwException();
			js.E.expect(function() {
				throw "axe";
			}).to.throwException(function(str) {
				js.ExpectMixins.toBe(js.E.expect(str),"axe");
			});
			js.ExpectMixins.throwExceptionMatch(js.E.expect(function() {
				throw "grenade...BOOM!";
			}).to,"grenade");
			js.E.expect(function() {
			}).to.not.throwException();
		});
		js.M.it("within: asserts a number within a range",function() {
			js.E.expect(1).to.be.within(0,Math.POSITIVE_INFINITY);
		});
		js.M.it("greaterThan/above: asserts >",function() {
			js.E.expect(3).to.be.above(0);
			js.E.expect(5).to.be.greaterThan(3);
		});
		js.M.it("lessThan/below: asserts <",function() {
			js.E.expect(0).to.be.below(3);
			js.E.expect(1).to.be.lessThan(3);
		});
		js.M.it("should allow chaining with `and`",function() {
			js.ExpectMixins.toBe(js.E.expect(5).to.be.a("number").and,5);
		});
		js.M.it("should allow 'should' mixin grammer",function() {
			js.E.should(true).be.ok();
		});
	});
};
specs.ExpectSpec.__name__ = true;
specs.ExpectSpec.prototype = {
	__class__: specs.ExpectSpec
}
specs.MochaSpec = function() {
	js.M.describe("Mocha",function() {
		js.M.it("should test synchronous code",function() {
			js.E.should(true).be.ok();
		});
		js.M.it("should test asynchronous code",function(done) {
			var mochaIsCool = 0;
			haxe.Timer.delay(function() {
				mochaIsCool++;
				js.E.should(mochaIsCool).equal(1);
				done();
			},250);
			js.E.should(mochaIsCool).equal(0);
		});
		js.M.it("should allow setting timeout",function(done) {
			this.timeout(5000);
			haxe.Timer.delay(function() {
				done();
			},2500);
		});
		js.M.describe("hooks",function() {
			var before = false;
			js.M.before(function() {
				before = true;
			});
			var beforeAsync = false;
			js.M.before(function(done) {
				haxe.Timer.delay(function() {
					beforeAsync = true;
					done();
				},250);
			});
			var after = false;
			js.M.after(function() {
				after = true;
			});
			js.M.describe("before / after",function() {
				js.M.it("should run before tests",function() {
					js.E.should(before).be.ok();
					js.E.should(after).not.be.ok();
				});
				js.M.it("should run before tests asynchronously",function() {
					js.E.should(beforeAsync).be.ok();
				});
			});
			js.M.describe("beforeEach / afterEach",function() {
				var beforeEach = false;
				js.M.beforeEach(function() {
					beforeEach = true;
				});
				var beforeEachAsync = false;
				js.M.beforeEach(function(done) {
					haxe.Timer.delay(function() {
						beforeEachAsync = true;
						done();
					},250);
				});
				var afterEach = false;
				js.M.afterEach(function() {
					afterEach = true;
				});
				js.M.it("should run before each test",function() {
					js.E.should(beforeEach).be.ok();
					js.E.should(afterEach).not.be.ok();
				});
				js.M.it("should run before each test asynchronously",function() {
					js.E.should(beforeEachAsync).be.ok();
				});
			});
		});
	});
};
specs.MochaSpec.__name__ = true;
specs.MochaSpec.prototype = {
	__class__: specs.MochaSpec
}
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
}; else null;
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
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var Void = { __ename__ : ["Void"]};
if(typeof document != "undefined") js.Lib.document = document;
if(typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}
Main.main();

//@ sourceMappingURL=mocha-haxe-test.js.map
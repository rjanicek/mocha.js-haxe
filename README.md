mocha.js-haxe
=============

Haxe bindings for mocha.js & expect.js - simple, flexible, fun javascript test framework for node.js & the browser. (BDD, TDD, QUnit styles via interfaces)

Tested with Haxe 2.10, Mocha.js 1.3.2, Expect.js 1.2.0 and Chrome.

GitHub -> https://github.com/rjanicek/mocha.js-haxe
Specs -> http://rjanicek.github.com/mocha.js-haxe

mocha.js -> http://visionmedia.github.com/mocha
expect.js -> https://github.com/LearnBoost/expect.js

###run
```haxe
Mocha.setup( { ui: Ui.BDD } );
new MochaSpec();
Mocha.run();
```

###test
```haxe
M.describe("Mocha", function () {
	M.it("should test things", function() {
		E.expect(true).to.be.ok();
		true.should().be.ok();
		E.expect(0).to.not.be.ok();
		E.expect(1).toBe(1);
		E.expect(true).to.equal(true);
		E.expect(1).to.eql("1");
		E.expect(5).to.be.a("number");
		E.expect("1.2.3").to.match("[0-9]+\\.[0-9]+\\.[0-9]+");
		E.expect("hello world").to.contain("world");
		E.expect([]).to.have.length(0);
		E.expect([]).to.be.empty();
		E.expect( { a: "b" } ).to.have.property("a", "b");
		E.expect( { a: "b", c: "d" } ).to.only.have.keys("a", "c");
		E.expect(function() { throw "knife"; } ).to.throwException();
		E.expect(1).to.be.within(0, Math.POSITIVE_INFINITY);
		E.expect(5).to.be.greaterThan(3);
		E.expect(1).to.be.lessThan(3);
		E.expect(5).to.be.a("number").and.toBe(5);
	});
});
```
###async
```haxe
M.it("should test asynchronous code", function(done) {
	var mochaIsCool = 0;
	Timer.delay(function() {
		mochaIsCool++;
		mochaIsCool.should().equal(1);
		done();
	}, 250);
	mochaIsCool.should().equal(0);
});
```
package;

import haxe.Firebug;
import js.mocha.Mocha;
import specs.ExpectSpec;
import specs.MochaSpec;

using js.mocha.Mocha;

/**
 * ...
 * @author Richard Janicek
 */

class Main {
	
	static function main() {
		
		if (Firebug.detect())
			Firebug.redirectTraces();
			
		Mocha.setup( { ui: Ui.BDD } );
		new MochaSpec();
		new ExpectSpec();
		Mocha.run();
	}
	
}
package;

import haxe.Firebug;
import js.Mocha;
import specs.ExpectSpec;
import specs.MochaSpec;

using js.Mocha;

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
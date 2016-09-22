/*eslint prefer-const: 2*/
/*eslint-env es6*/

/**
 * Test the Menu class
 *
 * @author Borgognon Nathalie
 * @version 25 Aug. 2016
 * @copyright CC BY-NC-ND 4.0
 */
var assert = chai.assert;

describe('Menu', function () {
    let menu;
    let controller;

    before(function () {
        controller = new Controller();
        menu = new Menu(HELP, controller, true);
    });

    describe('#constructor', function () {
        it('should return the construction state', function () {
            assert.equal(menu.isClicked, true);
        });
    });

    describe('#set/get state()', function () {
        it('should return the state value', function () {
            menu.isClicked = false;
            assert.equal(menu.isClicked, false);
        });
    });
});

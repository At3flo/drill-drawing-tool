/*eslint prefer-const: 2*/
/*eslint-env es6*/

/**
 * Test the controller class
 *
 * @author Borgognon Nathalie
 * @version 23 Aug. 2016
 * @copyright CC BY-NC-ND 4.0
 */
var assert = chai.assert;

describe('Controller', function () {
    let controller;

    before(function () {
        controller = new Controller();
    });

    describe('#constructor', function () {
        it('should return the construction state', function () {
            //MenuOnOffToogle isClicked
            assert.equal(controller.helpMenu.isClicked, false);
            assert.equal(controller.solutionMenu.isClicked, false);

            //MenuOnOffToogle isCliked
            assert.equal(controller.newMenu.isClicked, false);
            assert.equal(controller.selectMenu.isClicked, false);
            assert.equal(controller.deleteMenu.isClicked, false);
            assert.equal(controller.drawMenu.isClicked, false);
            assert.equal(controller.moveMenu.isClicked, false);
            assert.equal(controller.passMenu.isClicked, false);
            assert.equal(controller.shootMenu.isClicked, false);
            assert.equal(controller.playerMenu.isClicked, false);
            assert.equal(controller.opponentMenu.isClicked, false);

            //TODO: tester les autres état des menus et surtout le canvas Fabric.js
        });
    });
});

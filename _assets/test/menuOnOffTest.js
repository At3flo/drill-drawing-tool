/*eslint prefer-const: 2*/
/*eslint-env es6*/

/**
 * Test the MenuOnOff class
 *
 * @author Borgognon Nathalie
 * @version 23 Aug. 2016
 * @copyright CC BY-NC-ND 4.0
 */
var assert = chai.assert;

describe('MenuOnOff', function () {
    let menuOnOff;
    let controller;

    before(function () {
        controller = new Controller();
        menuOnOff = controller.helpMenu;
    });

    describe('#constructor', function () {
        it('should return the construction state', function () {
            assert.equal(menuOnOff.isClicked, false);
        });
    });

    describe('#set/get state()', function () {
        it('should return the state value', function () {
            menuOnOff.isClicked = true;
            assert.equal(menuOnOff.isClicked, true);
        });

        it('should change the state to on and the style button too', function () {
            menuOnOff.isClicked = true;
            let buttonStyle = document.getElementById(HELP).style;
            assert.equal(buttonStyle.border, BORDER_BUTTON_ON);
            assert.equal(buttonStyle.backgroundColor, BACKGROUNDCOLOR_BUTTON_ON);
        });


        it('should change the state to off and the style button too', function () {
            menuOnOff.isClicked = false;
            let buttonStyle = document.getElementById(HELP).style;
            assert.equal(buttonStyle.border, BORDER_BUTTON_OFF);
            assert.equal(buttonStyle.backgroundColor, BACKGROUNDCOLOR_BUTTON_OFF);
        });


        //TODO: vérifier que dans le canavas les objects ne sont pas selectionnable
        //TODO: vérifier que dans la page html il y aie une ouverture de sous-menu
    });
});

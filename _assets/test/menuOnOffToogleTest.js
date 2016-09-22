/*eslint prefer-const: 2*/
/*eslint-env es6*/

/**
 * Test the MenuOnOffToogle class
 *
 * @author Borgognon Nathalie
 * @version 25 Aug. 2016
 * @copyright CC BY-NC-ND 4.0
 */
var assert = chai.assert;

describe('MenuOnOffToogle', function () {
    let newMenu;
    let selectMenu;
    let deleteMenu;
    let controller;

    before(function () {
        controller = new Controller();
        newMenu = controller.newMenu
        selectMenu = controller.selectMenu;
        deleteMenu = controller.deleteMenu;
    });

    describe('#constructor', function () {
        it('should return the construction state', function () {
            //iconId
            assert.equal(newMenu.iconId, NEW);
            assert.equal(selectMenu.iconId, SELECT);
            assert.equal(deleteMenu.iconId, DELETE);
            // isClicked
            assert.equal(newMenu.isClicked, false);
            assert.equal(selectMenu.isClicked, false);
            assert.equal(deleteMenu.isClicked, false);

            // isDragged
            assert.equal(newMenu.isDragged, false);
            assert.equal(selectMenu.isDragged, false);
            assert.equal(deleteMenu.isDragged, false);

            // areSelectableObjects
            assert.equal(newMenu.areSelectableObjects, false);
            assert.equal(selectMenu.areSelectableObjects, true);
            assert.equal(deleteMenu.areSelectableObjects, true);

            // isDrawingModeOn
            assert.equal(newMenu.isDrawingModeOn, false);
            assert.equal(selectMenu.isDrawingModeOn, false);
            assert.equal(deleteMenu.isDrawingModeOn, false);

            // isClearCanvasOn
            assert.equal(newMenu.isClearCanvasOn, true);
            assert.equal(selectMenu.isClearCanvasOn, false);
            assert.equal(deleteMenu.isClearCanvasOn, false);
        });
    });

    describe('#set/get state()', function () {
        it('should return the state value', function () {
            selectMenu.isClicked = true;
            assert.equal(newMenu.isClicked, false);
            assert.equal(selectMenu.isClicked, true);
            assert.equal(deleteMenu.isClicked, false);
        });

        it('should change the state to new button to on and off to others buttons', function () {
            newMenu.isClicked = true;
            let newButtonStyle = document.getElementById(NEW).style;
            let selectButtonStyle = document.getElementById(SELECT).style;
            let deleteButtonStyle = document.getElementById(DELETE).style;

            assert.equal(newButtonStyle.border, BORDER_BUTTON_ON);
            assert.equal(newButtonStyle.backgroundColor, BACKGROUNDCOLOR_BUTTON_ON);
            assert.equal(selectButtonStyle.border, BORDER_BUTTON_OFF);
            assert.equal(selectButtonStyle.backgroundColor, BACKGROUNDCOLOR_BUTTON_OFF);
            assert.equal(deleteButtonStyle.border, BORDER_BUTTON_OFF);
            assert.equal(deleteButtonStyle.backgroundColor, BACKGROUNDCOLOR_BUTTON_OFF);
        });

        //TODO: vérifier que dans le canavas les objects sont ou pas selectionnable
        //TODO: vérifier que dans le canavas le mode dessin (drawingMode) est ou pas activé
        //TODO: vérifier que dans le canavas est complètement effacé
    });
});

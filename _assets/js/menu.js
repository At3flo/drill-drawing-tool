/*eslint prefer-const: 2*/
/*eslint-env es6*/

/**
 * Manage the state of the GUI elements of DrillDraw application
 *
 * @author Borgognon Nathalie
 * @version 25 Aug. 2016
 * @copyright CC BY-NC-ND 4.0
 */
class Menu {
    /**
     * Constructs the parent menu of all menus
     * @param {string} iconId name of the icon menu
     * @param {object} controller manager of the application DrillDraw
     * @param {boolean} isClicked state of the icon menu
     */
    constructor(iconId, controller, isClicked) {
        this._iconId = iconId;
        this._controller = controller;
        this._isClicked = isClicked;
    }

    /**
     * Gets the name of the icon menu
     */
    get iconId() {
        return this._iconId;
    }

    /**
     * Gets the controller of the application DrillDraw
     */
    get controller() {
        return this._controller;
    }

    /**
     * Sets the state of the icon menu
     * @param {boolean} isClicked state of the icon menu
     */
    set isClicked(isClicked) {
        this._isClicked = isClicked;
    }

    /**
     * Gets the state of the icon menu
     */
    get isClicked() {
        return this._isClicked;
    }


}

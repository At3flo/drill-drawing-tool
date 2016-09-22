/*eslint prefer-const: 2*/
/*eslint-env es6*/

/**
 * Manage the state of the GUI elements of DrillDraw application, which can be enabled or disabled by the user with a simple mouse click
 *
 * @author Borgognon Nathalie
 * @version 23 Aug. 2016
 * @copyright CC BY-NC-ND 4.0
 */
class MenuOnOff extends Menu {
    /**
     * Constructs the specific type of on/off menu
     * @param {string} iconId name of the icon menu
     * @param {object} controller manager of the application DrillDraw
     * @param {boolean} isClicked state of the icon menu
     */
    constructor(iconId, controller, isClicked) {
        super(iconId, controller, isClicked);
    }

    /**
     * Sets the state of the icon menu
     * @param {boolean} isClicked state of the icon menu
     */
    set isClicked(isClicked) {
        if (isClicked) {
            super.controller.selectedIcon(super.iconId);
        } else {
            super.controller.deselectedIcon(super.iconId);
        }
        super.isClicked = isClicked;
        super.controller.areSelectableObjects(false);
        super.controller.displayContent(super.isClicked, super.iconId);
    }

    /**
     * Gets the state of the icon menu
     */
    get isClicked() {
        return super.isClicked;
    }
}

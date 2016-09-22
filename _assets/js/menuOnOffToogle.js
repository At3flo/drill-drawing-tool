/*eslint prefer-const: 2*/
/*eslint-env es6*/

/**
 * Manage the state of the GUI elements of DrillDraw application, which can be enabled by the user with a simple mouse click and disabled with a another icon mouse click
 *
 * @author Borgognon Nathalie
 * @version 25 Aug. 2016
 * @copyright CC BY-NC-ND 4.0
 */
class MenuOnOffToogle extends Menu {
    /**
     * Constructs the specific type of on/off menu
     * @param {string} iconId name of the icon menu
     * @param {object} controller manager of the application DrillDraw
     * @param {boolean} isClicked state of the icon menu
     * @param {boolean} isDragged state if the icon menu is dragged
     * @param {boolean} areSelectableObjects are objects selectable in the canvas
     * @param {boolean} isDrawingModeOn is the drawing mode enabled
     * @param {boolean} isClearCanvasOn is necessary to delete all canvas objects
     */
    constructor(iconId, controller, isClicked, isDragged, areSelectableObjects, isDrawingModeOn, isClearCanvasOn) {
        super(iconId, controller, isClicked);
        this._isDragged = isDragged;
        this._areSelectableObjects = areSelectableObjects;
        this._isDrawingModeOn = isDrawingModeOn;
        this._isClearCanvasOn = isClearCanvasOn;
    }

    /**
     * Sets the state of the icon menu
     * @param {boolean} isClicked state of the icon menu
     */
    set isClicked(isClicked) {
        if (isClicked) {
            super.controller.deselectedAllToogleIcons();
            super.controller.selectedIcon(super.iconId);
            super.controller.areSelectableObjects(this._areSelectableObjects);
            super.controller.isDrawingModeOn(this._isDrawingModeOn);
            if (this._isClearCanvasOn) {
                super.controller.clearCanevas();
            }
        } else {
            super.controller.deselectedIcon(super.iconId);
        }
        super.isClicked = isClicked;
    }

    /**
     * Gets the state of the icon menu
     */
    get isClicked() {
        return super.isClicked;
    }

    /**
     * Sets the draggable state of the icon menu
     * @param {boolean} isDragged state if the icon menu is dragged
     */
    set isDragged(isDragged) {
        this._isDragged = isDragged;
    }

    /**
     * Gets the draggable state of the icon menu
     */
    get isDragged() {
        return this._isDragged;
    }

    /**
     * Gets if objects in the canvas are selectable
     */
    get areSelectableObjects() {
        return this._areSelectableObjects;
    }

    /**
     * Gets if the drawing mode is enabled in the canvas
     */
    get isDrawingModeOn() {
        return this._isDrawingModeOn;
    }

    /**
     * Gets if it is necessary to delete all canvas objects
     */
    get isClearCanvasOn() {
        return this._isClearCanvasOn;
    }
}

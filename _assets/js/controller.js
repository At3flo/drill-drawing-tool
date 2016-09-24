/*eslint prefer-const: 2*/
/*eslint-env es6*/

/**
 * Manage the application DrillDraw
 *
 * @author Borgognon Nathalie
 * @version 23 Aug. 2016
 * @copyright CC BY-NC-ND 4.0
 */
class Controller {

    //TODO: découpler la partie UI du Controller (Interface en JavaScript ?)
    /**
     * Constructs the controller
     */
    constructor() {
        this._helpMenu = new MenuOnOff(HELP, this, false);
        this._solutionMenu = new MenuOnOff(SOLUTION, this, false);

        this._newMenu = new MenuOnOffToogle(NEW, this, false, false, false, false, true);
        this._fieldMenu = new MenuOnOffToogle(FIELD, this, false, false, false, false, false);
        this._selectMenu = new MenuOnOffToogle(SELECT, this, false, false, true, false, false);
        this._deleteMenu = new MenuOnOffToogle(DELETE, this, false, false, true, false, false);
        this._drawMenu = new MenuOnOffToogle(DRAW, this, false, false, false, true, false);

        this._moveMenu = new MenuOnOffToogle(MOVE, this, false, false, false, false, false);
        this._passMenu = new MenuOnOffToogle(PASS, this, false, false, false, false, false);
        this._shootMenu = new MenuOnOffToogle(SHOOT, this, false, false, false, false, false);

        this._playerMenu = new MenuOnOffToogle(PLAYER, this, false, false, false, false, false);
        this._opponentMenu = new MenuOnOffToogle(OPPONENT, this, false, false, false, false, false);

        this._canvas = new fabric.Canvas('drillDrawingTool');

        this._isMouseDown = false;
        this._mouseDownPointer;

        this._fieldStateFIELD_5VS5;
    }

    /**
     *  Canvas basic creation and global customization
     */
    init() {
        this.displayDrillField('_assets/img/Hockey-Rink.svg');
        this._canvas.selection = false;
        this._canvas.hoverCursor = 'pointer';
    }

    /**
     * Change the graphic aspect of the selected icon
     * @param {string} iconId name of the selected icon
     */
    selectedIcon(iconId) {
        document.getElementById(iconId).style.border = BORDER_BUTTON_ON;
        document.getElementById(iconId).style.backgroundColor = BACKGROUNDCOLOR_BUTTON_ON;
    }

    /**
     * Change the graphic aspect of the unselected icon
     * @param {string} iconId name of the selected icon
     */
    deselectedIcon(iconId) {
        document.getElementById(iconId).style.border = BORDER_BUTTON_OFF;
        document.getElementById(iconId).style.backgroundColor = BACKGROUNDCOLOR_BUTTON_OFF;
    }

    /**
     * Change the selectable state property for all objects in canvas
     * @param {boolean} booleanValue value of selectable state of all objects in canvas
     */
    areSelectableObjects(booleanValue) {
        for (let i = 0; i < this._canvas.getObjects().length; i++) {
            this._canvas.item(i).selectable = booleanValue;
            this._canvas.item(i).borderColor = 'black';
            this._canvas.item(i).cornerColor = 'black';
            this._canvas.item(i).cornerSize = 6;
            this._canvas.item(i).transparentCorners = false;
        }
    }

    /**
     * Display the additional HTML content of the drill drawing tool
     * @param {boolean} state of the selected icon and the bound feature
     * @param {string} iconId name of the selected icon
     */
    displayContent(state, iconId) {
        let styleClassName = "tacticalBoard" + iconId.charAt(0).toUpperCase() + iconId.substring(1, iconId.length + 1);

        if (state) {
            document.getElementsByClassName(styleClassName)[0].style.display = "inline";
        } else {
            document.getElementsByClassName(styleClassName)[0].style.display = "none";
        }
    }

    /**
     * Deselect all toogle menu icons
     */
    deselectedAllToogleIcons() {
        //TODO: utiliser un itérateur pour les objets de type MenuOnOffToogle
        this._newMenu.isClicked = false;
        this._selectMenu.isClicked = false;
        this._deleteMenu.isClicked = false;
        this._drawMenu.isClicked = false;
        this._fieldMenu.isClicked = false;

        this._moveMenu.isClicked = false;
        this._passMenu.isClicked = false;
        this._shootMenu.isClicked = false;

        this._playerMenu.isClicked = false;
        this._opponentMenu.isClicked = false;
    }

    /**
     * Deselect the drawing mode in the canvas
     * @param {[[Type]]} state [[Description]]
     */
    isDrawingModeOn(state) {
        this._canvas.isDrawingMode = state;
    }

    /**
     * Clear the canavas with all draw elements
     */
    clearCanevas() {
        let confrimResponse;
        if (this._newMenu.isClicked) {
            confrimResponse = confirm(NEW_MESSAGE);
        }

        if (confrimResponse) {
            this._canvas.clear().renderAll();
        }
    }

    /**
     * change the field background of the canavas
     */
    changeFieldCanevas() {
        let confrimResponse;
        if (this._fieldMenu.isClicked) {
            confrimResponse = confirm(FIELD_CHANGE_MESSAGE);
        }

        if (confrimResponse) {
            this._canvas.clear().renderAll();
            if (this._fieldState === FIELD_5VS5) {
                this._fieldState = FIELD_4VS4;
                this.displayDrillField('_assets/img/Hockey-Rink_4vs4.svg');
            } else if (this._fieldState === FIELD_4VS4) {
                this._fieldState = FIELD_5VS5;
                this.displayDrillField('_assets/img/Hockey-Rink.svg');
            }
        }
    }

    /**
     * Delete selected object on the canvas
     */
    deleteSelectedObject() {
        let activeObject = this._canvas.getActiveObject();
        this._canvas.remove(activeObject);
    }

    /**
     * Display the drill field
     * @param {string} URL the path of the drill field image
     */
    displayDrillField(URL) {
        this._canvas.setBackgroundImage(URL, this._canvas.renderAll.bind(this._canvas), {
            width: this._canvas.width,
            height: this._canvas.height,
            originX: 'left',
            originY: 'top'
        });
    }

    /**
     * Create temporary move arrow animation
     * @param {object} mouseEvent collection of canvas informations
     */
    createArrowAnimation(mouseEvent) {
        this._isMouseDown = true;
        this._mouseDownPointer = this._canvas.getPointer(mouseEvent);
        let points = [this._mouseDownPointer.x, this._mouseDownPointer.y, this._mouseDownPointer.x, this._mouseDownPointer.y];
        let line = new fabric.Line(points, {
            strokeWidth: 5,
            fill: 'black',
            stroke: 'black',
            originX: 'center',
            originY: 'center',
            lockScalingX: true,
            lockScalingY: true,
            hasControls: false,
            hasBorder: false,
            borderColor: 'black'
        });

        // Animation differences between all sort of arrows
        if (this._moveMenu.isClicked) {
            line.id = MOVE;
        } else if (this._passMenu.isClicked) {
            line.id = PASS;
            line.strokeDashArray = [5, 5];
        } else {
            line.id = SHOOT;
        }

        line.selectable = false;
        this._canvas.add(line);
    }

    /**
     * Extend temporary move arrow animation
     * @param {object} mouseEvent collection of canvas informations
     */
    extendArrowAnimation(mouseEvent) {
        if (!this._isMouseDown) return;
        let pointer = this._canvas.getPointer(mouseEvent);
        let i = this._canvas.getObjects().length - 1;
        this._canvas.item(i).set({
            x2: pointer.x,
            y2: pointer.y
        });
        this._canvas.renderAll();
    }

    /**
     * Create final move arrow on the same path of arrow animation
     * @param {object} mouseEvent collection of canvas informations
     */
    createMoveArrow(mouseEvent) {
        this._isMouseDown = false;

        // Delete dynamic line construction
        let i = this._canvas.getObjects().length - 1;
        this._canvas.remove(this._canvas.item(i));

        let mouseUpPointer = this._canvas.getPointer(mouseEvent)
        let points = [this._mouseDownPointer.x, this._mouseDownPointer.y, mouseUpPointer.x, mouseUpPointer.y];

        let line = new fabric.Line(points, {
            fill: 'black',
            stroke: 'black',
            originX: 'center',
            originY: 'center',
            hasControls: false,
            hasBorder: false,
            borderColor: 'black'
        });

        // Difference between all sort of arrows
        let line2;
        if (this._moveMenu.isClicked) {
            line.strokeWidth = 5;
            line.id = MOVE;
        } else if (this._passMenu.isClicked) {
            line.strokeWidth = 5;
            line.id = PASS;
            line.strokeDashArray = [5, 5];
        } else {
            line.strokeWidth = 10;
            line.id = SHOOT;
            line2 = new fabric.Line(points, {
                strokeWidth: 3,
                fill: 'white',
                stroke: 'white',
                originX: 'center',
                originY: 'center',
                hasControls: false,
                hasBorder: false,
                borderColor: 'black'
            });
            line2.id = SHOOT;
            line2.selectable = false;
        }

        line.selectable = false;

        // Draw and orient the triangle tip of the arrow
        let angle = this.calcArrowAngle(line.x1, line.y1, line.x2, line.y2) - 270;
        let deltaX = ((line.x1 + line.x2) / 2) - line.left;
        let deltaY = ((line.y1 + line.y2) / 2) - line.top;

        let lineEnd = new fabric.Triangle({
            left: line.get('x2') + deltaX,
            top: line.get('y2') + deltaY,
            originX: 'center',
            originY: 'center',
            hasBorders: false,
            hasControls: false,
            pointType: 'arrow_start',
            angle: angle,
            width: 20,
            height: 20,
            fill: 'black'
        });
        lineEnd.selectable = false;

        // Create an object group with line(s) and the tip
        let arrow;
        if (this._shootMenu.isClicked) {
            arrow = new fabric.Group([line, line2, lineEnd], {
                lockScalingX: true,
                lockScalingY: true
            });
        } else {
            arrow = new fabric.Group([line, lineEnd], {
                lockScalingX: true,
                lockScalingY: true
            });
        }

        // Customization select border controls of the group
        arrow.setControlVisible('tl', false);
        arrow.setControlVisible('tr', false);
        arrow.setControlVisible('br', false);
        arrow.setControlVisible('bl', false);
        arrow.setControlVisible('ml', false);
        arrow.setControlVisible('mt', false);
        arrow.setControlVisible('mr', false);
        arrow.setControlVisible('mb', false);
        arrow.selectable = false;

        this._canvas.add(arrow);
    }

    /**
     * Create player forms
     * @param {object} mouseEvent collection of canvas informations
     */
    createPlayerForm(mouseEvent) {
        let isClicked = false;
        // FIXME trouver une solution pour avoir accès aux valeurs des instances de drillDraw à l'intérieur de la fonction fabric.loadSVGFromURL => ce qui résoleverait le problème avec les icônes à dragger
        let playerMenuIsClicked = this._playerMenu.isClicked;
        let playerMenuIsDragged = this._playerMenu.isDragged;
        let opponentMenuIsClicked = this._opponentMenu.isClicked;
        let opponentMenuIsDragged = this._opponentMenu.isDragged;

        // Precedence of type of mouse event: drag event over click event
        if (playerMenuIsDragged || opponentMenuIsDragged) {
            isClicked = true;
            playerMenuIsClicked = false;
            opponentMenuIsClicked = false;
        }

        let URL;
        if (this._playerMenu.isClicked || this._playerMenu.isDragged) {
            URL = '_assets/img/ic_panorama_fish_eye_black_48px.svg';
        } else if (this._opponentMenu.isClicked || this._opponentMenu.isDragged) {
            URL = '_assets/img/ic_change_history_black_48px.svg';
        }

        //FIXME refactoring des objects métiers et de leur création en class
        let pointer = this._canvas.getPointer(mouseEvent);
        let canvas = this._canvas;
        //let player;
        fabric.loadSVGFromURL(URL, function (objects, options) {
            let player = fabric.util.groupSVGElements(objects, options);
            player.set({
                left: pointer.x,
                top: pointer.y,
                originX: 'center',
                originY: 'center',
                hasControls: false,
                lockScalingX: true,
                lockScalingY: true,
                lockRotation: true
            });

            // Difference between all sort of player
            if (playerMenuIsClicked || playerMenuIsDragged) {
                player.strokeWidth = 5;
                player.id = PLAYER;
                playerMenuIsDragged = false;
                if (isClicked) {
                    opponentMenuIsClicked = true
                };
            } else if (opponentMenuIsClicked || opponentMenuIsDragged) {
                player.strokeWidth = 5;
                player.id = OPPONENT;
                player.strokeDashArray = [5, 5];
                opponentMenuIsDragged = false;
                if (isClicked) {
                    playerMenuIsClicked = true
                };
            }

            player.selectable = false;
            canvas.add(player);
        });
    }

    /**
     * Calculate the right orientation of the tip compared to the orientation of the arrow
     * @param   {number} x1 x value or first line edge
     * @param   {number} y1 y value or first line edge
     * @param   {number} x2 x value or second line edge
     * @param   {number} y2 y value or second line edge
     * @returns {number} value of the tip angle orientation relative to the line orientation associated with
     */
    calcArrowAngle(x1, y1, x2, y2) {
        let angle = 0;
        let x = (x2 - x1);
        let y = (y2 - y1);

        if (x === 0) {
            angle = (y === 0) ? 0 : (y > 0) ? Math.PI / 2 : Math.PI * 3 / 2;
        } else if (y === 0) {
            angle = (x > 0) ? 0 : Math.PI;
        } else {
            angle = (x < 0) ? Math.atan(y / x) + Math.PI : (y < 0) ? Math.atan(y / x) + (2 * Math.PI) : Math.atan(y / x);
        }

        return (angle * 180 / Math.PI);
    }

    /**
     * Gets the help menu instance
     */
    get helpMenu() {
        return this._helpMenu;
    }

    /**
     * Gets the solution menu instance
     */
    get solutionMenu() {
        return this._solutionMenu;
    }

    /**
     * Gets the new menu instance
     */
    get newMenu() {
        return this._newMenu;
    }

    /**
     * Gets the select menu instance
     */
    get selectMenu() {
        return this._selectMenu;
    }

    /**
     * Gets the delete menu instance
     */
    get deleteMenu() {
        return this._deleteMenu;
    }

    /**
     * Gets the draw menu instance
     */
    get drawMenu() {
        return this._drawMenu;
    }

    /**
     * Gets the fiel menu instance
     */
    get fieldMenu() {
        return this._fieldMenu;
    }

    /**
     * Gets the move menu instance
     */
    get moveMenu() {
        return this._moveMenu;
    }

    /**
     * Gets the pass menu instance
     */
    get passMenu() {
        return this._passMenu;
    }

    /**
     * Gets the shoot menu instance
     */
    get shootMenu() {
        return this._shootMenu;
    }

    /**
     * Gets the player menu instance
     */
    get playerMenu() {
        return this._playerMenu;
    }

    /**
     * Gets the opponent menu instance
     */
    get opponentMenu() {
        return this._opponentMenu;
    }

    /**
     * Gets the canvas instance
     */
    get canvas() {
        return this._canvas;
    }
}

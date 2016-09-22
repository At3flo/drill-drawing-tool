/*eslint prefer-const: 2*/
/*eslint-env es6*/

/**
 * Streethockey drill drawing tool.
 *
 * @author Borgognon Nathalie
 * @version 24 Jan. 2016
 * @copyright CC BY-NC-ND 4.0
 */

/* Constants for managing icons */
const NEW = "new";
const SELECT = "select";
const DELETE = "delete";
const DRAW = "draw";

const MOVE = "move";
const PASS = "pass";
const SHOOT = "shoot";

const PLAYER = "player";
const OPPONENT = "opponent";

const SOLUTION = "solution";
const HELP = "help";

const BORDER_BUTTON_ON = "thin dotted gray";
const BACKGROUNDCOLOR_BUTTON_ON = "rgb(204, 53, 57)";
const BORDER_BUTTON_OFF = "initial";
const BACKGROUNDCOLOR_BUTTON_OFF = "initial";

let controller;

/* Main  */

controller = new Controller();
controller.init();

/* Draggable menu icons */
//FIXME résoudre le problème des icônes de menus à dragger
//$(".draggable").draggable({
//    stop: controller.createPlayerForm,
//    helper: "clone",
//    opacity: 0.35
//});
//
//$(".draggable").find(":input").on("mousedown", function (e) {
//    var mousedown = new MouseEvent("mousedown", {
//        screenX: e.screenX,
//        screenY: e.screenY,
//        clientX: e.clientX,
//        clientY: e.clientY,
//        view: window
//    });
//    $(this).closest(".draggable")[0].dispatchEvent(mousedown);
//})

/* Canvas events */

controller.canvas.on('mouse:down', function (options) {
    // Create temporary move arrow
    if (controller.moveMenu.isClicked || controller.passMenu.isClicked || controller.shootMenu.isClicked) {
        controller.createArrowAnimation(options.e);
    }

    // Delete selected object from canvas
    if (controller.deleteMenu.isClicked) {
        controller.deleteSelectedObject();
    }
});

controller.canvas.on('mouse:move', function (options) {
    // Extend temporary move arrow
    if (controller.moveMenu.isClicked || controller.passMenu.isClicked || controller.shootMenu.isClicked) {
        controller.extendArrowAnimation(options.e);
    }
});

controller.canvas.on('mouse:up', function (options) {
    // Enable selection mode
    if (controller.selectMenu.isClicked) {}

    // Create player form
    if (controller.playerMenu.isClicked || controller.opponentMenu.isClicked) {
        controller.createPlayerForm(options.e);
    }

    // Create move arrow
    if (controller.moveMenu.isClicked || controller.passMenu.isClicked || controller.shootMenu.isClicked) {
        controller.createMoveArrow(options.e);
    }

    // Create free drawing
    if (controller.drawMenu.isClicked) {
        controller.canvas.isDrawingMode = true;
        controller.canvas.freeDrawingBrush.width = 5;
    }

    // Display drill drawing tool help
    if (controller.helpMenu.isClicked) {}
});

/* HTML events */

//TODO: créer une function menuOnOFFClicked(id) pour regrouper le code d'événement commun aux icônes "solution" et "aide"
/**
 * Click the "solution" icon
 */
function solutionClicked() {
    if (controller.solutionMenu.isClicked) {
        controller.solutionMenu.isClicked = false;
    } else {
        controller.solutionMenu.isClicked = true;
    }
}

/**
 * Click the "help" icon
 */
function helpClicked() {
    if (controller.helpMenu.isClicked) {
        controller.helpMenu.isClicked = false;
    } else {
        controller.helpMenu.isClicked = true;
    }
}

//TODO: créer une function menuOnOFFToogleClicked(id) pour regrouper le code d'événement commun aux autres icônes
/**
 * Click the "new" icon
 */
function newClicked() {
    controller.newMenu.isClicked = true;
}

/**
 * Click the "select" icon
 */
function selectClicked() {
    controller.selectMenu.isClicked = true;
}

/**
 * Click the "delete" icon
 */
function deleteClicked() {
    controller.deleteMenu.isClicked = true;
}

/**
 * Click the "draw" icon
 */
function drawClicked() {
    controller.drawMenu.isClicked = true;
}

/**
 * Click the "player" icon
 */
function playerClicked() {
    controller.playerMenu.isClicked = true;
}

/**
 * Drag the "player" icon
 */
function playerDragged() {
    controller.playerMenu.isDragged = true;
}

/**
 * Click the "opponent" icon
 */
function opponentClicked() {
    controller.opponentMenu.isClicked = true;
}

/**
 * Drag the "opponent" icon
 */
function opponentDragged() {
    controller.opponentMenu.isDragged = true;
}

/**
 * Click the "move" icon
 */
function moveClicked() {
    controller.moveMenu.isClicked = true;
}

/**
 * Click the "pass" icon
 */
function passClicked() {
    controller.passMenu.isClicked = true;
}

/**
 * Click the "shoot" icon
 */
function shootClicked() {
    controller.shootMenu.isClicked = true;
}

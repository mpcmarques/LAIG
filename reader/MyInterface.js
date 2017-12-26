 /**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor
    CGFinterface.call(this);

}

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui
    var self = this;
    this.gui = new dat.GUI();
    // add a group of controls (and open/expand by defult)


   this.controller = this.gui.add(this.scene, 'currentGraph', {
        'Prison': 0,
        'Space': 1
    }).name('Theme');

    this.controller.onChange(function(value) {
        this.object.onGraphChange();
    });

    this.obj = this;

    return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
*/
MyInterface.prototype.addLightsGroup = function(lights) {

    var group = this.gui.addFolder("Lights");
    group.open();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key);
        }
    }
};

MyInterface.prototype.loadGameInterface = function () {

    // camera selection
    var selectedCamera = this.gui.add(this.scene, 'selectedCamera', {
        'Side' : 0,
        'Player one' : 1,
        'Player two': 2,
        'Above': 3,
        'Room': 4
    });
    selectedCamera.name('Cameras');
    selectedCamera.onFinishChange(this.onCameraChange);

    // game mode selection
    this.gameOptions = this.gui.addFolder('Game');
    this.gameOptions.open();

    // type (H/H, H/M, M/M)
    this.gameType = this.gameOptions.add(this.scene, 'gameType', {
        'Player/Player': 0,
        'Player/Computer': 1,
        'Computer/Computer': 2
    });
    this.gameType.name('Game Type');
    this.gameType.onFinishChange(function(value){
        this.object.interface.setGameType(value);
    });


    // load first game type options.
    this.startingPlayer = this.gameOptions.add(this.scene, 'startingPlayer', {
        'Black': 0,
        'White': 1
    }).name('Starting player');

    // add start game button
    this.addStartGameButton();
};

MyInterface.prototype.setGameType = function(value){
    // remove difficulty
    if(this.difficulty != null){
        this.gameOptions.remove(this.difficulty);
        this.difficulty = null;
    }

    // remove start button
    if(this.startButton != null) {
        this.gameOptions.remove(this.startButton);
        this.startButton = null;
    }

    // if it is player/computer computer/computer ask to choose difficulty
    if(value == 1 || value == 2){
        this.difficulty = this.gameOptions.add(this.scene, 'difficulty', {
            'Easy': 0,
            'Hard': 1
        });
        this.difficulty.name('Difficulty');
    }

    // add start game button.
    this.addStartGameButton();
};

MyInterface.prototype.addStartGameButton = function(){
    this.startButton = this.gameOptions.add(this.scene, 'startGame');
    this.startButton.name('Start Game');
};

MyInterface.prototype.removeGameOptions = function(){
    this.gameOptions.remove(this.gameType);
    this.gameOptions.remove(this.startButton);
    this.gameOptions.remove(this.startingPlayer);
};

MyInterface.prototype.addGameProperties = function(){
    this.numberBlackPieces = this.gameOptions.add(this.scene, 'numberBlackPieces').name('Black pieces:');
    this.numberWhitePieces = this.gameOptions.add(this.scene, 'numberWhitePieces').name('White pieces:');
    this.timeLeft = this.gameOptions.add(this.scene, 'timeLeft').name('Time left:');

    // disable changes
    this.numberBlackPieces.domElement.style.pointerEvents = 'none';
    this.numberWhitePieces.domElement.style.pointerEvents = 'none';
    this.timeLeft.domElement.style.pointerEvents = 'none';
    this.timeLeft.listen();

    // undo option
    var undo = this.gui.add(this.scene, 'undo');
    undo.name('Undo last play');
};

MyInterface.prototype.onCameraChange = function(value){

    // check if selected camera has changed.
    if(this.object.lastSelectedCamera != value) {
        this.object.needToUpdateCamera = true;
        this.object.lastSelectedCamera = value;
    }
 };
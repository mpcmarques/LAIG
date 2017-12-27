var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(myInterface) {
    CGFscene.call(this);

    this.interface = myInterface;
    this.lightValues = {};
    this.selectedShader = 0;
    this.selectedNode = 0;

    this.selectable = [];
    this.graphs = [];
    this.currentGraph = 0;
    this.numberGraphsLoaded = 0;
    this.numberBlackPieces = 0;
    this.numberWhitePieces = 0;
    this.timeLeft = 60;
    this.position = 0;
    this.selectedCamera = 0;
    this.lastSelectedCamera = 0;
    this.difficulty = 0;
    this.needToUpdateCamera = false;
    this.cameras=[
        vec3.fromValues(-8, 8, 0), vec3.fromValues(0, 5, 10), vec3.fromValues(0, 10, -6), vec3.fromValues(2, 20, 0), vec3.fromValues(-3, 10, 13)
    ];
    this.gameType = 0;
    this.startingPlayer = 0;



    this.gameStarted = false;

    this.setPickEnabled(true);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.enableTextures(true);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);


    // sets update period
    this.setUpdatePeriod(30);
};

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function() {
    var i = 0;
    // Lights index.

    // Reads the lights from the scene graph.
    var graph = this.graphs[this.currentGraph];

    for (var key in graph.lights) {
        if (i >= 8)
            break;              // Only eight lights allowed by WebGL.

        if (graph.lights.hasOwnProperty(key)) {
            var light = graph.lights[key];

            this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
            this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
            this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
            this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);

            this.lights[i].setVisible(true);
            if (light[0])
                this.lights[i].enable();
            else
                this.lights[i].disable();

            this.lights[i].update();

            i++;
        }
    }

};


/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function() {

    this.camera = new CGFcamera(0.4,0.1,500,this.cameras[this.selectedCamera],vec3.fromValues(0, 0, 0));

  };

/* Handler called when all the graphs are finally loaded.
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphsLoaded = function() {
    // loaded all graphs
    if(this.numberGraphsLoaded == this.graphs.length) {
        // initialize interface
        this.interface.loadGameInterface();

        // Adds lights group.
        this.interface.addLightsGroup(this.graphs[this.currentGraph].lights);

        // load first graph on screen.
        this.onGraphChange();
    }
};

XMLscene.prototype.onGraphChange = function(){
    var graph = this.graphs[this.currentGraph];

    this.camera.near = graph.near;
    this.camera.far = graph.far;
    this.axis = new CGFaxis(this,graph.referenceLength);

    this.setGlobalAmbientLight(graph.ambientIllumination[0], graph.ambientIllumination[1],
        graph.ambientIllumination[2], graph.ambientIllumination[3]);

    this.gl.clearColor(graph.background[0], graph.background[1], graph.background[2], graph.background[3]);

    this.initLights();
};

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {
    // ---- BEGIN Background, camera and axis setup


    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();


    this.logPicking();
    this.clearPickRegistration();


    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.pushMatrix();

    // graph
    var graph = this.graphs[this.currentGraph];

    if (graph.loadedOk)
    {

        // Applies initial transformations.
        this.multMatrix(graph.initialTransforms);

		// Draw axis
		this.axis.display();

        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                }
                else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }

        // Displays the scene.
        graph.displayScene();


    }
	else
	{
		// Draw axis
		this.axis.display();
	}

    this.popMatrix();

    // ---- END Background, camera and axis setup

};

/**
 * Callback used when it is necessary to update some internal state independent of the rendering (display) of the scene. Should be reimplemented by descendants.
 * @param currTime Current time.
 */
XMLscene.prototype.update = function (currTime) {

    // update current graph
    if(this.graphs.length > 0){
        this.graphs[this.currentGraph].update(currTime);
    }

    // update camera position
    if(this.needToUpdateCamera)
        this.animateCamera(currTime);

    // update time left
    if(this.gameStarted) {
        this.timeLeft -= 1/30;
        if(this.timeLeft < 0){
            this.timeLeft = 60;
        }
    }
};

XMLscene.prototype.animateCamera = function(currTime){
    // selected camera position.
    var newPosition = this.cameras[this.selectedCamera];

    // animating camera.
    // update camera X.
    if(this.camera.position[0] != newPosition[0]){
        this.camera.position[0] += newPosition[0] - this.camera.position[0] > 0 ? 1 : -1;
    }

    // update camera Y.
    if(this.camera.position[1] != newPosition[1]){
        this.camera.position[1] += newPosition[1] - this.camera.position[1] > 0 ? 1 : -1;
    }

    // update camera Z.
    if(this.camera.position[2] != newPosition[2]){
        this.camera.position[2] += newPosition[2] - this.camera.position[2] > 0 ? 1 : -1;
    }

};

XMLscene.prototype.logPicking = function ()
{
    if (this.pickMode == false) {
        if (this.pickResults != null && this.pickResults.length > 0) {
            for (var i=0; i< this.pickResults.length; i++) {
                var obj = this.pickResults[i][0];
                if (obj)
                {

                    var customId = this.pickResults[i][1];
                    this.position = customId;
                   console.log(customId + " picked");
                }
            }
            this.pickResults.splice(0,this.pickResults.length);
        }
    }
};

XMLscene.prototype.startGame = function(){
    this.gameStarted = true;
    // remove options from interface.
    this.interface.removeGameOptions();
    // add game properties
    this.interface.addGameProperties();
};

XMLscene.prototype.undo = function(){

};

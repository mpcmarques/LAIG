function Fabrik () {
    this.currentBoard = null;


}

Fabrik.prototype.constructor = Fabrik;

Fabrik.prototype.getPrologRequest = function(requestString, onSuccess, onError, port) {
    var requestPort = port || 8081;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);

    request.onload = onSuccess || function (data) {
            console.log("Request successful. Reply: " + data.target.response);
        };
    request.onerror = onError || function () {
            console.log("Error waiting for response");
        };

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
};

Fabrik.prototype.getInitialBoard = function(onSuccess) {
    // get initial board
    // loading board
    this.getPrologRequest('initialBoard', function(data){
        // finished loading board
        onSuccess(data.target.response);
    });


};

Fabrik.prototype.movePiece = function(tab, piece, line, column, callback){
    var call = 'movePiece(' + tab + ',' + piece + ',' + line + ',' + column + ')';
    console.warn(call);

    this.getPrologRequest(call, function(data){
        callback(data.target.response);
    }
    );
};



Fabrik.prototype.handleReply = function(data){
    return data.target.response;
};





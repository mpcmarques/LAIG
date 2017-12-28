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
    var self = this;

    this.getPrologRequest(call, function(data){
        var newBoard = self.parseBoard(data.target.response);
        callback(newBoard);
    }
    );
};



Fabrik.prototype.handleReply = function(data){
    return data.target.response;
};


Fabrik.prototype.parseBoard = function(stringBoard){

    var board = [];
    var line = [];

    for(var i= 0; i < stringBoard.length; i++) {
        var char = stringBoard.charAt(i);

        if(board.length == 11)
            break;

        switch (char) {
            case '[':
                break;
            case ',':
                break;
            case 't':
                var aux = stringBoard.charAt(i+1);
                line.push(char + aux);
                i++;
                break;
            case ']':
                board.push(line);
                line = [];
                break;
            default:
                line.push(char);
                break;
        }
    }

    return board;
};





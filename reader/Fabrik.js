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
    var self = this;

    this.getPrologRequest('initialBoard', function(data){
        // finished loading board
        var newBoard = self.parseBoard(data.target.response);
        onSuccess(newBoard);
    });


};

Fabrik.prototype.movePiece = function(tab, piece, line, column, callback){
    var stringTab = this.boardToString(tab);

    var call = 'movePiece(' + stringTab + ',' + piece + ',' + line + ',' + column + ')';
    var self = this;

    this.getPrologRequest(call, function(data){
        var newBoard = self.parseBoard(data.target.response);
        callback(newBoard);
    }
    );
};

Fabrik.prototype.canMovePiece = function(tab, piece, line, column, callback){
    var stringTab = this.boardToString(tab);

    var call = 'canMovePiece(' + stringTab + ',' + piece + ',' + line + ',' + column + ')';
    var self = this;

    this.getPrologRequest(call, function(data){
        callback(data.target.response == 'true');
    });
};

Fabrik.prototype.pcMoveWorker = function(tab, worker, callback){
    var stringTab = this.boardToString(tab);

    var call = 'pcMoveWorker(' +  stringTab + ',' +  worker +')';

    var self = this;

    this.getPrologRequest(call, function(data){
        var newBoard = self.parseBoard(data.target.response);
        callback(newBoard);
    });
};

Fabrik.prototype.pcMakePlay = function(tab, difficulty, pcPiece, callback) {
    var stringTab = this.boardToString(tab);

    var call = 'pcMakePlay(' + stringTab + ',' + difficulty + ','  + pcPiece + ')';

    var self = this;

    this.getPrologRequest(call, function(data){
        var newBoard = self.parseBoard(data.target.response);
        callback(newBoard);
    });

};

Fabrik.prototype.isGameOver = function(tab, callback) {
    var stringTab = this.boardToString(tab);

    var call = 'isGameOver('+ stringTab + ')';

    var self = this;

    this.getPrologRequest(call, function(data){
        callback(data.target.response == 'true');
    });
};

/* Auxiliar functions */

Fabrik.prototype.boardToString = function(board){

    var string = '[';

    for(var i = 0; i < board.length; i++){

        string += '[';

        for(var j = 0; j < board[i].length; j++){
            string += board[i][j];

            if(j < board[i].length-1)
                string += ',';
        }

        string  += ']';

        if(i < board.length-1)
            string += ',';

    }

    string += ']';

    return string;
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





$(document).ready(function () {
    var port = 56370;

    var protocol = location.protocol === "https:" ? "wss:" : "ws:";
    var ws = protocol + "//" + "localhost:" + port + '/v1/ws';
    var webAPI = location.protocol + "//" + "localhost:" + port + '/api/v1';

    var socket = new WebSocket(ws);

    socket.onopen = function (e) {
        console.log("socket opened: ", e);
    };

    socket.onclose = function (e) {
        console.log("socket closed: ", e);
    };

    socket.onmessage = function (e) {
        alert("message received: " + e.data);
    };

    socket.onerror = function (e) {
        console.error("error received: " + e.data);
    };

    $('#send-message-ws').click(function(){
        var message = $('#text-area-send-message-ws').val();
        socket.send(message);
    });

    $('#send-message-connected-socket').click(function(){
        var message = $('#text-area-send-message-connected-socket').val();

        var messageJSON = {
            "message": message
        };

        $.ajax({
            type: 'POST',
            dataType: "xml/html/script/json",
            contentType: "application/json",
            url: webAPI + '/notification',
            data: JSON.stringify(messageJSON),

            complete: function(e) {
                console.log("complete" + e);
            },

            success: function(e) {
                console.log("success" + e);
            },

            error: function(e) {
                console.log("error" + e);
            },
        });

    });
});
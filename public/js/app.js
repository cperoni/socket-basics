var socket = io();
var nameParam = getQueryVariable('name') || 'anonymous';
var roomParam = getQueryVariable('room');
console.log(nameParam + ' whants to join ' + roomParam);

jQuery('.room-title').text(roomParam);
socket.on('connect', function () {
    console.log('connected to socket io server');

    socket.emit('joinRoom', {
        name: nameParam,
        room: roomParam
    });

});

socket.on('message', function (message) {
    var momentTImestamp = moment.utc(message.timestamp).local().format('h:mm a');
    var $messages = jQuery('.messages');
    var $message = jQuery('<li class="list-group-item"></li>');

    console.log('New msg:');
    console.log(message.text);

    $message.append('<p><strong>' + message.name + ' ' + momentTImestamp + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');

    $messages.append($message);
});


var $form = jQuery('#message-form');

$form.on('submit', function (event) {

    event.preventDefault();
    var $message = $form.find('input[name=message]');
    socket.emit('message', {
        name: nameParam,
        room: roomParam,
        text: $message.val()
    });

    $message.val('');
});
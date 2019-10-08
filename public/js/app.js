var socket = io();
var nameParam = getQueryVariable('name') || 'anonymous';
var roomParam = getQueryVariable('room');
console.log(nameParam + ' whants to join ' + roomParam);

socket.on('connect', function () {
    console.log('connected to socket io server');
});

socket.on('message', function (message) {
    var momentTImestamp = moment.utc(message.timestamp).local().format('h:mm a');
    var $message = jQuery('.messages');

    console.log('New msg:');
    console.log(message.text);

    $message.append('<p><strong>' + message.name + ' ' + momentTImestamp + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');
});

var $form = jQuery('#message-form');

$form.on('submit', function (event) {
    event.preventDefault();
    var $message = $form.find('input[name=message]');
    socket.emit('message', {
        name: nameParam,
        text: $message.val()
    });
    $message.val('');
});
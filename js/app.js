function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    //on drag get the background-color of the div and save it
    ev.dataTransfer.setData("color", $(ev.target).css('background-color'));
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //on drop change the background color of the calendar td
    var bgColor = ev.dataTransfer.getData("color");
    ev.target.appendChild(document.getElementById(data));
    $(ev.target).closest('td').prev('td').css({
        'background-color': bgColor
    });
}

function createTaskList(list) {
    $('#external-events').empty();

    if (list.hasOwnProperty('events')) {
        $.each(list.events, function (i, v) {
            $('#external-events').append(createDraggableTasks(v));
        });
    }

}
var rowId = 1;
//<div class="external-event bg-green"  draggable="true" ondragstart="drag(event)"id="drag1" style="position: relative;">Term 1</div>
function createDraggableTasks(task) {
    var option = {
        class: "external-event bg-" + task.color,
        draggable: "true",
        ondragstart: "drag(event)",
        id: task.id,
        text: task.name,
        "data-row": task.row
    };
    rowId = task.row;
    var div = $("<div/>", option);
    div.append($("<i/>", {
        class: "fa fa-arrows-alt pull-right"
    }));
    return div;
}

var currColor = '#3c8dbc';
var colorChooser = $("#color-chooser-btn");

$('#color-chooser > li > a').click(function (e) {

    e.preventDefault();
    //Save color
    currColor = $(this).css('color');

    //Add color effect to button
    $('#add-new-event').css({
        'background-color': currColor,
        'border-color': currColor
    });
});

$('#add-new-event').click(function (e) {
    e.preventDefault()
    //Get value and make sure it is not null
    var val = $('#new-event').val()
    if (val.length == 0) {
        return
    }

    //Create events
    var event = $('<div />', {
        'draggable': "true",
        'ondragstart': "drag(event)",
        "data-row": rowId,
        "id": "custom_" + Math.random()
    });
    event.css({
        'background-color': currColor,
        'border-color': currColor,
        'color': '#fff',
    }).addClass('external-event');
    event.html(val);
    event.append($("<i/>", {
        class: "fa fa-arrows-alt pull-right"
    }));
    $('#external-events').prepend(event)
});
$(".small-box").click(function () {
    var action = $(this).data('box');
    var events = {};

    if (data.hasOwnProperty(action)) {
        events = data[action];
        $("#modal-service").modal('show');
        createTaskList(events);
    }
    if ($.isEmptyObject(events)) {
        $("#external-events").empty();
        $("#modal-service").modal('show');

    }
});
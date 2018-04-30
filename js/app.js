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
        getAcadCalendar();
        createTaskList(events);
    }
    if ($.isEmptyObject(events)) {
        $("#external-events").empty();
        getAcadCalendar();
        $("#modal-service").modal('show');

    }
});

function getAcadCalendar(){
    $.ajax({
        url:"logic/route.php",
        type:"GET",
        dataType:"JSON",
        data:{},
        success:function(response){
            console.log(response);
            buildAcadCalendar(response);
        }

    });

}

function buildAcadCalendar(data){
    var target = $("#acad-calendar-container");
    target.empty();
    
    var table = $("<table/>",{class:"table table-bordered",id:"acad-calendar"}).css("overflow","auto");
    var tbody = $("<tbody/>");

    $.each(data,function(i,e){
        var tr = $("<tr/>");
        var first_child = $("<td/>",{class:"calendar-page"});
        if(e.hasOwnProperty('month')){
            var month = $("<p/>",{class:"calendar-month",text:e.month});
            first_child.append(month);
        }
        if(e.hasOwnProperty('year')){
            var year = $("<p/>",{class:"calendar-year",text:e.year});
            first_child.append(year);
        }
        var last_child = $("<td/>",{ondrop:"drop(event)",ondragover:"allowDrop(event)"});//ondrop="drop(event)" ondragover="allowDrop(event)"

        tr.append(first_child).append(last_child);
        tbody.append(tr);
    });
    table.append(tbody);
    target.append(table);
    
}
function saveAcadCalendar(){

    // add a hidden input when building a calendar with the specific month & year
    // can be used as an id for saving up the data

    console.log($("#acad-calendar").find(".external-event").closest('tr').find('.calendar-page').html());
}
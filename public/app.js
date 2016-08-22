$.getJSON('/shows', function(data){
	for (var i=0; i<data.length; i++){
		$('#show-table').append("<tr><td class='show-name' data-id='" + data[i]._id + "'>" + data[i].show + "</td><td><a href='" + data[i].link + "' target='_blank'>" + "See Details" + "</a></td></tr>");
	}
});

$(document).on('click', '.show-name', function(){
	$('#notes').empty();
	var thisId = $(this).attr('data-id');

	$.ajax({
		method: 'GET',
		url: '/shows/' + thisId
	}).done(function(data){
		console.log(data);
		$('#notes').append('<h2>' + data.show + '</h2>');
		$('#notes').append('<input id="title-input" name="title>');
		$('#notes').append('<textarea id="body-input" name="body"></textarea>');
		$('#notes').append('<button data-id="' + data._id + '" id="save-note">Save Note</button>');

		if(data.note){
			$('#title-input').val(data.note.title);
			$('#body-input').val(data.note.body);
		}
	});
});

$(document).on('click', '#save-note', function(){
	var thisId = $(this).attr('data-id');

	$.ajax({
		method: 'POST',
		url: '/shows/' + thisId,
		data: {
			title: $('#title-input').val(),
			body: $('#body-input').val()
		}
	}).done(function(data){
		console.log(data);
		$('#notes').empty();
	});
	$('#title-input').val('');
	$('#body-input').val('');
});
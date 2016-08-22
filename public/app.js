$.getJSON('/shows', function(data){
	for (var i=0; i<data.length; i++){
		$('#show-table').append("<tr><td class='show-name' data-id='" + data[i]._id + "'>" + data[i].show + "</td><td class='show-details'><a href='" + data[i].link + "' target='_blank'>" + "See Details" + "</a></td></tr>");
	}
});

$(document).on('click', '.show-name', function(){
	$('#note-entry').empty();
	// $('#note-output').empty();
	var thisId = $(this).attr('data-id');

	$.ajax({
		method: 'GET',
		url: '/shows/' + thisId
	}).done(function(data){
		console.log(data);
		$('#note-entry').append('<h2>Enter Note</h2>');
		$('#note-entry').append('<input id="title-input" name="title">');
		$('#note-entry').append('<textarea id="body-input" name="body"></textarea>');
		$('#note-entry').append('<button data-id="' + data._id + '" id="save-note">Save Note</button>');

		if(data.note){
			$('#title-input').val(data.note.title);
			$('#body-input').val(data.note.body);
			$('#note-output').prepend("<p id='user-note'><span id='note-writer'>" + data.note.title + "</span> says: " + data.note.body + "</p>");
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
		$('#notes').empty();
	});
	$('#title-input').val('');
	$('#body-input').val('');
});

$(document).on('click', '#user-note', function(){
	console.log(this);
})
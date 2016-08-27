$.getJSON('/shows', function(data){
	for (var i=0; i<data.length; i++){
		$('#show-table').append("<tr><td class='show-name' data-id='" + data[i]._id + "'>" + data[i].show + "</td><td class='show-details'><a href='" + data[i].link + "' target='_blank'>" + "See Details" + "</a></td></tr>");
	}
});

$(document).on('click', '.show-name', function(){
	$('#note-entry').empty();
	$('#note-output').empty();
	var thisId = $(this).attr('data-id');

	$.ajax({
		method: 'GET',
		url: '/shows/' + thisId
	}).done(function(data){
		$('#note-entry').append('<h2 id="enterNote">Enter Note</h2>');
		$('#note-entry').append('<textarea id="body-input" name="body"></textarea>');
		$('#note-entry').append('<button data-id="' + data._id + '" id="save-note">Save Note</button>');

		if(data.comment){
			
			for(i=0; i<data.comment.length; i++){
			$('#note-output').append(data.comment[i] + '<br><br>');
		};
		}
	});
});



$(document).on('click', '#save-note', function(){
	var thisId = $(this).attr('data-id');

	$.ajax({
		method: 'POST',
		url: '/shows/' + thisId,
		data: {
			body: $('#body-input').val()
		}
	}).done(function(data){
		$('#notes').empty();
		$('#note-output').empty();

		for(i=0; i<data.comment.length; i++){
			$('#note-output').append(data.comment[i] + '<br><br>');
		};

	});
	$('#title-input').val('');
	$('#body-input').val('');
});

$(document).on('click', '#user-note', function(){
	console.log(this);
})
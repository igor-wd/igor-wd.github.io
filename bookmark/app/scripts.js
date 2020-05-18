$.getJSON('data.json', function(data) {
	search();
	$('#search').keyup(search); //get JSON
	function search() {
		var searchField = $('#search').val();
		var myExp = new RegExp(searchField, "i");
		var output = '<div class="searchresults">';
		$.each(data, function(key, val) {
			if ((val.name.search(myExp) != -1) ||
			(val.bio.search(myExp) != -1)) {
				output += '<div class="card-item">';
				output += '<h2>'+ val.name +'</h2>';
				// output += '<img src="' + val.logo + '" alt="' + val.name + ' "/>';
				output += '<img class="img-svg" src="' + val.logo + '" alt="' + val.name + '"/>';
				// output += '<img class="img-svg" src="' + val.logo + '" alt="' + val.name + '" fill="' + val.bio +' "/>';
				// output += '<img src="' + val.logo + '" alt="' + val.name + '" fill="' + val.bio +' "/>';
				// output += '<img src="img/'+ val.logo +'.png" alt="'+ val.name +'" />';

				output += '<p>'+ val.bio +'</p>';
				output += '</div>';
			}
			// output += '</div>';
			// $('#update').html(output);
		});
		output += '</div>';
		$('#update').html(output);
	}
});

$('img.img-svg').each(function(){
	var $img = $(this);
	var imgClass = $img.attr('class');
	var imgURL = $img.attr('src');
	$.get(imgURL, function(data) {
	  var $svg = $(data).find('svg');
	  if(typeof imgClass !== 'undefined') {
		$svg = $svg.attr('class', imgClass+' replaced-svg');
	  }
	  $svg = $svg.removeAttr('xmlns:a');
	  if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
		$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	  }
	  $img.replaceWith($svg);
	}, 'xml');
  });
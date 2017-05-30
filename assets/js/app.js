$(document).ready(function() {
   // console.log("Running!");
   	$('body').scrollspy({target: '#navbar-example'});

   	window.sr = ScrollReveal();
 	sr.reveal('.featurette');
  	sr.reveal('#last');

	function trim(description){
	   var desc = description;

	   if (description.length > 10)
	      desc = description.substring(0, 10)+ "<a src='"+ description + "'>...</a>";
	   else
	      return description;
	};

	// Gathering taplist information from UnTappd

	$.ajax({
		url: "https://business.untappd.com/api/v1/menus/20486?full=true",
		beforeSend: function(xhr) {
		     xhr.setRequestHeader("Authorization", "Basic ZW1pbHlzaWxrZUB5YWhvby5jb206YzVQRERDX2NtMUFvNTlmZzc1TGk=");
		}, success: function(data){
		    // console.log(data.menu.sections[0].items);
		    var menu = data.menu.sections[0].items;

		    menu.forEach(function(element){

		    	var div = $("<div class='tapItems'>");

		    	var image = $("<img src='"+ element.label_image +"' class='beerImg'>");
		    	var beerName = $("<h3 data-name='"+element.name+"' class='beerName'>" + element.name + "</h3>");
		    	var beerStyle = $("<h4 data-style='"+element.style+"' class='beerStyle'>" + element.style + "</h4>");
		    	
		    	var beerInfo = $("<ul class='beerInfo'><li>" + element.abv + "%</li><li>" + element.brewery + "</li><li>" + element.brewery_location +"</li><li>$" + element.containers[0].price + "</li></ul>");
		    	
		    	trim(element.description);
		    	var desc = $("<p class='description' data-desc='" + element.name + "'>" + element.description + "</p>");
		    	// var price = $("<p class='price'>$ " + element.containers[0].price + "</p>");
		    	
		    	div.append(image);
		    	div.append(beerName);
		    	div.append(beerStyle);
		    	div.append(beerInfo);
		    	div.append(desc);
		    	// div.append(price);

		    	$("#menu").append(div);
		    });
		}
	});

	// Gathering event information from UnTappd

	$.ajax({
		url: "https://business.untappd.com/api/v1/locations/7477/events",
		beforeSend: function(xhr) {
		     xhr.setRequestHeader("Authorization", "Basic ZW1pbHlzaWxrZUB5YWhvby5jb206YzVQRERDX2NtMUFvNTlmZzc1TGk=");
		}, success: function(data){
		    // console.log(data.menu.sections[0].items);
		    var events = data.events;

		    events.forEach(function(element){

		    	var time = element.start_time;
				var start = (moment(time, "YYYY-MM-DDTHH:mm:ss.SSSSZ").format("hh:mm a"));
				var date = (moment(time, "YYYY-MM-DDTHH:mm:ss.SSSSZ").format("MMM Do, YYYY"));

		    	var div2 = $("<div class='eventList'>");

		    	var eventDate = $("<h3 data-name='"+element.name+"' class='eventDate'>" + date + "</h3>")
		    	var eventName = $("<h3 data-name='"+element.name+"' class='eventName'>" + element.name + "</h3>");
		    	
		    	var descr = $("<p class='eventDesc' data-descr='" + element.name + "'>" + element.description + "</p>");

		    	var start_time = $("<p class='start_time'>Start time: " + start + "</p>");
		    	// var end_time = $("<p class='end_time'>" + element.end_time + "</p>");

		    	div2.append(eventDate);
		    	div2.append(eventName);
		    	div2.append(descr);
		    	div2.append(start_time);
		    	// div2.append(end_time);

		    	$("#upcomingEvents").append(div2);
		    });
		}
	});

});


  

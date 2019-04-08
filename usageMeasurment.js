var myEventList = []; // array to store click data and reduce the number of calls

// this method is executed as soon as the script is loaded and starts listening to any body click event
function writeData() {
	document.body.onclick = function(event) {
		myEventList.push(formatData(event));
	};
  
  // method to get the required information after the cick event.
	function formatData(data) {
		var event = [];
		event.push({
			"x": data.clientX,                          // x axis position of cursor
			"y": data.clientY,                         // y axis postition of cursor
			"screenH": data.view.screen.availHeight,   // the screen height
			"screenY": data.view.screen.availWidth,    // the screen width
			"url": data.currentTarget.baseURI,         // the base url of applcation which is running
			"id": data.target.id                       // the UI element ID
		});
		return event;
	}
  // once data is prepared follow this post call
	var url = "https://yourServiceToRecieveUsageData/"; // specify the URL of you backend service
	if (myEventList.length > 0) { // checks if the event array is empty
		$.ajax({
			type: "POST",
			url: url,
			dataType: "json",
			crossDomain: true,
			data: JSON.stringify(myEventList),
			success: function(result) {
				myEventList = [];    // once the post is a success make the array empty
			},
			error: function(response) {}
		});
	}
}
// this sends post call in every 5 seconds. change it as per need
setInterval(writeData, 5000);

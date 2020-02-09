// timeline[0] = col plus topbar
// 1 = posts
// 2 = topmost post, changes on refresh

// Initializing timeline and selected post
var timeline = document.getElementsByClassName("timeline");
// The container of each notification, each index is a notif
var notifications = document.getElementsByClassName("notifications")[0].children[0].children[1].children;
var oldTimelineNumber;
var oldNotificationsNumber = 0;
var selectedColumn = "timeline";
selectedPostNumber = 2;
selectedPost = timeline[selectedPostNumber];
selectedPost.style.border = "1px solid red";

// Add event listeners
window.addEventListener("keydown", keyDownHandler);

// moveSelection: Moves the selected post "up"/"down"
function moveSelection(direction) {
	let increment = (direction == "up") ? -1 : 1;
	// Break out of the function if at top post
	if (selectedPostNumber <= 2 && increment == -1 && selectedColumn == "timeline") return;
	if (selectedPostNumber <= 0 && increment == -1 && selectedColumn == "notifications") return;

	selectedPost.style.border = "none";
	selectedPostNumber += increment;
	if (selectedColumn == "timeline")
		selectedPost = timeline[selectedPostNumber];
	else if (selectedColumn == "notifications")
		selectedPost = notifications[selectedPostNumber];
	selectedPost.style.border = "1px solid red";
	selectedPost.scrollIntoView({behavior: 'auto', block: 'center', inline: 'center'});
}

// gotoNotifications: Moves user to notifications section
function gotoNotifications() {
	selectedColumn = "notifications";
	selectedPost.style.border = "none";
	oldTimelineNumber = selectedPostNumber;
	selectedPostNumber = oldNotificationsNumber;
	selectedPost = notifications[selectedPostNumber];
	selectedPost.style.border = "1px solid red";
}

// gotoTimeline: Moves user to timeline section
function gotoTimeline() {
	selectedColumn = "timeline";
	selectedPost.style.border = "none";
	oldNotificationsNumber = selectedPostNumber;
	selectedPostNumber = oldTimelineNumber;
	selectedPost = timeline[selectedPostNumber];
	selectedPost.style.border = "1px solid red";
}

// interactPost: Does an action on the selected post
function interactPost(action) {
	// The buttons are in selectedPost > .status-body > .status-actions >children. index's are 0: reply, 1: boost, 2: favorite, 3: other
	switch(action) {
		case "favorite":
			selectedPost.querySelector(".status-body").querySelector(".status-actions").children[2].children[0].click();
			break;
		case "boost":
			selectedPost.querySelector(".status-body").querySelector(".status-actions").children[1].children[0].click();
			break;
		case "reply":
			selectedPost.querySelector(".status-body").querySelector(".status-actions").children[0].children[0].click();
			break;
	}
}

// refreshTimeline: Hits the "Show new" button
function refreshTimeline() {
	timeline[0].querySelector(".loadmore-button").click();
}

// keyDownHandler: Function to handle keyDown events
function keyDownHandler(key) {
	downedKey = key.key;
	// If user is not in body, don't move selection
	if (document.activeElement.tagName != "BODY") return;
	// If user presses an arrow key, cancel the default scroll
	if (downedKey == "ArrowDown" || downedKey == "ArrowUp") key.preventDefault();
	switch (downedKey) {
		// Directional keys
		case "ArrowDown":
		case "j":
			moveSelection("down");
			break;
		case "ArrowUp":
		case "k":
			moveSelection("up");
			break;
		case "ArrowLeft":
		case "h":
			gotoNotifications();
			break;
		case "ArrowRight":
		case "l":
			gotoTimeline();
			break;
		// Refresh/Read
		case "r":
			refreshTimeline();
			break;
		// Post interactions
		case "f":
			interactPost("favorite");
			break;
		case "b":
			interactPost("boost");
			break;
		case "r":
			interactPost("reply");
			break;
		default:
			return;
	}
}


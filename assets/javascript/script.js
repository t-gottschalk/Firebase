// alert("connected");

tday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
tmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getClock() {
var d = new Date();
var nday = d.getDay(), nmonth = d.getMonth(), ndate = d.getDate(), nyear = d.getYear();

if (nyear < 1000) nyear += 1900;
var nhour = d.getHours(), nmin = d.getMinutes(), nsec = d.getSeconds(), ap;

if (nhour == 0) {
	ap = " AM"; nhour = 12;
} else if (nhour < 12) {
	ap = " AM";
} else if (nhour == 12) {
	ap = " PM";
} else if (nhour > 12) {
	ap = " PM"; nhour -= 12;
}

if (nmin <= 9) nmin = "0" + nmin;
if (nsec <= 9) nsec = "0" + nsec;

document.getElementById('display-clock').innerHTML = ""+tday[nday]+" "+tmonth[nmonth]+" "+ndate+", "+nyear+" "+nhour+":"+nmin+":"+nsec+ap+"";
}

window.onload = function() {
getClock();
setInterval(getClock, 1000);
};

$(document).ready(function() {

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCcaHaGkeS49COYahjcbFOzuWq72oBE-aA",
  authDomain: "train-schedule-f4e20.firebaseapp.com",
  databaseURL: "https://train-schedule-f4e20.firebaseio.com",
  projectId: "train-schedule-f4e20",
  storageBucket: "train-schedule-f4e20.appspot.com",
  messagingSenderId: "53801552834"
};

firebase.initializeApp(config);

var database = firebase.database();

// on click for form submission
	$("#submit").click(function() {
      var name = $("#name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var time = $("#time-input").val().trim();
      var frequency = $("#frequency-input").val().trim();

      //pushing input into firebase
      database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
      });
      //clear input fields after submission
      $("input").val('');
      return false;
	}); // onclick

	// on click child added function
  database.ref().on("child_added", function(childSnapshot){
      // pull the data
      var name = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var time = childSnapshot.val().time;
      var frequency = childSnapshot.val().frequency;
  
      // console.log("Name: " + name);
      // console.log("Destination: " + destination);
      // console.log("Time: " + time);
      // console.log("Frequency: " + frequency);
      // console.log(moment().format("hh:mm"));
  
    var firstTimeConverted = moment(time,"hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));  
 
  var newElement = $("<tr/>").attr("data-name", name);
    newElement.append($("<td/> ").text(name));
    newElement.append($("<td/> ").text(destination));
    newElement.append($("<td/> ").text(frequency));
    newElement.append($("<td/> ").text(nextTrain)); 
    newElement.append($("<td/> ").text(tMinutesTillTrain));
    $(".table").append(newElement);
 }); 
});







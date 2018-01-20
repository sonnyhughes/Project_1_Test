$(document).ready(function(){
    
    // Firebase
    var trainData = new Firebase("https://nwuproject1.firebaseio.com/");

    // Button to add Trains
    $("#addTrainButton").on("click", function(){

        // Parses input values and attaches them to a variable
        var trainName = $("#trainNameInput").val().trim();
        var lineName = $("#lineNumberInput").val().trim();
        var destination = $("#routeInput").val().trim();
        var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
        var frequencyInput = $("#frequencyInput").val().trim();

        // Check variable inputs
        console.log(trainName);
        console.log(lineName);
        console.log(destination);
        console.log(trainTimeInput);
        console.log(frequencyInput);

        // Creates object from input fields and pushes to firebase
        var newTrain = {
            name:  trainName,
            line: lineName,
            destination: destination,
            trainTime: trainTimeInput,
            frequency: frequencyInput,
        }
        trainData.push(newTrain);

        // Resets the input values after data is pushed
        $("#trainNameInput").val("");
        $("#lineNumberInput").val("");
        $("#routeInput").val("");
        $("#trainTimeInput").val("");
        $("#frequencyInput").val("");

        // Prevents page refresh
        return false;
    });


    // Event function 
    trainData.on("child_added", function(childSnapshot, prevChildKey){

        console.log(childSnapshot.val());

        // assign firebase variables to snapshots.
        var firebaseName = childSnapshot.val().name;
        var firebaseLine = childSnapshot.val().line;
        var firebaseDestination = childSnapshot.val().destination;
        var firebaseTrainTimeInput = childSnapshot.val().trainTime;
        var firebaseFrequency = childSnapshot.val().frequency;
        
        var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
        var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
        var minutes = firebaseFrequency - timeRemainder;

        var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
        
        // Test for correct times and info
        console.log(minutes);
        console.log(nextTrainArrival);
        console.log(moment().format("hh:mm A"));
        console.log(nextTrainArrival);
        console.log(moment().format("X"));

        // Append train info to table on page
        $("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

    });
});





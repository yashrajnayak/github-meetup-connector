let attendees = {}; 
let totalConnections = 0; 
let checkInCount = 0; 

function checkIn() {
    const username = document.getElementById('usernameInput').value;
    const resultsDiv = document.getElementById('results');

    resultsDiv.innerHTML = ""; 

    if (username) {
        fetch(`https://api.github.com/users/${username}/following`)
            .then(response => response.json())
            .then(following => {
                attendees[username] = following.map(user => user.login); 
                resultsDiv.innerHTML = `<h2>You are following ${following.length} users</h2>`;
                calculateConnections(attendees); 

                checkInCount++;  
                updateCheckInCountDisplay(); 
            })
            .catch(error => {
                resultsDiv.innerHTML = "Error: User not found or API issue";
            });
    } else {
        resultsDiv.innerHTML = "Please enter a GitHub username";
    }
}

function calculateConnections(attendeesData) {
    totalConnections = 0; 

    for (const attendee in attendeesData) {
        const followingList = attendeesData[attendee];
        for (const followedUser of followingList) {
            console.log("Checking if", attendee, "follows", followedUser); 

            if (attendeesData[followedUser] && attendeesData[followedUser].includes(attendee)) {
                console.log("Connection found!") 
                totalConnections++;
            }
        }
    }

    updateResults();
}

function updateResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML += `<p>Total Connections Found: ${totalConnections / 2}</p>`;
}

function updateCheckInCountDisplay() {
    const countDisplay = document.getElementById('checkInCount');
    countDisplay.innerHTML = `Checked-in: ${checkInCount}`;
}

document.getElementById('checkInCountBtn').addEventListener('click', () => {
    updateCheckInCountDisplay();
});

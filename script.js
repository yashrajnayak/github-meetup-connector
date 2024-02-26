// Simple data structure to hold attendee data (you might expand this later)
let attendees = {}; 
let totalConnections = 0; // Keep track of connections globally

function checkIn() {
    // ... (Your existing check-in functionality) ...
}

function calculateConnections(attendeesData) {
    totalConnections = 0; // Reset count before calculation

    for (const attendee in attendeesData) {
        const followingList = attendeesData[attendee];

        for (const followedUser of followingList) {
            // Check for mutual following (creates a connection)
            if (attendeesData[followedUser] && attendeesData[followedUser].includes(attendee)) {
                totalConnections++;
            }
        }
    }

    updateResults();
}

function updateResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML += `<p>Total Connections Found: ${totalConnections / 2}</p>`;
    // Note: We divide by 2 because each connection is counted twice 
}

// Example usage (adjust when to call this based on your app flow)
calculateConnections(attendees); 


document.getElementById('markAttendanceButton').addEventListener('click', markAttendance);

function markAttendance() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        updateStatusMessage("Geolocation is not supported by this browser.");
    }
}

function successCallback(position) {
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;
    
    const officeLatitude = 19.314962; 
    const officeLongitude = 84.794090; 
    const geofenceRadius = 0.1; 

    const distance = calculateDistance(userLatitude, userLongitude, officeLatitude, officeLongitude);

    if (distance <= geofenceRadius) {
        updateStatusMessage("Attendance marked successfully!");
    } else {
        updateStatusMessage("You are not within the geofence area.");
    }
}

function errorCallback(error) {
    updateStatusMessage("Error retrieving location: " + error.message);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    return distance;
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function updateStatusMessage(message) {
    const statusMessageElement = document.getElementById('statusMessage');
    statusMessageElement.textContent = message;
    statusMessageElement.style.color = message.includes("successfully") ? "green" : "red";
}

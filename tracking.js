// Google Sheets API configuration
const SHEET_ID = '1LRSrjeQ93QbLk4abgmDMJ1w0s-MQPCC2VPtPuy3v1NA';
const API_KEY = 'AIzaSyDhV-6cqIL0WMlfMiDP6LeIacMrQWqqGZw';
const SHEET_NAME = 'tracking';

document.getElementById('trackingInput').addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
        trackPackage();
    }
})
async function trackPackage() {
    const trackingId = document.getElementById('trackingInput').value.trim();
    const resultDiv = document.getElementById('trackingResult');
    if (!trackingId) {
        resultDiv.innerHTML = 'Please enter a tracking ID';
        return;
    }
    
    try {
        // Fetch data from Google Sheets
        const res = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
        );
        const response = await res.json();
        // console.log(response);
        
        const rows = response.values; // Get the rows from the sheet
        // console.log(rows);
        
        resultDiv.style.display = 'block';
        if (!rows || rows.length === 0) {
            resultDiv.innerHTML = 'No data found in the sheet.';
            return;
        }

        // Find the row with the matching Tracking ID
        const trackingData = rows.find(row => row[0].toString() === trackingId);
        // console.log(trackingData);
        

        if (trackingData) {
            // Assuming columns are: Tracking ID, Status, Location, Date, Details
            resultDiv.innerHTML =
            `<div class="status-item">
                <strong>Tracking ID:</strong> ${trackingData[0]}
            </div>
            <div class="status-item">
                <strong>Current Status:</strong> ${trackingData[1] || 'N/A'}
            </div>
            <div class="status-item">
                <strong>Current Location:</strong> ${trackingData[2] || 'N/A'}
            </div>
            <div class="status-item">
                <strong>Pickup Date:</strong> ${trackingData[3] || 'N/A'}
            </div>
            <div class="status-item">
                <strong>Delivery Date:</strong> ${trackingData[4] || 'N/A'}
            </div>
            <div class="status-item">
                <strong>Pickup Location:</strong> ${trackingData[5] || 'N/A'}
            </div>
            <div class="status-item">
                <strong>Drop Location:</strong> ${trackingData[6] || 'N/A'}
            </div>
            <div class="status-item">
                <strong>Additional Details:</strong> ${trackingData[7] || 'No additional details'}
            </div>`;
        } else {
            resultDiv.innerHTML = 'No tracking information found for this ID';
        }
    } catch (error) {
        console.error('Error fetching tracking data:', error);
        resultDiv.innerHTML = 'Error retrieving tracking information';
    }
}

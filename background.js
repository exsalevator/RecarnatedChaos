
// Declare buildingData only ONCE at the top
const buildingData = {
    "name": "Travian Kingdom Building",
    "version": "0.0.2",
    "buildings": [ /*buildings.json*/ ]
  };
  
  // Store in Chrome storage
  chrome.storage.local.set({ buildings: buildingData }, () => {
    console.log("Building data stored.");
  });
  
  // Function to retrieve building data (No redeclaration)
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getBuildings") {
      chrome.storage.local.get("buildings", (result) => {
        sendResponse(result.buildings);
      });
      return true; // Required for async response
    }
  });
  
// Initialize settings from Chrome Storage
let settings = {};

chrome.storage.local.get([
    'buildingPercentage', 
    'troopPercentage', 
    'onlineStart', 
    'onlineEnd', 
    'randomDelay'
], (data) => {
    settings = {
        buildingPercentage: data.buildingPercentage || 50,
        troopPercentage: data.troopPercentage || 50,
        onlineStart: data.onlineStart || '09:00',
        onlineEnd: data.onlineEnd || '18:00',
        randomDelay: data.randomDelay || false
    };
});

// Function to check if the bot should be active based on current time
function isBotActive() {
    const currentTime = new Date();
    const start = new Date();
    const end = new Date();
    const [startHours, startMinutes] = settings.onlineStart.split(":");
    const [endHours, endMinutes] = settings.onlineEnd.split(":");
    
    start.setHours(startHours, startMinutes);
    end.setHours(endHours, endMinutes);
    
    return currentTime >= start && currentTime <= end;
}

// Mimic Human Behavior - Add random delay to actions if enabled
function applyRandomDelay() {
    if (settings.randomDelay) {
        const randomDelay = Math.floor(Math.random() * 5000) + 1000; // Random delay between 1 and 6 seconds
        return new Promise(resolve => setTimeout(resolve, randomDelay));
    }
    return Promise.resolve();
}

// Example Function: Trigger Troop Production
async function triggerTroopProduction() {
    if (!isBotActive()) return; // If not within the active time, do nothing

    await applyRandomDelay();

    // Example of troop production logic (use your own logic to interact with the game)
    console.log("Triggering troop production with " + settings.troopPercentage + "% of resources");
    // Example of interacting with content script (send message to content.js)
    chrome.scripting.executeScript({
        target: {tabId: yourTabId}, // You’ll need to identify the correct tab for the game page
        func: function() {
            // Actual troop production logic in Travian Kingdoms
            console.log("Producing troops...");
        }
    });
}

// Example Function: Trigger Building Upgrade
async function triggerBuildingUpgrade() {
    if (!isBotActive()) return; // If not within the active time, do nothing

    await applyRandomDelay();

    // Example of building upgrade logic (use your own logic to interact with the game)
    console.log("Triggering building upgrade with " + settings.buildingPercentage + "% of resources");
    // Example of interacting with content script (send message to content.js)
    chrome.scripting.executeScript({
        target: {tabId: yourTabId}, // You’ll need to identify the correct tab for the game page
        func: function() {
            // Actual building upgrade logic in Travian Kingdoms
            console.log("Upgrading building...");
        }
    });
}

// Run functions at specified intervals
setInterval(() => {
    triggerTroopProduction();
    triggerBuildingUpgrade();
}, 60000); // Run every minute (adjust interval based on your needs)

// Add additional functions (e.g., for farming, defense, etc.) based on settings
// Save it to Chrome's local storage
chrome.storage.local.set({ buildings: buildingData }, () => {
    console.log("Building data stored in Chrome storage.");
});
  
// Retrieve the data when needed
chrome.storage.local.get("buildings", (result) => {
    console.log("Loaded building data:", result.buildings);
});
  
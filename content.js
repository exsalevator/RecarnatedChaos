// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "triggerTroopProduction") {
        triggerTroopProduction();
    }
    else if (message.action === "triggerBuildingUpgrade") {
        triggerBuildingUpgrade();
    }
    else if (message.action === "triggerFarmClearance") {
        triggerFarmClearance();
    }
    else if (message.action === "triggerAutoDefend") {
        triggerAutoDefend();
    }
});

// Example: Troop Production Logic
function triggerTroopProduction() {
    // Example logic for troop production
    console.log("Triggering troop production...");

    // Locate the troop production UI elements and interact with them
    // (This will need to be customized based on the actual HTML structure of the game)
    const troopButton = document.querySelector('.troop-production-button');  // Example button selector
    if (troopButton) {
        troopButton.click();
    }
}

// Example: Building Upgrade Logic
function triggerBuildingUpgrade() {
    // Example logic for building upgrades
    console.log("Triggering building upgrade...");

    // Locate the building upgrade button and interact with it
    const buildingUpgradeButton = document.querySelector('.building-upgrade-button');  // Example button selector
    if (buildingUpgradeButton) {
        buildingUpgradeButton.click();
    }
}

// Example: Farming Logic (Auto-clear farms)
function triggerFarmClearance() {
    console.log("Triggering farm clearance...");

    // Loop through possible farm villages and clear them
    const farms = document.querySelectorAll('.farm-village');  // Example selector
    farms.forEach(farm => {
        const attackButton = farm.querySelector('.attack-button');  // Example button selector
        if (attackButton) {
            attackButton.click();
        }
    });
}

// Example: Auto Defend Logic
function triggerAutoDefend() {
    console.log("Triggering auto-defense...");

    // Check for incoming attacks on kingdom members or treasury
    const incomingAttacks = document.querySelectorAll('.incoming-attack');  // Example selector
    incomingAttacks.forEach(attack => {
        // Check if it's a valid attack
        const defendButton = attack.querySelector('.defend-button');  // Example button selector
        if (defendButton) {
            defendButton.click();
        }
    });
}

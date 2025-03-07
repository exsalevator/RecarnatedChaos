document.getElementById("building-select").addEventListener("change", (event) => {
    const selectedBuilding = event.target.value;
    
    chrome.storage.local.set({ preferredBuilding: selectedBuilding }, () => {
      console.log(`Preferred building set to: ${selectedBuilding}`);
    });
  });
  
  // Populate dropdown with building names
  chrome.runtime.sendMessage({ action: "getBuildings" }, (buildingData) => {
    const selectElement = document.getElementById("building-select");
  
    buildingData.buildings.forEach(building => {
      const option = document.createElement("option");
      option.value = building.buildingName;
      option.textContent = building.buildingName;
      selectElement.appendChild(option);
    });
  });
  
document.addEventListener('DOMContentLoaded', () => {
    // Load settings from local storage when the popup opens
    chrome.storage.local.get(['buildingPercentage', 'troopPercentage', 'onlineStart', 'onlineEnd', 'randomDelay'], (data) => {
        // Apply saved values to the UI
        document.getElementById('buildingPercentage').value = data.buildingPercentage || 50;
        document.getElementById('troopPercentage').value = data.troopPercentage || 50;
        document.getElementById('onlineStart').value = data.onlineStart || '09:00';
        document.getElementById('onlineEnd').value = data.onlineEnd || '18:00';
        document.getElementById('randomDelay').checked = data.randomDelay || false;

        // Update labels with the current values of sliders
        document.getElementById('buildingPercentageLabel').textContent = `${document.getElementById('buildingPercentage').value}%`;
        document.getElementById('troopPercentageLabel').textContent = `${document.getElementById('troopPercentage').value}%`;
    });

    // Handle input changes and update UI accordingly
    document.getElementById('buildingPercentage').addEventListener('input', (event) => {
        document.getElementById('buildingPercentageLabel').textContent = `${event.target.value}%`;
    });

    document.getElementById('troopPercentage').addEventListener('input', (event) => {
        document.getElementById('troopPercentageLabel').textContent = `${event.target.value}%`;
    });

    // Save settings when the user clicks "Save Settings"
    document.getElementById('saveSettings').addEventListener('click', () => {
        const buildingPercentage = document.getElementById('buildingPercentage').value;
        const troopPercentage = document.getElementById('troopPercentage').value;
        const onlineStart = document.getElementById('onlineStart').value;
        const onlineEnd = document.getElementById('onlineEnd').value;
        const randomDelay = document.getElementById('randomDelay').checked;

        // Save all settings to local storage
        chrome.storage.local.set({
            buildingPercentage,
            troopPercentage,
            onlineStart,
            onlineEnd,
            randomDelay
        }, () => {
            alert('Settings saved successfully!');
        });
    });
});

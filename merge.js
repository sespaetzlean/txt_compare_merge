const fs = require('fs');

// Function to replace server_url in a new file
function replaceServerUrl(configFile1, configFile2, newFile) {
  // Read both config files
  const config1 = fs.readFileSync(configFile1, 'utf8');
  const config2 = fs.readFileSync(configFile2, 'utf8');

  // Find the server_url line in config_parameters_v2.txt
  const serverUrlLine = config2.split('\n').find(line => line.includes('server_url'));

  // Duplicate config_parameters.txt content
  let newConfig = config1;

  // Replace the server_url line in the duplicated file
  newConfig = newConfig.replace(/server_url=.*/, serverUrlLine);

  // Write the new configuration to a new file
  fs.writeFileSync(newFile, newConfig, 'utf8');

  console.log(`New config file created: ${newFile}`);
}

// File paths
const configFile1 = './config_parameters_A.txt';
const configFile2 = './config_parameters_B.txt';
const newFile = './new_config_parameters.txt';

// Call the function to create a new file with the updated server_url
replaceServerUrl(configFile1, configFile2, newFile);

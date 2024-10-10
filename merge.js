const fs = require('fs');

// Function to replace server_url and version using regex
function replaceVersionAndServerUrlWithRegex(configFile1, configFile2, newFile) {
  // Read both config files
  const config1 = fs.readFileSync(configFile1, 'utf8');
  const config2 = fs.readFileSync(configFile2, 'utf8');

  // Use regex to find the server_url and version lines in config_parameters_v2.txt
  const serverUrlRegex = /server_url=.*/;
  const versionRegex = /version=.*/;

  const serverUrlLine = config2.match(serverUrlRegex)[0];
  const versionLine = config2.match(versionRegex)[0];

  // Duplicate config_parameters.txt content
  let newConfig = config1;

  // Replace the server_url and version lines in the duplicated file using regex
  newConfig = newConfig.replace(serverUrlRegex, serverUrlLine);
  newConfig = newConfig.replace(versionRegex, versionLine);

  // Write the new configuration to a new file
  fs.writeFileSync(newFile, newConfig, 'utf8');

  console.log(`New config file created: ${newFile}`);
}

// File paths
const configFile1 = './config_parameters_A.txt';
const configFile2 = './config_parameters_B.txt';
const newFile = './new_config_parameters.txt';

// Call the function to create a new file with the updated server_url and version
replaceVersionAndServerUrlWithRegex(configFile1, configFile2, newFile);

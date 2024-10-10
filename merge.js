const fs = require('fs');

// Function to dynamically replace lines using regex patterns from a JSON file
function replaceLinesUsingJson(configFile1, configFile2, jsonFile, newFile) {
  // Read both config files
  const config1 = fs.readFileSync(configFile1, 'utf8');
  const config2 = fs.readFileSync(configFile2, 'utf8');
  
  // Read the JSON file containing the regex patterns
  const replacementsData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  
  // Start with the contents of config_parameters.txt
  let newConfig = config1;

  // Iterate over each replacement rule in the JSON file
  replacementsData.replacements.forEach(replacementRule => {
    const regexPattern = new RegExp(replacementRule.regex); // Create regex object
    const matchArray = config2.match(regexPattern); // Find matches in the second file

    if (!matchArray || matchArray.length !== 1) {
      // Handle errors where matches are not exactly one
      console.error(`Error: Expected 1 match for ${replacementRule.regex}, but found ${matchArray ? matchArray.length : 0}.`);
      return;
    }

    // Perform the replacement in the newConfig content
    newConfig = newConfig.replace(regexPattern, matchArray[0]);
  });

  // Write the modified config to a new file
  fs.writeFileSync(newFile, newConfig, 'utf8');
  console.log(`New config file created: ${newFile}`);
}

// File paths
const configFile1 = './config_parameters_A.txt';       // Original file to modify
const configFile2 = './config_parameters_B.txt';    // File to source replacements from
const jsonFile = './config_replacements.json';       // JSON file with regex patterns
const newFile = './new_config_parameters.txt';       // Output file

// Call the function to apply replacements from JSON
replaceLinesUsingJson(configFile1, configFile2, jsonFile, newFile);

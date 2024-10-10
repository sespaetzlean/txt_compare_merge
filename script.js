let file1Content = null;
let file2Content = null;
let processedOutput = null;

// Function to read files
function readFiles() {
    const file1 = document.getElementById('file1').files[0];
    const file2 = document.getElementById('file2').files[0];
    const appendCheckbox = document.getElementById('appendCheckbox').checked; // Get the checkbox state

    if (!file1 || !file2) {
        alert("Please select both files");
        return;
    }

    // Create FileReaders to read both files
    const reader1 = new FileReader();
    const reader2 = new FileReader();

    // Event handler when File 1 is loaded
    reader1.onload = function(event) {
        const content1 = event.target.result;
        document.getElementById('file1Content').textContent = content1;
        processFiles(content1, null, appendCheckbox); // Call process with the first file content
    };

    // Event handler when File 2 is loaded
    reader2.onload = function(event) {
        const content2 = event.target.result;
        document.getElementById('file2Content').textContent = content2;
        processFiles(null, content2, appendCheckbox); // Call process with the second file content
    };

    // Read both files
    reader1.readAsText(file1);
    reader2.readAsText(file2);
}

// Function to process the files further
function processFiles(content1, content2, append) {
    if (content1) file1Content = content1;
    if (content2) file2Content = content2;

    // Only proceed once both files are loaded
    if (file1Content && file2Content) {
        if (append) {
            // Append file contents line by line
            processedOutput = appendTextLineByLine(file1Content, file2Content);
        } else {
            // Concatenate file contents
            processedOutput = file1Content + "\n---\n" + file2Content;
        }
        document.getElementById('outputContent').textContent = processedOutput;

        // Show the download button now that the file is ready
        document.getElementById('downloadBtn').style.display = 'block';
    }
}

// Function to append file contents line by line
function appendTextLineByLine(content1, content2) {
    const lines1 = content1.split('\n');
    const lines2 = content2.split('\n');
    const maxLength = Math.max(lines1.length, lines2.length);
    let result = '';

    // Append lines from both files
    for (let i = 0; i < maxLength; i++) {
        if (lines1[i]) result += lines1[i] + '\n';
        if (lines2[i]) result += lines2[i] + '\n';
    }
    return result;
}

// Function to download the processed output as a file
function downloadFile() {
    if (processedOutput) {
        // Create a blob from the processed output
        const blob = new Blob([processedOutput], { type: 'text/plain' });
        
        // Create a temporary link element
        const link = document.createElement('a');
        
        // Set the download attribute with the file name
        link.download = 'processed_output.txt';
        
        // Create a URL for the blob and set it as the href attribute
        link.href = window.URL.createObjectURL(blob);
        
        // Append the link to the document and trigger the download
        document.body.appendChild(link);
        link.click();
        
        // Remove the link after download
        document.body.removeChild(link);
    } else {
        alert("No processed file available for download.");
    }
}

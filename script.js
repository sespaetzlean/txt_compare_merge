let file1Content = null;
let file2Content = null;
let processedOutput = null;

// Function to read files
function readFiles() {
    const file1 = document.getElementById('file1').files[0];
    const file2 = document.getElementById('file2').files[0];

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
        processFiles(content1, null); // Call process with the first file content
    };

    // Event handler when File 2 is loaded
    reader2.onload = function(event) {
        const content2 = event.target.result;
        document.getElementById('file2Content').textContent = content2;
        processFiles(null, content2); // Call process with the second file content
    };

    // Read both files
    reader1.readAsText(file1);
    reader2.readAsText(file2);
}

// Function to process the files further
function processFiles(content1, content2) {
    if (content1) file1Content = content1;
    if (content2) file2Content = content2;

    // Only proceed once both files are loaded
    if (file1Content && file2Content) {
        // Example processing: Concatenate both files' content
        processedOutput = file1Content + "\n---\n" + file2Content;
        document.getElementById('outputContent').textContent = processedOutput;

        // Show the download button now that the file is ready
        document.getElementById('downloadBtn').style.display = 'block';
    }
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

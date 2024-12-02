document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");

    // Add initial loading row
    const loadingRow = document.createElement("tr");
    loadingRow.innerHTML = `<td colspan="2" class="text-center">Loading...</td>`;
    output.appendChild(loadingRow);

    // Function to create a promise with random resolution time
    const createPromise = (index) => {
        return new Promise((resolve) => {
            const time = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
            setTimeout(() => resolve({ index, time: parseFloat(time) }), time * 1000);
        });
    };

    // Create 3 promises
    const promises = [createPromise(1), createPromise(2), createPromise(3)];

    // Record start time
    const startTime = performance.now();

    // Use Promise.all to handle all promises
    Promise.all(promises).then((results) => {
        // Remove the loading row
        output.innerHTML = "";

        // Add resolved promise details to the table
        results.forEach((result) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>Promise ${result.index}</td><td>${result.time} seconds</td>`;
            output.appendChild(row);
        });

        // Calculate total time and add it as the last row
        const totalTime = ((performance.now() - startTime) / 1000).toFixed(3);
        const totalRow = document.createElement("tr");
        totalRow.innerHTML = `<td>Total</td><td>${totalTime} seconds</td>`;
        output.appendChild(totalRow);
    });
});

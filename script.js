document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("promiseTable");
    const loadingRow = document.getElementById("loading");

    // Function to create a promise that resolves in a random time
    const createPromise = (index) => {
        return new Promise((resolve) => {
            const time = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
            setTimeout(() => resolve({ index, time: parseFloat(time) }), time * 1000);
        });
    };

    // Create an array of 3 promises
    const promises = [createPromise(1), createPromise(2), createPromise(3)];

    // Record the start time
    const startTime = performance.now();

    Promise.all(promises).then((results) => {
        // Calculate total time
        const totalTime = ((performance.now() - startTime) / 1000).toFixed(3);

        // Remove loading row
        loadingRow.remove();

        // Populate the table with promise results
        results.forEach((result) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>Promise ${result.index}</td><td>${result.time} seconds</td>`;
            table.appendChild(row);
        });

        // Add total row
        const totalRow = document.createElement("tr");
        totalRow.innerHTML = `<td>Total</td><td>${totalTime} seconds</td>`;
        table.appendChild(totalRow);
    });
});

// The function called when Calculate button is clicked.
window.onload = () => {
    // Calling a function calculateTip which will calculate the tip for the bill.
    document.querySelector('#calculate').onclick = calculateTip;
};

function calculateTip() {
    // Assign values of ID: amount, person, and service to variables for further calculations.
    let amount = parseFloat(document.querySelector('#amount').value);
    let persons = parseInt(document.querySelector('#persons').value, 10);
    let service = parseFloat(document.querySelector('#services').value);

    // Check if inputs are valid
    if (isNaN(amount) || isNaN(persons) || persons <= 0 || isNaN(service)) {
        alert("Please enter valid values");
        return;
    }

    // Determine if there is only one person
    if (persons === 1) {
        document.querySelector('#each').style.display = 'none';
    } else {
        document.querySelector('#each').style.display = 'block';
    }

    // Calculate the tip and total
    let total = (amount * service) / persons;
    total = total.toFixed(2);

    // Display the tip value
    document.querySelector('.tip').style.display = 'block';
    document.querySelector('#total').textContent = total;
}

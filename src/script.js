const billInput = document.querySelector('.bill');
const preRegTipInput = document.querySelectorAll('.tip');
const customTipInput = document.querySelector('.custom');
const numOfpeopleInput = document.querySelector('.people');
const tipAmountDiv = document.getElementById('tip-amount');
const totalDiv = document.getElementById('total');
const resetBtn = document.getElementById('resetBtn');

// tip input is converted to a percentage and multiplied with the bill to get the tip amount
// tip amount is added to bill to get total 
// total is divided by the number of people to get total per person
// tip amount is divided by number of people to get tip amount per person
// bill input, tip input and number of people are read onChange and onKeyup to re-calculate


// SLOT SLOT SLOT SLOT

// calculates total per person if custom input is empty or not
// customTipInput is set to default parameter
function calculateTotalPerPerson (tip = customTipInput.value) {
    let bill = billInput.value;
    if (tip == '' || tip !== '') {
        let numOfPeople = numOfpeopleInput.value;
        let tipPercentage = tip / 100;
        let tipAmount = tipPercentage * Number(bill);
        let total = tipAmount + Number(bill);
        let totalPerPerson = total / numOfPeople;
        totalDiv.innerText = `$${totalPerPerson.toFixed(2)}`;
        let tipAmountPerPerson = Number(tipAmount) / Number(numOfPeople);
        tipAmountDiv.innerText = `$${tipAmountPerPerson.toFixed(2)}`;
    };
};

// CALCULATION ON INTERACTION(EVENTS)
// let bill = billInput.value;
function calcOn ([...fields], [...events]) {
    fields.forEach((field) => {
        events.forEach((event) => {
            field.addEventListener(`${event}`, (e) => {
                calculateTotalPerPerson();
            });          
        });
    });
};
calcOn([billInput, customTipInput, numOfpeopleInput], ['keyup', 'click']);

// SLOT SLOT SLOT SLOT

// gets pre-registered tip percentages and calculates onClick
// sets customTipInput to null
// passes preRegTipPercent as argument
preRegTipInput.forEach((percent) => {
    percent.addEventListener('click', (e) => {
        customTipInput.value = null;
        let preRegTipPercent = percent.getAttribute('value');
        preRegTipPercent = Number(preRegTipPercent);
        calculateTotalPerPerson(preRegTipPercent);
    });
});    


// RESET
resetBtn.addEventListener('click', (e) => {
    billInput.value = '';
    customTipInput.value = '';
    people.value = 1;
    tipAmountDiv.innerText = '$0.00';
    totalDiv.innerText = '$0.00';
});



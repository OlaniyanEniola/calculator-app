const billInput = document.querySelector('.bill');
const preRegTipInput = document.querySelectorAll('.tip');
const customTipInput = document.querySelector('.custom');
const numOfPeopleErrMessage = document.querySelector('.people__message--err');
const numOfPeopleInput = document.querySelector('.people__num');
const tipAmountDiv = document.getElementById('tip-amount');
const totalDiv = document.getElementById('total');
const resetBtn = document.getElementById('resetBtn');

// HOW THE CALCULATION WORKS
// tip input is converted to a percentage and multiplied with the bill to get the tip amount
// tip amount is added to bill to get total 
// total is divided by the number of people to get total per person
// tip amount is divided by number of people to get tip amount per person
// bill input, tip input and number of people are read onChange and onKeyup to re-calculate


// CALCULATES TOTAL PER PERSON 
// customTipInput is set to default parameter
function calculateTotalPerPerson(tip = customTipInput.value) {
    let bill = billInput.value;
    let numOfPeople = numOfPeopleInput.value;
    togglePeopleErr();
    if (bill == '' || numOfPeople == '' || numOfPeople < 1) {
        tipAmountDiv.innerText = '$0.00';
        totalDiv.innerText = '$0.00';
        return;
    };
    let tipPercentage = Number(tip) / 100;
    let tipAmount = Number(tipPercentage) * Number(bill);
    let total = Number(tipAmount) + Number(bill);
    let totalPerPerson = Number(total) / Number(numOfPeople);
    totalDiv.innerText = `$${totalPerPerson.toFixed(2)}`;
    let tipAmountPerPerson = Number(tipAmount) / Number(numOfPeople);
    tipAmountDiv.innerText = `$${tipAmountPerPerson.toFixed(2)}`;
};

// GETS PRE-REGISTERED TIP PERCENTAGES AND CALCULATES ONCLICK
// loops through percentages and removes existing active class and adds active class to clicked percentage
// gets value if percentage contains active class
// sets customTipInput to null
// passes preRegTipPercent as argument to calculateTotalPerPerson 
// function preReg() {
preRegTipInput.forEach((percent) => {
    percent.addEventListener('click', (e) => {
        for (let percent of preRegTipInput) {
            percent.classList.remove('active');
        };
        percent.classList.add('active');
        if (percent.classList.contains('active')) {
            customTipInput.value = null;
            let preRegTipPercent = Number(percent.getAttribute('value'));
            calculateTotalPerPerson(preRegTipPercent);
        };
    });
});


// CALCULATION ON INTERACTION(EVENTS)
function calcOnEvents([...fields], [...events]) {
    fields.forEach((field) => {
        events.forEach((event) => {
            field.addEventListener(`${event}`, (e) => {
                calculateTotalPerPerson();
            });
        });
    });
};
calcOnEvents([billInput, customTipInput, numOfPeopleInput], ['keyup', 'change']);


// TOGGLE NUMBER OF PEOPLE ERROR
function togglePeopleErr() {
    if (numOfPeopleInput.value < 1 && numOfPeopleInput.value !== '') {
        numOfPeopleErrMessage
        numOfPeopleInput.style.outlineColor = "#ef4444";
        numOfPeopleErrMessage.classList.remove('hidden');
    } else if (numOfPeopleInput.value > 0 || numOfPeopleInput.value == '') {
        numOfPeopleInput.style.outlineColor = "#06b6d4";
        numOfPeopleErrMessage.classList.add('hidden');
    };
};
// togglePeopleErr();


// REMOVE ACTIVE CLASS FROM PERCENT IF CUSTOM TIP INPUT OR RESET BUTTON IS CLICKED
function removeActive(...fields) {
    fields.forEach((field) => {
        field.addEventListener('click', (e) => {
            preRegTipInput.forEach((percent) => percent.classList.remove('active'));
        });
    });
};
removeActive(customTipInput, resetBtn);


// RESET ALL VALUES AND ERRORS
resetBtn.addEventListener('click', (e) => {
    billInput.value = '';
    customTipInput.value = '';
    numOfPeopleInput.value = '';
    numOfPeopleInput.style.outlineColor = "#06b6d4";
    numOfPeopleErrMessage.classList.add('hidden');
    tipAmountDiv.innerText = '$0.00';
    totalDiv.innerText = '$0.00';
});



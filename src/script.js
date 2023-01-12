const billInput = document.querySelector('.bill');
const preRegTipInput = document.querySelectorAll('.tip');
const customTipInput = document.querySelector('.custom');
const numOfPeopleMessage = document.querySelector('.people__message');
const numOfPeopleInput = document.querySelector('.people__num');
const tipAmountDiv = document.getElementById('tip-amount');
const totalDiv = document.getElementById('total');
const resetBtn = document.getElementById('resetBtn');

// HOW CALCULATION WORKS
// tip input is converted to a percentage and multiplied with the bill to get the tip amount
// tip amount is added to bill to get total 
// total is divided by the number of people to get total per person
// tip amount is divided by number of people to get tip amount per person
// bill input, tip input and number of people are read onChange and onKeyup to re-calculate


// CALCULATES TOTAL PER PERSON if custom input is empty or not
// customTipInput is set to default parameter
function calculateTotalPerPerson (tip = customTipInput.value) {
    let bill = billInput.value;
    let numOfPeople = numOfPeopleInput.value;
    toggleNumOfPeopleError();
    if (bill == '' || numOfPeople == '' || numOfPeople < 1) {
        return;
    };        
    let tipPercentage = Number(tip) / 100;
    let tipAmount = Number(tipPercentage) * Number(bill);
    let total = Number(tipAmount) + Number(bill);
    let totalPerPerson = Number(total) / Number(numOfPeople);
    totalDiv.innerText = `$${totalPerPerson.toFixed(2)}`;
    let tipAmountPerPerson = Number(tipAmount) / Number(numOfPeople);
    tipAmountDiv.innerText = `$${tipAmountPerPerson.toFixed(2)}`;
    console.log(numOfPeople);
};


// TOGGLE NUMBER OF PEOPLE ERROR
function toggleNumOfPeopleError () {
    if (numOfPeopleInput.value >= 1) {
        numOfPeopleInput.classList.remove('people__num--error');
        numOfPeopleMessage.innerText = "Number of People";
        numOfPeopleMessage.classList.remove('people__message--error');
    } else if (numOfPeopleInput.value < 1 && numOfPeopleInput.value !== '') {
        numOfPeopleInput.blur();
        numOfPeopleInput.classList.add('people__num--error');
        numOfPeopleMessage.innerText = "Number of People can't be zero"
        numOfPeopleMessage.classList.add('people__message--error');
    };
};


// CALCULATION ON INTERACTION(EVENTS)
// let bill = billInput.value;
function calcOnEvents ([...fields], [...events]) {
    fields.forEach((field) => {
        events.forEach((event) => {
            field.addEventListener(`${event}`, (e) => {
                calculateTotalPerPerson();
            });
        });
    });
};
calcOnEvents([billInput, customTipInput, numOfPeopleInput], ['keyup', 'change']);


// GETS PRE-REGISTERED TIP PERCENTAGES AND CALCULATES ONCLICK
// loops through percentages and removes existing active class and adds active class to clicked percentage
// gets value if percentage contains active class
// sets customTipInput to null
// passes preRegTipPercent as argument to calculateTotalPerPerson 
preRegTipInput.forEach((percent) => {
    percent.addEventListener('click', (e) => {
        customTipInput.value = null;
        for (let percent of preRegTipInput) {
            percent.classList.remove('active');
        }
        percent.classList.add('active');
        // let activePercent = document.querySelector('.tip.active');
        // console.log(activePercent);
        // activePercent.addEventListener('click', (e) => {
        //     percent.classList.remove('active');
        //     console.log('test')
        // });
        if (percent.classList.contains('active')) {
            let preRegTipPercent = percent.getAttribute('value');
            preRegTipPercent = Number(preRegTipPercent);
            calculateTotalPerPerson(preRegTipPercent);
        };
    });
});

// REMOVE ACTIVE CLASS FROM PERCENT IF CUSTOM TIP INPUT OR RESET BUTTON IS CLICKED
function removeActive (...fields) {
    fields.forEach((field) => {
        field.addEventListener('click', (e) => {
            preRegTipInput.forEach((percent) => percent.classList.remove('active'));
        });
    });
};
removeActive(customTipInput, resetBtn);


// RESET
resetBtn.addEventListener('click', (e) => {
    billInput.value = '';
    customTipInput.value = '';
    numOfPeopleInput.value = '';
    tipAmountDiv.innerText = '$0.00';
    totalDiv.innerText = '$0.00';
});



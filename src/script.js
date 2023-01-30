const billInput = document.querySelector('.bill');
const preRegTipInput = document.querySelectorAll('.tip');
const customTipInput = document.querySelector('.custom');
const customTipInputDecoy = document.querySelector('.custom-decoy');
const numOfPeopleErrMessage = document.querySelector('.people__message--err');
const numOfPeopleInput = document.querySelector('.people__num');
const tipAmountDiv = document.getElementById('tip-amount');
const totalDiv = document.getElementById('total');
const resetBtn = document.getElementById('resetBtn');
const preRegTipInputContainer = document.querySelector('.tips');


// HOW THE CALCULATION WORKS
// tip input is converted to a percentage and multiplied with the bill to get the tip amount
// tip amount is added to bill to get total 
// total is divided by the number of people to get total per person
// tip amount is divided by number of people to get tip amount per person
// bill input, tip input and number of people are read onChange and onKeyup to re-calculate


// CALCULATES TOTAL PER PERSON 
function calculateTotalPerPerson() {
    let bill = billInput.value;
    let numOfPeople = numOfPeopleInput.value;
    let tip = customTipInput.value;
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
preRegTipInput.forEach((percent) => {
    percent.addEventListener('click', (e) => {

// loops through percentages and removes existing active class by default everytime this runs to prevent multiple active classes
        for (let percent of preRegTipInput) {
            percent.classList.remove('active');
        };
// adds active class to clicked percentage
        percent.classList.add('active');
// break if active class is absent
        if (!percent.classList.contains('active')) {
            console.log('test')
            return;
        };
// if active class is absent code below doesn't run

// code below runs if active class is present
        let preRegTipPercent;
// if active class is present TOGGLE on click
        // percent.addEventListener('click', (e) => {
        //     if (!percent.classList.contains('active')) {
        //         percent.classList.add('active');
        //         customTipInput.value = preRegTipPercent;
        //     } else {
        //         percent.classList.remove('active');
        //         customTipInput.value = null;
        //     };
        // });
	
// gets value if percentage contains active class
// passes preRegTipPercent as customTipInput.value to feed the tip into calculateTotalPerPerson function
        preRegTipPercent = Number(percent.getAttribute('value'));
        customTipInput.value = preRegTipPercent;
// toggle focus on customTipInput when customTipInput.value is set to preRegTipPercent or is cleared
        if (customTipInput.value == preRegTipPercent) {
            preRegTipInputContainer.classList.add('blur');
            if (customTipInput.blur) {
                customTipInput.classList.add('hide')
                customTipInputDecoy.classList.remove('hide')
                customTipInputDecoy.classList.add('custom')
            };
            customTipInputDecoy.addEventListener('click', (e) => {
                customTipInputDecoy.classList.add('hide')
                customTipInput.classList.remove('hide')
                percent.classList.remove('active');
                customTipInput.focus();
            });
            customTipInput.addEventListener('focus', (e) => {
                preRegTipInputContainer.classList.remove('blur');
                customTipInput.value = null;
                // calulate again as custom tip input is now null           
                calculateTotalPerPerson();
            });
        };
            
// calulate every time percent is clicked and active class id added         
        calculateTotalPerPerson();
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



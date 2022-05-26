const bill = document.getElementById('input-bill');
const tipBtns = document.querySelectorAll('.tip');
const tipCustom = document.getElementById('input-tip');
const customers = document.getElementById('input-customer');
const errorMsg = document.querySelector('.error-msg');
const results = document.querySelectorAll('.value');
const resetBtn = document.querySelector('.reset');


bill.addEventListener('input', setBillValue);
tipBtns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
tipCustom.addEventListener('input', setTipCustomValue);
customers.addEventListener('input', setCustomersValue);
resetBtn.addEventListener('click', reset);


let billValue = 0.0;
let tipValue = 0.15;
let customersValue = 1;

function validateForm(s) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s) {
    var rgx = /^[0-9]*/;
    return s.match(rgx);
}

function setBillValue() {
    if (bill.value.includes(',')) {
        bill.value = bill.value.replace(',', '.');
    }

    if (!validateForm(bill.value)) {
        bill.value = bill.value.substring(0, bill.value.length - 1);
    }

    billValue = parseFloat(bill.value);

    calculateTip();
}

function handleClick(e) {
    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');

        if (e.target.innerHTML == btn.innerHTML) {
            btn.classList.add('btn-active');
            tipValue = parseFloat(btn.innerHTML) / 100;
        }
    });

    tipCustom.value = '';
    calculateTip();
}

function setTipCustomValue() {
    if (!validateInt(tipCustom.value)) {
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1);
    }

    tipValue = parseFloat(tipCustom.value / 100);

    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');
    });

    if (tipCustom.value !== '') {
        calculateTip();
    }
}

function setCustomersValue() {
    if (!validateInt(customers.value)) {
        customers.value = customers.value.substring(0, customers.value.length - 1);
    }

    customersValue = parseFloat(customers.value);

    if (customersValue <= 0) {
        errorMsg.classList.add('show-error-msg');
        setTimeout(function () {
            errorMsg.classList.remove('show-error-msg');
        }, 3000);
    }

    calculateTip();
}

function calculateTip() {
    if (customersValue >= 1) {
        let tipAmount = billValue * tipValue / customersValue;
        let total = billValue * (tipValue + 1) / customersValue;
        results[0].innerHTML = '$' + tipAmount.toFixed(2);
        results[1].innerHTML = '$' + total.toFixed(2);
    }
}

function reset() {
    bill.value = '0.0';
    setBillValue();

    tipBtns[2].click();

    customers.value = '1';
    setCustomersValue();
}




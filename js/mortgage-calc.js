function validNumber(fieldinput) {
    var unicode = fieldinput.charCode ? fieldinput.charCode : fieldinput.keyCode;
    if ((unicode != 8) && (unicode != 46)) { //if the key isn't the backspace key (which we should allow)
        if (unicode < 48 || unicode > 57) //if not a number
            return false; //disable key press
    }
}

function payoffDate(yearcount){
  //Get loan start date
  var d = document.mortgagecalc.start_date.value;
  if (d === null){
    document.getElementById('payoff').innerHTML = "Please enter a start date to see the loan payoff date!";
  }
  else {
    var startdate = new Date(d);
    var payoffms = Date.UTC(startdate.getUTCFullYear(), startdate.getUTCMonth(), startdate.getUTCDate()) + (yearcount * 365 * 24 * 60 * 60 * 1000);
    var payoffdate = new Date(payoffms);
    var dateToStr = payoffdate.toUTCString().split(' ');
    var cleanDate = dateToStr[1] + ' ' + dateToStr[2] + ' ' + dateToStr[3] ;
    document.getElementById('payoff').innerHTML = "Loan PayOff Date: " + cleanDate;
  }
}

function myPayment() {
    // Reset error messages to blank
    document.getElementById('loanError').innerHTML = '';
    document.getElementById('yearsError').innerHTML = '';
    document.getElementById('rateError').innerHTML = '';

    // Form validation checking
    if ((document.mortgagecalc.loan.value === null) || (document.mortgagecalc.loan.value.length === 0) || (isNaN(document.mortgagecalc.loan.value) === true)) {
        document.getElementById('monthlyPayment').innerHTML = 'Please enter the missing information.';
        document.getElementById('loanError').innerHTML = 'Numeric value required. Example: 165000';
    } else if ((document.mortgagecalc.years.value === null) || (document.mortgagecalc.years.value.length === 0) || (isNaN(document.mortgagecalc.years.value) === true)) {
        document.getElementById('monthlyPayment').innerHTML = 'Please enter the missing information.';
        document.getElementById('yearsError').innerHTML = 'Numeric value required. Example: 30';
    } else if ((document.mortgagecalc.rate.value === null) || (document.mortgagecalc.rate.value.length === 0) || (isNaN(document.mortgagecalc.rate.value) === true)) {
        document.getElementById('monthlyPayment').innerHTML = 'Please enter the missing information.';
        document.getElementById('rateError').innerHTML = 'Numeric value required. Example: 5.25';
    } else {
        //Set variables from form data
        var p = document.mortgagecalc.loan.value; //Principal amount
        t = document.mortgagecalc.years.value; //Mortgage term (in years)
        var r = (document.mortgagecalc.rate.value) / 100; //Interest Rate (in %)
        var ct = document.mortgagecalc.compound_type.value;
        var amount;
        if (ct == "monthly") {
            var i = r / 12;
            amount = (p * i / (1 - (Math.pow(1/(1 + i), t * 12))));
            emi = amount.toFixed(2);
        } else if (ct == "weekly") {
            var i = r / 52;
            amount = (p * i / (1 - (Math.pow(1/(1 + i), t * 52))));
            emi = (amount * 4.34524).toFixed(2);
        } else {
            var i = r;
            amount = (p * i / (1 - (Math.pow(1/(1 + i), t))));
            emi = (amount / 12).toFixed(2);
        }
        //else {
        //     amount = (p * (Math.pow(Math.E, r * t))).toFixed(2); //Calculation for compound type - continuous
        // }
        //Display calculated EMI
        document.getElementById('monthlyPayment').innerHTML = 'Your <abbr title="Equated Monthly Installments">EMI</abbr> will be ' + '₹' + emi;
        document.getElementById('friendlyReminder').style.display = 'block';
        payoffDate(t);

    }
}

function myPaymentReset() {
    // Reset everything to default/null/blank
    document.getElementById('monthlyPayment').innerHTML = 'Values reset';
    document.getElementById('friendlyReminder').style.display = 'none';
    document.getElementById('loanError').innerHTML = '';
    document.getElementById('yearsError').innerHTML = '';
    document.getElementById('rateError').innerHTML = '';
    document.mortgagecalc.loan.value = null;
    document.mortgagecalc.years.value = null;
    document.mortgagecalc.rate.value = null;
    document.mortgagecalc.compound_type.value = 'monthly';
}

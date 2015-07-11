// years old code

var tick = 30; // fps

money = {
	amt: 0,
	total: 0,
	rate: 0
}
hype = {
	amt: 0,
	rate: 0
}
morale = {
	amt: 100,
	rate: 0
}
staff = {
	intern: {
		amt: 0,
		baseCost: 5.00,
		cost: 5,
		baseIncome: 0.1,
		income: 0.1,
		hype: 0,
		morale: -0.02,
	},
	dec: {
		amt: 0,
		baseCost: 25,
		cost: 25,
		baseIncome: 0.4,
		income: 0.4,
		hype: 0,
		morale: -0.02,
	},
	pra: {
		amt: 0,
		baseCost: 30,
		cost: 30,
		baseIncome: 0.15,
		income: 0.15,
		hype: 0.05,
		morale: 0,
	},
	super: {
		amt: 0,
		baseCost: 60,
		cost: 60,
		baseIncome: 0.25,
		income: 0.25,
		hype: 0,
		morale: 0.1,
	},
	itt: {
		amt: 0,
		baseCost: 180,
		cost: 180,
		baseIncome: 0.85,
		income: 0.85,
		hype: 0.00,
		morale: 0,
	}
}

upgrade: {
	
}

function clickWork() {
	money.amt += 1 + 0.05 * money.rate;
}

function clickRaise() {
	morale.amt += 5 + 0.05 * morale.rate;
	if (morale.amt > 100) {
		morale.amt = 100;
	}
}

function clickMarket() {
	hype.amt += 2 + 0.05 * hype.rate;
}

function hire(type) {
	if (money.amt >= staff[type].cost) {
		staff[type].amt += 1;
		money.amt -= staff[type].cost;
	}
}

function boot(type) {
	if (staff[type].amt > 0) {
		staff[type].amt -= 1;
		money.amt += 0.75 * staff[type].cost;
		morale.amt -= 1;
		if (morale.amt < 0) {
			morale.amt = 0;
		}
	}
}

function everyTick() {
	var temp1 = 0;
	var temp2 = 0;
	var temp3 = 0;

	money.amt += money.rate/tick;
	morale.amt += (morale.rate - 0.025 + 0.005 * (100 - morale.amt))/tick;
	if (morale.amt < 0) {
		morale.amt = 0;
	}
	hype.amt += (2* Math.random() * hype.rate - 0.07 * Math.pow(hype.amt, 1.03))/tick;
	for (var x in staff) {
		var y = staff[x];
		y.income = y.baseIncome * (1 + 0.01 * hype.amt) * 0.01 * morale.amt;
		temp1 += y.amt * y.income;
		temp2 += y.amt * y.hype;
		temp3 += y.amt * y.morale;
		y.cost = (y.baseCost * Math.pow(1.15, y.amt)).toFixed(2);

	}
	if (hype.amt < 0) {
		hype.amt = 0;
	}
	money.rate = temp1;
	hype.rate = temp2;
	morale.rate = temp3;
	updateUI();
}




function save() {

	// save the pennies
	var temp4;
	if (money.amt > 1000000000000000000000) {
		temp4 = Math.round(money.amt);
	}
	else {
		temp4 = 0.01 * (Math.round(money.amt * 100));
	}

	var sav = {
		money:temp4,

		staff:{},
	};
	for (var e in staff) {
		sav.staff[e] = {
			amt:staff[e].amt,
		};
	}
	localStorage.sav = JSON.stringify(sav);
}

function load() { 
	if (!localStorage.sav) { 
		return false;
	}
	var sav = $.parseJSON(localStorage.sav);
	money.amt = sav.money;
	for (var e in staff) {
		if (staff[e]) {
			staff[e].amt = sav.staff[e].amt;
		}
	}
}

function reset() {
	localStorage.clear();
}

function putComma(num) {
	return num.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
}

function updateUI() {

	document.getElementById("internCost").innerHTML = putComma(staff.intern.cost);
	document.getElementById("internAmt").innerHTML = staff.intern.amt;
	document.getElementById("internIncome").innerHTML = staff.intern.income.toFixed(2);
	document.getElementById("internHype").innerHTML = staff.intern.hype.toFixed(2);
	document.getElementById("internMorale").innerHTML = staff.intern.morale.toFixed(2);


	document.getElementById("decCost").innerHTML = putComma(staff.dec.cost);
	document.getElementById("decAmt").innerHTML = staff.dec.amt;
	document.getElementById("decIncome").innerHTML = staff.dec.income.toFixed(2);
	document.getElementById("decHype").innerHTML = staff.dec.hype.toFixed(2);
	document.getElementById("decMorale").innerHTML = staff.dec.morale.toFixed(2);


	document.getElementById("praCost").innerHTML = putComma(staff.pra.cost);
	document.getElementById("praAmt").innerHTML = staff.pra.amt;
	document.getElementById("praIncome").innerHTML = staff.pra.income.toFixed(2);
	document.getElementById("praHype").innerHTML = staff.pra.hype.toFixed(2);
	document.getElementById("praMorale").innerHTML = staff.pra.morale.toFixed(2);


	document.getElementById("superCost").innerHTML = putComma(staff.super.cost);
	document.getElementById("superAmt").innerHTML = staff.super.amt;
	document.getElementById("superIncome").innerHTML = staff.super.income.toFixed(2);
	document.getElementById("superHype").innerHTML = staff.super.hype.toFixed(2);
	document.getElementById("superMorale").innerHTML = staff.super.morale.toFixed(2);


	document.getElementById("ittCost").innerHTML = putComma(staff.itt.cost);
	document.getElementById("ittAmt").innerHTML = staff.itt.amt;
	document.getElementById("ittIncome").innerHTML = staff.itt.income.toFixed(2);
	document.getElementById("ittHype").innerHTML = staff.itt.hype.toFixed(2);
	document.getElementById("ittMorale").innerHTML = staff.itt.morale.toFixed(2);







	document.getElementById("money").innerHTML = putComma(money.amt.toFixed(2));
	document.getElementById("income").innerHTML = money.rate.toFixed(2);
	document.getElementById("moraleRate").innerHTML = morale.rate.toFixed(2);
	document.getElementById("moralebar").innerHTML = Math.round(morale.amt) + "%";
	document.getElementById("moralebar").style.width = Math.round(15 + 0.85 * morale.amt) + "%";
	document.getElementById("hype").innerHTML = hype.rate.toFixed(2);
	document.getElementById("hypebar1").innerHTML = Math.round(hype.amt) + "%";
	document.getElementById("hypebar1").style.width = Math.round(15 + 0.85 * (hype.amt%100)) + "%";

	if (morale.amt < 0) {
		morale.amt = 0;
	}
	if (morale.amt > 100) {
		morale.amt = 100;
	}
	if (hype.amt < 0) {
		hype.amt = 0;
	}
	else if (hype.amt <= 100) {
		document.getElementById("hypebar1").className = "progress-bar progress-bar-success";
	}
	else if (hype.amt <= 200) {
		document.getElementById("hypebar1").className = "progress-bar progress-bar-warning";
	}
	else if (hype.amt <= 300) {
		document.getElementById("hypebar1").className = "progress-bar progress-bar-danger";
	}
}

$(function() {
	setInterval(function(){everyTick()}, 1000/tick);
	load();
	setInterval(function(){save()}, 12000)
});
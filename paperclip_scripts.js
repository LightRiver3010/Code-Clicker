
ppc_element = document.getElementById("paperclip");

upgr1_element_count = document.getElementById("upgrade1count");
upgr1_element_price = document.getElementById("upgrade1price");

upgr2_element_count = document.getElementById("upgrade2count");
upgr2_element_price = document.getElementById("upgrade2price");

upgr3_element_count = document.getElementById("upgrade3count");
upgr3_element_price = document.getElementById("upgrade3price");

manager1_element_price = document.getElementById("manager1price");
manager1_element_count = document.getElementById("manager1count");

manager2_element_price = document.getElementById("manager2price");
manager2_element_count = document.getElementById("manager2count");

manager3_element_price = document.getElementById("manager3price");
manager3_element_count = document.getElementById("manager3count");

manager4_element_price = document.getElementById("manager4price");
manager4_element_count = document.getElementById("manager4count");

manager5_element_price = document.getElementById("manager5price");
manager5_element_count = document.getElementById("manager5count");

/*
per_sec_element = document.getElementById("per_second");*/

let ppc = 0;

let mgr = 0;

let upgr1_count = 1;
let upgr1_price = 5000;

let upgr2_count = 1;
let upgr2_price = 1;

let upgr3_count = 0;
let upgr3_price = 10;

let mgr1_count = 0;
let mgr1_price = 10;

let mgr2_count = 0;
let mgr2_price = 100;

let mgr3_count = 0;
let mgr3_price = 1000;

let mgr4_count = 0;
let mgr4_price = 50000;

let mgr5_count = 0;
let mgr5_price = 100000;

let multiplier = 1;

let cost = 10;
let per_sec = 0;
/*
const export_button = document.getElementById("csvInput");
export_button.addEventListener("input", (import_data));
*/

function update() {
    
    multiplier = upgr1_count;

    ppc_element.innerHTML = ppc;

    upgr1_element_count.innerHTML = upgr1_count;
    upgr1_element_price.innerHTML = upgr1_price;

    upgr2_element_count.innerHTML = upgr2_count;
    upgr2_element_price.innerHTML = upgr2_price;

    upgr3_element_count.innerHTML = upgr3_count;
    upgr3_element_price.innerHTML = upgr3_price;

    manager1_element_price.innerHTML = mgr1_price;
    manager1_element_count.innerHTML = mgr1_count;

    manager2_element_price.innerHTML = mgr2_price;
    manager2_element_count.innerHTML = mgr2_count;

    manager3_element_price.innerHTML = mgr3_price;
    manager3_element_count.innerHTML = mgr3_count;

    manager4_element_price.innerHTML = mgr4_price;
    manager4_element_count.innerHTML = mgr4_count;

    manager5_element_price.innerHTML = mgr5_price;
    manager5_element_count.innerHTML = mgr5_count;

}

function upgrade1_price_update() {
    upgr1_price = upgr1_count * 50;
}

function upgrade2_price_update() {
    upgr2_price = upgr2_price + 3;
}

function upgrade3_price_update() {
    upgr3_price = upgr3_price * 100;
}

function manager1_price_update() {
    mgr1_price = mgr1_price * 2;
}
function manager2_price_update() {
    mgr2_price = mgr2_price * 2;
}
function manager3_price_update() {
    mgr3_price = mgr3_price * 2;
}
function manager4_price_update() {
    mgr4_price = mgr4_price * 2;
}
function manager5_price_update() {
    mgr5_price = mgr5_price * 2;
}



function code_click() {
    ppc = ppc + (1 * multiplier);
    update()
}

function buy_manager1() {
    if (ppc >= mgr1_price) {
        ppc -= mgr1_price;
        mgr1_count++;
        manager1_price_update();
        update();
    }
}

function buy_manager2() {
    if (ppc >= mgr2_price) {
        ppc -= mgr2_price;
        mgr2_count++;
        manager2_price_update();
        update();
    }
}
function buy_manager3() {
    if (ppc >= mgr3_price) {
        ppc -= mgr3_price;
        mgr3_count++;
        manager3_price_update();
        update();
    }
}
function buy_manager4() {
    if (ppc >= mgr4_price) {
        ppc -= mgr4_price;
        mgr4_count++;
        manager4_price_update();
        update();
    }
}
function buy_manager5() {
    if (ppc >= mgr5_price) {
        ppc -= mgr5_price;
        mgr5_count++;
        manager5_price_update();
        update();
    }
}
function buy_upgrade1() {
    if (ppc >= upgr1_price) {
        ppc -= upgr1_price;
        upgr1_count++;
        upgrade1_price_update();
        update();
    }
}

function buy_upgrade2() {
    if (ppc >= upgr2_price) {
        ppc -= upgr2_price;
        upgr2_count++;
        upgrade2_price_update();
        update();
    }
}

function buy_upgrade3() {
    if (ppc >= upgr3_price) {
        ppc -= upgr3_price;
        upgr3_count++;
        upgrade3_price_update();
        update();
    }
}

setInterval(function auto_bits() {
    ppc = ppc + mgr1_count;
    ppc = ppc + (mgr2_count * 2);
    ppc = ppc + (mgr3_count * 10);
    ppc = ppc + (mgr4_count * 25);
    ppc = ppc + (mgr5_count * 10000);
    ppc = ppc + (upgr3_count * 1 * multiplier)
    update();
}, 1000);


function export_data() {
    const datas = [ppc, mgr];
    const data = datas.join('\n');
    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(data);
    link.download = "PaperClip_data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
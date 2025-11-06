
ppc_element = document.getElementById("paperclip");

upgr1_element_count = document.getElementById("upgrade1count");
upgr1_element_price = document.getElementById("upgrade1price");

manager1_element_price = document.getElementById("manager1price");
manager1_element_count = document.getElementById("manager1count");
/*mgr_element = document.getElementById("manager");
mgr_cost_element = document.getElementById("mgr_cost");
per_sec_element = document.getElementById("per_second");*/

let ppc = 0;

let mgr = 0;

let upgr1_count = 1;
let upgr1_price = 20;

let mgr1_count = 0;
let mgr1_price = 10;

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

    manager1_element_price.innerHTML = mgr1_price;
    manager1_element_count.innerHTML = mgr1_count;

}

function upgrade1_price_update() {
    upgr1_price = upgr1_count * 50;
}

function manager1_price_update() {
    mgr1_price = mgr1_count * 10;
}

function update_per_sec() {
    per_sec = mgr; //Add more onto this as more managers are added
    per_sec_element.innerHTML = per_sec;
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

function upgr_count_increase() {
    upgr1_count++;
    update();
}

function buy_upgrade1() {
    if (ppc >= upgr1_price) {
        ppc -= upgr1_price;
        upgr1_count++;
        upgrade1_price_update();
        update();
    }
}

setInterval(function auto_bits() {
    ppc = ppc + mgr1_count;
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
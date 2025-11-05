
ppc_element = document.getElementById("paperclip");
mgr1_element_count = document.getElementById("manager1count");
upgr1_element_count = document.getElementById("upgrade1count");
upgr1_element_price = document.getElementById("upgrade1price");
/*mgr_element = document.getElementById("manager");
mgr_cost_element = document.getElementById("mgr_cost");
per_sec_element = document.getElementById("per_second");*/

let ppc = 0;

let mgr = 0;

let upgr1_count = 0;
let upgr1_price = 0;

let cost = 10;
let per_sec = 0;
/*
const export_button = document.getElementById("csvInput");
export_button.addEventListener("input", (import_data));
*/

function update() {
    /*mgr_element.innerHTML = mgr;
    */
    price_update()
    ppc_element.innerHTML = ppc;
    mgr1_element_count.innerHTML = mgr;
    upgr1_element_count.innerHTML = upgr1_count;
    upgr1_element_price.innerHTML = upgr1_price;

}

function price_update() {
    upgr1_price = upgr1_count * 1.5;
}

function update_per_sec() {
    per_sec = mgr; //Add more onto this as more managers are added
    per_sec_element.innerHTML = per_sec;
}


function increase() {
    ppc++;
    update()
}

function mgr_increase() {
    mgr++;
    update()
}

function upgr_count_increase() {
    upgr1_count++;
    update();
}

function buy_upgrade() {
    if (ppc >= upgr1_price) {
        ppc -= upgr1_price;
        upgr1_count++;
        price_update();
        update()
    }
}

function auto_bits() {
}




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
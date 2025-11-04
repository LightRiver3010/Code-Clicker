
ppc_element = document.getElementById("paperclip");
mgr1_element = document.getElementById("manager1count");
upgr1_element = document.getElementById("upgrade1count");
/*mgr_element = document.getElementById("manager");
mgr_cost_element = document.getElementById("mgr_cost");
per_sec_element = document.getElementById("per_second");*/

let ppc = 0;

let mgr = 0;
let mgr2 = 0;
let mgr3 = 0;
let mgr4 = 0;
let mgr5 = 0;
let mgr6 = 0;

let upgr1 = 0;

let cost = 10;
let per_sec = 0;

const export_button = document.getElementById("csvInput");
export_button.addEventListener("input", (import_data));


function update() {
    /*mgr_element.innerHTML = mgr;*/
    ppc_element.innerHTML = ppc;
    mgr1_element.innerHTML = mgr;
    upgr1_element.innerHTML = upgr1;
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

function upgr_increase() {
    upgr1++;
    update();
}

function manager() {
    if (ppc >= cost) {
        ppc -= cost;
        mgr++;
        cost = 10 + mgr;
        mgr_cost_element.innerHTML = cost;
        update()
    }
}


setInterval(function autoclips() {
    ppc = ppc + mgr;
    update_per_sec()
    update()
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
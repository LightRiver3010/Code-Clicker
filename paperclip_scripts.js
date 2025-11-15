
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

function Manager(price) {
    this.price = price;
    this.count = 0;
    this.buy = function(total) {
        if (total >= this.price) {
            total -= this.price;
            this.count += 1;
            this.price *= 1.15;
            return total
        }
    }
}

function Upgrade(price) {
    this.price = price;
    this.count = 0;
    this.buy = function(total) {
        if (total >= this.price) {
            total -= this.price;
            this.count += 1;
            this.price *= 1.15;
            return total
        } else {
            return total
        }
    }
}

const mgr1 = new Manager(10)

document.getElementById('manager1btn').addEventListener('click', function() {
    ppc = mgr1.buy(ppc);
})

/*
per_sec_element = document.getElementById("per_second");*/

let ppc = 0;

let upgr1_count = 0;
let upgr1_price = 5000;

let upgr2_count = 0;
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
    
    if (upgr1_count === 0) {
        multiplier = 1;
    } else {
        multiplier = upgr1_count + 1
    }

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

function exporting() {
    // Seleting the data to export
    let datas = [ppc, mgr1_count, mgr2_count, mgr3_count, mgr4_count, mgr5_count, upgr1_count, upgr2_count, upgr3_count];
    const data = datas.join('\n'); //Join each element together with a newline (each value on its own line)
    const link = document.createElement('a'); //Create a new anchor element on the page called 'link'
    link.href = "data:text/csv;charset=utf-8," + encodeURI(data); //Link is now referencing an actual link (encoded by URI)
    link.download = "Clicker-Game_data.csv"; //Set the download function of the link to be called the string
    document.body.appendChild(link); //Add the newly-made link to the HTML page
    link.click(); //Click the anchor element (activating it & downloading the file)
    document.body.removeChild(link); //Remove the newly-made link from the HTML page
}

function parseCSV(csv) {
    return csv.trim().split("\n");
}

document.getElementById('import-btn').addEventListener('click', function() { //Add a listener on our import button
    const inp = document.getElementById('import'); //Set up an element containing the info from the input element
    const file = inp.files[0] //Select the first file from the input element
    if (!file) {
        alert('Select a CSV file, please!');
        return; //If no file is chosen, raise an alert and end the function
    }
    const reader = new FileReader() //Declare a new FileReader object
    //The below .onload function is like a helper function; it runs once the file has actually been processed (happening below)
    reader.onload = function(e) { //onload = when FileReader is done reading the file. The 'e' is an object containing information on the file being read
        const csv = e.target.result; //csv is now equal to the target (the csv file)'s result (which is the information)
        const data = parseCSV(csv); //Parse the data (turn it into a readable format; an array)
        read_data(data); //Call another function that reads the data into the game's format (see below)
    }
    reader.readAsText(file); //Actually start reading the file (calling the above function)
})

function read_data(data) {
    ppc = parseInt(data[0]);
    mgr1_count = parseInt(data[1]);
    mgr2_count = parseInt(data[2]);
    mgr3_count = parseInt(data[3]);
    mgr4_count = parseInt(data[4]);
    mgr5_count = parseInt(data[5]);
    upgr1_count = parseInt(data[6]);
    upgr2_count = parseInt(data[7]);
    upgr3_count = parseInt(data[8]);
}

let cog = document.getElementById("settings-cog");
let settings_menu = document.getElementById("settings-menu")
cog.addEventListener('click', function() {
    this.classList.toggle('clicked');
    settings_menu.classList.toggle('hidden');
});
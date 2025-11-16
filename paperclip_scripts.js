
ppc_element = document.getElementById("paperclip");

alt_score_element = document.getElementById("alt-score");
alt_text_element = document.getElementById("bytes");

per_sec_element = document.getElementById("per_sec");

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


class Manager {
    constructor(price) {
        this.price = price;
        this.count = 0;
    }
    buy(total) {
        if (total >= this.price) {
            total -= this.price;
            this.count += 1;
            if (this.price < 3) {
                this.price += 1;
            } else {
                this.price *= 1.25;
                this.price = Math.round(this.price);
            }
            return total
        } else {
            return total
        }
}
}

class Upgrade {
    constructor(price) {
        this.price = price;
        this.count = 0;
    }
    buy(total) {
        if (total >= this.price) {
            total -= this.price;
            this.count += 1;
            if (this.price < 3) {
                this.price += (1 * this.count);
            } else {
                this.price *= 1.25;
                this.price = Math.round(this.price);
            }
            return total
        } else {
            return total
        }
}
}

const mgr1 = new Manager(10);
const mgr2 = new Manager(100);
const mgr3 = new Manager(1000);
const mgr4 = new Manager(10000);
const mgr5 = new Manager(100000);

const upgr1 = new Upgrade(50);
const upgr2 = new Upgrade(1);
const upgr3 = new Upgrade(100);

document.getElementById('manager1btn').addEventListener('click', function() {
    ppc = mgr1.buy(ppc);
    update();
})

document.getElementById('manager2btn').addEventListener('click', function() {
    ppc = mgr2.buy(ppc);
    update();
})

document.getElementById('manager3btn').addEventListener('click', function() {
    ppc = mgr3.buy(ppc);
    update();
})

document.getElementById('manager4btn').addEventListener('click', function() {
    ppc = mgr4.buy(ppc);
    update();
})

document.getElementById('manager5btn').addEventListener('click', function() {
    ppc = mgr5.buy(ppc);
    update();
})


document.getElementById('upgrade1btn').addEventListener('click', function() {
    ppc = upgr1.buy(ppc);
    update();
})
document.getElementById('upgrade2btn').addEventListener('click', function() {
    ppc = upgr2.buy(ppc);
    update();
})
document.getElementById('upgrade3btn').addEventListener('click', function() {
    ppc = upgr3.buy(ppc);
    update();
})



let ppc = 0;
let multiplier = 1;
let per_sec = 0;

let altWords = "bits";
let altScore = 0;


function update() {
    
    if (upgr1.count === 0) {
        multiplier = 1;
    } else {
        multiplier = upgr1.count + 1
    }
    if (ppc == 1) {
        altWords = " bit (b)";
        altScore = ppc;
    } else if (ppc < 8) {
        altWords = " bits (b)";
        altScore = ppc;
    } else if (ppc == 8) {
        altWords = " Byte (B)";
        altScore = Math.round(ppc / 8);
    } else if (ppc >= 8 && ppc < 8000) {
        altWords = " Bytes (B)";
        altScore = Math.round(ppc / 8);
    } else if (ppc >= 8000 && ppc <= 8000000) {
        altWords = " KiloBytes (KB)";
        altScore = Math.round(ppc / 8000);
    } else {
        altWords = " MegaBytes (MB)";
        altScore = Math.round(ppc / 8000000);
    }

    ppc_element.innerHTML = ppc;

    per_sec_element.innerHTML = per_sec;

    alt_score_element.innerHTML = altScore;
    alt_text_element.innerHTML = altWords;
    
    upgr1_element_count.innerHTML = upgr1.count;
    upgr1_element_price.innerHTML = upgr1.price;

    upgr2_element_count.innerHTML = upgr2.count;
    upgr2_element_price.innerHTML = upgr2.price;

    upgr3_element_count.innerHTML = upgr3.count;
    upgr3_element_price.innerHTML = upgr3.price;

    manager1_element_price.innerHTML = mgr1.price;
    manager1_element_count.innerHTML = mgr1.count;

    manager2_element_price.innerHTML = mgr2.price;
    manager2_element_count.innerHTML = mgr2.count;

    manager3_element_price.innerHTML = mgr3.price;
    manager3_element_count.innerHTML = mgr3.count;

    manager4_element_price.innerHTML = mgr4.price;
    manager4_element_count.innerHTML = mgr4.count;

    manager5_element_price.innerHTML = mgr5.price;
    manager5_element_count.innerHTML = mgr5.count;

}


function code_click() {
    ppc = ppc + (1 * multiplier);
    update()
}

setInterval(function auto_bits() {
    per_sec = (mgr1.count) + (mgr2.count * 2) + (mgr3.count * 10) + (mgr4.count * 25) + (mgr5.count * 10000) + (upgr3.count * 1 * multiplier);
    ppc = ppc + mgr1.count;
    ppc = ppc + (mgr2.count * 2);
    ppc = ppc + (mgr3.count * 10);
    ppc = ppc + (mgr4.count * 25);
    ppc = ppc + (mgr5.count * 10000);
    ppc = ppc + (upgr3.count * 1 * multiplier);
    update();
}, 1000);

function exporting() {
    // Seleting the data to export
    let datas = [ppc, multiplier,
        mgr1.count, mgr1.price, mgr2.count, mgr2.price, mgr3.count, 
        mgr3.price, mgr4.count, mgr4.price, mgr5.count, mgr5.price,
        upgr1.count, upgr1.price, upgr2.count, upgr2.price, upgr3.count, upgr3.price];
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
    multiplier = parseInt(data[1]);
    mgr1.count = parseInt(data[2]);
    mgr1.price = parseInt(data[3]);
    mgr2.count = parseInt(data[4]);
    mgr2.price = parseInt(data[5]);
    mgr3.count = parseInt(data[6]);
    mgr3.price = parseInt(data[7]);
    mgr4.count = parseInt(data[8]);
    mgr4.price = parseInt(data[9]);
    mgr5.count = parseInt(data[10]);
    mgr5.price = parseInt(data[11]);
    upgr1.count = parseInt(data[12]);
    upgr1.price = parseInt(data[13]);
    upgr2.count = parseInt(data[14]);
    upgr2.price = parseInt(data[15]);
    upgr3.count = parseInt(data[16]);
    upgr3.price = parseInt(data[17]);
}

let cog = document.getElementById("settings-cog");
let settings_menu = document.getElementById("settings-menu")
cog.addEventListener('click', function() {
    this.classList.toggle('clicked');
    settings_menu.classList.toggle('hidden');
});
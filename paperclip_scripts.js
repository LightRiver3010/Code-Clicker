
ppc_element = document.getElementById("paperclip");

alt_score_element = document.getElementById("alt-score");
alt_text_element = document.getElementById("bytes");

play_button_element = document.getElementById("startplay");
intro_element = document.getElementById("intro-scene");

continue_button_element = document.getElementById("continue");
outro_element = document.getElementById("outro_me");

per_sec_element = document.getElementById("per_sec");

star_won_element = document.getElementById("won-star");

upgr1_element_count = document.getElementById("upgrade1count");
upgr1_element_price = document.getElementById("upgrade1price");
upgr1_desc = document.getElementById("upgr1desc");
upgr1_quote = document.getElementById("upgr1quote");

upgr2_element_count = document.getElementById("upgrade2count");
upgr2_element_price = document.getElementById("upgrade2price");
upgr2_desc = document.getElementById("upgr2desc");
upgr2_quote = document.getElementById("upgr2quote");

upgr3_element_count = document.getElementById("upgrade3count");
upgr3_element_price = document.getElementById("upgrade3price");
upgr3_desc = document.getElementById("upgr3desc");
upgr3_quote = document.getElementById("upgr3quote");

upgr4_element_count = document.getElementById("upgrade4count");
upgr4_element_price = document.getElementById("upgrade4price");
upgr4_desc = document.getElementById("upgr4desc");
upgr4_quote = document.getElementById("upgr4quote");

upgr5_element_count = document.getElementById("upgrade5count");
upgr5_element_price = document.getElementById("upgrade5price");
upgr5_desc = document.getElementById("upgr5desc");
upgr5_quote = document.getElementById("upgr5quote");

upgr6_element_count = document.getElementById("upgrade6count");
upgr6_element_price = document.getElementById("upgrade6price");
upgr6_desc = document.getElementById("upgr6desc");
upgr6_quote = document.getElementById("upgr6quote");

upgr7_element_count = document.getElementById("upgrade7count");
upgr7_element_price = document.getElementById("upgrade7price");
upgr7_desc = document.getElementById("upgr7desc");
upgr7_quote = document.getElementById("upgr7quote");

upgr8_element_count = document.getElementById("upgrade8count");
upgr8_element_price = document.getElementById("upgrade8price");
upgr8_desc = document.getElementById("upgr8desc");
upgr8_quote = document.getElementById("upgr8quote");

upgr9_element_count = document.getElementById("upgrade9count");
upgr9_element_price = document.getElementById("upgrade9price");
upgr9_desc = document.getElementById("upgr9desc");
upgr9_quote = document.getElementById("upgr9quote");

manager1_element_price = document.getElementById("manager1price");
manager1_element_count = document.getElementById("manager1count");
manager1_element_title = document.getElementById("manager1_title");
manager1_element_desc = document.getElementById("mgr1desc");
manager1_element_quote = document.getElementById("mgr1quote");

manager2_element_price = document.getElementById("manager2price");
manager2_element_count = document.getElementById("manager2count");
manager2_element_title = document.getElementById("manager2_title");
manager2_element_desc = document.getElementById("mgr2desc");
manager2_element_quote = document.getElementById("mgr2quote");

manager3_element_price = document.getElementById("manager3price");
manager3_element_count = document.getElementById("manager3count");
manager3_element_title = document.getElementById("manager3_title");
manager3_element_desc = document.getElementById("mgr3desc");
manager3_element_quote = document.getElementById("mgr3quote");

manager4_element_price = document.getElementById("manager4price");
manager4_element_count = document.getElementById("manager4count");
manager4_element_title = document.getElementById("manager4_title");
manager4_element_desc = document.getElementById("mgr4desc");
manager4_element_quote = document.getElementById("mgr4quote");

manager5_element_price = document.getElementById("manager5price");
manager5_element_count = document.getElementById("manager5count");
manager5_element_title = document.getElementById("manager5_title");
manager5_element_desc = document.getElementById("mgr5desc");
manager5_element_quote = document.getElementById("mgr5quote");

manager6_element_price = document.getElementById("manager6price");
manager6_element_count = document.getElementById("manager6count");
manager6_element_title = document.getElementById("manager6_title");
manager6_element_desc = document.getElementById("mgr6desc");
manager6_element_quote = document.getElementById("mgr6quote");

manager7_element_price = document.getElementById("manager7price");
manager7_element_count = document.getElementById("manager7count");
manager7_element_title = document.getElementById("manager7_title");
manager7_element_desc = document.getElementById("mgr7desc");
manager7_element_quote = document.getElementById("mgr7quote");

upgrade1_element_circle = document.getElementById("auto_clicker");
upgrade2_element_circle = document.getElementById("fresh_fish");
upgrade3_element_circle = document.getElementById("raiser_mouze");
upgrade4_element_circle = document.getElementById("bit_bananas");
upgrade5_element_circle = document.getElementById("cool_hats");
upgrade6_element_circle = document.getElementById("neatcode_practice");
upgrade7_element_circle = document.getElementById("energy_drinks");
upgrade8_element_circle = document.getElementById("btx_4090");
upgrade9_element_circle = document.getElementById("deep_reasoning");

class Manager {
    constructor(price) {
        this.price = price;
        this.count = 0;
        this.title = "???";
    }
    buy(total) {
        if (total >= this.price) {
            purchase_sound.sound.currentTime = 0;
            purchase_sound.sound.play();
            total -= this.price;
            this.count += 1;
            if (this.price < 3) {
                this.price += 1;
            } else {
                this.price *= 1.15;
                this.price = Math.round(this.price);
            }
            return total;
        } else {
            return total;
        }
}
}

class Upgrade {
    constructor(price, mult, desc, quote) {
        this.price = price;
        this.count = 0;
        this.mult = mult;
        this.desc = desc;
        this.quote = quote;
    }
    buy(total) {
        if (total >= this.price) {
            purchase_sound.sound.currentTime = 0;
            purchase_sound.sound.play();
            total -= this.price;
            this.count += 1;
            this.price *= this.mult;
            this.price = Math.round(this.price);
            return total
        } else {
            return total;
        }
}
}

class Sounds {
    constructor(source) {
        this.sound = document.createElement('audio');
        this.sound.src = source;
        this.sound.style.display = "none";
        this.sound.setAttribute("preload", "auto");
        document.body.appendChild(this.sound);
    }
}

const bgm = new Sounds("assets/bgm.mp3");
bgm.sound.loop = true;
const click_sound = new Sounds ("assets/mouse_click.mp3");
const purchase_sound = new Sounds ("assets/purchase.mp3");

const mgr1 = new Manager(15);
const mgr2 = new Manager(200);
const mgr3 = new Manager(3000);
const mgr4 = new Manager(50000);
const mgr5 = new Manager(750000);
const mgr6 = new Manager(1200000);
const mgr7 = new Manager(20000000);

const upgr1 = new Upgrade(100, 3, "Buy an auto-clicker to click for you every second!", "Banned in most competitive settings...");
const upgr2 = new Upgrade(500, 4, "Make Cats work twice as hard with fresh fish!", "Meow meow...meow.");
const upgr3 = new Upgrade(2500, 5, "filler", "filler");
const upgr4 = new Upgrade(25000, 5, "filler", "filler");
const upgr5 = new Upgrade(150000, 6, "filler", "filler");
const upgr6 = new Upgrade(1000000, 8, "filler", "filler");
const upgr7 = new Upgrade(5000000, 6, "filler", "filler");
const upgr8 = new Upgrade(40000000, 6, "filler", "filler");
const upgr9 = new Upgrade(750000000, 4, "filler", "filler");

let won = false;

let one_total = 0;
let two_total = 0;
let three_total = 0;
let four_total = 0;
let five_total = 0;
let six_total = 0;
let seven_total = 0;
let auto_click = 0;
let human_total = 0;
let corp_total = 0;

let base_click = 0;

let ppc = 0;
let multiplier = 1;
let per_sec = 0;
let mgr_per_sec = 0;

let altWords = "bits";
let altScore = 0;

let default_desc = "You must buy the previous upgrade(s) first!";
let default_quote = '"..."'
let default_desc_m = "You must buy the previous manager(s) first!";
let default_title = "???";

let lastSaved = Date.now();



document.getElementById('manager1btn').addEventListener('click', function() {
    ppc = mgr1.buy(ppc);
    update();
})

document.getElementById('manager2btn').addEventListener('click', function() {
    if (mgr1.count >= 1) {
        ppc = mgr2.buy(ppc);
        update();
    } else {
        ppc = ppc;
    }
})

document.getElementById('manager3btn').addEventListener('click', function() {
    if (mgr2.count >= 1) {
        ppc = mgr3.buy(ppc);
        update();
    } else {
        ppc = ppc;
    }
})

document.getElementById('manager4btn').addEventListener('click', function() {
    if (mgr3.count >= 1) {
        ppc = mgr4.buy(ppc);
        update();
    } else {
        ppc = ppc;
    }
})

document.getElementById('manager5btn').addEventListener('click', function() {
    if (mgr4.count >= 1) {
        ppc = mgr5.buy(ppc);
        update();
    } else {
        ppc = ppc;
    }
})

document.getElementById('manager6btn').addEventListener('click', function() {
    if (mgr5.count >= 1) {
        ppc = mgr6.buy(ppc);
        update();
    } else {
        ppc = ppc;
    }
})

document.getElementById('manager7btn').addEventListener('click', function() {
    if (mgr6.count >= 1) {
        ppc = mgr7.buy(ppc);
        update();
    } else {
        ppc = ppc;
    }
})


document.getElementById('upgrade1btn').addEventListener('click', function() {
    ppc = upgr1.buy(ppc);
    update();
})
document.getElementById('upgrade2btn').addEventListener('click', function() {
    if (upgr1.count >= 1) {
        ppc = upgr2.buy(ppc);
        update();
    } else {
        ppc = ppc;
    }
})
document.getElementById('upgrade3btn').addEventListener('click', function() {
    if (upgr1.count >= 1) {
        ppc = upgr3.buy(ppc);
        update();
    } else {
        ppc = ppc;
    }
})
document.getElementById('upgrade4btn').addEventListener('click', function() {
    if (upgr3.count >= 1 && upgr2.count >= 1) {
        ppc = upgr4.buy(ppc);
        update();
    } else {
        ppc = ppc;
    }
})
document.getElementById('upgrade5btn').addEventListener('click', function() {
    if (upgr4.count >= 1) {
        ppc = upgr5.buy(ppc);
        update();
    } else {
        ppc = ppc;
    }
})
document.getElementById('upgrade6btn').addEventListener('click', function() {
    if (upgr5.count >= 1) {
        ppc = upgr6.buy(ppc);
        update();
    } else {
        ppc = ppc;
    }
})
document.getElementById('upgrade7btn').addEventListener('click', function() {
    if (upgr6.count >= 1) {
        ppc = upgr7.buy(ppc);
        update();
    } else {
        ppc = ppc;
    }
})
document.getElementById('upgrade8btn').addEventListener('click', function() {
    if (upgr6.count >= 1) {
        ppc = upgr8.buy(ppc);
        update();
    } else {
        ppc = ppc;
    }
})
document.getElementById('upgrade9btn').addEventListener('click', function() {
    if (upgr8.count >= 1 && upgr7.count >= 1) {
        ppc = upgr9.buy(ppc);
        update();
    } else {
        ppc = ppc;
    }
})

play_button_element.addEventListener('click', function() {
    intro_element.classList.add("start_over");
    bgm.sound.play();
})

continue_button_element.addEventListener('click', function() {
    outro_element.classList.remove("outro");
})


function update() {
    
    if (upgr2.count === 0) {
        multiplier = 1;
    } else {
        multiplier = upgr2.count + 1
    }
    if (ppc == 1) {
        altWords = " bit (b)";
        altScore = ppc;
    } else if (ppc < 8) {
        altWords = " bits (b)";
        altScore = ppc;
    } else if (ppc >=8 && ppc < 16) {
        altWords = " Byte (B)";
        altScore = Math.round(ppc / 8);
    } else if (ppc >= 16 && ppc < 8000) {
        altWords = " Bytes (B)";
        altScore = Math.round(ppc / 8);
    } else if (ppc >= 8000 && ppc <= 8000000) {
        altWords = " KiloBytes (KB)";
        altScore = Math.round(ppc / 8000);
    } else if (ppc > 8000000 && ppc <= 8000000000){
        altWords = " MegaBytes (MB)";
        altScore = Math.round(ppc / 8000000);
    } else if (ppc > 8000000000 && ppc <= 8000000000000){
        altWords = " Gigabytes (GB)";
        altScore = Math.round(ppc / 8000000000)
    } else {
        altWords = " Terabytes (TB)";
        altScore = Math.round(ppc / 8000000000000);
    }

    if (upgr1.count > 0) {
        upgr2.desc = "Make all Cats produce 2x bits with some fresh fish!";
        upgr2.quote= "Meow meow...meow.";
        upgr3.desc = "Make each autoclicker click provide 3x as many bits!";
        upgr3.quote = "The newest model, complete with over 13 extra buttons!";

    } else {
        upgr2.desc = default_desc;
        upgr2.quote = default_quote;
        upgr3.desc = default_desc;
        upgr3.quote = default_quote;
    }
    if (upgr3.count > 0 && upgr2.count > 0) {
        upgr4.desc = "Make Monkeys produce 2x bits with some Bit Bananas!";
        upgr4.quote = "Give a monkey a bit banana, and he'll soon begin farming them for profit...";
    } else {
        upgr4.desc = default_desc;
        upgr4.quote = default_quote;
    }
    if (upgr4.count > 0) {
        upgr5.desc = "Make hackers produce 3x bits with some Cool Hats!";
        upgr5.quote = "White hats, black hats, red hats - hackers just love hats!";
    } else {
        upgr5.desc = default_desc;
        upgr5.quote = default_quote;
    }
    if (upgr5.count > 0) {
        upgr6.desc = "Code each autoclicker to produce 10x the bits!";
        upgr6.quote = "Heavily recommended for Computer Science Internships...";
    } else {
        upgr6.desc = default_desc;
        upgr6.quote = default_quote;
    }
    if (upgr6.count > 0) {
        upgr7.desc = "Make all human workers produce 25% more bits and earn 5x more bits per click with some Energy Drinks!";
        upgr7.quote = "Warning: May cause cancer of the head, neck, spine, lungs, throat, and/or death.";
        upgr8.desc = "Boost all corporation bits by 50% with incredible new graphics cards!";
        upgr8.quote = "Playing Snake.io while slacking off has never looked so beautiful...";
    } else {
        upgr7.desc = default_desc;
        upgr7.quote = default_quote;
        upgr8.desc = default_desc;
        upgr8.quote = default_quote;
    }
    if (upgr8.count > 0 && upgr7.count > 0) {
        upgr9.desc = "Boost BitGPT's bit production by 2x with a new deep reasoning model!";
        upgr9.quote = "I think, therefore I click...";
    } else {
        upgr9.desc = default_desc;
        upgr9.quote = default_quote;
    }


    mgr1.desc = "A Cat, willing to click every once in a while... (1 bps)"
    mgr1.quote = '"Oh he can click all right. But does he want to do it for YOU?"'
    mgr1.title = "Cat";

    if (mgr1.count > 0) {
        mgr2.desc = 'A Baby, just learning how to click. (5 bps)';
        mgr2.quote = '"Let me put this in a language you can understand...Go go ga ga."';
        mgr2.title = "Baby";
        document.getElementById("manager2btn").classList.add("unlocked");
    } else {
        mgr2.desc = default_desc_m;
        mgr2.quote = default_quote;
    }
    if (mgr2.count > 0) {
        mgr3.desc = 'A Monkey, happy to mindlessly click away. (30 bps)';
        mgr3.quote = '"Why bother with code monkeys when you can have regular monkeys?"';
        mgr3.title = "Monkey";
        document.getElementById("manager3btn").classList.add("unlocked");
    } else {
        mgr3.desc = default_desc_m;
        mgr3.quote = default_quote;
    }
    if (mgr3.count > 0) {
        mgr4.desc = 'A dark-web Hacker, willing to cheat in some bits...for a price. (150 bps)';
        mgr4.quote = '"He browses using DuckDuckGo, in Ingonito Mode, with a VPN...untraceable."';
        mgr4.title = "Hacker";
        document.getElementById("manager4btn").classList.add("unlocked");
    } else {
        mgr4.desc = default_desc_m;
        mgr4.quote = default_quote;
    }
    if (mgr4.count > 0) {
        mgr5.desc = 'Invest in a new startup Bitz.io specializing in bit-mining. (1,000 bps)';
        mgr5.quote = '"Have you heard about Light-coin? It\'s the next big thing, trust me."';
        mgr5.title = "Bitz.io";
        document.getElementById("manager5btn").classList.add("unlocked");
    } else {
        mgr5.desc = default_desc_m;
        mgr5.quote = default_quote;
    }
    if (mgr5.count > 0) {
        mgr6.desc = 'Invest in a well-respected Tech Firm specializing in bit-production. (8,000 bps)';
        mgr6.quote = '"I think they said their HQ is in Ice-cream Cone Valley?"';
        mgr6.title = "Tech Firm";
        document.getElementById("manager6btn").classList.add("unlocked");
    } else {
        mgr6.desc = default_desc_m;
        mgr6.quote = default_quote;
    }
    if (mgr6.count > 0) {
        mgr7.desc = 'Buy a share of BitGPT, a revolutionary new bit-producing ML AI LLM. (50,000 bps)';
        mgr7.quote = '"You\'ve been warned not to ask it how many t\'s the word \'bit\' has."';
        mgr7.title = "BitGPT";
        document.getElementById("manager7btn").classList.add("unlocked");
    } else {
        mgr7.desc = default_desc_m;
        mgr7.quote = default_quote;
    }
    

    ppc_element.innerHTML = ppc.toLocaleString();

    per_sec_element.innerHTML = per_sec.toLocaleString();

    alt_score_element.innerHTML = altScore;
    alt_text_element.innerHTML = altWords;

    upgr1_element_count.innerHTML = upgr1.count;
    upgr1_element_price.innerHTML = upgr1.price.toLocaleString();
    upgr1_desc.innerHTML = upgr1.desc;
    upgr1_quote.innerHTML = upgr1.quote;
    upgr2_element_count.innerHTML = upgr2.count;
    upgr2_element_price.innerHTML = upgr2.price.toLocaleString();
    upgr2_quote.innerHTML = upgr2.quote;
    upgr2_desc.innerHTML = upgr2.desc;
    upgr3_element_count.innerHTML = upgr3.count;
    upgr3_element_price.innerHTML = upgr3.price.toLocaleString();
    upgr3_quote.innerHTML = upgr3.quote;
    upgr3_desc.innerHTML = upgr3.desc;
    upgr4_element_count.innerHTML = upgr4.count;
    upgr4_element_price.innerHTML = upgr4.price.toLocaleString();
    upgr4_quote.innerHTML = upgr4.quote;
    upgr4_desc.innerHTML = upgr4.desc;
    upgr5_element_count.innerHTML = upgr5.count;
    upgr5_element_price.innerHTML = upgr5.price.toLocaleString();
    upgr5_quote.innerHTML = upgr5.quote;
    upgr5_desc.innerHTML = upgr5.desc;
    upgr6_element_count.innerHTML = upgr6.count;
    upgr6_element_price.innerHTML = upgr6.price.toLocaleString();
    upgr6_quote.innerHTML = upgr6.quote;
    upgr6_desc.innerHTML = upgr6.desc;
    upgr7_element_count.innerHTML = upgr7.count;
    upgr7_element_price.innerHTML = upgr7.price.toLocaleString();
    upgr7_quote.innerHTML = upgr7.quote;
    upgr7_desc.innerHTML = upgr7.desc;
    upgr8_element_count.innerHTML = upgr8.count;
    upgr8_element_price.innerHTML = upgr8.price.toLocaleString();
    upgr8_quote.innerHTML = upgr8.quote;
    upgr8_desc.innerHTML = upgr8.desc;
    upgr9_element_count.innerHTML = upgr9.count;
    upgr9_element_price.innerHTML = upgr9.price.toLocaleString();
    upgr9_quote.innerHTML = upgr9.quote;
    upgr9_desc.innerHTML = upgr9.desc;


    manager1_element_price.innerHTML = mgr1.price.toLocaleString();
    manager1_element_count.innerHTML = mgr1.count;
    manager1_element_desc.innerHTML = mgr1.desc;
    manager1_element_quote.innerHTML = mgr1.quote
    manager1_element_title.innerHTML = mgr1.title;
    manager2_element_price.innerHTML = mgr2.price.toLocaleString();
    manager2_element_count.innerHTML = mgr2.count;
    manager2_element_desc.innerHTML = mgr2.desc;
    manager2_element_quote.innerHTML = mgr2.quote;
    manager2_element_title.innerHTML = mgr2.title;
    manager3_element_price.innerHTML = mgr3.price.toLocaleString();
    manager3_element_count.innerHTML = mgr3.count;
    manager3_element_desc.innerHTML = mgr3.desc;
    manager3_element_quote.innerHTML = mgr3.quote;
    manager3_element_title.innerHTML = mgr3.title;
    manager4_element_price.innerHTML = mgr4.price.toLocaleString();
    manager4_element_count.innerHTML = mgr4.count;
    manager4_element_desc.innerHTML = mgr4.desc;
    manager4_element_quote.innerHTML = mgr4.quote;
    manager4_element_title.innerHTML = mgr4.title;
    manager5_element_price.innerHTML = mgr5.price.toLocaleString();
    manager5_element_count.innerHTML = mgr5.count;
    manager5_element_desc.innerHTML = mgr5.desc;
    manager5_element_quote.innerHTML = mgr5.quote;
    manager5_element_title.innerHTML = mgr5.title;
    manager6_element_price.innerHTML = mgr6.price.toLocaleString();
    manager6_element_count.innerHTML = mgr6.count;
    manager6_element_desc.innerHTML = mgr6.desc;
    manager6_element_quote.innerHTML = mgr6.quote;
    manager6_element_title.innerHTML = mgr6.title;
    manager7_element_price.innerHTML = mgr7.price.toLocaleString();
    manager7_element_count.innerHTML = mgr7.count;
    manager7_element_desc.innerHTML = mgr7.desc;
    manager7_element_quote.innerHTML = mgr7.quote;
    manager7_element_title.innerHTML = mgr7.title;

    lastSaved = Date.now();

    if (upgr1.count > 0) {
        upgrade2_element_circle.classList.replace("upgrade_item_locked", "upgrade_item")
        upgrade3_element_circle.classList.replace("upgrade_item_locked", "upgrade_item")
    }
    if (upgr2.count > 0 && upgr3.count > 0) {
        upgrade4_element_circle.classList.replace("upgrade_item_locked", "upgrade_item")
    }
    if (upgr4.count > 0) {
        upgrade5_element_circle.classList.replace("upgrade_item_locked", "upgrade_item")
    }
    if (upgr5.count > 0) {
        upgrade6_element_circle.classList.replace("upgrade_item_locked", "upgrade_item")
    }
    if (upgr6.count > 0) {
        upgrade7_element_circle.classList.replace("upgrade_item_locked", "upgrade_item")
        upgrade8_element_circle.classList.replace("upgrade_item_locked", "upgrade_item")
    }
    if (upgr7.count > 0 && upgr8.count > 0) {
        upgrade9_element_circle.classList.replace("upgrade_item_locked", "upgrade_item")
    }

    if (ppc >= 8000000000000 && won === false) {
        won = true;
        outro_element.classList.add("outro");
    }
    if (won === true) {
        star_won_element.classList.remove("invisible");
    }

}


//  CHECK FOR RED TEXT (IF NOT ENOUGH DOUGH)
function red_check(price_element, total) {
    price = parseInt(price_element.textContent.replace(/,/g, ''));
    if (total >= price) {
        price_element.classList.remove("red_price");
    } else {
        price_element.classList.add("red_price");
    }
}



// AUTO BITS & AUTO SAVE
setInterval(function auto_bits() {
    one_total = (upgr2.count > 0) ? (mgr1.count * (upgr2.count*2)) : mgr1.count;
    two_total = mgr2.count;
    three_total = (upgr4.count > 0) ? (upgr4.count * 2 * mgr3.count) : mgr3.count;
    four_total = (upgr5.count > 0) ? (upgr5.count * 3 * mgr4.count) : mgr4.count;
    five_total = mgr5.count;
    six_total = mgr6.count;
    seven_total = (upgr9.count > 0) ? (upgr9.count * 2 * mgr7.count) : mgr7.count;

    human_total = (two_total * 5) + (three_total * 30) + (four_total * 150);
    human_total = (upgr7.count > 0) ? (human_total * 1.25) : human_total;
    human_total = Math.round(human_total);
    corp_total = (five_total * 1000) + (six_total * 8000);
    corp_total = (upgr8.count > 0) ? (corp_total * 2) : corp_total;

    mgr_per_sec = (one_total) + human_total + corp_total + (seven_total * 50000);

    base_click = 1 * multiplier + mgr_per_sec * 0.01;
    auto_click = upgr1.count * base_click;
    auto_click = (upgr3.count > 0) ? (auto_click * (upgr3.count * 3)) : auto_click;
    auto_click = (upgr6.count > 0) ? (auto_click * (upgr6.count * 10)) : auto_click;
    auto_click = (upgr7.count > 0) ? (auto_click * (upgr7.count * 5)) : auto_click;
    auto_click = Math.round(auto_click)

    per_sec = mgr_per_sec + auto_click;
    ppc += per_sec;

    update();

    red_check(upgr1_element_price, ppc);
    red_check(upgr2_element_price, ppc);
    red_check(upgr3_element_price, ppc);
    red_check(upgr4_element_price, ppc);
    red_check(upgr5_element_price, ppc);
    red_check(upgr6_element_price, ppc);
    red_check(upgr7_element_price, ppc);
    red_check(upgr8_element_price, ppc);
    red_check(upgr9_element_price, ppc);

    red_check(manager1_element_price, ppc);
    red_check(manager2_element_price, ppc);
    red_check(manager3_element_price, ppc);
    red_check(manager4_element_price, ppc);
    red_check(manager5_element_price, ppc);
    red_check(manager6_element_price, ppc);
    red_check(manager7_element_price, ppc);

}, 1000);

setInterval(function auto_save() {
    data = get_data();
    localStorage.setItem('clickerData', JSON.stringify(data));
    console.log("Data Saved!")
}, 1000);


// CLICKING ON THE CLICKER IMAGE
let clickImg = document.getElementById("click-box");

clickImg.addEventListener('click', function() {
    clickImg.classList.remove('clicked');
    void clickImg.offsetWidth;
    clickImg.classList.add('clicked');
    click_sound.sound.currentTime = 0;
    click_sound.sound.play();
    click_bonus = 1 * multiplier;
    click_bonus += per_sec * 0.01;
    ppc += Math.round(click_bonus);
    update();
})

clickImg.addEventListener('animationend', function() {
    clickImg.classList.remove('clicked');
})



// GAME SAVING AND LOADING
window.addEventListener('DOMContentLoaded', function() {
    loadGame();
    update();
})

function loadGame() {
    const data = localStorage.getItem('clickerData');
    if (!data) {
        return false;
    }
    const gameData = JSON.parse(data);
    read_data(gameData);
}

function get_data() {
    let datas = [ppc, multiplier,
        mgr1.count, mgr1.price, mgr2.count, mgr2.price, mgr3.count, 
        mgr3.price, mgr4.count, mgr4.price, mgr5.count, mgr5.price,
        mgr6.count, mgr6.price, mgr7.count, mgr7.price, upgr1.count, upgr1.price, 
        upgr2.count, upgr2.price, upgr3.count, upgr3.price, upgr4.count, upgr4.price,
        upgr5.count, upgr5.price, upgr6.count, upgr6.price, upgr7.count, upgr7.price,
        upgr8.count, upgr8.price, upgr9.count, upgr9.price, won];
    return datas;
}

function exporting() {
    // Seleting the data to export
    datas = get_data();
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
    mgr6.count = parseInt(data[12]);
    mgr6.price = parseInt(data[13]);
    mgr7.count = parseInt(data[14]);
    mgr7.price = parseInt(data[15]);
    
    upgr1.count = parseInt(data[16]);
    upgr1.price = parseInt(data[17]);
    upgr2.count = parseInt(data[18]);
    upgr2.price = parseInt(data[19]);
    upgr3.count = parseInt(data[20]);
    upgr3.price = parseInt(data[21]);
    upgr4.count = parseInt(data[22]);
    upgr4.price = parseInt(data[23]);
    upgr5.count = parseInt(data[24]);
    upgr5.price = parseInt(data[25]);
    upgr6.count = parseInt(data[26]);
    upgr6.price = parseInt(data[27]);
    upgr7.count = parseInt(data[28]);
    upgr7.price = parseInt(data[29]);
    upgr8.count = parseInt(data[30]);
    upgr8.price = parseInt(data[31]);
    upgr9.count = parseInt(data[32]);
    upgr9.price = parseInt(data[33]);

    won = data[34];
}

// SETTINGS TOGGLES
function gif_toggle() {
    to_change = document.getElementById("gaming-square");
    if (to_change.classList.contains('clicking-square-solid')) {
        to_change.classList.replace("clicking-square-solid", "clicking-square");

    } else {
    to_change.classList.replace("clicking-square", "clicking-square-solid");
    }
}

function reset_data() {
    window.localStorage.clear();
    location.reload();
}

let cog = document.getElementById("settings-cog");
let settings_menu = document.getElementById("settings-menu")
cog.addEventListener('click', function() {
    this.classList.toggle('clicked');
    settings_menu.classList.toggle('hidden');
});

function audio_toggle() {
    if (!bgm.sound.paused) {
        bgm.sound.pause();
    } else {
        bgm.sound.play();
    }
}
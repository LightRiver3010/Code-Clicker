# Code Clicker

A coding-based clicker game where you click to earn bits, purchase managers/upgrades to get more, and work towards earning 1 TB of storage. Built entirely on vanilla HTML, CSS, and JavaScript, made by Jimmy Savaryn.

**[Play Here!](https://game.savaryn.me/)**

## About
I made this game in a month to learn the basics of HTML, CSS, and JavaScript. It's heavily inspired by Cookie Clicker, but has plenty of unique content to enjoy, including custom art made by my very talented friends. 

The project was entirely self-paced and self-taught; no college courses or lectures, only W3Schools and freeCodeCamp. UMass Amherst doesn't cover web devleopment until later, so I decided to get a head start in learning, and this project was the most practical (and fun!) way to do so. I was able to take everything from the online lessons and apply it directly into the game, which was very satisfying.

## Major Features
- **7 Managers and 9 Upgrades —** For steady progression and lots of unlockable content
- **Auto-Save & Manual Save/Load —** For convenience and the ability to play across computers, respectively
- **Responsive Design —** So the game looks good on any type of laptop screen
- **About two hours of gameplay —** Long enough to be completed in one huge stretch or a few shorter sessions
- **Intro and Outro Cutscenes —** To mark the beginning and end of the game in a fun way

## Technical Aspects
**JavaScript**
- **ES6 Classes —** Manager, Upgrade, and Sound classes handle their respective aspects of the game
- **State Management —** 30+ variables to track prices, make text red/green depending on current bits, unlock upgrades/managers, etc.

**CSS**
- **Flexbox Layout —** Mostly the entire page utilizes flexbox for convenience of arranging elements together
- **Viewport Units —** Used after I realized pixels were not very flexible or accessible for various screen sizes

**HTML**
- **Hover Tooltips —** The hidden box associated with each manager/upgrade is really just a fancy tooltip
- **Div Elements —** Each section of the game is split into many divs, each associated with a class and/or id (taking heavy inspiration from Cookie Clicker's source code)

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript (ES6)
- localStorage API
- FileReader API

## Lessons Learned
- **Learn before building.** While it was fun to take what I learned from each online lesson into my game, but trying to learn and implement at the same time was frustrating. Instead, experimenting with new ideas first gave me a better understanding (which then made game implementation easier).
- **Game balancing is difficult.** When playing other clicker games, I hardly notice how incredibly fine-tuned their economy is. When I beat an earlier version of the game in 5 minutes, I started to realize how much of trial and error game balancing can be.

## Thanks
- **Tyler** - For his sleek bit logo
- **Sam** - For her incredible manager art
- **Mori** - For his web dev mentorship
- **W3 Schools and freeCodeCamp** - For their incredibly useful online courses

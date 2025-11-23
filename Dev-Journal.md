*DEV JOURNAL*

Nov. 23 PM -
Made some flexible progress. I added the lovely graphic created by my best friend WomboCombo for the price icons, which took a bit of thinking to organize. I also added images for each upgrade, which was a similar type of organization problem. I must say, I am getting lots of experience with putting together assortments of HTML elements. At the end, I also discovered clamp(), which seems amazing! I'll definitely have a session soon where I just go through and update all my pixel defined measurements into clamp() to make it better to view on different screen sizes. That'll remove a lot of the hard-coding headache I've been getting from switching window sizes. Anyways, the game should be done relatively soon, and I can't wait for the first release!

Nov. 22 PM -
Made some interesting progress. I made a super basic intro cutscene that plays each time you load into the game, which I think is important. I've been doing all this work on making sure the game actually works, but we still need an interesting story! I could make it so that the cutscene doesn't play each time you load the game, but I like it. It's like a reminder of what the end goal of the game is. I'll definitely update the cutscene some more to add profile pictures and maybe some emojis or something. But for now it's good. Using CSS animations isn't really that hard but it actually looks really clean. Maybe I'll find somewhere else to use them...?

Nov. 21 PM -
Made some alright progress. Yesterday, although I didn't write it here, I did some REAL important work. I finally made a Canva whiteboard with the final design, so now I know what I want the game to actually look like in its finalized state. Now, the only trouble is getting it all to look that way. I struggled a bit with aligning the upgrade boxes so that they were equally spread out. I'll have to do the same with the managers eventually too, but hopefully that won't be as challenging since I have an idea of how it works now. Anyways, the deadline of Nov. 30th is fast approaching, and I need to LOCK IN to get this game cleaned up. Still having fun working on it though!

Nov. 19 PM - 
Made some mid progress. I implemented autosaving as well as some helper functions to assist with that. I also started developing the settings menu, adding the first setting button to toggle the background GIF. Like with most HTML/CSS stuff, once I have the first instance of it down, it'll be easy to copy it for the rest. At that point, it'll just be a matter of writing the JavaScript logic. But still, necessary progress. Not super glamarous, but necessary. Still loving my game!

Nov. 18 PM - 
Made some chill progress. I got some basic implementation of the upgrade skill tree changing colors depending on what upgrades you have - I'll just have to add a lot more repetitive logic to check it all later. I also started on making it so that you can only buy upgrades if you've bought the previous ones. It's not super complicated, just lots of variables going everywhere. Still fun though! Game's looking good now.

Nov. 17 PM - 
Made some really cool progress. I started implementing the upgrade buttons. They'll correlate with the upgrades you purchase on the left, sort of like a progression. You won't be able to unlock certain upgrades until you buy others, and the "skill tree" will show you which upgrades to buy before getting others. Plus, it's a tree! Get it? Like a binary tree? Ha ha! Ha. Anyways, made some really cool progress and I'm happy with how the game's coming along. See ya!

Nov. 16 PM - 
Made some amazing progress. Not only did I turn all the upgrades/managers into class objects (yep, not using constructor functions anymore), but I also updated the bits per second and added a display to show the score in bits/bytes/kb/mb/etc. I also also improved the importing and exporting of game files, so that it actually works properly now. I won't lie, today was pretty productive. Funny how when working with the JavaScript logic it get so much easier to get stuff done...But still we love CSS and HTML. The game is starting to actually come together now, and it feels amazing. Soon I want to make a Canva whiteboard drawing of how I want it to actually look like. I'm thinking I'll go back on some of the details and make it a bit simpler, like the Classic version of Cookie Clicker (did I mention that I'm heavily inspired??). Anyways, good progress today; I'm happy for sure.

Nov. 15 PM -
Made some smart progress. Rather than declaring a million variables, I'm now learning about JavaScript Objects. I know classes also exist, but the W3 Schools course uses Objects and object method instead of classes, so that's what we're rolling with for now. It doesn't work fully yet, but I'm starting to implement it. And once I do, the game will be so much easier to develop. I mean, really, I don't have to do this. It's a pain to write out functions for upgrading and increasing the count of each manager/upgrade, but there's only so many. It would be doable to be lazy. But I'm not lazy. I'm an eager learner. So I WILL be implementing the objects instead of random variables. Because that's what I do.

Nov. 14 PM -
Made some functional progress. I sucessfully (mostly) implemented the improt and export of game data. The only problem is, I did it in a very hard-coded way, so that each file is exported and read-in individually. Obviously, this is not the way to go. Instead, I will take time tomorrow to learn how to use dictionaries (are they still called dictionaries??) in JavaScript and use those instead for importing/exporting data. It turns out that you have to actually know how to use JavaScript when creating a browser game. Who would've thunk it??

Nov. 11 PM -
Made some interesting progress. Using what I learned yesterday, I implemented a super simple settings menu. I'll add more to it in the future, but I figured that it was something that would be necessary eventually. I still have a few bugs to fix, but the project isn't looking too bad right now. It's as if each day I add another cool thing to it. It's fun! 

Nov. 10 PM - 
Made some really cool progress. I looked up how to add tooltips, and implemented them. I won't lie, this is probably the smoothest looking part of the project right now. I only have it applied to 2 of the upgrades, but it'll be simple enough to add them to all purchaseables. If there's one thing I learned today, it's that CSS isn't too difficult (at least not all the time). Meaning, it isn't super mentally-demanding to add some clean animations and a good look to the game, which is great! I just have to get the baseplate down, and it'll be fun fun fun decorating everything. I'm looking forward to that for sure!

Nov. 8 PM - 
Made some cool progress. Finally implemented some managers with interesting names (and have them work). However, as is obvious from the current state of my .js file, I need to learn how to make classes in JavaScript. Right now the code is a mess of a ton of different functions that basically do the same thing. So, in the future (the coming few days) my learning time will be spent learning how JavaScript classes work. How fun! Made some good progress today, though. Made it more like an actual click game - you can actually play and progress now!

Nov. 7 PM - 
Made some necessary progress. Didn't do a ton of fun stuff today, but fixed the prices so they actually look and work well. That was pretty much it. I added some new bonus boxes for future upgrades just to ensure they work properly; I'll have to come up with actual upgrades in the future (perhaps taking inspiration from Cookie Clicker...). Overall, not an amazingly fun day but a necessary one to refine the game. 

Nov. 6 PM -
Made some pretty cool progress. I got both buttons working in the sense that you can't buy them unless you have enough bits. The manager increases the bits per seconds (bps) by 1, and the upgrade increases clicking power by 2x. Basic stuff, but it's essential for a clicker game. The problem I'm now facing is aligning the price of each upgrade/manager. It's stuck in the bottom left of my box, and I'm not sure why. I mean, I know it's because I used span to add "Price:" before the actual variable, but it shouldn't be giving me this much trouble. Whatever, it's cool. After I figure that out, I'll add a few more managers and a bps button somewhere on the screen. Then I'll go for a few more upgrades, then I'll work on having each upgrade be linked to somewhere on the skill/binary tree. Sounds good! I'm really enjoying this project for sure, even if CSS is confusing sometimes.

Nov. 5 PM - 
Made good progress. I got the buttons working with the price of the upgrades (which'll easily translate to managers too). I also made it so that you could only buy an upgrade if you had enough bits, which can also translate very easily to the managers. Tomorrow I think I'll work on implementing managers and having them contribute to the total amount of bits every second or so. That'll be more JavaScript. But I'm proud of my work with the CSS - it certainly wasn't easy but I used some flex-wrap stuff I learned. Very fun. Good progress today! I'm sure tomorrow will be great too!

Nov. 4 PM - 
Made good progress. I met with Mori this afternoon and he explained a lot of ideas to me, which helped greatly. He didn't write all my code though; important distinction. I also did a few more freeCodeCamp lessons on flexbox so you could say I'm starting to get the hang of it. Like I said before, once this basic skeleton is done, I imagine it'll be smoother sailing. I'll just have to learn more about styling, which seems a lot more fun! I can't wait for the animations and dropdown menus...

Nov. 4 AM - 
Made some ok progress. Definitely not what I wanted to have done. I'm still grasping the idea of flex containers and how to organize elements within them. I'm starting to get it, but need some more practice to fully understand. But, once I do understand this, I'll be set for designing the rest of the layout for the game interface. And after that, it's all logic and polish! This part I'm in now is probably the hardest, which is encouraging!

Nov. 3 PM - 
Make some alright progress. I managed to get the upgrade boxes existing in the general right area, but I'm not 100% sure how it all works together. I think I'll wrap the upgrade/manager boxes inside another div or container to better control them. It's a real struggle to put HTML elements side-by-side! I'm enjoying it though, still fun.

Nov. 3 AM -
Actually made some solid progress today. I got the image up on the screen and made it clickable. CSS is starting to make a bit more sense to me now, which is awesome! I'll be working on the upgrades bar next, but I don't imagine that being too complicated. In reality, CSS isn't super critical thinking; it's kinda just knowing how to arrange stuff. Still, it's fun to learn!
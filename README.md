D3Up.com V1
====

This is the old code that was never intended to be released to the public that powers V1 of D3Up.com. I however do not have time to update V1 of D3Up, and if others wish to, they are free to issue pull requests and ask questions. If you're looking for V2 of D3Up, [you can look here](http://github.com/d3up).

I'll start by saying this project was a massive learning experience and uses a lot of code written years before D3 was even released. I look back at this code and cringe a little bit, as I'm sure we all do with experimental/learning projects. There's a lot of repeated code, some messy parts and some counter-intuitive 

My goal with open sourcing this is to have the existing site upgraded to support RoS, and then hopefully have a small community that's willing to help out or take over on V2 of the site. 

D3Up is a completely not-for-profit, the ads on the site pay for about 1/2-3/4 of the server hosting costs, and is the only reason they exist on the site. 

Open an issue, issue a pull request, or [post on the subreddit](http://reddit.com/r/d3up) if you're looking for some help with anything!

Requirements
---

- git
- Local web server (nginx example config in ./notes)
- PHP-FPM (or change the config to use other PHP types)
- MongoDB

Installation
---

1. Fork the Repository
2. `git@github.com:USERNAME/d3up.git`
3. `cd d3up`
4. `git submodule update --init`
5. Change your hosts file to point to whatever server you're running on

The Libraries
---

- library/Epic: A addon for Zend Framework to give some reusable components. This code is around 6 years old now.
- library/Shanty: A MongoDB ORM Layer
- library/D3Up: D3Up's libraries and helpers
- library/Zend: Zend Framework 1.11

Important Files
---

- `library/D3Up/Tool/Crawler.php` - The tool that accesses the D3 API to pull data down and save it into the database.
- `library/D3Up/Tool/Gems.php` - Gem data for the PHP side of the code.
- `library/D3Up/Tool/MaxStat.php` - Maximum rolls for stats per item type.
- `library/D3Up/Tool/Attributes.php` - Strings used to parse attributes and render attributes. This was developed before the API was available, so it was primarily used to do string pattern matching.
- `library/D3Up/Forms*` - Every form you see on the site currently and it's post mechanics.
- `library/D3Up/Mongo/*` - The database models.
- `library/D3Up/View/Helper/*` - ViewHelpers used to render out data in the views.
- `public_html/js/unmin/buildv2.js` - A "build" is a character; it's gear, skills, passives, class, level and all other meta data needed to inform the calculator on how to do it's job.
- `public_html/js/unmin/calcv2.js` - The 3k lines of code that powers the calculator in this version of D3Up. All of the game mechanics and math is done within this file. 
- `public_html/js/unmin/buildui.js` - A terribly written spaghetti-mess of jQuery that controls the UI elements throughout a build. Simulate, data, etc are all shown here. 
- `public_html/js/unmin/itembuilder.js` - The JS that powers the item builder/editor. 
- `public_html/js/gamedata.js` - A large JS file that contains all skills, sets, passives, gems and item affixes. 
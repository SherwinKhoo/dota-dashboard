# sei_35_p2_dotahub

Software Engineering Immersive - Project 2 - Dota Dashboard

Project: Build a functional Dota Dashboard in a week.

Dota is a series of strategy video games now developed by Valve. The series began in 2003 with the release of Defense of the Ancients, a fan-developed multiplayer online battle arena mod for the video game Warcraft III: Reign of Chaos and its expansion, The Frozen Throne.

This app will aim to be a simple dashboard for finding games from the professional scene, with potential to expand for other purposes like match analysis.

Technologies Used

1. React.js
2. CSS
3. HTML

User Interface

1. Simple interface

Prioritisation, Goal and Milestones

1. Achieve minimum viable product as soon as possible.
   Search for game ID by player. Able to copy the match id by clicking on it.
   Search for game ID by team, match list not completed because it is exactly the same as the "player" side
2. Create a heroes list. Ability to filter by heroes. Click on heroes to bring up statistics on the hero.
3. Hard code certain portions of the data once project requirements are met to reduce number of API calls.

Timeline

1. Ensure that API is working.
2. Create components.
3. Lift and prop states.
4. Add CSS.

Motivation

1. Reinforce understanding of React.JS
2. Add to portfolio

Approach Taken

1. Peruse some sites, purely for academic purposes.
   "... sites are very good at giving people what they want in the quickest way possible."
2. Peruse DotA websites for inspiration.
3. Have a page for entering the **API key** as a form of "login" credentials instead of saying it in a hidden file / folder.
4. Contain as many states as possible in one component for ease of management.
5. Lift and prop states via **useState**
6. Call a function when **onSubmit={}** is triggered to **fetch()** data from the API and/or **setState**.
7. Use **onChange={}** within an input box filter through data.
8. Use two **useEffect()** functions in conjunction with **localStorage** to save data in the browser, to minimise API calls.
9. Include a navigation bar with **custom CSS** and use **Navlink** for navigating between different **Routes**.
10. Remember to include **BrowserRouter** in index.js
11. Create custom images and hardcode them as backup should the API become unreliable when calling for hero images.

Data Structure

<App />
    <OneContainerToRuleThemAll />
        <API />
        <HeroContianer />
        <PlayerContainer />
            <PlayerSelected />
            <PlayerList />
            <PlayerProfile />
            <PlayerMatches>
        <TeamContainer />
            <TeamSelected />
            <TeamList />
            <TeamProfile />
            <TeamMatches />

Lessons Learnt

1. It is quite difficult to change the data structure once a certain threshold has been passed.

Potential Improvements

1. Add a page for match analysis.

Fair Use

1. This project is for purely academic purposes.
2. This project will not hinder the copyright owner's ability to sell the related product.
3. There are many similar projects elsewhere.

MIT License - Copyright (c) 2022 Sherwin Khoo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Reviewers
Desmond Lim | Ernest Mui | Lim Qizhen

Sources
Powered by OpenDota API | Valve | Steam

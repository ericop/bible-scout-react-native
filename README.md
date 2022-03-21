# Bible Scout app with [React Native](https://reactnative.dev/) via [Expo](https://docs.expo.dev/)
**Bible Scout: Finding your way through the scriptures one reading at a time**

The Bible Scout App was created to help you scout (to examine, seek and observe) what is in the Holy Bible. It leads you to read through the Bible using a few different reading plans, and to support hundreds of global languages. Your reading progress will be tracked only on your local device, so no accounts are needed, allowing users from around the world anonymous access to the tool in a way that protect their privacy.

## Instruction to run locally
- Follow https://docs.expo.dev/get-started/installation/ which will tell you of these requirements:
   - [Node.js LTS release](https://nodejs.org/en/)
   - [git](https://git-scm.com/)
   - [Watchman](https://facebook.github.io/watchman/docs/install#buildinstall) for macOS or Linux users
   - `npm install --global yarn` [Yarn](https://classic.yarnpkg.com/en/docs/install) is the preferred way to 
- `npm install --global expo-cli`
- `git clone` this repo
- `yarn` which install dependencies
  > ⚠  To avoid a tricky "Gotcha" conflict with yarn and npm managaging local dependencies, stick with `yarn` from here on out, so that `npm install` with its `package-lock.json` isn't at odds with yarn's `yarn.lock`
- `expo start` which will start the development server and will enable hot reload
- Press `w` to open the app in your browser (pressing [other letters will let you run on iOS or Android](https://docs.expo.dev/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet))
- Press `Ctrl+C` to cancel the the development server

## Screenshot on Android
<!-- ![Screenshot_20211118-222230_Expo Go](https://user-images.githubusercontent.com/5218249/142559656-4566201e-f34b-4a0b-9891-78336c3e95a5.jpg) -->
<img src="https://user-images.githubusercontent.com/5218249/142559656-4566201e-f34b-4a0b-9891-78336c3e95a5.jpg" width="320" />

## Work in Progress
- [x] Get it to run on Android
- [x] Complete https://docs.expo.dev/get-started/
- [x] Theme with https://callstack.github.io/react-native-paper/getting-started.html
- [x] Get basic hard-coded UI in place
- [x] Add https://docs.expo.dev/versions/latest/sdk/async-storage/#installation
- [ ] Setup State management with a Global Store https://dev.to/bytebodger/hacking-react-hooks-shared-global-state-553b
- [ ] Add https://docs.expo.dev/versions/v43.0.0/sdk/audio/#playing-sounds
- [ ] Deploy to URL and Google Play store
- [ ] Allow resetting your reading progress 
- [ ] Add other languages (Spanish, French, Mandarin, etc. )
- [ ] Have Audio span multiple chapters
- [ ] Upgrade to new API to allow audio of part of a chapter
- [ ] Convert state management to [meiosis and mergerino](http://meiosis.js.org/tutorial/05-meiosis-with-mergerino.html)
- [ ] Fix service work PWA to only suggest updates when new version is ready (falsely says new version is ready on first load)
- [ ] Add additional reading plans (https://biblestudytogether.com/top-best-bible-reading-plans/)
  - [ ] [Book-at-a-Time Bible Reading Plan](https://www.navigators.org/resource/bible-reading-plans/)
  - [ ] [5x5x5 New Testament Bible Reading Plan](https://www.navigators.org/resource/bible-reading-plans/) 
  - [ ] [Robert Murray M’Cheyne Bible Reading Plan](https://www.crossway.org/articles/download-a-free-bible-reading-plan-for-2017/)
  - [ ] 5 Day Bible Reading Program
  - [ ] [Chronologically Thematic One Year Reading Plan](https://treasureinthebible.com/UndatedThematicallyChronologicalBible%20ReadingPlanRevised2012-11-13.pdf)
  - [ ] (Crossways Chronological Bible Reading Plan](https://www.crossway.org/articles/download-a-free-bible-reading-plan-for-2017/)
- [ ] Partner with others to make visual ? (https://visualunit.me/)

## Reading Plans
The Discipleship Journal Bible Reading Plan

Our first reading plan, [The Discipleship Journal Bible Reading Plan](https://www.navigators.org/wp-content/uploads/2017/04/Discipleship-Journal-Bible-Reading-Plan-9781617479083.pdf) takes you on a special journey through the Bible.

- Every day the readings come from four different sections of Scripture, keeping things fresh with diverse view points allowing you to go broad and deep.
For example, the reading for Day 1 includes:
   1. [Law And Prophets] Genesis 1-2
   1. [Wisdom] Psalms 1
   1. [Gospels] Matthew 1:1-17
   1. [Epistles] Acts 1:1-11

- This plan follows a monthly cycle with only 25 scheduled reading days. We all miss days, each month you have days built in to catch up.

- If you finish the month’s readings with all your free days left, you can loop back to memorize a key chapter you like, dig deeper on passages that challenged or intrigued you, or consider building these activities into Sundays next month.

- If reading through the entire Bible in one year looms big, break it down as needed, like picking "Wisdom" and "Epistles" this year, and next year tackling "Gospels" and "Law and Prophets".

- [Further reasons](https://www.desiringgod.org/interviews/a-new-year-a-new-bible-reading-plan) why you might consider The Discipleship Journal Bible Reading Plan, as laid out by John Piper

## Special Thanks
To [Digital Bible Platform](https://www.digitalbibleplatform.com/about) for partnering with this app and giving us access to the Bible in text and audio formats.
To [DJ Bible Reading Plan](https://play.google.com/store/apps/details?id=huss.john.djbible&hl=en_US) which inspired this app to carry on its legacy.
To [NavPress](https://www.navigators.org/resource/bible-reading-plans) for their generous Fair-Use Permissions that allow reference to their reading plans.##

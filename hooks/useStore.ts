import { set } from 'react-native-reanimated';
import create from 'zustand';

let increment = () => {
    // if (isPlayingAudio) {
    //     pauseAudio()
    // }
    // isDoneChecked = false
    // justChecked = false

    // let shouldGoForwardAMonth = readingDay === 25 && readingMonth < 12
    // let shouldStartNewYear = readingDay === 25 && readingMonth === 12

    // if (shouldGoForwardAMonth) {
    //     readingMonth++
    //     readingDay = 1
    // } else if (shouldStartNewYear) {
    //     readingDay = 1
    //     readingMonth = 1
    // } else {
    //     readingDay++
    // }

    // setInitialData()
    // preFetchNextReadingMedia()
}


// https://github.com/pmndrs/zustand#first-create-a-store
const useStore = create((set, get) => ({
    "lawAndProphets": {month:1,day:1},
    wisdom: {month:1,day:1},
    gospels: {month:1,day:1},
    epistles: {month:1,day:1},
    colorTheme: 'dark',
    fontSize: 'medium',
    isPlayingAudio: false,
    pickColorTheme: () => set(state => ({colorTheme: state.colorTheme})),
    pickFontSize: () => set(state => ({fontSize: state.fontSize})),
    incrementCurrentReadingCategory: (readingCategory: string) => set(state => ({readingCategory: {month: state[readingCategory].month, day: state[readingCategory].day + 1}})
    incrementToNextReadingCategory:  (readingCategory: string) => set((state) => ({
        //let readingCategory = m.route.get().split('/')[1]
        //incrementLocalStoreOnly()
    
            switch (readingCategory) {
                case 'lawAndProphets':
                    //m.route.set('/wisdom')
                    break
                case 'wisdom':
                // m.route.set('/gospels')
                    break
                case 'gospels':
                    //m.route.set('/epistles')
                    break
                case 'epistles':
                    //m.route.set('/home')
                    break
            }
        }
}))

export default useStore;
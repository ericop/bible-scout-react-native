import axios from 'axios'
import * as DiscipleshipJournalReadingPlanData from '../../constants/discipleship-journal-plan.data'

export const BibleMediaService = () => {
    let djPlan: any = DiscipleshipJournalReadingPlanData
    let baseUrl = 'https://dbt.io'
    let azureCodeKey = 'UCgA0aEhZUMUtOmZV3WORgpB9EaJ05qLHJZV6EKPu/Ito84LKpLKsg=='
    let azureUrl = 'https://httpbiblereadingpalrequest.azurewebsites.net/api/v2'
    let awsApiKey = 'Genesis1-2InTheBeginningGodCreated'
    let awsUrl = 'https://dcu73qiiyi.execute-api.us-east-2.amazonaws.com/default/bible-scout-proxy/?'
    let readingCategory = ''
    let audioBibleVersion = 'ENGESVO1DA' // TODO should be '' and https://reactnavigation.org/docs/use-navigation-state
    let textBibleVersion = 'ENGESVO1ET' // TODO should be ''

    let initialReadingProgress = { month: 1, day: 1 }

    var oninit = () => {
        // TODO change to use https://reactnavigation.org/docs/use-navigation-state
        readingCategory = 'law-and-prophets' //m.route.get().split('/')[1]
        switch (readingCategory) {
            case 'law-and-prophets':
            case 'wisdom':
                audioBibleVersion = 'ENGESVO1DA'
                textBibleVersion = 'ENGESVO1ET'
                break
            case 'gospels':
            case 'epistles':
                audioBibleVersion = 'ENGESVN1DA'
                textBibleVersion = 'ENGESVN1ET'
                break
        }
    }

    // let fetchText = (bibleVerse: string, book: string, verseString: string) => {
    //     isLoading = true
    //     text = []

    //     bibleService.getText(bibleVerse, book, verseString).then(data => {
    //         console.log('data', data)
    //         text = data.flat().map(item => {
    //             return { chapter: item.chapter_id, verseNum: item.verse_id, text: item.verse_text, paragraphNum: item.paragraph_number }
    //         })
    //         isLoading = false
    //     })
    // }

    const verseIntoPieces = (verseString: string) => {
        /* all formats:
         *  a) `1` single chapter
         *  b) `2-4` chapter range
         *  c) `5:6-10` single chapter with verse range
        */
        var lastChapter = ''

        // handles a) and c)
        var [firstChapter, firstVerse, lastVerse] = verseString.split(new RegExp('[-:]', 'g'))

        // handles b) chapter range
        if (firstVerse && !lastVerse) {
            lastChapter = firstVerse
            firstVerse = ''
        }

        return {
            firstChapter: Number(firstChapter),
            firstVerse: Number(firstVerse),
            lastVerse: Number(lastVerse),
            lastChapter: Number(lastChapter)
        }
    }

    const buildTextDataObject = (bibleVersion: string, book: string, chapter: string, firstVerse?: string, lastVerse?: string) => {
        var requestBody: any = {
            reply: 'json',
            v: '2',
            dam_id: bibleVersion,
            book_id: book,
            chapter_id: chapter
        }
        if (firstVerse) {
            requestBody.verse_start = firstVerse
        }
        if (lastVerse) {
            requestBody.verse_end = lastVerse
        }

        return requestBody
    }

    return {
        // getReadingProgress: (readingCategory: string) => {
        // TODO replace localStorage with https://github.com/react-native-async-storage/async-storage
        //     let readingProgress = JSON.parse(localStorage.getItem(readingCategory))
        //     //console.log('get readingProgress', readingCategory, readingProgress)
        //     let hasMissingValues = !(readingProgress && Object.values(readingProgress).every(prop => prop))

        //     if (hasMissingValues) {
        //         readingProgress = initialReadingProgress
        //         localStorage.setItem(readingCategory, JSON.stringify(initialReadingProgress))
        //     }

        //     return readingProgress
        // },

        setReadingProgress: function (readingCategory: string, month: number, day: number) {
            let readingProgress = { month: month, day: day }
            localStorage.setItem(readingCategory, JSON.stringify(readingProgress))
        },

        getTextAxios: (bibleVersion: string, book: string, verseString: string) => {
            var verseObj = verseIntoPieces(verseString)
            var urlText = `${baseUrl}/text/verse?reply=json&v=2&dam_id=${bibleVersion}&book_id=${book}&chapter_id=${verseObj.firstChapter}${verseObj.firstVerse ? '&verse_start=' + verseObj.firstVerse : ''}${verseObj.lastVerse ? '&verse_end=' + verseObj.lastVerse : ''}`
            console.log('urlText:', urlText)
            // single chapter
            if (!verseObj.lastChapter) {
                // var dataReq = buildTextDataObject(bibleVersion, book, verseObj.firstChapter, verseObj.firstVerse, verseObj.lastVerse)
                // console.log('dataReq', dataReq)

                var req = axios({url: awsUrl + new URLSearchParams({urlText: urlText}),
                    method: 'GET',
                    headers: { "x-api-key": awsApiKey}
                })

                return req
            }

            var chapters = []
            for (let index = verseObj.firstChapter; index <= verseObj.lastChapter; index++) {
                chapters.push(index)
            }

            var promiseArray: any[] = [];
            // console.log('chaps', chapters)
            chapters.forEach(chapter => {
                var req = axios({url: awsUrl + new URLSearchParams({urlText: `${baseUrl}/text/verse?reply=json&v=2&dam_id=${bibleVersion}&book_id=${book}&chapter_id=${chapter}`}),
                    method: 'GET',
                    headers: { "x-api-key": awsApiKey}
                })

                promiseArray.push(req)
            })
            return Promise.all(promiseArray)

        },

        getText: (bibleVersion: string, book: string, verseString: string) => {
            var verseObj = verseIntoPieces(verseString)
            var urlText = `${baseUrl}/text/verse?reply=json&v=2&dam_id=${bibleVersion}&book_id=${book}&chapter_id=${verseObj.firstChapter}${verseObj.firstVerse ? '&verse_start=' + verseObj.firstVerse : ''}${verseObj.lastVerse ? '&verse_end=' + verseObj.lastVerse : ''}`
            console.log('urlText:', urlText)
            // single chapter
            if (!verseObj.lastChapter) {
                // var dataReq = buildTextDataObject(bibleVersion, book, verseObj.firstChapter, verseObj.firstVerse, verseObj.lastVerse)
                // console.log('dataReq', dataReq)

                var req =  axios({url: awsUrl + new URLSearchParams({urlText: urlText}),
                    method: 'GET',
                    headers: { "x-api-key": awsApiKey}
                })

                return req
            }

            var chapters = []
            for (let index = verseObj.firstChapter; index <= verseObj.lastChapter; index++) {
                chapters.push(index)
            }

            var promiseArray: any[] = [];
            // console.log('chaps', chapters)
            chapters.forEach(chapter => {
                var req =  axios({url: awsUrl + new URLSearchParams({urlText: `${baseUrl}/text/verse?reply=json&v=2&dam_id=${bibleVersion}&book_id=${book}&chapter_id=${chapter}`}),
                    method: 'GET',
                    headers: { "x-api-key": awsApiKey}
                })

                promiseArray.push(req)
            })
            return Promise.all(promiseArray)

        },

        getDiscipleShipJournalVerse: (month: string, day: string, type: string) => {
            //console.log('getDiscipleShipJournalVerse', month, day, type)
            return djPlan.months.find((m: any) => m.monthNum === month).readings.find((v: any) => v.day === day && v.type === type)
        },

        getAudioFile: (httpUrl: string) => `${azureUrl}?urlText=${encodeURIComponent(httpUrl)}&code=${encodeURIComponent(azureCodeKey)}`,

        getAudioServerPath: () => {
            var req =  axios({url: awsUrl + new URLSearchParams({urlText: `${baseUrl}/audio/location?protocol=http&reply=json&v=2`}),
                method: 'GET',
                headers: { "x-api-key": awsApiKey}
            })

            return req
        },

        getAudioPath: (bibleVersion: string, book: string, verseString: string) => {
            //console.log('book help', book)
            //console.log('verseString', verseString)
            var verseObj = verseIntoPieces(verseString)
            //console.log('verseObj', verseObj)
            // for now ignore verseString, just pulling back first chapter
            var req =  axios({url: awsUrl + new URLSearchParams({urlText: `${baseUrl}/audio/path?dam_id=${bibleVersion}&book_id=${book}&v=2&chapter_id=${verseObj.firstChapter}`}),
                method: 'GET',
                headers: { "x-api-key": awsApiKey}
            })

            return req
        },

        clearCachedTextAndAudio: () => {

        }
    }
}
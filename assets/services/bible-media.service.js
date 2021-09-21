import {DiscipleshipJournalReadingPlanData} from '../constants/discipleship-journal-plan.data.js'

export const BibleMediaService = () => {
    let djPlan = DiscipleshipJournalReadingPlanData
    let baseUrl = 'https://dbt.io'
    let azureCodeKey = 'UCgA0aEhZUMUtOmZV3WORgpB9EaJ05qLHJZV6EKPu/Ito84LKpLKsg=='
    let azureUrl = 'https://httpbiblereadingpalrequest.azurewebsites.net/api/v2'
    let awsApiKey = 'Genesis1-2InTheBeginningGodCreated'
    let awsUrl = 'https://dcu73qiiyi.execute-api.us-east-2.amazonaws.com/default/bible-scout-proxy'
    let readingCategory = ''
    let audioBibleVersion = ''
    let textBibleVersion = ''

    let initialReadingProgress = { month: 1, day: 1 }

    var oninit = () => {
        readingCategory = m.route.get().split('/')[1]
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

    let fetchText = (bibleVerse, book, verseString) => {
        isLoading = true
        text = []

        bibleService.getText(bibleVerse, book, verseString).then(data => {
            console.log('data', data)
            text = data.flat().map(item => {
                return { chapter: item.chapter_id, verseNum: item.verse_id, text: item.verse_text, paragraphNum: item.paragraph_number }
            })
            isLoading = false
        })
    }

    const verseIntoPieces = (verseString) => {
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

    const buildTextDataObject = (bibleVersion, book, chapter, firstVerse, lastVerse) => {
        var requestBody = {
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
        getReadingProgress: (readingCategory) => {
            let readingProgress = JSON.parse(localStorage.getItem(readingCategory))
            //console.log('get readingProgress', readingCategory, readingProgress)
            let hasMissingValues = !(readingProgress && Object.values(readingProgress).every(prop => prop))

            if (hasMissingValues) {
                readingProgress = initialReadingProgress
                localStorage.setItem(readingCategory, JSON.stringify(initialReadingProgress))
            }

            return readingProgress
        },

        setReadingProgress: function (readingCategory, month, day) {
            let readingProgress = { month: month, day: day }
            localStorage.setItem(readingCategory, JSON.stringify(readingProgress))
        },

        getText: (bibleVersion, book, verseString) => {
            var verseObj = verseIntoPieces(verseString)
            var urlText = `${baseUrl}/text/verse?reply=json&v=2&dam_id=${bibleVersion}&book_id=${book}&chapter_id=${verseObj.firstChapter}${verseObj.firstVerse ? '&verse_start=' + verseObj.firstVerse : ''}${verseObj.lastVerse ? '&verse_end=' + verseObj.lastVerse : ''}`
            console.log('urlText:', urlText)
            // single chapter
            if (!verseObj.lastChapter) {
                // var dataReq = buildTextDataObject(bibleVersion, book, verseObj.firstChapter, verseObj.firstVerse, verseObj.lastVerse)
                // console.log('dataReq', dataReq)

                return m.request({
                    method: 'GET',
                    headers: { "x-api-key": awsApiKey},
                    params: { urlText: urlText},
                    url: awsUrl
                })
            }

            var chapters = []
            for (let index = verseObj.firstChapter; index <= verseObj.lastChapter; index++) {
                chapters.push(index)
            }

            var promiseArray = [];
            // console.log('chaps', chapters)
            chapters.forEach(chapter => {
                promiseArray.push(m.request({
                    method: 'GET',
                    headers: { "x-api-key": awsApiKey},
                    url: awsUrl,
                    params: {
                        urlText: `${baseUrl}/text/verse?reply=json&v=2&dam_id=${bibleVersion}&book_id=${book}&chapter_id=${chapter}`
                    }
                }))
            })
            return Promise.all(promiseArray)

        },

        getDiscipleShipJournalVerse: (month, day, type) => {
            //console.log('getDiscipleShipJournalVerse', month, day, type)
            return djPlan.months.find(m => m.monthNum === month).readings.find(v => v.day === day && v.type === type)
        },

        getAudioFile: (httpUrl) => `${azureUrl}?urlText=${encodeURIComponent(httpUrl)}&code=${encodeURIComponent(azureCodeKey)}`,

        getAudioServerPath: () => {

            return m.request({
                method: 'GET',
                headers: { "x-api-key": awsApiKey},
                url: awsUrl,
                params: {
                    urlText: `${baseUrl}/audio/location?protocol=http&reply=json&v=2`
                }
            })
        },

        getAudioPath: (bibleVersion, book, verseString) => {
            //console.log('book help', book)
            //console.log('verseString', verseString)
            var verseObj = verseIntoPieces(verseString)
            //console.log('verseObj', verseObj)
            // for now ignore verseString, just pulling back first chapter
            return m.request({
                method: 'GET',
                headers: { "x-api-key": awsApiKey},
                url: awsUrl,
                params: {
                    urlText: `${baseUrl}/audio/path?dam_id=${bibleVersion}&book_id=${book}&v=2&chapter_id=${verseObj.firstChapter}`
                }
            })
        },

        clearCachedTextAndAudio: () => {

        }
    }
}
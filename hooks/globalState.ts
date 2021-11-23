type GlobalState = {
    readingProgress: () => {
        getReadingProgress: (readingCategory: string) => any,
        updateReadingProgress: (readingCategory: string, month: number, day: number) => any,
        incrementReadingByCategory: (readingCategory: string) => any,
        decrementReadingByCategory: (readingCategory: string) => any,
        nextReadingCategory: readingCategory: string() => any
    }
  };


export default {} as GlobalState;
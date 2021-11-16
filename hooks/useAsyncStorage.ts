import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState, useCallback } from 'react'

// reference https://github.com/react-native-async-storage/async-storage/issues/32#issuecomment-515045118
const useStoredState = <T>(
    key: string,
    defaultValue: T,
): [T, (newValue: T) => void, boolean] => {
    const [state, setState] = useState({
        synced: false,
        storageValue: defaultValue,
    })
    const { synced, storageValue } = state

    useEffect(() => {
        const pullFromStorage = async () => {
            let value = defaultValue
            try {
                const fromStorage = await AsyncStorage.getItem(key)
                if (fromStorage) {
                    value = JSON.parse(fromStorage)
                }
            } catch (e) {
                console.error(`Could not read from storage for key '${key}''.`, e)
            }

            return value
        }
        pullFromStorage().then((value) => {
            setState({ synced: true, storageValue: value })
        })

        // We don't want to update when the defaultValue changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key])

    const updateStorage = useCallback(
        async (newValue: T) => {
            setState({ synced: true, storageValue: newValue })
            const stringifiedValue = JSON.stringify(newValue)
            await AsyncStorage.setItem(key, stringifiedValue)
        },
        [key],
    )

    return [storageValue, updateStorage, synced]
}

export default useStoredState
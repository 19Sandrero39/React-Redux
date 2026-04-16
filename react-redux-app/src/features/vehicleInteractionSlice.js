import {createSlice} from '@reduxjs/toolkit'

const STORAGE_KEY = 'vehicleInteractions'

const savedInteractions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}

const saveToLocalStorage = (state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

const getVehicleState = (state, vehicleId) => {
    if (!state[vehicleId]) {
        state[vehicleId] = {
            likes: 0,
            isFavorite: false,
            ratings: []
        }
    }

    return state[vehicleId]
}

const vehicleInteractionSlice = createSlice({
    name: 'vehicleInteractions',
    initialState: savedInteractions,
    reducers: {
        addLike: (state, action) => {
            const vehicle = getVehicleState(state, action.payload)
            vehicle.likes += 1
            saveToLocalStorage(state)
        },
        removeLike: (state, action) => {
            const vehicle = getVehicleState(state, action.payload)
            vehicle.likes = Math.max(0, vehicle.likes - 1)
            saveToLocalStorage(state)
        },
        addFavorite: (state, action) => {
            const vehicle = getVehicleState(state, action.payload)
            vehicle.isFavorite = true
            saveToLocalStorage(state)
        },
        removeFavorite: (state, action) => {
            const vehicle = getVehicleState(state, action.payload)
            vehicle.isFavorite = false
            saveToLocalStorage(state)
        },
        addRating: (state, action) => {
            const {vehicleId, rating} = action.payload
            const vehicle = getVehicleState(state, vehicleId)
            vehicle.ratings.push(rating)
            saveToLocalStorage(state)
        },
        updateRating: (state, action) => {
            const {vehicleId, index, rating} = action.payload
            const vehicle = getVehicleState(state, vehicleId)

            if (vehicle.ratings[index] !== undefined) {
                vehicle.ratings[index] = rating
                saveToLocalStorage(state)
            }
        },
        deleteRating: (state, action) => {
            const {vehicleId, index} = action.payload
            const vehicle = getVehicleState(state, vehicleId)

            if (vehicle.ratings[index] !== undefined) {
                vehicle.ratings.splice(index, 1)
                saveToLocalStorage(state)
            }
        }
    }
})

export const {
    addLike,
    removeLike,
    addFavorite,
    removeFavorite,
    addRating,
    updateRating,
    deleteRating
} = vehicleInteractionSlice.actions

export default vehicleInteractionSlice.reducer

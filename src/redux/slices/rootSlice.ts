import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        title: 'Pound Cake',
        cuisine: "American",
        course: "Dessert",
        servings: 12
    },
    reducers: {
        chooseTitle: (state, action) => { state.title = action.payload},
        chooseCuisine: (state, action) => { state.cuisine = action.payload},
        chooseCourse: (state, action) => { state.course = action.payload},
        chooseServings: (state, action) => { state.servings = action.payload}
    }
})


export const reducer = rootSlice.reducer;
export const { 
    chooseTitle,
    chooseCuisine,
    chooseCourse,
    chooseServings } = rootSlice.actions;
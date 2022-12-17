import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { 
    chooseTitle,
    chooseCuisine,
    chooseCourse,
    chooseServings } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface RecipeFormProps {
    id?:string;
    data?:{}
}

interface RecipeState {
    title: string;
    cuisine: string;
    course: string;
    servings: number;
}

export const RecipeForm = (props:RecipeFormProps) => {

    const dispatch = useDispatch();
    let { recipeData, getData } = useGetData();
    const store = useStore()

    //const title = useSelector<SearchState>(state => state.title)
    //const cuisine = useSelector<SearchState>(state => state.cuisine)
    //const course = useSelector<SearchState>(state => state.course)
    //const servings = useSelector<SearchState>(state => state.servings)

    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            
            console.log(`Updated:${data} ${props.id}`)
            let Data = await serverCalls.recipeSearch()
            let title = Data.recipes[0].title
            let cuisine = Data.recipes[0].cuisines[0]
            let course = Data.recipes[0].dishTypes[0]
            let servings = Data.recipes[0].servings

            dispatch(chooseTitle(title))
            dispatch(chooseCuisine(cuisine))
            dispatch(chooseCourse(course))
            dispatch(chooseServings(servings))

            console.log(title)
            console.log(cuisine)
            console.log(course)
            console.log(servings)

            await serverCalls.update(props.id!, store.getState())

            window.location.reload()
            event.target.reset()

        } else {

            let Data = await serverCalls.recipeSearch()
            let title = Data.recipes[0].title
            let cuisine = Data.recipes[0].cuisines[0]
            let course = Data.recipes[0].dishTypes[0]
            let servings = Data.recipes[0].servings

            dispatch(chooseTitle(title))
            dispatch(chooseCuisine(cuisine))
            dispatch(chooseCourse(course))
            dispatch(chooseServings(servings))

            console.log(title)
            console.log(cuisine)
            console.log(course)
            console.log(servings)

            console.log(store.getState())
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }


    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="try_random"> Looking for a Random Recipe? </label>
                    <Input {...register('try_random')} name='try_random' placeholder='Just Type Yes... ' />
                </div>                
                <Button type='submit'>Get it Now!</Button>
            </form>
        </div>
    )
}

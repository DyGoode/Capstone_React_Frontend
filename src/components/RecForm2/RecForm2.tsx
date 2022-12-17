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

interface RecForm2Props {
    id?:string;
    data?:{}
}

interface Rec2State {
    title: string;
    cuisine: string;
    course: string;
    servings: number;
}

export const RecForm2 = (props:RecForm2Props) => {

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
            
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset()

        } else {

            dispatch(chooseTitle(data.title))
            dispatch(chooseCuisine(data.cuisine))
            dispatch(chooseCourse(data.course))
            dispatch(chooseServings(data.servings))

            console.log(store.getState())
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }
    
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">Recipe Title</label>
                    <Input {...register('title')} name="title" placeholder='Title' />
                </div>

                <div>
                    <label htmlFor="cuisine">Cuisine</label>
                    <Input {...register('cuisine')} name="cuisine" placeholder="Cuisine"/>
                </div>

                <div>
                    <label htmlFor="Course">Course</label>
                    <Input {...register('course')} name="course" placeholder="Course"/>
                </div>

                <div>
                    <label htmlFor="servings">Servings</label>
                    <Input {...register('servings')} name="servings" placeholder="Servings"/>
                </div>                
                <Button type='submit'>Submit!</Button>
            </form>
        </div>
    )
}
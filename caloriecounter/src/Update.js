import * as R from 'ramda'

const MSGS = {
    SHOW_FORM: 'SHOW_FORM',
    MEAL_INPUT: 'MEAL_INPUT',
    CALORIE_INPUT: 'CALORIE_INPUT',
    SAVE_MEAL:'SAVE_MEAL',
    DELETE_MEAL:'DELETE_MEAL',
    EDIT_MEAL:'EDIT_MEAL'
}


export function showFromMsg(showForm){
    return {
        type: MSGS.SHOW_FORM,
        showForm
    }
}

export function mealInputMessage(description){
    return {
        type: MSGS.MEAL_INPUT,
        description
    }
}

export const saveMealMsg = { type: 'SAVE_MEAL' }

export function editMealMsg(id){
        return {
            editId:id,
            type:MSGS.EDIT_MEAL
        }
}


export function caloriesInputMessage(calories){
    return {
        type: MSGS.CALORIE_INPUT,
        calories
    }
}

export function deleteMeal(id){
    return {
        type: MSGS.DELETE_MEAL,
        editId:id
    }
}

function update(msg, model){
    switch (msg.type){
        case MSGS.SHOW_FORM: {
            const { showForm } = msg
            return {...model, showForm, description: '', calories: 0}
        }
        case MSGS.MEAL_INPUT: {
            const { description } = msg
            return {...model, description}
        }
        case MSGS.CALORIE_INPUT: {
            const  calories =  R.pipe(
                parseInt,
                R.defaultTo(0)
            )(msg.calories)
            return {...model, calories}
        }
        case MSGS.SAVE_MEAL: {
            const { editId } = model;
            const updatedModel = editId !==null ? edit(msg,model) : add(msg,model)
            return updatedModel
        }
        case MSGS.DELETE_MEAL: {
            const { id } = msg
            const meals = R.filter(meal=>meal.id !== id,model.meals)
            return { ...model, meals};
        }
        case MSGS.EDIT_MEAL: {
            const { editId } = msg
            const meal = R.find(meal=>meal.id == editId,model.meals)
            
            const { description, calories} = meal;
            return {
                ...model,
                editId,
                description,
                calories,
                showFromMsg: true
            }
        }
    }
    return model;
}



function add(msg,model){
    const { nextId, description, calories } = model;
    const meal = { id: nextId, description, calories} 
    const meals = [...model.meals, meal]
    return {
        ...model,
        meals,
        nextId: nextId + 1,
        description: '',
        calories:0,
        showFromMsg:false
    }
}

function edit(msg,model){
    const {description,calories,editId} = model;
    const meals = R.map(meal=>{
        if(meal.id === editId){
            return {...meal, description, calories}
        }
        return meal
    },model.meals)

    return {
        ...model,
        meals,
        description:'',
        calories:0,
        showFromMsg:false,
        editId:null
    }
}

export default update;
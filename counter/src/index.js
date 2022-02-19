import hh from 'hyperscript-helpers';
import { h, diff, patch} from 'virtual-dom'
import createElement from 'virtual-dom/create-element'

const { div,button } =  hh(h)

const initModel = 0

function view(model,dispatch){
    return div(
        [
            div({className:'mv2'}, `Counter:- ${model}`),
            button({className:'pv1 ph2 mr2',onclick: () => dispatch('plus')} ,'+'),
            button({className:'pv1 ph2',onclick: () => dispatch('minus')},'-'),
        ]
    )
}

function update(msg,model){
    switch (msg) {
        case 'plus':
            return model + 1 
        case 'minus':
            return model - 1 
        default:
            return model
    }
}


// Impure Code 
function app(initModel,update,view,node){
    let model  = initModel
    let currentView = view(model,dispatch)
    let rootNode = createElement(currentView)
    node.appendChild(rootNode)

    function dispatch(msg){
        model  = update(msg,model)
        const updatedView = view(model,dispatch)
        const patches = diff(currentView,updatedView)
        rootNode = patch(rootNode,patches)
        currentView = updatedView
    }
}

const rootNode = document.getElementById('app')
app(initModel,update,view,rootNode)
// rootNode.appendChild(view(update('plus',initModel)))
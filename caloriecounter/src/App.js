import { diff, patch} from 'virtual-dom'
import createElement from 'virtual-dom/create-element'


function app(initModel,update,view,node){
    console.log(initModel)
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

export default app;
import view from './View'
import update from './Update'
import app from "./App";
import initModel from "./Model";

const node = document.getElementById('app')

app(initModel,update,view,node)

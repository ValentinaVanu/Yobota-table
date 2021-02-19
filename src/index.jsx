import React from 'react'
import { render } from 'react-dom'
import { App } from './component/app'
import './index.css'

const here = document.getElementById('app')

const app = <App />
render(app, here)

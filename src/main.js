import Vue from 'vue'
import App from './App'
import VueRouter from 'VueRouter'

import Index from './components/Index'
import AreaChart from './components/AreaChart'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import GroupBarChart from './components/GroupBarChart'
import ScatterPlot from './components/ScatterPlot'
import DonutChart from './components/DonutChart'

Vue.use(VueRouter)
const router = new VueRouter()

router.map({
  '/': {
    component: Index
  },
  '/area-chart': {
    component: AreaChart
  },
  '/line-chart': {
    component: LineChart
  },
  '/bar-chart': {
    component: BarChart
  },
  '/group-bar-chart': {
    component: GroupBarChart
  },
  '/scatter-plot': {
    component: ScatterPlot
  },
  '/donut-chart': {
    component: DonutChart
  }
})

router.start(App, 'app')

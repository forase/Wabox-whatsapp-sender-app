import { createApp } from 'vue'
import App from './App.vue'
import router from './.core/router'
import './app.css';

import Handsontable from 'handsontable/base';

import {
  registerCellType,
  NumericCellType,
} from 'handsontable/cellTypes';

import {
  registerPlugin,
  UndoRedo,
} from 'handsontable/plugins';

registerCellType(NumericCellType);
registerPlugin(UndoRedo);

createApp(App).use(router).mount('#app') //

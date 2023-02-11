// import libraries and resources
import '98.css';
import './main.css';
import './navigation.css';
import './todo.css';
import './popup.css';

// import functions
import { initDragMainFrame } from './dragWindow';
import { initMainButtons } from './mainbuttons';
import { initNavigation } from './navigation';

initDragMainFrame();
initMainButtons();
initNavigation();

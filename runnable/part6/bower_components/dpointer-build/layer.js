define("dpointer/events",["./handlers/features","./handlers/utils","./handlers/touch","./handlers/mouse","./handlers/features!mspointer-events?./handlers/mspointer"],function(a,b,c,d,e){"use strict";function f(a){var c=document.createElement("style"),d=b.TouchAction.ATTR_NAME;c.textContent="["+d+"='none']  { "+a+": none; }["+d+"='auto']  { "+a+": auto; }["+d+"='pan-x'] { "+a+": pan-x; }["+d+"='pan-y'] { "+a+": pan-y; }["+d+"='pan-x pan-y'],["+a+"='pan-y pan-x'] { "+a+": pan-x pan-y; }",document.head.insertBefore(c,document.head.firstChild)}var g={_targetElement:null};return g.enable=function(b){b=b||window.document,this._targetElement||(a("pointer-events")||(a("mspointer-events")?e.registerHandlers(b):a("touch-events")&&a("touch-device")?c.registerHandlers(b):d.registerHandlers(b)),this._targetElement=b)},g.disable=function(){this._targetElement&&(c.deregisterHandlers(this._targetElement),d.deregisterHandlers(this._targetElement),e&&e.deregisterHandlers(this._targetElement)),this._targetElement=null},g.setTouchAction=function(a,c){a.setAttribute(b.TouchAction.ATTR_NAME,c)},g.setPointerCapture=function(b,e){return this._targetElement?a("pointer-events")?b.setPointerCapture(e):a("mspointer-events")?b.msSetPointerCapture(e):1===e?d.setPointerCapture(b):c.setPointerCapture(b,e):!1},g.releasePointerCapture=function(b,e){return this._targetElement?a("pointer-events")?b.releasePointerCapture(e):a("mspointer-events")?b.msReleasePointerCapture(e):1===e?d.releasePointerCapture(b):c.releasePointerCapture(b,e):!1},a("pointer-events")&&f("touch-action"),a("mspointer-events")&&f("-ms-touch-action"),a("css-touch-action")?f("touch-action"):a("css-ms-touch-action")&&f("-ms-touch-action"),g.enable(),g}),define("dpointer/handlers/features",["requirejs-dplugins/has"],function(a){return"undefined"!=typeof document&&(a.add("touch-events","ontouchstart"in document),a.add("pointer-events","onpointerdown"in document),a.add("mspointer-events","onmspointerdown"in document),a.add("touch-device",/(mobile)|(android)/i.test(navigator.userAgent)),a.add("css-touch-action","touchAction"in document.body.style),a.add("css-ms-touch-action","msTouchAction"in document.body.style)),a}),define("dpointer/handlers/mouse",["./utils"],function(a){"use strict";function b(b){j.update(b),a.dispatchEvent(b.target,g(a.events.DOWN,b,{}));var c=window.getComputedStyle(b.target).overflow;!c||"auto"!==c&&"scroll"!==c||(i=!0,a.dispatchEvent(b.target,g(a.events.CANCEL,b,{})))}function c(b){i||(a.dispatchEvent(j.identifyTarget(b.target),g(a.events.MOVE,b,{})),j.update(b))}function d(b){i||j.hasCapture()||(b.relatedTarget&&(a.dispatchEvent(b.target,g(a.events.OUT,b,{})),a.dispatchLeaveEvents(b.target,b.relatedTarget,g(a.events.LEAVE,b))),j.update(b))}function e(b){i||j.hasCapture()||(b.relatedTarget&&(a.dispatchEvent(b.target,g(a.events.OVER,b,{})),a.dispatchEnterEvents(b.target,b.relatedTarget,g(a.events.ENTER,b))),j.update(b))}function f(b){i?i=!1:(a.dispatchEvent(j.identifyTarget(b.target),g(a.events.UP,b,{})),j.implicitReleaseCapture(),j.update(b))}function g(b,c,d){d=d||{},d.screenX=c.screenX,d.screenY=c.screenY,d.clientX=c.clientX,d.clientY=c.clientY,d.ctrlKey=c.ctrlKey,d.altKey=c.altKey,d.shiftKey=c.shiftKey,d.metaKey=c.metaKey,d.pageX=c.pageX,d.pageY=c.pageY;var e=c.button,f=void 0!==c.buttons?c.buttons:a.which2buttons(c.which);return"mousemove"===c.type&&(e=-1),d.button=e,d.buttons=f,d.which=e+1,d.relatedTarget=j.hasCapture()?null:c.relatedTarget,d.pointerId=1,d.pointerType="mouse",d.isPrimary=!0,new a.Pointer(b,c,d)}var h={mousedown:"mousedown",mousemove:"mousemove",mouseout:"mouseout",mouseover:"mouseover",mouseup:"mouseup"},i=!1,j={_lastNativeEvent:null,_captureTarget:null,register:function(){},update:function(a){this._lastNativeEvent=a},setCapture:function(b){if(!this._lastNativeEvent)throw"InvalidPointerId";return 0===this._lastNativeEvent.buttons?!1:(this._captureTarget=b,a.dispatchEvent(this._lastNativeEvent.target,g(a.events.GOTCAPTURE,this._lastNativeEvent,{})),!0)},hasCapture:function(){return!!this._captureTarget},identifyTarget:function(a){return this._captureTarget||a},releaseCapture:function(b,c){if(!this._lastNativeEvent)throw"InvalidPointerId";return c||this._captureTarget===b?(this._captureTarget&&(a.dispatchEvent(this._captureTarget,g(a.events.LOSTCAPTURE,this._lastNativeEvent,{})),this._captureTarget=null),!0):!1},implicitReleaseCapture:function(){return this.releaseCapture(null,!0)}};return{registerHandlers:function(g){g=g||window.document,a.addEventListener(g,h.mousedown,b,!0),a.addEventListener(g,h.mousemove,c,!0),a.addEventListener(g,h.mouseout,d,!0),a.addEventListener(g,h.mouseover,e,!0),a.addEventListener(g,h.mouseup,f,!0)},deregisterHandlers:function(g){a.removeEventListener(g,h.mousedown,b,!0),a.removeEventListener(g,h.mousemove,c,!0),a.removeEventListener(g,h.mouseout,d,!0),a.removeEventListener(g,h.mouseover,e,!0),a.removeEventListener(g,h.mouseup,f,!0)},setPointerCapture:function(a){return j.setCapture(a)},releasePointerCapture:function(a){return j.releaseCapture(a,!1)}}}),define("dpointer/handlers/mspointer",["./utils"],function(a){"use strict";function b(b){a.dispatchEvent(b.target,j(a.events.DOWN,b,{}))}function c(b){a.dispatchEvent(b.target,j(a.events.MOVE,b,{}))}function d(b){a.dispatchEvent(b.target,j(a.events.UP,b,{}))}function e(b){a.dispatchEvent(b.target,j(a.events.OUT,b,{})),a.dispatchLeaveEvents(b.target,b.relatedTarget,j(a.events.LEAVE,b))}function f(b){a.dispatchEvent(b.target,j(a.events.OVER,b,{})),a.dispatchEnterEvents(b.target,b.relatedTarget,j(a.events.ENTER,b))}function g(b){a.dispatchEvent(b.target,j(a.events.CANCEL,b,{}))}function h(b){a.dispatchEvent(b.target,j(a.events.GOTCAPTURE,b,{}))}function i(b){a.dispatchEvent(b.target,j(a.events.LOSTCAPTURE,b,{}))}function j(b,c,d){return d=d||{},d.detail=c.detail,d.screenX=c.screenX,d.screenY=c.screenY,d.clientX=c.clientX,d.clientY=c.clientY,d.ctrlKey=c.ctrlKey,d.altKey=c.altKey,d.shiftKey=c.shiftKey,d.metaKey=c.metaKey,d.button=c.button,d.buttons=c.buttons,d.relatedTarget=c.relatedTarget,d.pointerId=c.pointerId,d.width=c.width,d.height=c.height,d.pressure=c.pressure,d.tiltX=c.tiltX,d.tiltY=c.tiltY,d.pointerType=k(c.pointerType),d.hwTimestamp=c.hwTimestamp,d.isPrimary=c.isPrimary,-1===d.button&&"touch"===d.pointerType&&(d.buttons=1),new a.Pointer(b,c,d)}function k(a){switch(a){case 2:return"touch";case 3:return"pen";case 4:return"mouse";default:return a}}var l={MSPointerDown:"MSPointerDown",MSPointerMove:"MSPointerMove",MSPointerUp:"MSPointerUp",MSPointerOut:"MSPointerOut",MSPointerOver:"MSPointerOver",MSPointerCancel:"MSPointerCancel",MSGotPointerCapture:"MSGotPointerCapture",MSLostPointerCapture:"MSLostPointerCapture"};return{registerHandlers:function(j){j=j||window.document,a.addEventListener(j,l.MSPointerDown,b,!0),a.addEventListener(j,l.MSPointerMove,c,!0),a.addEventListener(j,l.MSPointerUp,d,!0),a.addEventListener(j,l.MSPointerOut,e,!0),a.addEventListener(j,l.MSPointerOver,f,!0),a.addEventListener(j,l.MSPointerCancel,g,!0),a.addEventListener(j,l.MSGotPointerCapture,h,!0),a.addEventListener(j,l.MSLostPointerCapture,i,!0)},deregisterHandlers:function(j){a.removeEventListener(j,l.MSPointerDown,b,!0),a.removeEventListener(j,l.MSPointerMove,c,!0),a.removeEventListener(j,l.MSPointerUp,d,!0),a.removeEventListener(j,l.MSPointerOut,e,!0),a.removeEventListener(j,l.MSPointerOver,f,!0),a.removeEventListener(j,l.MSPointerCancel,g,!0),a.removeEventListener(j,l.MSGotPointerCapture,h,!0),a.removeEventListener(j,l.MSLostPointerCapture,i,!0)}}}),define("dpointer/handlers/touch",["./features","./touchTracker","./utils"],function(a,b,c){"use strict";function d(a){for(var d,e,f,g=a.changedTouches.length,i=0;g>i;i++)if(d=a.changedTouches.item(i),e=null,f=l(d.target),b.hasPrimary()&&f===c.TouchAction.AUTO){var j=b.getPrimaryTouchEvent(),m=b.getPrimaryTouch();e=b.identifyPrimaryTouchTarget(m.target),c.dispatchEvent(e,h(c.events.OUT,j,m,{})),c.dispatchEvent(e,h(c.events.CANCEL,j,m,{})),k(m.identifier),b.unregister(m.identifier)}else f!==c.TouchAction.AUTO&&n.isEligible(d.target)&&a.preventDefault(),b.register(d.identifier,f,d),b.update(d,a,d.target),c.dispatchEvent(d.target,h(c.events.OVER,a,d,{})),c.dispatchEvent(d.target,h(c.events.DOWN,a,d,{}))}function e(d){for(var e,f=d.changedTouches.length,g=0;f>g;g++){if(e=d.changedTouches.item(g),!b.isActive(e.identifier))return;if(b.updateScroll(e),b.isTouchActionEnforced(e.identifier)){var i=b.getTouchEvent(e.identifier).type;switch(i){case m.touchstart:c.dispatchEvent(e.target,h(c.events.OUT,d,e,{})),c.dispatchEvent(e.target,h(c.events.CANCEL,d,e,{}));break;case m.touchmove:}k(e.identifier),b.unregister(e.identifier)}else{var l=b.identifyTouchTarget(e.identifier,j(e)),n=b.getTargetElement(e.identifier);l!==n?(c.dispatchEvent(n,h(c.events.OUT,d,e,{relatedTarget:l})),c.dispatchLeaveEvents(n,l,h(c.events.LEAVE,d,e,{relatedTarget:l})),c.dispatchEvent(l,h(c.events.MOVE,d,e,{})),c.dispatchEvent(l,h(c.events.OVER,d,e,{relatedTarget:n})),c.dispatchEnterEvents(l,n,h(c.events.ENTER,d,e,{relatedTarget:n}))):c.dispatchEvent(l,h(c.events.MOVE,d,e,{})),b.update(e,d,l),a("css-touch-action")||d.preventDefault()}}}function f(a){for(var d,e=a.changedTouches.length,f=0;e>f;f++){if(d=a.changedTouches.item(f),!b.isActive(d.identifier))return;var g=b.getTouchEvent(d.identifier).type,l=j(d)||d.target,n=b.identifyTouchTarget(d.identifier,l);if(b.isTouchActionEnforced(d.identifier))switch(g){case m.touchmove:break;case m.touchstart:c.dispatchEvent(n,h(c.events.MOVE,a,d,{})),c.dispatchEvent(n,h(c.events.UP,a,d,{})),c.dispatchEvent(n,h(c.events.OUT,a,d,{}))}else switch(g){case m.touchstart:c.dispatchEvent(n,h(c.events.MOVE,a,d,{})),c.dispatchEvent(n,h(c.events.UP,a,d,{})),i(n,d),c.dispatchEvent(n,h(c.events.OUT,a,d,{}));break;case m.touchmove:c.dispatchEvent(n,h(c.events.UP,a,d,{})),l===d.target&&i(n,d),c.dispatchEvent(n,h(c.events.OUT,a,d,{}))}k(d.identifier),b.unregister(d.identifier)}}function g(a){for(var d,e=a.changedTouches.length,f=0;e>f;f++){if(d=a.changedTouches.item(f),!b.isActive(d.identifier))return;c.dispatchEvent(b.identifyTouchTarget(d.identifier,j(d)),h(c.events.CANCEL,a,d,{})),k(d.identifier),b.unregister(d.identifier)}}function h(a,d,e,f){return f=f||{},f.screenX=e.screenX,f.screenY=e.screenY,f.clientX=e.clientX,f.clientY=e.clientY,f.ctrlKey=d.ctrlKey,f.altKey=d.altKey,f.shiftKey=d.shiftKey,f.metaKey=d.metaKey,f.pageX=e.pageX,f.pageY=e.pageY,b.hasCapture(e.identifier)&&(f.relatedTarget=null),f.button=a===c.events.MOVE?-1:0,f.buttons=1,f.which=f.button+1,f.pointerId=e.identifier+2,f.pointerType="touch",f.isPrimary=b.isPrimary(e.identifier),new c.Pointer(a,d,f)}function i(a,d){b.isPrimary(d.identifier)&&(c.dispatchEvent(a,c.createSyntheticClick(d)),n.isEligible(a)?(c.dispatchEvent(a,c.createSyntheticClick(d,!0)),n.hasFirstClick=!1):(n.hasFirstClick=!0,n.lastClickTS=(new Date).getTime(),n.targetElement=a))}function j(a){return a.target.ownerDocument.elementFromPoint(a.clientX,a.clientY)}function k(a,d){return b.releaseCapture(a,d)?(c.dispatchEvent(b.getLastTouch(a).target,h(c.events.LOSTCAPTURE,b.getTouchEvent(a),b.getLastTouch(a),{})),!0):!1}function l(a){var b=c.TouchAction.AUTO;do switch(a.getAttribute&&a.getAttribute(c.TouchAction.ATTR_NAME)){case"auto":b|=c.TouchAction.AUTO;break;case"pan-x":b|=c.TouchAction.PAN_X;break;case"pan-y":b|=c.TouchAction.PAN_Y;break;case"none":b|=c.TouchAction.NONE}while(b!==c.TouchAction.NONE&&(a=a.parentNode));return b}var m={touchstart:"touchstart",touchmove:"touchmove",touchend:"touchend",touchcancel:"touchcancel"},n={TAP_DELAY:250,lastClickTS:0,hasFirstClick:!1,targetElement:null,isEligible:function(a){return this.hasFirstClick&&this.targetElement===a&&(new Date).getTime()-this.lastClickTS<this.TAP_DELAY}};return{registerHandlers:function(a){a=a||window.document,c.addEventListener(a,m.touchstart,d,!0),c.addEventListener(a,m.touchmove,e,!0),c.addEventListener(a,m.touchend,f,!0),c.addEventListener(a,m.touchcancel,g,!0)},deregisterHandlers:function(a){c.removeEventListener(a,m.touchstart,d,!0),c.removeEventListener(a,m.touchmove,e,!0),c.removeEventListener(a,m.touchend,f,!0),c.removeEventListener(a,m.touchcancel,g,!0)},setPointerCapture:function(a,d){var e=d-2;return b.setCapture(e,a),c.dispatchEvent(b.getLastTouch(e).target,h(c.events.GOTCAPTURE,b.getTouchEvent(e),b.getLastTouch(e),{})),!0},releasePointerCapture:function(a,b){return k(b-2,a)},determineTouchAction:function(a){return l(a)}}}),define("dpointer/handlers/touchTracker",["./utils"],function(a){"use strict";var b=function(b,c,d){this.touchAction=b,this.lastNativeEvent=null,this.lastTouch=null,this.capturedTarget=null,this.lastTargetElement=null,this.firstMove={startX:c,startY:d},this.enforceTouchAction=b===a.TouchAction.AUTO},c=-1,d={},e=function(a,b,c,d){return Math.abs(c-a)/Math.abs(d-b)>.7};return{register:function(a,e,f){-1===c&&(c=a),d[a]=new b(e,f.pageX,f.pageY)},unregister:function(a){return c===a&&(c=-1),delete d[a]},update:function(a,b,c){d[a.identifier].lastTouch=a,d[a.identifier].lastNativeEvent=b,d[a.identifier].lastTargetElement=c},isActive:function(a){return a in d},isPrimary:function(a){return a===c},getTouchAction:function(a){return d[a].touchAction},updateScroll:function(b){if(d[b.identifier].firstMove){var c=d[b.identifier];c.touchAction===a.TouchAction.PAN_Y?c.enforceTouchAction=e(c.firstMove.startY,c.firstMove.startX,b.pageY,b.pageX):c.touchAction===a.TouchAction.PAN_X&&(c.enforceTouchAction=e(c.firstMove.startX,c.firstMove.startY,b.pageX,b.pageY)),c.firstMove=!1}},isTouchActionEnforced:function(a){return d[a].enforceTouchAction},getLastTouch:function(a){return d[a].lastTouch},getTargetElement:function(a){return d[a].lastTargetElement},getTouchEvent:function(a){return d[a].lastNativeEvent},hasPrimary:function(){return-1!==c},getPrimaryTouchEvent:function(){return d[c].lastNativeEvent},getPrimaryTouch:function(){return d[c].lastTouch},identifyTouchTarget:function(a,b){return d[a]&&d[a].capturedTarget||b},identifyPrimaryTouchTarget:function(a){return this.identifyTouchTarget(c,a)},hasCapture:function(a){return!!d[a].capturedTarget},setCapture:function(a,b){if(!this.isActive(a))throw new Error("InvalidPointerId");d[a].capturedTarget=b},releaseCapture:function(a,b){if(!this.isActive(a))throw new Error("InvalidPointerId");return b&&b!==d[a].capturedTarget?!1:d[a].capturedTarget?(d[a].capturedTarget=null,!0):!1}}}),define("dpointer/handlers/utils",[],function(){"use strict";function a(a,b){b.pressure=b.pressure||(b.buttons?.5:0);var c={};return Object.keys(d).forEach(function(c){this[c]=c in a?{get:function(){return b[c]||d[c]}}:{value:b[c]||d[c]}},c),Object.defineProperties(a,c),a}function b(a,b){if(a.type!==c.GOTCAPTURE&&a.type!==c.LOSTCAPTURE){if(a.bubbles){var d=a.stopPropagation;if(a.stopPropagation=function(){b.stopPropagation(),d.apply(this)},a.stopImmediatePropagation){var f=a.stopImmediatePropagation;a.stopImmediatePropagation=function(){b.stopImmediatePropagation(),f.apply(this)}}}if(e[a.type].cancelable){var g=a.preventDefault;a.preventDefault=function(){b.preventDefault(),g.apply(this)}}}}var c={events:{DOWN:"pointerdown",UP:"pointerup",CANCEL:"pointercancel",MOVE:"pointermove",OVER:"pointerover",OUT:"pointerout",ENTER:"pointerenter",LEAVE:"pointerleave",GOTCAPTURE:"gotpointercapture",LOSTCAPTURE:"lostpointercapture"},TouchAction:{ATTR_NAME:"touch-action",AUTO:0,PAN_X:1,PAN_Y:2,NONE:3}},d={screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,button:0,relatedTarget:null,which:0,pageX:0,pageY:0,buttons:0,pointerId:0,width:0,height:0,pressure:0,tiltX:0,tiltY:0,pointerType:"",isPrimary:!1},e={pointerover:{bubbles:!0,cancelable:!0},pointerenter:{bubbles:!1,cancelable:!1},pointerdown:{bubbles:!0,cancelable:!0},pointermove:{bubbles:!0,cancelable:!0},pointerup:{bubbles:!0,cancelable:!0},pointercancel:{bubbles:!0,cancelable:!1},pointerout:{bubbles:!0,cancelable:!0},pointerleave:{bubbles:!1,cancelable:!1},gotpointercapture:{bubbles:!0,cancelable:!1},lostpointercapture:{bubbles:!0,cancelable:!1}},f=function(){try{return a(document.createEvent("UIEvent"),{}),!0}catch(b){return d.view=null,d.detail=0,!1}}();return c.Pointer=function(c,d,g){var h;return g.bubbles=e[c].bubbles,g.cancelable=e[c].cancelable,f?(h=document.createEvent("UIEvent"),h.initUIEvent(c,g.bubbles,g.cancelable,d.view||null,d.detail||0)):(h=document.createEvent("Event"),h.initEvent(c,g.bubbles,g.cancelable),g.view=d.view||null,g.detail=d.detail||0),a(h,g),b(h,d),h},c.createSyntheticClick=function(a,b){var c=document.createEvent("MouseEvents");return void 0===c.isTrusted&&Object.defineProperty(c,"isTrusted",{value:!1,enumerable:!0,writable:!1,configurable:!1}),c.initMouseEvent(b?"dblclick":"click",!0,!0,a.view,b?2:1,a.screenX,a.screenY,a.clientX,a.clientY,a.ctrlKey,a.altKey,a.shiftKey,a.metaKey,0,null),c},c.isNativeClickEvent=function(a){return void 0===a.isTrusted||a.isTrusted},c.which2buttons=function(a){switch(a){case 0:return 0;case 1:return 1;case 2:return 4;case 3:return 2;default:return Math.pow(2,a-1)}},c.addEventListener=function(a,b,c,d){a.addEventListener(b,c,d)},c.removeEventListener=function(a,b,c,d){a.removeEventListener(b,c,d)},c.dispatchEvent=function(a,b){if(!a)return!1;if(!a.dispatchEvent)throw new Error("dispatchEvent not supported on targetElement");return a.dispatchEvent(b)},c.dispatchLeaveEvents=function(a,b,c){return null==a||null==b||a===b||16&a.compareDocumentPosition(b)?!0:this.dispatchEvent(a,c)&&this.dispatchLeaveEvents(a.parentNode,b,c)},c.dispatchEnterEvents=function(a,b,c){return null==a||null==b||a===b||16&a.compareDocumentPosition(b)?!0:this.dispatchEnterEvents(a.parentNode,b,c)&&this.dispatchEvent(a,c)},c});
//# sourceMappingURL=layer.map
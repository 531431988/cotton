(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-e1340b6a"],{"0a6d":function(t,e,i){i("e4d1"),i("7f72")},2325:function(t,e,i){var n=i("6d8b"),a=i("607d"),o=i("2306"),s=i("88b3"),r=i("7dcf"),l=i("3842"),d=i("f934"),h=i("ef6a"),u=o.Rect,c=l.linearMap,g=l.asc,f=n.bind,p=n.each,x=["line","bar","candlestick","scatter"],v=r.extend({type:"dataZoom.slider",init:function(t,e){this._displayables={},this._orient,this._range,this._handleEnds,this._size,this._handleWidth,this._handleHeight,this._location,this._dragging,this._dataShadowInfo,this.api=e},render:function(t,e,i,n){v.superApply(this,"render",arguments),s.createOrUpdate(this,"_dispatchZoomAction",this.dataZoomModel.get("throttle"),"fixRate"),this._orient=t.get("orient"),!1!==this.dataZoomModel.get("show")?(n&&"dataZoom"===n.type&&n.from===this.uid||this._buildView(),this._updateView()):this.group.removeAll()},remove:function(){v.superApply(this,"remove",arguments),s.clear(this,"_dispatchZoomAction")},dispose:function(){v.superApply(this,"dispose",arguments),s.clear(this,"_dispatchZoomAction")},_buildView:function(){var t=this.group;t.removeAll(),this._resetLocation(),this._resetInterval();var e=this._displayables.barGroup=new o.Group;this._renderBackground(),this._renderHandle(),this._renderDataShadow(),t.add(e),this._positionGroup()},_resetLocation:function(){var t=this.dataZoomModel,e=this.api,i=this._findCoordRect(),a={width:e.getWidth(),height:e.getHeight()},o="horizontal"===this._orient?{right:a.width-i.x-i.width,top:a.height-30-7,width:i.width,height:30}:{right:7,top:i.y,width:30,height:i.height},s=d.getLayoutParams(t.option);n.each(["right","top","width","height"],(function(t){"ph"===s[t]&&(s[t]=o[t])}));var r=d.getLayoutRect(s,a,t.padding);this._location={x:r.x,y:r.y},this._size=[r.width,r.height],"vertical"===this._orient&&this._size.reverse()},_positionGroup:function(){var t=this.group,e=this._location,i=this._orient,n=this.dataZoomModel.getFirstTargetAxisModel(),a=n&&n.get("inverse"),o=this._displayables.barGroup,s=(this._dataShadowInfo||{}).otherAxisInverse;o.attr("horizontal"!==i||a?"horizontal"===i&&a?{scale:s?[-1,1]:[-1,-1]}:"vertical"!==i||a?{scale:s?[-1,-1]:[-1,1],rotation:Math.PI/2}:{scale:s?[1,-1]:[1,1],rotation:Math.PI/2}:{scale:s?[1,1]:[1,-1]});var r=t.getBoundingRect([o]);t.attr("position",[e.x-r.x,e.y-r.y])},_getViewExtent:function(){return[0,this._size[0]]},_renderBackground:function(){var t=this.dataZoomModel,e=this._size,i=this._displayables.barGroup;i.add(new u({silent:!0,shape:{x:0,y:0,width:e[0],height:e[1]},style:{fill:t.get("backgroundColor")},z2:-40})),i.add(new u({shape:{x:0,y:0,width:e[0],height:e[1]},style:{fill:"transparent"},z2:0,onclick:n.bind(this._onClickPanelClick,this)}))},_renderDataShadow:function(){var t=this._dataShadowInfo=this._prepareDataShadowInfo();if(t){var e=this._size,i=t.series,a=i.getRawData(),s=i.getShadowDim?i.getShadowDim():t.otherDim;if(null!=s){var r=a.getDataExtent(s),l=.3*(r[1]-r[0]);r=[r[0]-l,r[1]+l];var d,h=[0,e[1]],u=[0,e[0]],g=[[e[0],0],[0,0]],f=[],p=u[1]/(a.count()-1),x=0,v=Math.round(a.count()/e[0]);a.each([s],(function(t,e){if(v>0&&e%v)x+=p;else{var i=null==t||isNaN(t)||""===t,n=i?0:c(t,r,h,!0);i&&!d&&e?(g.push([g[g.length-1][0],0]),f.push([f[f.length-1][0],0])):!i&&d&&(g.push([x,0]),f.push([x,0])),g.push([x,n]),f.push([x,n]),x+=p,d=i}}));var m=this.dataZoomModel;this._displayables.barGroup.add(new o.Polygon({shape:{points:g},style:n.defaults({fill:m.get("dataBackgroundColor")},m.getModel("dataBackground.areaStyle").getAreaStyle()),silent:!0,z2:-20})),this._displayables.barGroup.add(new o.Polyline({shape:{points:f},style:m.getModel("dataBackground.lineStyle").getLineStyle(),silent:!0,z2:-19}))}}},_prepareDataShadowInfo:function(){var t=this.dataZoomModel,e=t.get("showDataShadow");if(!1!==e){var i,a=this.ecModel;return t.eachTargetAxis((function(o,s){var r=t.getAxisProxy(o.name,s).getTargetSeriesModels();n.each(r,(function(t){if(!(i||!0!==e&&n.indexOf(x,t.get("type"))<0)){var r,l=a.getComponent(o.axis,s).axis,d={x:"y",y:"x",radius:"angle",angle:"radius"}[o.name],h=t.coordinateSystem;null!=d&&h.getOtherAxis&&(r=h.getOtherAxis(l).inverse),d=t.getData().mapDimension(d),i={thisAxis:l,series:t,thisDim:o.name,otherDim:d,otherAxisInverse:r}}}),this)}),this),i}},_renderHandle:function(){var t=this._displayables,e=t.handles=[],i=t.handleLabels=[],n=this._displayables.barGroup,a=this._size,s=this.dataZoomModel;n.add(t.filler=new u({draggable:!0,cursor:m(this._orient),drift:f(this._onDragMove,this,"all"),ondragstart:f(this._showDataInfo,this,!0),ondragend:f(this._onDragEnd,this),onmouseover:f(this._showDataInfo,this,!0),onmouseout:f(this._showDataInfo,this,!1),style:{fill:s.get("fillerColor"),textPosition:"inside"}})),n.add(new u({silent:!0,subPixelOptimize:!0,shape:{x:0,y:0,width:a[0],height:a[1]},style:{stroke:s.get("dataBackgroundColor")||s.get("borderColor"),lineWidth:1,fill:"rgba(0,0,0,0)"}})),p([0,1],(function(t){var a=o.createIcon(s.get("handleIcon"),{cursor:m(this._orient),draggable:!0,drift:f(this._onDragMove,this,t),ondragend:f(this._onDragEnd,this),onmouseover:f(this._showDataInfo,this,!0),onmouseout:f(this._showDataInfo,this,!1)},{x:-1,y:0,width:2,height:2}),r=a.getBoundingRect();this._handleHeight=l.parsePercent(s.get("handleSize"),this._size[1]),this._handleWidth=r.width/r.height*this._handleHeight,a.setStyle(s.getModel("handleStyle").getItemStyle());var d=s.get("handleColor");null!=d&&(a.style.fill=d),n.add(e[t]=a);var h=s.textStyleModel;this.group.add(i[t]=new o.Text({silent:!0,invisible:!0,style:{x:0,y:0,text:"",textVerticalAlign:"middle",textAlign:"center",textFill:h.getTextColor(),textFont:h.getFont()},z2:10}))}),this)},_resetInterval:function(){var t=this._range=this.dataZoomModel.getPercentRange(),e=this._getViewExtent();this._handleEnds=[c(t[0],[0,100],e,!0),c(t[1],[0,100],e,!0)]},_updateInterval:function(t,e){var i=this.dataZoomModel,n=this._handleEnds,a=this._getViewExtent(),o=i.findRepresentativeAxisProxy().getMinMaxSpan(),s=[0,100];h(e,n,a,i.get("zoomLock")?"all":t,null!=o.minSpan?c(o.minSpan,s,a,!0):null,null!=o.maxSpan?c(o.maxSpan,s,a,!0):null);var r=this._range,l=this._range=g([c(n[0],a,s,!0),c(n[1],a,s,!0)]);return!r||r[0]!==l[0]||r[1]!==l[1]},_updateView:function(t){var e=this._displayables,i=this._handleEnds,n=g(i.slice()),a=this._size;p([0,1],(function(t){var n=e.handles[t],o=this._handleHeight;n.attr({scale:[o/2,o/2],position:[i[t],a[1]/2-o/2]})}),this),e.filler.setShape({x:n[0],y:0,width:n[1]-n[0],height:a[1]}),this._updateDataInfo(t)},_updateDataInfo:function(t){var e=this.dataZoomModel,i=this._displayables,n=i.handleLabels,a=this._orient,s=["",""];if(e.get("showDetail")){var r=e.findRepresentativeAxisProxy();if(r){var l=r.getAxisModel().axis,d=this._range,h=t?r.calculateDataWindow({start:d[0],end:d[1]}).valueWindow:r.getDataValueWindow();s=[this._formatLabel(h[0],l),this._formatLabel(h[1],l)]}}var u=g(this._handleEnds.slice());function c(t){var e=o.getTransform(i.handles[t].parent,this.group),r=o.transformDirection(0===t?"right":"left",e),l=this._handleWidth/2+5,d=o.applyTransform([u[t]+(0===t?-l:l),this._size[1]/2],e);n[t].setStyle({x:d[0],y:d[1],textVerticalAlign:"horizontal"===a?"middle":r,textAlign:"horizontal"===a?r:"center",text:s[t]})}c.call(this,0),c.call(this,1)},_formatLabel:function(t,e){var i=this.dataZoomModel,a=i.get("labelFormatter"),o=i.get("labelPrecision");null!=o&&"auto"!==o||(o=e.getPixelPrecision());var s=null==t||isNaN(t)?"":"category"===e.type||"time"===e.type?e.scale.getLabel(Math.round(t)):t.toFixed(Math.min(o,20));return n.isFunction(a)?a(t,s):n.isString(a)?a.replace("{value}",s):s},_showDataInfo:function(t){t=this._dragging||t;var e=this._displayables.handleLabels;e[0].attr("invisible",!t),e[1].attr("invisible",!t)},_onDragMove:function(t,e,i,n){this._dragging=!0,a.stop(n.event);var s=this._displayables.barGroup.getLocalTransform(),r=o.applyTransform([e,i],s,!0),l=this._updateInterval(t,r[0]),d=this.dataZoomModel.get("realtime");this._updateView(!d),l&&d&&this._dispatchZoomAction()},_onDragEnd:function(){this._dragging=!1,this._showDataInfo(!1),!this.dataZoomModel.get("realtime")&&this._dispatchZoomAction()},_onClickPanelClick:function(t){var e=this._size,i=this._displayables.barGroup.transformCoordToLocal(t.offsetX,t.offsetY);if(!(i[0]<0||i[0]>e[0]||i[1]<0||i[1]>e[1])){var n=this._handleEnds,a=(n[0]+n[1])/2,o=this._updateInterval("all",i[0]-a);this._updateView(),o&&this._dispatchZoomAction()}},_dispatchZoomAction:function(){var t=this._range;this.api.dispatchAction({type:"dataZoom",from:this.uid,dataZoomId:this.dataZoomModel.id,start:t[0],end:t[1]})},_findCoordRect:function(){var t;if(p(this.getTargetCoordInfo(),(function(e){if(!t&&e.length){var i=e[0].model.coordinateSystem;t=i.getRect&&i.getRect()}})),!t){var e=this.api.getWidth(),i=this.api.getHeight();t={x:.2*e,y:.2*i,width:.6*e,height:.6*i}}return t}});function m(t){return"vertical"===t?"ns-resize":"ew-resize"}var _=v;t.exports=_},"2c17":function(t,e,i){var n=i("3eba"),a=i("6d8b"),o=a.createHashMap,s=a.each;n.registerProcessor({getTargetSeries:function(t){var e=o();return t.eachComponent("dataZoom",(function(t){t.eachTargetAxis((function(t,i,n){var a=n.getAxisProxy(t.name,i);s(a.getTargetSeriesModels(),(function(t){e.set(t.uid,t)}))}))})),e},modifyOutputEnd:!0,overallReset:function(t,e){t.eachComponent("dataZoom",(function(t){t.eachTargetAxis((function(t,i,n){n.getAxisProxy(t.name,i).reset(n,e)})),t.eachTargetAxis((function(t,i,n){n.getAxisProxy(t.name,i).filterData(n,e)}))})),t.eachComponent("dataZoom",(function(t){var e=t.findRepresentativeAxisProxy(),i=e.getDataPercentWindow(),n=e.getDataValueWindow();t.setCalculatedRange({start:i[0],end:i[1],startValue:n[0],endValue:n[1]})}))}})},"32a1":function(t,e,i){var n=i("6d8b"),a=i("7dcf"),o=i("ef6a"),s=i("5576"),r=n.bind,l=a.extend({type:"dataZoom.inside",init:function(t,e){this._range},render:function(t,e,i,a){l.superApply(this,"render",arguments),this._range=t.getPercentRange(),n.each(this.getTargetCoordInfo(),(function(e,a){var o=n.map(e,(function(t){return s.generateCoordId(t.model)}));n.each(e,(function(e){var l=e.model,h={};n.each(["pan","zoom","scrollMove"],(function(t){h[t]=r(d[t],this,e,a)}),this),s.register(i,{coordId:s.generateCoordId(l),allCoordIds:o,containsPoint:function(t,e,i){return l.coordinateSystem.containPoint([e,i])},dataZoomId:t.id,dataZoomModel:t,getRange:h})}),this)}),this)},dispose:function(){s.unregister(this.api,this.dataZoomModel.id),l.superApply(this,"dispose",arguments),this._range=null}}),d={zoom:function(t,e,i,n){var a=this._range,s=a.slice(),r=t.axisModels[0];if(r){var l=u[e](null,[n.originX,n.originY],r,i,t),d=(l.signal>0?l.pixelStart+l.pixelLength-l.pixel:l.pixel-l.pixelStart)/l.pixelLength*(s[1]-s[0])+s[0],h=Math.max(1/n.scale,0);s[0]=(s[0]-d)*h+d,s[1]=(s[1]-d)*h+d;var c=this.dataZoomModel.findRepresentativeAxisProxy().getMinMaxSpan();return o(0,s,[0,100],0,c.minSpan,c.maxSpan),this._range=s,a[0]!==s[0]||a[1]!==s[1]?s:void 0}},pan:h((function(t,e,i,n,a,o){var s=u[n]([o.oldX,o.oldY],[o.newX,o.newY],e,a,i);return s.signal*(t[1]-t[0])*s.pixel/s.pixelLength})),scrollMove:h((function(t,e,i,n,a,o){return u[n]([0,0],[o.scrollDelta,o.scrollDelta],e,a,i).signal*(t[1]-t[0])*o.scrollDelta}))};function h(t){return function(e,i,n,a){var s=this._range,r=s.slice(),l=e.axisModels[0];if(l){var d=t(r,l,e,i,n,a);return o(d,r,[0,100],"all"),this._range=r,s[0]!==r[0]||s[1]!==r[1]?r:void 0}}}var u={grid:function(t,e,i,n,a){var o=i.axis,s={},r=a.model.coordinateSystem.getRect();return t=t||[0,0],"x"===o.dim?(s.pixel=e[0]-t[0],s.pixelLength=r.width,s.pixelStart=r.x,s.signal=o.inverse?1:-1):(s.pixel=e[1]-t[1],s.pixelLength=r.height,s.pixelStart=r.y,s.signal=o.inverse?-1:1),s},polar:function(t,e,i,n,a){var o=i.axis,s={},r=a.model.coordinateSystem,l=r.getRadiusAxis().getExtent(),d=r.getAngleAxis().getExtent();return t=t?r.pointToCoord(t):[0,0],e=r.pointToCoord(e),"radiusAxis"===i.mainType?(s.pixel=e[0]-t[0],s.pixelLength=l[1]-l[0],s.pixelStart=l[0],s.signal=o.inverse?1:-1):(s.pixel=e[1]-t[1],s.pixelLength=d[1]-d[0],s.pixelStart=d[0],s.signal=o.inverse?-1:1),s},singleAxis:function(t,e,i,n,a){var o=i.axis,s=a.model.coordinateSystem.getRect(),r={};return t=t||[0,0],"horizontal"===o.orient?(r.pixel=e[0]-t[0],r.pixelLength=s.width,r.pixelStart=s.x,r.signal=o.inverse?1:-1):(r.pixel=e[1]-t[1],r.pixelLength=s.height,r.pixelStart=s.y,r.signal=o.inverse?-1:1),r}},c=l;t.exports=c},3790:function(t,e,i){var n=i("3a56").extend({type:"dataZoom.slider",layoutMode:"box",defaultOption:{show:!0,right:"ph",top:"ph",width:"ph",height:"ph",left:null,bottom:null,backgroundColor:"rgba(47,69,84,0)",dataBackground:{lineStyle:{color:"#2f4554",width:.5,opacity:.3},areaStyle:{color:"rgba(47,69,84,0.3)",opacity:.3}},borderColor:"#ddd",fillerColor:"rgba(167,183,204,0.4)",handleIcon:"M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z",handleSize:"100%",handleStyle:{color:"#a7b7cc"},labelPrecision:null,labelFormatter:null,showDetail:!0,showDataShadow:"auto",realtime:!0,zoomLock:!1,textStyle:{color:"#333"}}});t.exports=n},"3a56":function(t,e,i){i("4e08").__DEV__;var n=i("3eba"),a=i("6d8b"),o=i("22d1"),s=i("e0d3"),r=i("50e5"),l=i("cc39"),d=a.each,h=r.eachAxisDim;function u(t){var e={};return d(["start","end","startValue","endValue","throttle"],(function(i){t.hasOwnProperty(i)&&(e[i]=t[i])})),e}function c(t,e){var i=t._rangePropMode,n=t.get("rangeMode");d([["start","startValue"],["end","endValue"]],(function(t,a){var o=null!=e[t[0]],s=null!=e[t[1]];o&&!s?i[a]="percent":!o&&s?i[a]="value":n?i[a]=n[a]:o&&(i[a]="percent")}))}var g=n.extendComponentModel({type:"dataZoom",dependencies:["xAxis","yAxis","zAxis","radiusAxis","angleAxis","singleAxis","series"],defaultOption:{zlevel:0,z:4,orient:null,xAxisIndex:null,yAxisIndex:null,filterMode:"filter",throttle:null,start:0,end:100,startValue:null,endValue:null,minSpan:null,maxSpan:null,minValueSpan:null,maxValueSpan:null,rangeMode:null},init:function(t,e,i){this._dataIntervalByAxis={},this._dataInfo={},this._axisProxies={},this.textStyleModel,this._autoThrottle=!0,this._rangePropMode=["percent","percent"];var n=u(t);this.settledOption=n,this.mergeDefaultAndTheme(t,i),this.doInit(n)},mergeOption:function(t){var e=u(t);a.merge(this.option,t,!0),a.merge(this.settledOption,e,!0),this.doInit(e)},doInit:function(t){var e=this.option;o.canvasSupported||(e.realtime=!1),this._setDefaultThrottle(t),c(this,t);var i=this.settledOption;d([["start","startValue"],["end","endValue"]],(function(t,n){"value"===this._rangePropMode[n]&&(e[t[0]]=i[t[0]]=null)}),this),this.textStyleModel=this.getModel("textStyle"),this._resetTarget(),this._giveAxisProxies()},_giveAxisProxies:function(){var t=this._axisProxies;this.eachTargetAxis((function(e,i,n,a){var o=this.dependentModels[e.axis][i],s=o.__dzAxisProxy||(o.__dzAxisProxy=new l(e.name,i,this,a));t[e.name+"_"+i]=s}),this)},_resetTarget:function(){var t=this.option,e=this._judgeAutoMode();h((function(e){var i=e.axisIndex;t[i]=s.normalizeToArray(t[i])}),this),"axisIndex"===e?this._autoSetAxisIndex():"orient"===e&&this._autoSetOrient()},_judgeAutoMode:function(){var t=this.option,e=!1;h((function(i){null!=t[i.axisIndex]&&(e=!0)}),this);var i=t.orient;return null==i&&e?"orient":e?void 0:(null==i&&(t.orient="horizontal"),"axisIndex")},_autoSetAxisIndex:function(){var t=!0,e=this.get("orient",!0),i=this.option,n=this.dependentModels;if(t){var o="vertical"===e?"y":"x";n[o+"Axis"].length?(i[o+"AxisIndex"]=[0],t=!1):d(n.singleAxis,(function(n){t&&n.get("orient",!0)===e&&(i.singleAxisIndex=[n.componentIndex],t=!1)}))}t&&h((function(e){if(t){var n=[],a=this.dependentModels[e.axis];if(a.length&&!n.length)for(var o=0,s=a.length;o<s;o++)"category"===a[o].get("type")&&n.push(o);i[e.axisIndex]=n,n.length&&(t=!1)}}),this),t&&this.ecModel.eachSeries((function(t){this._isSeriesHasAllAxesTypeOf(t,"value")&&h((function(e){var n=i[e.axisIndex],o=t.get(e.axisIndex),s=t.get(e.axisId);o=t.ecModel.queryComponents({mainType:e.axis,index:o,id:s})[0].componentIndex,a.indexOf(n,o)<0&&n.push(o)}))}),this)},_autoSetOrient:function(){var t;this.eachTargetAxis((function(e){!t&&(t=e.name)}),this),this.option.orient="y"===t?"vertical":"horizontal"},_isSeriesHasAllAxesTypeOf:function(t,e){var i=!0;return h((function(n){var a=t.get(n.axisIndex),o=this.dependentModels[n.axis][a];o&&o.get("type")===e||(i=!1)}),this),i},_setDefaultThrottle:function(t){if(t.hasOwnProperty("throttle")&&(this._autoThrottle=!1),this._autoThrottle){var e=this.ecModel.option;this.option.throttle=e.animation&&e.animationDurationUpdate>0?100:20}},getFirstTargetAxisModel:function(){var t;return h((function(e){if(null==t){var i=this.get(e.axisIndex);i.length&&(t=this.dependentModels[e.axis][i[0]])}}),this),t},eachTargetAxis:function(t,e){var i=this.ecModel;h((function(n){d(this.get(n.axisIndex),(function(a){t.call(e,n,a,this,i)}),this)}),this)},getAxisProxy:function(t,e){return this._axisProxies[t+"_"+e]},getAxisModel:function(t,e){var i=this.getAxisProxy(t,e);return i&&i.getAxisModel()},setRawRange:function(t){var e=this.option,i=this.settledOption;d([["start","startValue"],["end","endValue"]],(function(n){null==t[n[0]]&&null==t[n[1]]||(e[n[0]]=i[n[0]]=t[n[0]],e[n[1]]=i[n[1]]=t[n[1]])}),this),c(this,t)},setCalculatedRange:function(t){var e=this.option;d(["start","startValue","end","endValue"],(function(i){e[i]=t[i]}))},getPercentRange:function(){var t=this.findRepresentativeAxisProxy();if(t)return t.getDataPercentWindow()},getValueRange:function(t,e){if(null!=t||null!=e)return this.getAxisProxy(t,e).getDataValueWindow();var i=this.findRepresentativeAxisProxy();return i?i.getDataValueWindow():void 0},findRepresentativeAxisProxy:function(t){if(t)return t.__dzAxisProxy;var e=this._axisProxies;for(var i in e)if(e.hasOwnProperty(i)&&e[i].hostedBy(this))return e[i];for(var i in e)if(e.hasOwnProperty(i)&&!e[i].hostedBy(this))return e[i]},getRangePropMode:function(){return this._rangePropMode.slice()}});t.exports=g},"4a01":function(t,e,i){var n=i("6d8b"),a=i("1fab"),o=i("607d"),s=i("a4fe");function r(t){this.pointerChecker,this._zr=t,this._opt={};var e=n.bind,i=e(l,this),o=e(d,this),s=e(h,this),r=e(u,this),g=e(c,this);a.call(this),this.setPointerChecker=function(t){this.pointerChecker=t},this.enable=function(e,a){this.disable(),this._opt=n.defaults(n.clone(a)||{},{zoomOnMouseWheel:!0,moveOnMouseMove:!0,moveOnMouseWheel:!1,preventDefaultMouseMove:!0}),null==e&&(e=!0),!0!==e&&"move"!==e&&"pan"!==e||(t.on("mousedown",i),t.on("mousemove",o),t.on("mouseup",s)),!0!==e&&"scale"!==e&&"zoom"!==e||(t.on("mousewheel",r),t.on("pinch",g))},this.disable=function(){t.off("mousedown",i),t.off("mousemove",o),t.off("mouseup",s),t.off("mousewheel",r),t.off("pinch",g)},this.dispose=this.disable,this.isDragging=function(){return this._dragging},this.isPinching=function(){return this._pinching}}function l(t){if(!(o.isMiddleOrRightButtonOnMouseUpDown(t)||t.target&&t.target.draggable)){var e=t.offsetX,i=t.offsetY;this.pointerChecker&&this.pointerChecker(t,e,i)&&(this._x=e,this._y=i,this._dragging=!0)}}function d(t){if(this._dragging&&p("moveOnMouseMove",t,this._opt)&&"pinch"!==t.gestureEvent&&!s.isTaken(this._zr,"globalPan")){var e=t.offsetX,i=t.offsetY,n=this._x,a=this._y,r=e-n,l=i-a;this._x=e,this._y=i,this._opt.preventDefaultMouseMove&&o.stop(t.event),f(this,"pan","moveOnMouseMove",t,{dx:r,dy:l,oldX:n,oldY:a,newX:e,newY:i})}}function h(t){o.isMiddleOrRightButtonOnMouseUpDown(t)||(this._dragging=!1)}function u(t){var e=p("zoomOnMouseWheel",t,this._opt),i=p("moveOnMouseWheel",t,this._opt),n=t.wheelDelta,a=Math.abs(n),o=t.offsetX,s=t.offsetY;if(0!==n&&(e||i)){if(e){var r=a>3?1.4:a>1?1.2:1.1;g(this,"zoom","zoomOnMouseWheel",t,{scale:n>0?r:1/r,originX:o,originY:s})}if(i){var l=Math.abs(n);g(this,"scrollMove","moveOnMouseWheel",t,{scrollDelta:(n>0?1:-1)*(l>3?.4:l>1?.15:.05),originX:o,originY:s})}}}function c(t){s.isTaken(this._zr,"globalPan")||g(this,"zoom",null,t,{scale:t.pinchScale>1?1.1:1/1.1,originX:t.pinchX,originY:t.pinchY})}function g(t,e,i,n,a){t.pointerChecker&&t.pointerChecker(n,a.originX,a.originY)&&(o.stop(n.event),f(t,e,i,n,a))}function f(t,e,i,a,o){o.isAvailableBehavior=n.bind(p,null,i,a),t.trigger(e,o)}function p(t,e,i){var a=i[t];return!t||a&&(!n.isString(a)||e.event[a+"Key"])}n.mixin(r,a);var x=r;t.exports=x},"50e5":function(t,e,i){var n=i("6d8b"),a=i("eda2"),o=["cartesian2d","polar","singleAxis"];function s(t,e){t=t.slice();var i=n.map(t,a.capitalFirst);e=(e||[]).slice();var o=n.map(e,a.capitalFirst);return function(a,s){n.each(t,(function(t,n){for(var r={name:t,capital:i[n]},l=0;l<e.length;l++)r[e[l]]=t+o[l];a.call(s,r)}))}}var r=s(["x","y","z","radius","angle","single"],["axisIndex","axis","index","id"]);e.isCoordSupported=function(t){return n.indexOf(o,t)>=0},e.createNameEach=s,e.eachAxisDim=r,e.createLinkedNodesFinder=function(t,e,i){return function(o){var s,r={nodes:[],records:{}};if(e((function(t){r.records[t.name]={}})),!o)return r;a(o,r);do{s=!1,t(l)}while(s);function l(t){!function(t,e){return n.indexOf(e.nodes,t)>=0}(t,r)&&function(t,a){var o=!1;return e((function(e){n.each(i(t,e)||[],(function(t){a.records[e.name][t]&&(o=!0)}))})),o}(t,r)&&(a(t,r),s=!0)}return r};function a(t,a){a.nodes.push(t),e((function(e){n.each(i(t,e)||[],(function(t){a.records[e.name][t]=!0}))}))}}},5576:function(t,e,i){var n=i("6d8b"),a=i("4a01"),o=i("88b3"),s="\0_ec_dataZoom_roams";function r(t){var e=t.getZr();return e[s]||(e[s]={})}function l(t){n.each(t,(function(e,i){e.count||(e.controller.dispose(),delete t[i])}))}function d(t,e){t.dispatchAction({type:"dataZoom",batch:e})}e.register=function(t,e){var i=r(t),s=e.dataZoomId,h=e.coordId;n.each(i,(function(t,i){var a=t.dataZoomInfos;a[s]&&n.indexOf(e.allCoordIds,h)<0&&(delete a[s],t.count--)})),l(i);var u=i[h];u||((u=i[h]={coordId:h,dataZoomInfos:{},count:0}).controller=function(t,e){var i=new a(t.getZr());return n.each(["pan","zoom","scrollMove"],(function(t){i.on(t,(function(i){var a=[];n.each(e.dataZoomInfos,(function(n){if(i.isAvailableBehavior(n.dataZoomModel.option)){var o=(n.getRange||{})[t],s=o&&o(e.controller,i);!n.dataZoomModel.get("disabled",!0)&&s&&a.push({dataZoomId:n.dataZoomId,start:s[0],end:s[1]})}})),a.length&&e.dispatchAction(a)}))})),i}(t,u),u.dispatchAction=n.curry(d,t)),!u.dataZoomInfos[s]&&u.count++,u.dataZoomInfos[s]=e;var c,g,f,p,x=(c=u.dataZoomInfos,f={type_true:2,type_move:1,type_false:0,type_undefined:-1},p=!0,n.each(c,(function(t){var e=t.dataZoomModel,i=!e.get("disabled",!0)&&(!e.get("zoomLock",!0)||"move");f["type_"+i]>f["type_"+g]&&(g=i),p&=e.get("preventDefaultMouseMove",!0)})),{controlType:g,opt:{zoomOnMouseWheel:!0,moveOnMouseMove:!0,moveOnMouseWheel:!0,preventDefaultMouseMove:!!p}});u.controller.enable(x.controlType,x.opt),u.controller.setPointerChecker(e.containsPoint),o.createOrUpdate(u,"dispatchAction",e.dataZoomModel.get("throttle",!0),"fixRate")},e.unregister=function(t,e){var i=r(t);n.each(i,(function(t){t.controller.dispose();var i=t.dataZoomInfos;i[e]&&(delete i[e],t.count--)})),l(i)},e.generateCoordId=function(t){return t.type+"\0_"+t.id}},6932:function(t,e,i){i("6cb7").registerSubTypeDefaulter("dataZoom",(function(){return"slider"}))},"7dcf":function(t,e,i){var n=i("b12f").extend({type:"dataZoom",render:function(t,e,i,n){this.dataZoomModel=t,this.ecModel=e,this.api=i},getTargetCoordInfo:function(){var t=this.dataZoomModel,e=this.ecModel,i={};return t.eachTargetAxis((function(t,n){var a=e.getComponent(t.axis,n);if(a){var o=a.getCoordSysModel();o&&function(t,e,i,n){for(var a,o=0;o<i.length;o++)if(i[o].model===t){a=i[o];break}a||i.push(a={model:t,axisModels:[],coordIndex:n});a.axisModels.push(e)}(o,a,i[o.mainType]||(i[o.mainType]=[]),o.componentIndex)}}),this),i}});t.exports=n},"7f72":function(t,e,i){i("6932"),i("3a56"),i("7dcf"),i("a18f"),i("32a1"),i("2c17"),i("9e87")},"9e87":function(t,e,i){var n=i("3eba"),a=i("6d8b"),o=i("50e5");n.registerAction("dataZoom",(function(t,e){var i=o.createLinkedNodesFinder(a.bind(e.eachComponent,e,"dataZoom"),o.eachAxisDim,(function(t,e){return t.get(e.axisIndex)})),n=[];e.eachComponent({mainType:"dataZoom",query:t},(function(t,e){n.push.apply(n,i(t).nodes)})),a.each(n,(function(e,i){e.setRawRange({start:t.start,end:t.end,startValue:t.startValue,endValue:t.endValue})}))}))},a18f:function(t,e,i){var n=i("3a56").extend({type:"dataZoom.inside",defaultOption:{disabled:!1,zoomLock:!1,zoomOnMouseWheel:!0,moveOnMouseMove:!0,moveOnMouseWheel:!1,preventDefaultMouseMove:!0}});t.exports=n},a4fe:function(t,e,i){var n=i("3eba"),a="\0_ec_interaction_mutex";function o(t){return t[a]||(t[a]={})}n.registerAction({type:"takeGlobalCursor",event:"globalCursorTaken",update:"update"},(function(){})),e.take=function(t,e,i){o(t)[e]=i},e.release=function(t,e,i){var n=o(t);n[e]===i&&(n[e]=null)},e.isTaken=function(t,e){return!!o(t)[e]}},cc39:function(t,e,i){var n=i("6d8b"),a=i("3842"),o=i("50e5"),s=i("ef6a"),r=n.each,l=a.asc,d=function(t,e,i,n){this._dimName=t,this._axisIndex=e,this._valueWindow,this._percentWindow,this._dataExtent,this._minMaxSpan,this.ecModel=n,this._dataZoomModel=i};function h(t,e){var i=t.getAxisModel(),n=t._percentWindow,o=t._valueWindow;if(n){var s=a.getPixelPrecision(o,[0,500]);s=Math.min(s,20);var r=e||0===n[0]&&100===n[1];i.setRange(r?null:+o[0].toFixed(s),r?null:+o[1].toFixed(s))}}d.prototype={constructor:d,hostedBy:function(t){return this._dataZoomModel===t},getDataValueWindow:function(){return this._valueWindow.slice()},getDataPercentWindow:function(){return this._percentWindow.slice()},getTargetSeriesModels:function(){var t=[],e=this.ecModel;return e.eachSeries((function(i){if(o.isCoordSupported(i.get("coordinateSystem"))){var n=this._dimName,a=e.queryComponents({mainType:n+"Axis",index:i.get(n+"AxisIndex"),id:i.get(n+"AxisId")})[0];this._axisIndex===(a&&a.componentIndex)&&t.push(i)}}),this),t},getAxisModel:function(){return this.ecModel.getComponent(this._dimName+"Axis",this._axisIndex)},getOtherAxisModel:function(){var t,e,i,n=this._dimName,a=this.ecModel,o=this.getAxisModel();return"x"===n||"y"===n?(e="gridIndex",t="x"===n?"y":"x"):(e="polarIndex",t="angle"===n?"radius":"angle"),a.eachComponent(t+"Axis",(function(t){(t.get(e)||0)===(o.get(e)||0)&&(i=t)})),i},getMinMaxSpan:function(){return n.clone(this._minMaxSpan)},calculateDataWindow:function(t){var e,i=this._dataExtent,n=this.getAxisModel().axis.scale,o=this._dataZoomModel.getRangePropMode(),d=[0,100],h=[],u=[];r(["start","end"],(function(s,r){var l=t[s],c=t[s+"Value"];"percent"===o[r]?(null==l&&(l=d[r]),c=n.parse(a.linearMap(l,d,i))):(e=!0,c=null==c?i[r]:n.parse(c),l=a.linearMap(c,i,d)),u[r]=c,h[r]=l})),l(u),l(h);var c=this._minMaxSpan;function g(t,e,i,o,r){var l=r?"Span":"ValueSpan";s(0,t,i,"all",c["min"+l],c["max"+l]);for(var d=0;d<2;d++)e[d]=a.linearMap(t[d],i,o,!0),r&&(e[d]=n.parse(e[d]))}return e?g(u,h,i,d,!1):g(h,u,d,i,!0),{valueWindow:u,percentWindow:h}},reset:function(t){if(t===this._dataZoomModel){var e=this.getTargetSeriesModels();this._dataExtent=function(t,e,i){var n=[1/0,-1/0];r(i,(function(t){var i=t.getData();i&&r(i.mapDimension(e,!0),(function(t){var e=i.getApproximateExtent(t);e[0]<n[0]&&(n[0]=e[0]),e[1]>n[1]&&(n[1]=e[1])}))})),n[1]<n[0]&&(n=[NaN,NaN]);return function(t,e){var i=t.getAxisModel(),n=i.getMin(!0),a="category"===i.get("type"),o=a&&i.getCategories().length;null!=n&&"dataMin"!==n&&"function"!=typeof n?e[0]=n:a&&(e[0]=o>0?0:NaN);var s=i.getMax(!0);null!=s&&"dataMax"!==s&&"function"!=typeof s?e[1]=s:a&&(e[1]=o>0?o-1:NaN);i.get("scale",!0)||(e[0]>0&&(e[0]=0),e[1]<0&&(e[1]=0))}(t,n),n}(this,this._dimName,e),function(t){var e=t._minMaxSpan={},i=t._dataZoomModel,n=t._dataExtent;r(["min","max"],(function(o){var s=i.get(o+"Span"),r=i.get(o+"ValueSpan");null!=r&&(r=t.getAxisModel().axis.scale.parse(r)),null!=r?s=a.linearMap(n[0]+r,n,[0,100],!0):null!=s&&(r=a.linearMap(s,[0,100],n,!0)-n[0]),e[o+"Span"]=s,e[o+"ValueSpan"]=r}))}(this);var i=this.calculateDataWindow(t.settledOption);this._valueWindow=i.valueWindow,this._percentWindow=i.percentWindow,h(this)}},restore:function(t){t===this._dataZoomModel&&(this._valueWindow=this._percentWindow=null,h(this,!0))},filterData:function(t,e){if(t===this._dataZoomModel){var i=this._dimName,n=this.getTargetSeriesModels(),a=t.get("filterMode"),o=this._valueWindow;"none"!==a&&r(n,(function(t){var e=t.getData(),n=e.mapDimension(i,!0);n.length&&("weakFilter"===a?e.filterSelf((function(t){for(var i,a,s,r=0;r<n.length;r++){var l=e.get(n[r],t),d=!isNaN(l),h=l<o[0],u=l>o[1];if(d&&!h&&!u)return!0;d&&(s=!0),h&&(i=!0),u&&(a=!0)}return s&&i&&a})):r(n,(function(i){if("empty"===a)t.setData(e=e.map(i,(function(t){return function(t){return t>=o[0]&&t<=o[1]}(t)?t:NaN})));else{var n={};n[i]=o,e.selectRange(n)}})),r(n,(function(t){e.setApproximateExtent(o,t)})))}))}}};var u=d;t.exports=u},e4d1:function(t,e,i){i("6932"),i("3a56"),i("7dcf"),i("3790"),i("2325"),i("2c17"),i("9e87")},ef6a:function(t,e){function i(t,e){var i=t[e]-t[1-e];return{span:Math.abs(i),sign:i>0?-1:i<0?1:e?-1:1}}function n(t,e){return Math.min(null!=e[1]?e[1]:1/0,Math.max(null!=e[0]?e[0]:-1/0,t))}t.exports=function(t,e,a,o,s,r){t=t||0;var l=a[1]-a[0];if(null!=s&&(s=n(s,[0,l])),null!=r&&(r=Math.max(r,null!=s?s:0)),"all"===o){var d=Math.abs(e[1]-e[0]);d=n(d,[0,l]),s=r=n(d,[s,r]),o=0}e[0]=n(e[0],a),e[1]=n(e[1],a);var h=i(e,o);e[o]+=t;var u=s||0,c=a.slice();h.sign<0?c[0]+=u:c[1]-=u,e[o]=n(e[o],c);var g=i(e,o);return null!=s&&(g.sign!==h.sign||g.span<s)&&(e[1-o]=e[o]+h.sign*s),g=i(e,o),null!=r&&g.span>r&&(e[1-o]=e[o]+g.sign*r),e}}}]);
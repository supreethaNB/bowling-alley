(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,a,t){e.exports=t(19)},16:function(e,a,t){},19:function(e,a,t){"use strict";t.r(a);var r=t(0),l=t.n(r),n=t(10),o=t.n(n),s=(t(16),t(2)),m=t(8),c=t(3),i=t(4),f=t(6),u=t(5),d=t(7),b=t(1),S=function(e){var a=e.totalScore,t=e.frameScores,r=1,n=t.map(function(e){return l.a.createElement("li",null,"Frame ",r++," --- ",e.firstRoll," | ",e.secondRoll,"-- ",e.frameTotal)});return l.a.createElement("div",{className:"score-card"},l.a.createElement("div",null,l.a.createElement("i",{className:"fa fa-gamepad fa-lg m-2","aria-hidden":"true"}),"Score",l.a.createElement("span",{className:"badge-style badge badge-info m-2 "},a)),l.a.createElement("div",{className:"frame-score"},l.a.createElement("ul",null,n)))},R=function(e){function a(){return Object(c.a)(this,a),Object(f.a)(this,Object(u.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(i.a)(a,[{key:"render",value:function(){var e=this.props,a=e.onFirstRoll,t=e.onSecondRoll,r=e.frameCounter,n=e.frameValue,o=e.extraBallCount,s=e.onFrameSubmit,m=e.onReset,c=o>0,i=c?"Extra-ball":"ball";return l.a.createElement("div",{className:"frame-group"},l.a.createElement("span",{className:"badge-style badge badge-info"},c?l.a.createElement("span",null," Extra Ball \xa0 ",o," \xa0"):l.a.createElement("span",null,"Frame \xa0 ",r," \xa0")),l.a.createElement("form",{onSubmit:s},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"new-todo"}," Enter ",i,"-1 score: "),l.a.createElement("input",{id:"firstRoll",className:"form-input",value:n.firstRoll,type:"number",disabled:n.firstRollDisabled,min:"0",max:"10",onChange:a})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"new-todo"}," Enter ",i,"-2 score: "),l.a.createElement("input",{id:"secondRoll",className:"form-input",value:n.secondRoll,disabled:n.secondRollDisabled,type:"number",min:"0",max:n.secondRollMaxRange,onChange:t})),l.a.createElement("button",{className:"btn btn-success m-2"},"Submit frame #",r,l.a.createElement("i",{className:"fa fa-check","aria-hidden":"true"})),l.a.createElement("button",{className:"btn btn-success m-2",onClick:m}," Reset",l.a.createElement("i",{className:"fa fa-refresh","aria-hidden":"true"}))))}}]),a}(r.Component),E=function(e){function a(){return Object(c.a)(this,a),Object(f.a)(this,Object(u.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(i.a)(a,[{key:"render",value:function(){var e=this.props.onRestart;return l.a.createElement("div",null,l.a.createElement("div",{className:"reset-pos"},l.a.createElement("button",{className:"btn btn-primary m-2",onClick:e},l.a.createElement("i",{className:"fa fa-power-off","aria-hidden":"true"}))))}}]),a}(r.Component),h=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(f.a)(this,Object(u.a)(a).call(this,e))).handleFrameSubmit=function(e){e.preventDefault();var a=parseInt(t.state.frameValue.firstRoll),r=parseInt(t.state.frameValue.secondRoll),l=a+r,n=t.state.finalScore,o=t.state.frameCounter===t.maxFrames,s={firstRoll:a,secondRoll:r,frameTotal:l};if(t.state.frameCounter<=t.maxFrames){var m=t.frameState.NA,c=0;a===t.maxFramePins?(m=t.frameState.STRIKE,c=o?t.lastFrameExtras.STRIKE:0):l===t.maxFramePins&&(m=t.frameState.SPARE,c=o?t.lastFrameExtras.SPARE:0),s.info=m;var i=t.state.frameCounter===t.maxFrames&&0===c;t.state.frameCounter>1?t.updatePreviousScore(s,c,i):t.setState(function(e){return{frameCounter:e.frameCounter+1,frameScores:[s],finalScore:n+s.frameTotal,frameValue:t.frameIntialValue}})}else{var f=t.state.extraBallCount;t.updatePreviousScore(s,f,!0)}},t.updatePreviousScore=function(e,a,r){var l=t.state.finalScore,n=t.state.frameScores.length-1,o=Object(m.a)(t.state.frameScores);o[n]=Object(s.a)({},o[n]),t.state.frameScores[n].info===t.frameState.STRIKE?(t.state.frameScores.length>1&&(o[n-1]=Object(s.a)({},o[n-1]),t.state.frameScores[n-1].info===t.frameState.STRIKE&&(o[n-1].frameTotal=o[n-1].frameTotal+e.firstRoll,0===a&&(l+=e.firstRoll))),o[n].frameTotal+=e.frameTotal,l+=e.frameTotal+e.frameTotal):t.state.frameScores[n].info===t.frameState.SPARE?(o[n].frameTotal+=e.firstRoll,l+=e.firstRoll):l+=e.frameTotal,t.setState(function(n){return Object(s.a)({},t.state,{extraBallCount:a,frameCounter:++n.frameCounter,frameScores:[].concat(Object(m.a)(o),[e]),frameValue:Object(s.a)({},t.frameIntialValue),finalScore:l,gameOver:r})},function(){console.log("prev ",t.state.frameScores)})},t.handleFirstRoll=function(e){var a=e.target.value,r=Object(s.a)({},t.state.frameValue,{firstRoll:parseInt(a),secondRollDisabled:!(0===t.state.extraBallCount&&a<10||2===t.state.extraBallCount),secondRollMaxRange:0===t.state.extraBallCount?10-parseInt(a):10});t.setState({frameValue:r})},t.handleSecondRoll=function(e){var a=Object(s.a)({},t.state.frameValue,{firstRollDisabled:!0,secondRoll:e.target.value});t.setState({frameValue:a})},t.handleRestart=function(){window.location.reload()},t.handleReset=function(e){e.preventDefault(),t.setState(function(e){return{frameValue:t.frameIntialValue,frameCounter:e.frameCounter}})},t.frameIntialValue={firstRoll:0,secondRoll:0,firstRollDisabled:!1,secondRollDisabled:!0,secondRollMaxRange:10},t.state={finalScore:0,frameCounter:1,extraBallCount:0,counters:[],frameValue:t.frameIntialValue,frameScores:[],gameOver:!1},t.frameState=Object.freeze({NA:"NA",SPARE:"SPARE",STRIKE:"STRIKE"}),t.lastFrameExtras=Object.freeze({NA:0,SPARE:1,STRIKE:2}),t.maxFrames=10,t.maxFramePins=10,t.handleFrameSubmit=t.handleFrameSubmit.bind(Object(b.a)(Object(b.a)(t))),t.handleReset=t.handleReset.bind(Object(b.a)(Object(b.a)(t))),t.updatePreviousScore=t.updatePreviousScore.bind(Object(b.a)(Object(b.a)(t))),t.handleFirstRoll=t.handleFirstRoll.bind(Object(b.a)(Object(b.a)(t))),t}return Object(d.a)(a,e),Object(i.a)(a,[{key:"render",value:function(){return l.a.createElement("div",{className:"main__wrap"},l.a.createElement("main",{className:"container"},l.a.createElement("div",{className:"card__box"},l.a.createElement(E,{onRestart:this.handleRestart}),l.a.createElement(S,{totalScore:this.state.finalScore,frameScores:this.state.frameScores,frameCounter:this.state.frameCounter}),l.a.createElement("div",null,this.state.gameOver?l.a.createElement("span",{className:"game-over"},"Game Over! Your score is ",this.state.finalScore):l.a.createElement(R,{frameValue:this.state.frameValue,frameCounter:this.state.frameCounter,extraBallCount:this.state.extraBallCount,onReset:this.handleReset,onFrameSubmit:this.handleFrameSubmit,onFirstRoll:this.handleFirstRoll,onSecondRoll:this.handleSecondRoll})))))}}]),a}(r.Component);t(17),t(18);o.a.render(l.a.createElement(h,null),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.5c63de40.chunk.js.map
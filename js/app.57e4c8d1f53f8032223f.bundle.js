!function(e){var t={};function n(c){if(t[c])return t[c].exports;var i=t[c]={i:c,l:!1,exports:{}};return e[c].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,c){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:c})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(n.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(c,i,function(t){return e[t]}.bind(null,i));return c},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/budgetify-app/",n(n.s=2)}({2:function(e,t){var n,c,i,a,r,o,u,l,s,d=function(){var e=function(e,t,n){this.id=e,this.description=t,this.value=n,this.percentage=-1};e.prototype.calcPercentage=function(e){this.percentage=e>0?Math.round(this.value/e*100):-1},e.prototype.getPercentage=function(){return this.percentage};var t=function(e,t,n){this.id=e,this.description=t,this.value=n},n=function(e){var t=0;c.allItems[e].forEach((function(e){t+=Number(e.value)})),c.totals[e]=t},c={allItems:{inc:[],exp:[]},totals:{exp:0,inc:0},budget:0,percentage:-1};return{addItem:function(n,i,a){var r,o;return o=c.allItems[n].length>0?c.allItems[n][c.allItems[n].length-1].id+1:0,"exp"===n?r=new e(o,i,a):"inc"===n&&(r=new t(o,i,a)),c.allItems[n].push(r),r},deleteItem:function(e,t){var n=c.allItems[e].map((function(e){return e.id})).indexOf(t);-1!==n&&c.allItems[e].splice(n,1)},calculateBudget:function(){n("inc"),n("exp"),c.budget=c.totals.inc-c.totals.exp,c.totals.inc>0?c.percentage=Math.round(c.totals.exp/c.totals.inc*100):c.percentage=-1},calculatePercentage:function(){c.allItems.exp.forEach((function(e){return e.calcPercentage(c.totals.inc)}))},getPercentages:function(){return c.allItems.exp.map((function(e){return e.getPercentage()}))},getBudget:function(){return{budget:c.budget,totalInc:c.totals.inc,totalExp:c.totals.exp,percentage:c.percentage}},testing:function(){console.log(c)}}}(),p=(n={inputType:".add__type",inputDescription:".add__description",inputValue:".add__value",inputBtn:".add__btn",incomeContainer:".income__list",expensesContainer:".expenses__list",budgetLabel:".budget__value",incomeLabel:".budget__income--value",expensesLabel:".budget__expenses--value",percentageLabel:".budget__expenses--percentage",container:".container",expensesPercLabel:".item__percentage",dateLabel:".budget__title--month"},c=function(e,t){var n=Math.abs(e),c=(n=n.toFixed(2)).split(".");return int=c[0],int.length>3&&(int="".concat(int.substr(0,int.length-3),",").concat(int.substr(int.length-3,3))),dec=c[1],("exp"===t?"-":"+")+" ".concat(int,".").concat(dec)},i=function(e,t){for(var n=0;n<e.length;n++)t(e[n],n)},{getInput:function(){return{type:document.querySelector(n.inputType).value,description:document.querySelector(n.inputDescription).value,value:document.querySelector(n.inputValue).value}},addListItem:function(e,t){var i,a,r;"inc"===t?(a=n.incomeContainer,r=c(e.value,t),i='<div class="item clearfix" id="inc-'.concat(e.id,'">\n                  <div class="item__description">').concat(e.description,'</div>\n                  <div class="right clearfix">\n                    <div class="item__value">').concat(r,'</div>\n                    <div class="item__delete">\n                      <button class="item__delete--btn">\n                        <i class="ion-ios-close-outline"></i>\n                      </button>\n                    </div>\n                  </div>\n                </div>')):"exp"===t&&(a=n.expensesContainer,r=c(e.value,t),i='<div class="item clearfix" id="exp-'.concat(e.id,'">\n                  <div class="item__description">').concat(e.description,'</div>\n                  <div class="right clearfix">\n                    <div class="item__value">').concat(r,'</div>\n                    <div class="item__percentage">21%</div>\n                    <div class="item__delete">\n                      <button class="item__delete--btn">\n                        <i class="ion-ios-close-outline"></i>\n                      </button>\n                    </div>\n                  </div>\n                </div>')),document.querySelector(a).insertAdjacentHTML("beforeend",i)},deleteListItem:function(e){var t=document.getElementById(e);t.parentNode.removeChild(t)},clearFields:function(){var e=document.querySelectorAll(n.inputDescription+", "+n.inputValue),t=Array.prototype.slice.call(e);t.forEach((function(e,t,n){e.value=""})),t[0].focus()},displayBudget:function(e){var t;t=e.budget>0?"inc":"exp",document.querySelector(n.budgetLabel).textContent=c(e.budget,t),document.querySelector(n.incomeLabel).textContent=c(e.totalInc,"inc"),document.querySelector(n.expensesLabel).textContent=c(e.totalExp,"exp"),e.percentage>0?document.querySelector(n.percentageLabel).textContent="".concat(e.percentage,"%"):document.querySelector(n.percentageLabel).textContent="---"},displayPercentages:function(e){var t=document.querySelectorAll(n.expensesPercLabel);i(t,(function(t,n){e[n]>0?t.textContent="".concat(e[n],"%"):t.textContent="---"}))},displayMonth:function(){var e=new Date;months=["January","February","March","April","May","June","July","August","September","October","November","December"],month=e.getMonth(),year=e.getFullYear(),document.querySelector(n.dateLabel).textContent="".concat(months[month]," ").concat(year)},changedType:function(){var e=document.querySelectorAll("".concat(n.inputType,", ").concat(n.inputDescription,", ").concat(n.inputValue));i(e,(function(e){e.classList.toggle("red-focus")})),document.querySelector(n.inputBtn).classList.toggle("red")},getDOMstrings:function(){return n}});(a=d,r=p,o=function(){a.calculateBudget();var e=a.getBudget();r.displayBudget(e)},u=function(){a.calculatePercentage();var e=a.getPercentages();r.displayPercentages(e)},l=function(){var e=r.getInput();if(""!==e.description&&!isNaN(e.value)&&e.value>0){var t=a.addItem(e.type,e.description,e.value);a.testing(),r.addListItem(t,e.type),r.clearFields(),o(),u()}},s=function(e){var t=e.target.parentNode.parentNode.parentNode.parentNode.id;if(t){var n=t.split("-"),c=n[0],i=parseInt(n[1]);a.deleteItem(c,i),r.deleteListItem(t),o(),u()}},{init:function(){var e;r.displayMonth(),r.displayBudget({budget:0,totalInc:0,totalExp:0,percentage:-1}),e=r.getDOMstrings(),document.querySelector(e.inputBtn).addEventListener("click",l),document.addEventListener("keypress",(function(e){13!==e.KeyCode&&13!==e.which||l()})),document.querySelector(e.container).addEventListener("click",s),document.querySelector(e.inputType).addEventListener("change",r.changedType)}}).init()}});
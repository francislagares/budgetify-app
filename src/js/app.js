/****************************************
 * For this application we implement the
 * Module Pattern for better separation
 * of concerns & maintenance of code
 ****************************************/
const budgetController = (() => {
  const Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const calculateTotal = (type) => {
    let sum = 0;
    data.allItems[type].forEach((el) => {
      sum += Number(el.value);
    });
    data.totals[type] = sum;
  };

  const data = {
    allItems: {
      inc: [],
      exp: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addItem: (type, desc, val) => {
      let newItem, ID;
      // Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      // Create new item based on type
      if (type === 'exp') {
        newItem = new Expense(ID, desc, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, desc, val);
      }
      // Add item to data structure
      data.allItems[type].push(newItem);
      // Return the new item
      return newItem;
    },

    deleteItem: (type, id) => {
      let ids = data.allItems[type].map((current) => {
        return current.id;
      });
      let index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: () => {
      // 1. Calculate total and expenses
      calculateTotal('inc');
      calculateTotal('exp');
      // 2. Calculate the budget income-expenses
      data.budget = data.totals.inc - data.totals.exp;
      // 3. Calculate percentage of income spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: () => {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: function () {
      console.log(data);
    }
  };
})();

const UIController = (() => {
  let DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container'
  };

  return {
    getInput: () => {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    addListItem: (obj, type) => {
      let html, element;
      // Create HTML template literal with placeholder variables
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = `<div class="item clearfix" id="inc-${obj.id}">
                  <div class="item__description">${obj.description}</div>
                  <div class="right clearfix">
                    <div class="item__value">+ ${obj.value}</div>
                    <div class="item__delete">
                      <button class="item__delete--btn">
                        <i class="ion-ios-close-outline"></i>
                      </button>
                    </div>
                  </div>
                </div>`;
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = `<div class="item clearfix" id="exp-${obj.id}">
                  <div class="item__description">${obj.description}</div>
                  <div class="right clearfix">
                    <div class="item__value">- ${obj.value}</div>
                    <div class="item__percentage">21%</div>
                    <div class="item__delete">
                      <button class="item__delete--btn">
                        <i class="ion-ios-close-outline"></i>
                      </button>
                    </div>
                  </div>
                </div>`;
      }

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', html);
    },

    deleteListItem: (selectorID) => {
      let el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    clearFields: () => {
      // Obtain all input elements
      let fields = document.querySelectorAll(
        DOMstrings.inputDescription + ', ' + DOMstrings.inputValue
      );
      // Converts NodeList to array
      let fieldsArr = Array.prototype.slice.call(fields);
      // Clear input fields
      fieldsArr.forEach((current, index, array) => {
        current.value = '';
      });
      // Set focus to input description
      fieldsArr[0].focus();
    },

    displayBudget: (obj) => {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },

    getDOMstrings: () => {
      return DOMstrings;
    }
  };
})();

const controller = ((budgetCtrl, UICtrl) => {
  const setupEventListeners = () => {
    let DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', (event) => {
      if (event.KeyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
  };

  const updateBudget = () => {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    let budget = budgetCtrl.getBudget();
    // 3. Display budget on the UI
    UICtrl.displayBudget(budget);
  };

  // This is the main control center function of the application
  const ctrlAddItem = () => {
    // 1. Get the filled input data
    let input = UICtrl.getInput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      let item = budgetCtrl.addItem(input.type, input.description, input.value);
      // Debugging purposes
      budgetCtrl.testing();
      // 3. Add the item to the UI
      UICtrl.addListItem(item, input.type);
      // 4. Clear input fields
      UICtrl.clearFields();
      // 5. Calculate and update budget
      updateBudget();
      // 6. Display the budget on the UI
    }
  };

  const ctrlDeleteItem = (event) => {
    let itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      let splitID = itemID.split('-');
      let type = splitID[0];
      let ID = parseInt(splitID[1]);

      // 1. Delete item from data structure
      budgetCtrl.deleteItem(type, ID);
      // 2. Delete item from UI
      UICtrl.deleteListItem(itemID);
      // 3. Update and show new budget
      updateBudget();
    }
  };

  return {
    init: () => {
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();

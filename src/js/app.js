/****************************************
 * For this application we implement the
 * Module Pattern for better separation
 * of concerns & maintenance of code
 ****************************************/
const budgetController = (function () {})();

const UIController = (function () {
  let DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    }
  };
})();

const controller = (function (budgetCtrl, UICtrl) {
  let DOM = UICtrl.getDOMstrings();

  const ctrlAddItem = () => {
    // 1. Get the filled input data
    let input = UICtrl.getInput();
    console.log(input);
    // 2. Add the item to the budget controller
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI
  };

  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', (event) => {
    if (event.KeyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);

/****************************************
 * For this application we implement the
 * Module Pattern for better separation
 * of concerns & maintenance of code
 ****************************************/
const budgetController = (function () {})();

const UIController = (function () {})();

const controller = (function (budgetCtrl, UICtrl) {})(
  budgetController,
  UIController
);

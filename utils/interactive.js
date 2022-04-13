// Interactive menu for adding customers
const addCustomerQuestions = [
  {
    type: 'input',
    name: 'firstname',
    message: 'Customer first name',
  },
  {
    type: 'input',
    name: 'lastname',
    message: 'Customer last name',
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Customer phone number',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Customer email address',
  },
];

// Interactive menu for adding customers
const updateCustomerQuestions = [
  {
    type: 'input',
    name: 'firstname',
    message: 'Customer first name (leave empty for omitting)',
  },
  {
    type: 'input',
    name: 'lastname',
    message: 'Customer last name (leave empty for omitting)',
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Customer phone number (leave empty for omitting)',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Customer email address (leave empty for omitting)',
  },
];

// Filter empty answers in the prompt
const filterEmpty = (answers) => {
  Object.keys(answers).forEach((key) => {
    if (answers[key] === '') {
      delete answers[key];
    }
  });
  return answers;
};

module.exports = { addCustomerQuestions, updateCustomerQuestions, filterEmpty };

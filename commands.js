#!/usr/bin/env node
const { program, Option } = require('commander');
const { prompt } = require('inquirer');
const {
  addCustomer,
  findCustomersByName,
  updateCustomer,
  removeCustomer,
  listAllCustomers,
} = require('./index.js');
const {
  filterEmpty,
  addCustomerQuestions,
  updateCustomerQuestions,
} = require('./utils/interactive.js');

program
  .name('customer-cli')
  .description('Customer Management System')
  .version('1.0.0');

const debugOption = new Option('-d, --debug', 'display debugging information');

// Add a new customer
program
  .command('add')
  .alias('a')
  .description('Add a new customer')
  .addOption(debugOption)
  .action(({ debug }) => {
    prompt(addCustomerQuestions).then((customer) =>
      addCustomer(customer, debug)
    );
  });

// Find customers
program
  .command('find <name>')
  .alias('f')
  .description('Find customers by name')
  .addOption(debugOption)
  .action((name, { debug }) => findCustomersByName(name, debug));

// Update a customer
program
  .command('update <_id>')
  .alias('u')
  .description('Update a customer')
  .addOption(debugOption)
  .action((_id, { debug }) => {
    prompt(updateCustomerQuestions).then((answers) => {
      const nonEmptyAnswers = filterEmpty(answers);
      if (Object.keys(nonEmptyAnswers).length > 0) {
        updateCustomer(_id, answers, debug);
      } else {
        console.info('Customer not modified');
      }
    });
  });

// Remove a customer
program
  .command('remove <_id>')
  .alias('r')
  .description('Remove a customer')
  .addOption(debugOption)
  .action((_id, { debug }) => removeCustomer(_id, debug));

// List all customers
program
  .command('list')
  .alias('l')
  .description('List all customers')
  .addOption(debugOption)
  .action(({ debug }) => listAllCustomers(debug));

program.parse();

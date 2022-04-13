#!/usr/bin/env node
const { program } = require('commander');
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

// Add a new customer
program
  .command('add')
  .alias('a')
  .description('Add a new customer')
  .action(() => {
    prompt(addCustomerQuestions).then(addCustomer);
  });

// Find customers
program
  .command('find <name>')
  .alias('f')
  .description('Find customers by name')
  .action(findCustomersByName);

// Update a customer
program
  .command('update <_id>')
  .alias('u')
  .description('Update a customer')
  .action((_id) => {
    prompt(updateCustomerQuestions).then((answers) => {
      const nonEmptyAnswers = filterEmpty(answers);
      if (Object.keys(nonEmptyAnswers).length > 0) {
        updateCustomer(_id, answers);
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
  .action(removeCustomer);

// List all customers
program
  .command('list')
  .alias('l')
  .description('List all customers')
  .action(listAllCustomers);

program.parse();

# Customer Manager CLI

## About

A Node CLI for managing a database of customers hosted with MongoDB Atlas.

## Features

It has one little improvement over the code presented in the tutorial (see [Acknowledgment](#Acknowledgment)): the connection to the database is only triggered when necessary (adding or finding users). In the code from the tutorial, the connection is always established (even when doing `customer-cli help`).

Another difference is the use of a remote database (hosted with MongoDB Atlas).

Regarding the interactive menu, the documents are presented to the user without unnecessary information, like the `__v` attribute from MongoDB documents. Also, the interactive menu for updating a customer has the option of leaving attributes unchanged by typing ENTER.

## Running

Clone the repo and run either `node commands.js` or create a symlink with `npm link` and use the `customer-cli` command (run `npm unlink customer-cli` for unlinking).

## Usage

```bash
$ customer-cli help
Usage: customer-cli [options] [command]

Customer Management System

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  add|a           Add a new customer
  find|f <name>   Find customers by name
  update|u <_id>  Update a customer
  remove|r <_id>  Remove a customer
  list|l          List all customers
  help [command]  display help for command
```

### Add a new customer

```bash
$ customer-cli add
? Customer first name Johnny
? Customer last name Mnemonic
? Customer phone number 111-111-1111
? Customer email address remember@mail.com
New customer added:
{
  firstname: 'Johnny',
  lastname: 'Mnemonic',
  phone: '111-111-1111',
  email: 'remember@mail.com',
  _id: new ObjectId("625613850a42bb4f07193a3e")
}
```

### Find customers

```bash
$ customer-cli find jane
1 matches:
[
  {
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'jane@mail.com',
    phone: '333-333-3333'
  }
]
```

### List all customers

```bash
$ customer-cli list
3 matches:
[
  {
    _id: '625604964691b5053086117f',
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'jane@mail.com',
    phone: '333-333-3333'
  },
  {
    _id: '625612d5e8495a6e06f135fb',
    firstname: 'John',
    lastname: 'Rambo',
    email: 'rambo@mail.com',
    phone: '444-444-4444'
  },
  {
    _id: '625613850a42bb4f07193a3e',
    firstname: 'Johnny',
    lastname: 'Mnemonic',
    email: 'remember@mail.com',
    phone: '111-111-1111'
  }
]
```

### Remove a customer

```bash
$ customer-cli remove 625613850a42bb4f07193a3e
Customer removed:
{
  _id: new ObjectId("625613850a42bb4f07193a3e"),
  firstname: 'Johnny',
  lastname: 'Mnemonic',
  phone: '111-111-1111',
  email: 'remember@mail.com'
}
```

### Update a customer

```bash
$ customer-cli update 625612d5e8495a6e06f135fb
? Customer first name (leave empty for omitting) 
? Customer last name (leave empty for omitting) 
? Customer phone number (leave empty for omitting) 111-111-1111
? Customer email address (leave empty for omitting) 
Customer information updated:
{
  _id: new ObjectId("625612d5e8495a6e06f135fb"),
  firstname: 'John',
  lastname: 'Rambo',
  phone: '111-111-1111',
  email: 'rambo@mail.com'
}
```

## Acknowledgment

Thanks to [Brad Traversy](https://github.com/bradtraversy) for his [tutorial](https://www.youtube.com/watch?v=v2GKt39-LPA&list=PLillGF-RfqbZ2ybcoD2OaabW2P7Ws8CWu&index=10).

====
mira
====

Frontend for the Babylon API backend, designed for displaying recipes.

Description
===========

Having problems creating a new weekly menu? This website will assist in this endeavour by creating a weekly menu based on your preferences.
You can also store ingredients from your fridge and have the tool generate what you can make from your current ingredients.

Features
========

Installation
============

Examples
========

Contribute
==========

- Issue Tracker: https://github.com/t-persson/mira/issues
- Source Code: https://github.com/t-persson/mira

Support
=======

Mira is currently divided up into two parts. One flask based python application (babylon) and one nodejs application (mira).
In order to start everything up you first need to:

1. Start the API server.
2. Start the frontend.

Start the API Server
--------------------

- https://github.com/t-persson/babylon

Start the frontend
------------------

First make sure nodejs & yarn is installed

.. code-block::

    sudo apt install node
    sudo npm install yarn -g

Install all requirements

.. code-block::

    yarn install

Start the webserver

.. code-block::

    yarn start

====
Mira
====

Frontend for the Babylon API backend, designed for displaying recipes.

Description
===========

Having problems creating a new weekly menu? Want some inspiration?

This website will assist in this endeavour by creating a weekly menu based on your preferences.
You can also store ingredients from your fridge and have the tool generate what you can make from
your current ingredients.

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

Mira is currently divided up into two parts. Both uses the Flask framework as base.
In order to start everything up you first need to:

1. Start the API server.
2. Start the frontend.

Start the API Server
--------------------

- https://github.com/t-persson/babylon

Start the frontend
------------------

Create a virtual environment and activate it:

.. code-block::

    virtualenv -p python3 venv
    source venv/bin/activate

Install all requirements:

.. code-block::

    pip install -e .

Start the webserver:

.. code-block::

    export FLASK_APP=mira
    export FLASK_DEBUG=True
    flask run --host=0.0.0.0 --port=8080

Run tests
---------

All tests are located in the tests folder. All new functions should have at least one tests case.
Use pytest to run tests:

.. code-block::
   
   pytest
   coverage run -m pytest
   coverage report
   coverage html

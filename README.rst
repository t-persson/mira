====
mira
====

Recipe database for assisting in creating weekly menus and figuring out what to eat.

Description
===========

Having problems creating a new weekly menu? This website will assist in this endeavour by creating a weekly menu based on your preferences.
You can also store ingredients from your fridge and have the tool generate what you can make from your current ingredients.

DevServer
=========

Mira is currently divided up into two parts. One flask based python application (mira_api) and one nodejs application (mira_frontend).
In order to start everything up you first need to:

1. Start the API server.
2. Start the frontend.

Start the API Server
--------------------

Create a virtual environment

.. code-block::

 virtualenv -p python3 venv

Install all requirements

.. code-block::

 pip install -r requirements.txt

Initialize database

.. code-block::

    cd src
    python -m mira_api.app -i

Start the webserver

.. code-block::

 cd src
 python -m mira_api.app

Start the frontend
------------------

First make sure nodejs & yarn is installed

.. code-block::

    sudo apt install node
    sudo npm install yarn -g

Install all requirements

.. code-block::

    cd src/mira_frontend
    yarn install

Start the webserver

.. code-block::

    yarn start

Note
====

This project has been set up using PyScaffold 3.1. For details and usage
information on PyScaffold see https://pyscaffold.org/.

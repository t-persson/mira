"""Mira 2020."""
import functools
import requests
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

BLUEPRINT = Blueprint('auth', __name__, url_prefix='/auth')

@BLUEPRINT.route('/login', methods = ['GET', 'POST'])
def login():
    """Login to the application."""
    error = ""
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        if not email:
            error = 'Email is required.'
        elif not password:
            error = 'Password is required.'

        data = {"email": email, "password": password}
        response = requests.post("http://localhost:5000/login", json=data)

        if error is "" and response.json().get('status') == "success":
            data = response.json().get('data')
            session.clear()
            session['access_token'] = data.get('access_token')
            session['refresh_token'] = data.get('refresh_token')
            return redirect(url_for('index'))

        error = response.json().get('message')

    return render_template('auth/login.html', error=error)

@BLUEPRINT.route('/register', methods = ['GET', 'POST'])
def register():
    """Register a new user."""
    error = ""
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        if not username:
            error = 'Username is required.'
        elif not email:
            error = 'Email is required.'
        elif not password:
            error = 'Password is required.'

        if error is "":
            data = {"username": username, "email": email, "password": password}
            response = requests.post("http://localhost:5000/register", json=data)

            if response.json().get("status") == "success": 
                return redirect(url_for('auth.login'))

            error = response.json().get("message")

    return render_template('auth/register.html', error=error)


@BLUEPRINT.route('/forgot_password', methods = ['GET', 'POST'])
def forgot_password():
    """Restore password for user."""
    return render_template('auth/forgot_password.html')

@BLUEPRINT.route('/logout')
def logout():
    """Destroy and clear session of logged in user."""
    session.clear()
    return redirect(url_for('auth.login'))

def login_required(view):
    """Decorator for viewes that requires the user to be logged in."""
    @funtools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)
    return wrapped_view

from datetime import timedelta
import bcrypt
from flask import make_response, jsonify, request
from flask.views import MethodView
from mira_api.models.auth import User
from flask_jwt_extended import (
    create_access_token, create_refresh_token, jwt_required, get_jwt_identity
)


class LoginAPI(MethodView):

    def post(self):
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request."}), 400
        post_data = request.get_json()
        if post_data.get("email") is None:
            return jsonify({"msg": "Missing 'email' in JSON."}), 400
        if post_data.get("password") is None:
            return jsonify({"msg": "Missing 'password' in JSON."}), 400

        try:
            user = User.query.filter_by(
                email=post_data.get("email")
            ).first()
            if user and bcrypt.checkpw(post_data.get("password").encode("UTF-8"),
                                       user.password):
                access_token = create_access_token(identity=user.email, expires_delta=timedelta(days=0, seconds=60))
                refresh_token = create_refresh_token(identity=user.email)
                response_object = {
                    "access_token": access_token,
                    "refresh_token": refresh_token
                }
                return make_response(jsonify(response_object)), 200
            else:
                response_object = {
                    "status": "failed",
                    "message": "Email or password incorrect."
                }
                return make_response(jsonify(response_object)), 400
        except Exception as exception:
            # TODO: Log this event in server logs.
            response_object = {
                "status": "failed",
                "message": "Try again."
            }
            return make_response(jsonify(response_object)), 500


class Status(MethodView):

    @jwt_required
    def get(self):
        current_user = get_jwt_identity()
        user = User.query.filter_by(email=current_user).first()
        response_object = {
            "status": "success",
            "data": {
                "user_id": user.id,
                "email": user.email,
                "admin": user.admin,
                "registered_on": user.registered_on
            }
        }
        return jsonify(response_object), 200

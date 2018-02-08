package de.eismaenners.auth;

import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.auth.AuthProvider;
import io.vertx.ext.auth.User;

public class CustomUser implements User {

    private final String password;

    public CustomUser(String password) {
        this.password = password;
    }

    public boolean checkPassword(String password) {
        return this.password.equals(password);
    }

    @Override
    public User isAuthorized(String string, Handler<AsyncResult<Boolean>> hndlr) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public User clearCache() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public JsonObject principal() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void setAuthProvider(AuthProvider ap) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

}

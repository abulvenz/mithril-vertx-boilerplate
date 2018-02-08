package de.eismaenners.auth;

import io.vertx.core.AsyncResult;
import io.vertx.ext.auth.User;
import java.util.Optional;
import javax.security.auth.login.LoginException;

public class CustomUserResult implements AsyncResult<User> {

    private final Optional<User> requestedUser;

    public CustomUserResult(Optional<User> requestedUser) {
        this.requestedUser = requestedUser;
    }

    @Override
    public User result() {
        return requestedUser.get();
    }

    @Override
    public Throwable cause() {
        return new LoginException("Login failed.");
    }

    @Override
    public boolean succeeded() {
        return requestedUser.isPresent();
    }

    @Override
    public boolean failed() {
        System.err.println("failed: " + !requestedUser.isPresent());
        return !requestedUser.isPresent();
    }

}

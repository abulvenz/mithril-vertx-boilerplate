package de.eismaenners.auth;

import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.auth.AuthProvider;
import io.vertx.ext.auth.User;
import java.util.Map;
import java.util.Optional;

public class CustomAuthProvider implements AuthProvider {

    public static CustomAuthProvider create() {
        return new CustomAuthProvider();
    }

    /**
     * This initialization is the only java 9 stuff in this code. If you need 8,
     * just transform this.
     */
    Map<String, CustomUser> users = Map.of(
            "iceman", new CustomUser("abc"),
            "karl", new CustomUser("bcd")
    );

    public JsonArray getUsers() {
        JsonArray result = new JsonArray();
        users.keySet().forEach(username -> result.add(new JsonObject().put("username", username)));
        return result;
    }

    public String getUser(String username) {
        if (Optional.ofNullable(users.containsKey(username)).isPresent()) {
            return username;
        }
        return "";
    }

    public CustomAuthProvider() {

    }

    @Override
    public void authenticate(JsonObject jo, Handler<AsyncResult<User>> hndlr) {
        final String username = jo.getString("username");
        final String password = jo.getString("password");

        Optional<User> requestedUser = Optional.ofNullable(null);

        if (username != null && password != null) {
            if (users.containsKey(username)) {
                CustomUser user = users.get(username);
                if (user.checkPassword(password)) {
                    requestedUser = Optional.of(user);
                }
            }
        }

        hndlr.handle(new CustomUserResult(requestedUser));
    }
}

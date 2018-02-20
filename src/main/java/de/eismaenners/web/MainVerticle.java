package de.eismaenners.web;

import de.eismaenners.auth.CustomAuthProvider;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpHeaders;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.auth.AuthProvider;
import io.vertx.ext.mongo.MongoClient;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CookieHandler;
import io.vertx.ext.web.handler.RedirectAuthHandler;
import io.vertx.ext.web.handler.SessionHandler;
import io.vertx.ext.web.handler.UserSessionHandler;
import io.vertx.ext.web.sstore.LocalSessionStore;

public class MainVerticle extends AbstractVerticle {

    public static String publicApiUrl = "/api";
    public static String protectedApiUrl = "/api/protected";
    private static final String WEBROOT = "src/main/webroot";
    public static final String MONGO_DB_DEFAULT_NAME = "my_application";

    @Override
    public void start() {

        Router router = Router.router(vertx);

        MongoClient database = createDatabaseConnection();

        router.route().handler(CookieHandler.create());
        router.route().handler(BodyHandler.create());
        router.route().handler(SessionHandler.create(LocalSessionStore.create(vertx)));

        CustomAuthProvider authProvider = CustomAuthProvider.create();
        router.route().handler(UserSessionHandler.create(authProvider));

        router.route(protectedApiUrl + "/*")
                .handler(RedirectAuthHandler.create(authProvider, "/psst"));

        router.route().handler(debugPrintUser());

        router.get("/login").handler(rerouteFrontEndRoute());
        router.get("/editor").handler(rerouteFrontEndRoute());

        router.post(publicApiUrl + "/login").handler(handleLogin(authProvider));
        router.post(publicApiUrl + "/logout").handler(handleLogout(authProvider));
        router.get(publicApiUrl + "/loggedin").handler(userIsLoggedInAsJson());

        router.get(protectedApiUrl + "/users").handler(listUsers(authProvider));
        router.get(protectedApiUrl + "/users/:id").handler(getUserById(authProvider));
        router.put(protectedApiUrl + "/users/:id").handler(putUserById(authProvider));

        router.get(protectedApiUrl + "/:collection").handler(listCollection(database));
        router.get(protectedApiUrl + "/:collection/:id").handler(getCollectionElementById(database));
        router.put(protectedApiUrl + "/:collection/:id").handler(putElementById(database));

        router.route("/eventbus/*").handler(forbidEventbusIfLoggedOut());

        router.get("/").handler(sendHomepage());

        router.route().handler(CustomStaticRouteHandler
                .create(WEBROOT)
                .setCachingEnabled(false)
        );

        router.route().handler(printUnhandledPathAndFailure());
        router.route().failureHandler(onError());

        vertx.createHttpServer()
                .requestHandler(router::accept)
                .listen(8080);
    }

    private Handler<RoutingContext> debugPrintUser() {
        return ctx -> {
            System.err.println("ROUTE PATH " + ctx.request().path() + " METHOD " + ctx.request().method() + " USER: " + (ctx.user() != null));
            ctx.next();
        };
    }

    private Handler<RoutingContext> rerouteFrontEndRoute() {
        return ctx -> {
            System.err.println("Rerouting /login to /");
            ctx.reroute("/");
        };
    }

    private Handler<RoutingContext> onError() {
        return ctx -> {
            System.out.println("de.eismaenners.web.MainVerticle.onError()");
            System.err.println("FAILURE " + ctx.request().path());
            System.out.println("params: " + ctx.request().params());
            // ctx.reroute("/");
        };
    }

    private Handler<RoutingContext> printUnhandledPathAndFailure() {
        return (ctx) -> {
            System.err.println("STILL NOT HANDLED: " + ctx.request().path());
            System.err.println("failed: " + ctx.failed());
            if (ctx.failed()) {
                System.err.println(ctx.failure().getMessage());
            }
            ctx.next();
        };
    }

    private Handler<RoutingContext> sendHomepage() {
        return (ctx) -> {
            ctx.response()
                    .setStatusCode(200)
                    .sendFile(WEBROOT + "/index.html");
        };
    }

    private Handler<RoutingContext> forbidEventbusIfLoggedOut() {
        return ctx -> {
            // we need to be logged in
            if (ctx.user() == null) {
                ctx.fail(403);
            } else {
                System.out.println("Logged in, starting eventbus");
                ctx.next();
            }
        };
    }

    private Handler<RoutingContext> putUserById(CustomAuthProvider authProvider) {
        return ctx -> {
            final String user = authProvider.getUser(param(ctx, "id"));
            if (user.isEmpty()) {
                ctx.response().setStatusCode(404).end();
            } else {
                // TODO: Overwrite the user here.
                jsonResponse(ctx).end(new JsonObject().put("username", user).encodePrettily());
            }
        };
    }

    private Handler<RoutingContext> getUserById(CustomAuthProvider authProvider) {
        return ctx -> {
            final String user = authProvider.getUser(param(ctx, "id"));
            if (user.isEmpty()) {
                ctx.response().setStatusCode(403).end();
            } else {
                // TODO: is this where we return the principal?
                jsonResponse(ctx).end(new JsonObject().put("username", user).encodePrettily());
            }
        };
    }

    private Handler<RoutingContext> listUsers(CustomAuthProvider authProvider) {
        return ctx -> {
            jsonResponse(ctx).end(authProvider.getUsers().encodePrettily());
        };
    }

    private Handler<RoutingContext> handleLogout(AuthProvider authProvider) {
        return ctx -> {
            ctx.clearUser();
            jsonResponse(ctx).end("{}");
        };
    }

    private Handler<RoutingContext> handleLogin(AuthProvider authProvider) {
        return ctx -> {
            JsonObject credentials = ctx.getBodyAsJson();

            if (credentials == null) {
                // bad request
                ctx.fail(400);
                ctx.response().end("{}");
                return;
            }

            // use the auth handler to perform the authentication for us
            authProvider.authenticate(credentials, login -> {
                // error handling
                if (login.failed()) {
                    System.err.println("Login failed");
                    // forbidden
                    ctx.response().setStatusCode(403);
                    ctx.response().setStatusMessage("Du kommst hier nicht rein.");
                    jsonResponse(ctx).end("{}");
                    return;
                }
                ctx.setUser(login.result());
                jsonResponse(ctx).end("{}");
            });
        };
    }

    /**
     * Apply status code 200 and put header content type json
     *
     * @param ctx
     * @return the response of the supplied context
     */
    private HttpServerResponse jsonResponse(RoutingContext ctx) {
        return ctx.response().setStatusCode(200).putHeader(HttpHeaders.CONTENT_TYPE, "application/json");
    }

    private Handler<RoutingContext> userIsLoggedInAsJson() {
        return ctx -> {
            jsonResponse(ctx).end(new JsonObject().put("loggedIn", ctx.user() != null).encodePrettily());
        };
    }

    private Handler<RoutingContext> listCollection(MongoClient database) {
        return (ctx) -> {
            String collection = param(ctx, "collection");

            database.find(collection, new JsonObject(), listQuery -> {
                jsonResponse(ctx).end(
                        listQuery.result()
                                .stream()
                                .collect(
                                        JsonArray::new,
                                        JsonArray::add,
                                        JsonArray::addAll
                                ).encode());
            });
        };
    }

    private Handler<RoutingContext> getCollectionElementById(MongoClient database) {
        return (ctx) -> {
            String collection = param(ctx, "collection");
            final JsonObject find = new JsonObject().put("_id", param(ctx, "id"));

            database.findOne(collection, find, new JsonObject(), getQuery
                    -> returnMongoObject(ctx, getQuery)
            );
        };
    }

    public void returnMongoObject(RoutingContext ctx, AsyncResult<JsonObject> query) {
        jsonResponse(ctx).end(
                query.result().encode());
    }

    private Handler<RoutingContext> putElementById(MongoClient database) {
        return (ctx) -> {
            String collection = param(ctx, "collection");
        };
    }

    public String param(RoutingContext ctx, final String param) {
        return ctx.request().getParam(param);
    }

    private MongoClient createDatabaseConnection() {
        JsonObject config = Vertx.currentContext().config();

        String uri = config.getString("mongo_uri");
        if (uri == null) {
            uri = "mongodb://127.0.0.1:27017";
        }
        String db = config.getString("mongo_db");
        if (db == null) {
            db = MONGO_DB_DEFAULT_NAME;
        }

        JsonObject mongoconfig = new JsonObject()
                .put("connection_string", uri)
                .put("db_name", db);

        MongoClient mongoClient = MongoClient.createShared(vertx, mongoconfig);
        return mongoClient;
    }

    public static void main(String[] args) {
        Vertx vertx = Vertx.vertx();
        vertx.deployVerticle(new MainVerticle());
    }
}

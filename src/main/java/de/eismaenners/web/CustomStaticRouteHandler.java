package de.eismaenners.web;

import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.StaticHandler;
import io.vertx.ext.web.handler.impl.StaticHandlerImpl;

public class CustomStaticRouteHandler extends StaticHandlerImpl {

    @Override
    public void handle(RoutingContext context) {
        System.err.println("STATIC " + context.request().path());
        super.handle(context);
    }

    public static StaticHandler create(String webroot) {
        return new CustomStaticRouteHandler().setWebRoot(webroot);
    }

}

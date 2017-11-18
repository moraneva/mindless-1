# mindless
Library for creating APIs with TypeScript

### Router
This mindless router is extremely lightweight and flexible.
#### Defining your routes
* The simplest way to write your routes is to create a `MindlessRoutes` object. Here The `AuthController` and `UserController` should both extend the `Controller` class. While the `AuthMiddleware` should extend the `Middleware` class.
```ts
/**
 * MindlessRoutes is equivalent to
 * Routes<Middleware, Controller, Route<Middelware, Controller>> where
 * Middleware and Controller are the 
 * Framework's base classes for middlewares and controllers.
 */
const routes: MindlessRoutes = {
  middleware: [],
  routes: {
    "/login": {
      middleware: [],
      post: { controller: AuthController, function: "login", middleware: [] }
    },
    "/user": {
      get: { controller: UserController, function: "getAll"},
      post: { controller: UserController, function: "create", middleware: [AuthMiddleware] }
    }
  }
};
```
* If you want to extend the base controller and base middleware classes you may use the `Routes<M extends Middleware, C extends Controller, R extends Route<M,C>>` generic
* The Routes object is exteremly flexible, for example say we want to add functionality to gate routes based on permissions. Then we can simply add a `permissions` property to our `Route` object
```ts
interface PermissionRoute<M extends Middleware, C extends Controller> extends Route<M, C> {
    permissions?: string[]
}

type PermissionRoutes<M, C> = Routes<M extends Middleware, C extends Controller, PermissionRoute<M, C>>;

const routes: PermissionRoutes<Middleware, Controller> = {
  middleware: [],
  routes: {
    "/user": {
      get: { controller: UserController, function: "getAll", permissions: ["Assistant"]},
      post: { controller: UserController, function: "create", middleware: [AuthMiddleware], permissions: ["Admin"]}
    }
  }
};
```
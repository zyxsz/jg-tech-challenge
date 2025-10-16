import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";
import { RootLayout } from "./routes/layouts/root.layout.tsx";
import { PrivateLayout } from "./routes/layouts/private.layout.tsx";
import { PublicLayout } from "./routes/layouts/public.layout.tsx";
import { HomePage } from "./routes/(privateRoutes)/home.page.tsx";
import { LoginPage } from "./routes/(publicRoutes)/login.page.tsx";
import { Providers } from "./providers/index.tsx";
import { RegisterPage } from "./routes/(publicRoutes)/register.page.tsx";
import { TasksPage } from "./routes/(privateRoutes)/tasks/tasks.page.tsx";
import { TaskDetailsPage } from "./routes/(privateRoutes)/tasks/task-details.page.tsx";
import { CreateTaskPage } from "./routes/(privateRoutes)/tasks/create-task.page.tsx";
import { UpdateTaskPage } from "./routes/(privateRoutes)/tasks/update-task.page.tsx";

const rootRoute = createRootRoute({
  component: RootLayout,
});

// Layouts

const privateRoutes = createRoute({
  getParentRoute: () => rootRoute,
  component: PrivateLayout,
  id: "privateRoutes",
});

const publicRoutes = createRoute({
  getParentRoute: () => rootRoute,
  component: PublicLayout,
  id: "publicRoutes",
});

// Public routes

const loginPageRoute = createRoute({
  getParentRoute: () => publicRoutes,
  path: "/login",
  component: LoginPage,
});

const registerPageRoute = createRoute({
  getParentRoute: () => publicRoutes,
  path: "/register",
  component: RegisterPage,
});

// Private routes

const homePageRoute = createRoute({
  getParentRoute: () => privateRoutes,
  path: "/",
  component: HomePage,
});

const tasksPageRoute = createRoute({
  getParentRoute: () => privateRoutes,
  path: "/tasks",
  component: TasksPage,
});

const taskDetailsRoute = createRoute({
  getParentRoute: () => privateRoutes,
  path: "/tasks/$taskId",
  component: TaskDetailsPage,
});

const updateTaskRoute = createRoute({
  getParentRoute: () => privateRoutes,
  path: "/tasks/$taskId/update",
  component: UpdateTaskPage,
});

const createTaskRoute = createRoute({
  getParentRoute: () => privateRoutes,
  path: "/tasks/create",
  component: CreateTaskPage,
});

const routeTree = rootRoute.addChildren([
  privateRoutes.addChildren([homePageRoute]),
  publicRoutes.addChildren([
    loginPageRoute,
    registerPageRoute,
    createTaskRoute,
    updateTaskRoute,
    tasksPageRoute,
    taskDetailsRoute,
  ]),
]);

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

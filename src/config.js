import Home from "./views/Home";
import Login from "./views/Login";
import Projects from "./views/Projects";
import Project from "./views/Project";

export default {
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/projects",
      name: "Projects",
      component: Projects
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/project/:id",
      name: "Project",
      component: Project
    }
  ],

  links: [
    {
      path: "/",
      name: "Home",
      icon: "home"
    },
    {
      path: "/projects",
      name: "Projecten",
      icon: "list"
    }
  ],

  backend: {
    url: "http://localhost:3000",
    endpoints: {
      projects: "/repository",
      refreshUrl: "/repository/sync"
    }
  }
};

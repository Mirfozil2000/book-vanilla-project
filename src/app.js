import onChange from "on-change";
import { MainView } from "./views/main/main";
import { FavoritesView } from "./views/favorites/favorites";
import { BookView } from "./views/book/book";

class App {
    routes = [
        { path: '', view: MainView },
        {path: '#favorites', view: FavoritesView},
        {path: '/book/:id', view: BookView},
    ]
    appState = {
        favorites: []
    }
    constructor() {
        window.addEventListener('hashchange', this.route.bind(this))
        this.route();
    };
    route() {
        if (this.currentView) {
            this.currentView.destroy();
        }
        const route = this.routes.find(r => r.path === location.hash);
        if (route) {
            const ViewClass = route.view;
            this.currentView = new ViewClass(this.appState);
            this.currentView.render();
        }
    }
}

new App();
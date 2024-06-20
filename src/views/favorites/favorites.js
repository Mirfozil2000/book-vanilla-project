import onChange from "on-change";
import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import { Search } from "../../components/search/search";
import { CardList } from "../../components/card-list/card-list";

export class FavoritesView extends AbstractView {
    constructor(appState) {
        super();
        this.appState = onChange(appState, this.appStateHook.bind(this));
        this.setTitle('Мои избранные книги');
    }
    destroy() {
        onChange.unsubscribe(this.appState)
    }
    appStateHook(path) {
        if (path === 'favorites') {
            this.render();
        }
    }
    render() {
        const main = document.createElement('div');
        main.innerHTML = `
            <h1>Ваши избранные книги</h1>
        `
        main.append(new CardList(this.appState, { list: this.appState.favorites }).render());
        this.app.innerHTML = '';
        this.renderHeader()
        this.app.append(main);
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}

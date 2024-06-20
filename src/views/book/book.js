import onChange from "on-change";
import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import { Search } from "../../components/search/search";
import { CardList } from "../../components/card-list/card-list";

export class BookView extends AbstractView {
    state = {
        list: [],
        loading: false,
        numFound: 0,
        searchQuery: undefined,
        offset: 0
    }
    constructor(appState) {
        super();
        this.appState = onChange(appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle('Поиск Книг');
    }

    destroy() {
        onChange.unsubscribe(this.appState)
        onChange.unsubscribe(this.state)
    }

    appStateHook(path) {
        if (path === 'favorites') {
            this.render();
        }
    }

    async stateHook(path) {
        if (path === 'searchQuery') {
            this.state.loading = true;
            const data = await this.loadList(this.state.searchQuery, this.state.offset);
            this.state.loading = false;
            this.state.numFound = data.numFound;
            this.state.list = data.docs;
        }
        if (path === 'loading' || path === 'list') {
            this.render()
        }
    }

    async loadList(q, offset) {
        const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}`);
        return res.json();
    }

    render() {
        const main = document.createElement('div');
        main.append(new Search(this.state).render());
        main.append(new CardList(this.appState, this.state).render());
        this.app.innerHTML = '';
        this.renderHeader()
        this.app.append(main);
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}

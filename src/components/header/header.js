import { DivComponent } from "../../common/div-component";
import './header.css';
export class Header extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }
    render() {
        this.el.innerHTML = '';
        this.el.classList.add('header')
        this.el.innerHTML = `
            <div>
                <img src="/public/logo.svg" alt="logo" />
            </div>
            <div class="menu">
                <a class="menu__item" href="#">
                    <img src="/public/search.svg" alt="search" />
                    Поиск книг
                </a>
                <a class="menu__item" href="#favorites">
                    <img src="/public/favorites.svg" alt="favorite" />
                    Избранное
                    <div class="menu__counter">
                        ${this.appState.favorites.length}
                    </div>
                </a>
            </div>
        `
        return this.el;
    }
}
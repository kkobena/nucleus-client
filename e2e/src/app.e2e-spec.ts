import {EcuadorPage} from './app.po';

describe('Ecuador App', () => {
    let page: EcuadorPage;

    beforeEach(() => {
        page = new EcuadorPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Welcome to Avalon!');
    });
});

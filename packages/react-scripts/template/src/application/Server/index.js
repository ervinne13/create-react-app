
import DummySSRComponent from 'App/Client/DummySSRComponent';

export const appHandler = (app) => {

    //  do your stuff here
    app.get('/', (req, res) => res.send('Hello World!'));
    app.get('/dummy-ssr', (req, res) => res.send(<DummySSRComponent />));
};
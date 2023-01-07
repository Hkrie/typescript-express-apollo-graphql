import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import {createServer} from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';

const setupServer = async () => {
    const app = express();
    const server = new ApolloServer({
        schema,
        validationRules: [depthLimit(7)],
    });
    app.use('*', cors());
    app.use(compression());

    app.get('/', function (req, res) {
        res.sendFile(`${__dirname}/public/home.html`);
    });

    await server.start().catch(e => {
        throw new Error(e)
    });
    server.applyMiddleware({app, path: '/graphql'});
    const httpServer = createServer(app);
    httpServer.listen(
        {port: 3000},
        (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`)
    );
}
setupServer()
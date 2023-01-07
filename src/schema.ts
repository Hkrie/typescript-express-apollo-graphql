import 'graphql-import-node';
import * as typeDefs from './schema/schema.graphql';
import { stitchSchemas } from '@graphql-tools/stitch'
import resolvers from './resolverMap';
import { GraphQLSchema } from 'graphql';
const schema: GraphQLSchema = stitchSchemas({
    typeDefs,
    resolvers,
});
export default schema;
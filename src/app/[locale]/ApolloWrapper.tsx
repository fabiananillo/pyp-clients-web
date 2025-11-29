import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import useAuthStore from '@/hooks/useAuthStore';


const graphqlUrl: string = process.env.NEXT_PUBLIC_GRAPHQL_URL || "";
const subscriptionUrl: string = process.env.NEXT_PUBLIC_SUBSCRIPTION_URL || "";

// Create an HTTP link
const httpLink = new HttpLink({
  uri: graphqlUrl,
});

// Auth link for adding authorization headers
const authLink = setContext((_, { headers }) => {
  const token = useAuthStore.getState ? useAuthStore.getState().token : "";
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: subscriptionUrl,
  }),
);

// Use split to choose between HTTP and WebSocket links based on the operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

export default function createApolloClient() {
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
}

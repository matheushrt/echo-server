import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    user(email: String!): User
  }

  type User {
    id: ID!
    display_name: String
    email: String
    external_urls: ExternalURL
    href: String
    images: [Image]
    product: String
    type: String
    uri: String
  }

  type Image {
    height: String
    url: String
    width: String
  }

  type ExternalURL {
    spotify: String
  }
`;

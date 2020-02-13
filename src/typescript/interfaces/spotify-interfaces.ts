interface AuthorizeQueryParams {
  client_id: string;
  response_type: string;
  redirect_uri: string;
  state?: string;
  scope?: string;
  show_dialog?: boolean;
}

interface TokenBodyParams {
  grant_type: 'authorization_code' | 'refresh_token';
  redirect_uri: string;
  code?: string;
  refresh_token?: string;
}

interface AuthorizationResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  tokenExpirationTime?: number;
}

interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  images: SpotifyImage[];
  product: string;
  type: string;
  uri: string;
}

interface SpotifyImage {
  height: string;
  url: string;
  width: string;
}

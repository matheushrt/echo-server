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

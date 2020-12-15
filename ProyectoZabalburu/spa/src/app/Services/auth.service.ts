import AuthenticationContext, { UserInfo } from 'adal-angular';
export class AuthenticationService {
    private static authenticationContext: AuthenticationContext;
    private static config: AuthenticationContext.Options;
   
    public initialize(config: AuthenticationContext.Options): Promise<void> {
        AuthenticationService.config = config;
        AuthenticationService.authenticationContext = new AuthenticationContext(config);
        return new Promise((resolve, reject) => {
            if (AuthenticationService.authenticationContext.isCallback(window.location.hash) || window.self !== window.top) {
                AuthenticationService.authenticationContext.handleWindowCallback();
                resolve();
            } else {
                const user: UserInfo = AuthenticationService.authenticationContext.getCachedUser();
                if (user) {
                    
                    resolve();
                } else {
                    this.signIn();
                }
            }
        });
    }


    public acquireToken(): Promise<string> {
        return new Promise((resolve, reject) => {
          AuthenticationService.authenticationContext.acquireToken(
            AuthenticationService.config.clientId,
            (error, token) => {
              if (error || !token) {
                return reject(error);
              } else {
                return resolve(token);
              }
            });
        });
      }

    public signIn(): void {
        AuthenticationService.authenticationContext.login();
    }

    public signOut(): void {
        AuthenticationService.authenticationContext.logOut();
    }

    public isAuthenticated(): boolean {
        return !!AuthenticationService.authenticationContext.getCachedToken(AuthenticationService.config.clientId);
    }

    public getUserProfile(): any {
        return AuthenticationService.authenticationContext.getCachedUser().profile;
    }
}

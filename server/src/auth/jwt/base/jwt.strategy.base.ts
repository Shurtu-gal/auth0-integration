import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAuthStrategy } from 'src/auth/IAuthStrategy';
import { UserService } from 'src/user/user.service';
import { Auth0User } from './User';
import { EnumUserPriority } from 'src/user/base/EnumUserPriority';

export class JwtBaseStrategy 
  extends PassportStrategy(Strategy) 
  implements IAuthStrategy 
{
  constructor(
    protected readonly configService: ConfigService,
    protected readonly userService: UserService,  
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
      audience: configService.get('AUTH0_AUDIENCE'), // The resource server where the JWT is processed
      issuer: `${configService.get('AUTH0_ISSUER_URL')}`, // The issuing Auth0 server
      algorithms: ['RS256'], // Asymmetric signing algorithm

      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get('AUTH0_ISSUER_URL')}.well-known/jwks.json`,
      }),
    });
  }

  // Validate the received JWT and construct the user object out of the decoded token.
  async validate(payload: any) {
    const { email, name, picture, family_name, given_name, nickname, username } = payload.user as Auth0User;
    const user = await this.userService.findOne({ 
      where: { 
        name_email: { email, name },
      },
    });

    //  Create a new user if none exists
    if (!user) {
      const newUser = await this.userService.create({
        data: {
          name,
          email,
          roles: ["user"], // TODO: Add a default role
          username: username || nickname,
          age: 0,
          birthDate: new Date(),
          score: 0,
          interests: [],
          priority: EnumUserPriority.Low,
          isCurious: false,
          location: "(32.085300, 34.781769)",
          extendedProperties: {
            picture,
            family_name,
            given_name,
          },
          bio: ""
        }
      })

      return { ...newUser, roles: newUser?.roles as string[] };
    }

    return { ...user, roles: user?.roles as string[] };
  }
}

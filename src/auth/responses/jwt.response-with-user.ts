import { User } from '../../users/entities/user.entity';

// note the current return value is offered for convenience
// requested by client
//   https://piki-inc.slack.com/archives/C01E0AH2PFH/p1606429960000100?thread_ts=1606410553.000600&cid=C01E0AH2PFH
// there are valid reasons to not return the user
//   when issuing and returning a token
// softwareengineering.stackexchange.com/questions/419384
// (Should I return user data in an authentication endpoint using JWT?)
//
export class JwtResponseWithUser {
  public readonly access_token: string;
  public readonly user: User;
}

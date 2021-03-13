export class AgoraRoom {
  appId: string;
  roomName: string;
  roomId: number;
  channelName: string;
  thumbnail: string;
  muteAllChat: number;
  state: number;
  type: number;
  currentUsers: number;
  owner: {
    uid: number;
    userId: number;
  };
}

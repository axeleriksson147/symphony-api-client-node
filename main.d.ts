declare namespace Symphony {

  export interface ErrorResponse {
    code: number;
    message: string;
  }

  export interface SendMessageResponse {
    messageId: string;
    timestamp: number;
    message: string;
    user: {
      userId: number;
      displayName: string;
      email: string;
      username: string;
    };
    stream: Stream;
    userAgent: string;
    originalFormat: string;
    sid: string;
  }

  export interface Message {
    messageId: string;
    timestamp: number;
    message: string;
    data: string;
    user: User;
    stream: Stream;
    externalRecipients: boolean;
    userAgent: string;
    originalFormat: string;
    sid: string;
    messageText: string;
  }

  export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    username: string;
  }

  export interface Stream {
    streamId: string;
    streamType: string;
  }

  export interface BotUser {
    id: number;
    firstName: string | null;
    lastName: string | null;
    displayName: string;
    title: string | null;
    company: string | null;
    username: string;
    location: string | null;
    accountType: string;
    avatars: object[];
    workPhoneNumber: any;
    mobilePhoneNumber: any;
    jobFunction: any;
    department: any;
    division: any;
    roles: any[]
  }

  export const MESSAGEML_FORMAT: 'messageML'

  export const PRESENTATIONML_FORMAT: 'presentationML'

  export const sessionToken: {
  }

  export function acceptConnectionRequest(userId: number, sessionToken: any): void;

  export function activateRoom(streamId: string): void;

  export function addMemberToRoom(streamId: string, userId: number): any;

  export function adminListEnterpriseStreamsV2(streamTypes: any, scope: any, origin: any, privacy: any, status: any, startDate: any, endDate: any, skip: any, limit: any): any;

  export function authenticateBot(SymConfig: any): any;

  export function authenticateExtApp(): any;

  export function authenticateOboApp(): any;

  export function createRoom(room: any, description: any, keywords: any, membersCanInvite: any, discoverable: any, anyoneCanJoin: any, readOnly: any, copyProtected: any, crossPod: any, viewHistory: any): any;

  export function createSignal(name: any, query: any, visibleOnProfile: any, companyWide: any, sessionToken: any): any;

  export function deactivateRoom(streamId: string): void;

  export function deleteSignal(id: any, sessionToken: any): void;

  export function demoteUserFromOwner(streamId: string, userId: number): any;

  export function formBuilder(formId: any): any;

  export function forwardMessage(conversationId: any, message: any, data: any): any;

  export function getAcceptedConnections(sessionToken: any): void;

  export function getAllConnections(sessionToken: any): void;

  export function getAttachment(streamId: string, attachmentId: any, messageId: any): any;

  export function getBotUser(): BotUser;

  export function getCashtags(message: any): any;

  export function getConnectionRequestStatus(userId: number, sessionToken: any): void;

  export function getConnections(status: any, userIds: any, sessionToken: any): void;

  export function getDatafeedEventsService(options: {
    onMessage: any;
    onError: any;
  }): any;

  export function getFirehoseEventsService(subscriberCallback: any): void;

  export function getHashtags(message: any): any;

  export function getInboundPendingConnections(sessionToken: any): void;

  export function getMentions(message: any): any;

  export function getMessage(messageId: any): void;

  export function getMessages(streamId: string, since: any, skip: any, limit: any): void;

  export function getPendingConnections(sessionToken: any): void;

  export function getRejectedConnections(sessionToken: any): void;

  export function getRoomInfo(streamId: string): void;

  export function getRoomMembers(streamId: string): void;

  export function getSignal(id: any, sessionToken: any): void;

  export function getSignalSubscribers(id: any, skip: any, limit: any, sessionToken: any): void;

  export function getUser(id: any): Promise<any | ErrorResponse>;

  export function getUserFromEmail(email: any, local: any): void;

  export function getUserFromUsername(username: any): void;

  export function getUserIMStreamId(userIDs: any): void;

  export function getUserPresence(userId: number, local: any): void;

  export function getUserStreams(skip: any, limit: any, streamTypes: any, includeInactiveStreams: any): any;

  export function getUsersFromEmailList(email: any, local: any): void;

  export function getUsersFromIdList(id: any, local: any): void;

  export function importMessages(messageList: any): any;

  export function initBot(pathToConfigFile: any, pathToLoadBalancerConfigFile?: any): any;

  export function listSignals(skip: any, limit: any, sessionToken: any): void;

  export function listUsers(skip: any, limit: any): void;

  export function oboAuthenticateByUserId(userId: number): any;

  export function oboGetAllConnections(status: any): void;

  export function oboGetConnection(userId: number): void;

  export function oboGetUserIMStreamId(userToken: any, userIds: any): void;

  export function oboSendMessage(userToken: any, conversationId: any, message: any, data: any, format: any): any;

  export function promoteUserToOwner(streamId: string, userId: number): any;

  export function registerInterestExtUser(): void;

  export function rejectConnectionRequest(userId: number, sessionToken: any): void;

  export function removeConnection(userId: number, sessionToken: any): void;

  export function removeMemberFromRoom(streamId: string, userId: number): any;

  export function searchRooms(skip: any, limit: any, query: any, labels: any, active: any, includePrivateRooms: any, creator: any, owner: any, member: any, sortOrder: any): any;

  export function searchUsers(query: any, local: any, skip: any, limit: any, filter: any): any;

  export function sendConnectionRequest(userId: number, sessionToken: any): void;

  export function sendMessage(conversationId: string, message: string, data: any | undefined, format: 'messageML' | 'presentationML', sessionToken?: any): SendMessageResponse | ErrorResponse;

  export function sendMessageWithAttachment(conversationId: string, message: string, data: any | undefined, fileName: any, fileType: any, fileContent: any, format: 'messageML' | 'presentationML'): any;

  /**
   * Set the debug mode of the bot to 'on' or 'off'
   * @param mode If true, sets debug mode to 'on'
   */
  export function setDebugMode(mode: boolean): void

  export function setPresence(status: any): any;

  export function stopDatafeedEventsService(): void;

  export function stopFirehoseEventsService(): void;

  export function streamMembers(id: any, skip: any, limit: any): void;

  export function subscribeSignal(id: any, userIds: any, userCanUnsubscribe: any, sessionToken: any): void;

  export function suppressMessage(id: any): void;

  export function unsubscribeSignal(id: any, userIds: any, sessionToken: any): void;

  export function updateRoom(streamId: string, room: any, description: any, keywords: any, membersCanInvite: boolean, discoverable: boolean, anyoneCanJoin: boolean, readOnly: boolean, copyProtected: boolean, crossPod: boolean, viewHistory: any): any;

  export function updateSignal(id: any, name: any, query: any, visibleOnProfile: any, companyWide: any, sessionToken: any): any;

  export function verifyJwt(jwt: string): any;

}

declare module 'symphony-api-client-node' {
  export = Symphony;
}

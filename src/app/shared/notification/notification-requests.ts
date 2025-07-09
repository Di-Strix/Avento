export namespace NotificationRequests {
  export interface Notification {
    author: { id: string; name: string; avatar: string };
    comment: { id: string; title: string; content: string };
    createdAt: string;
    id: string;
    read: boolean;
    trip: { id: string; name: string };
  }

  export namespace GetNotifications {
    export interface Request {
      read: boolean;
    }

    export type Response = Notification[];
  }

  export namespace MarkNotificationRead {
    export interface Request {}

    export interface Response {
      message: string;
    }
  }

  export type WSNotification = Notification;
}

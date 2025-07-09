export interface CommentNotification {
  author: { id: string; name: string; avatar: string };
  comment: { id: string; title: string; content: string };
  createdAt: Date;
  id: string;
  read: boolean;
  trip: { id: string; name: string };
}

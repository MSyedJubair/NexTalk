export interface message {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image: string;
}

export type User = {
  _id: number;
  fullname: string;
  email: string;
  imageUrl: string;
};
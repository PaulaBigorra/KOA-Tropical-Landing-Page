export interface Room {
  id: string;
  name: string;
  details: string;
  description: string;
  image: string;
}

export interface EventService {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Review {
  id: string;
  title: string;
  comment: string;
  author: string;
  location: string;
  stars: number;
}

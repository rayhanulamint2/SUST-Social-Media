export interface User {
  _id: string;
  name: string;
  avatar: string;
  department: string;
  roles: string[];
  about: string;
  session: string;
  achievements: Achievement[];
  workplaces: Workplace[];
  researchWorks: ResearchWork[];
  socialLinks: SocialLink[];
  posts: Post[];
  saved: Post[];
}

export interface Achievement {
  title: string;
  description: string;
  link: string;
  image: string;
}

export interface Workplace {
  name: string;
  designation: string;
  start: string; // ISO date string
  end: string;   // ISO date string
}

export interface ResearchWork {
  title: string;
  description: string;
  link: string;
  date: string; // ISO date string
}

export interface SocialLink {
  platform: string;
  link: string;
  username: string;
  description: string;
}

export interface Post {
  _id: string;
  creator: {
    _id: string;
    name: string;
    avatar: string;
  };
  content: string;
  image: string;
  createdAt: string;
  upVotes: number;
  downVotes: number;
  comment: Comment[];
  tags: string[];
  feedType: string;
  department?: string;
}


export interface Comment {
  userId: {
    _id: string;
    name: string;
    avatar: string;
  };
  commentText: string;
  createdAt: string; // ISO date string
}

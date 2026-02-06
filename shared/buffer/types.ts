export interface BufferProfile {
  avatar: string;
  created_at: number;
  default: boolean;
  formatted_service: string; // e.g. "Twitter", "LinkedIn"
  formatted_username: string; // e.g. "@username"
  id: string;
  schedules: Array<{
    days: string[];
    times: string[];
  }>;
  service: string;
  service_id: string;
  service_username: string;
  statistics: {
    followers: number;
  };
  timezone: string;
  user_id: string;
}

export interface BufferMedia {
  link?: string;
  description?: string;
  title?: string;
  picture?: string; // URL
  thumbnail?: string; // URL
}

export interface BufferUpdate {
  id: string;
  created_at: number;
  day?: string;
  due_at: number;
  due_time?: string;
  media?: BufferMedia;
  profile_id: string;
  profile_service: string;
  sent_at?: number;
  service_update_id?: string;
  statistics?: {
    clicks: number;
    favorites: number;
    mentions: number;
    reach: number;
    retweets: number;
    likes?: number;
    comments?: number;
  };
  status: 'buffer' | 'sent' | 'compliance';
  text: string;
  text_formatted: string;
  user_id: string;
  via: string;
  service_link?: string; // Sometimes populated for sent updates
}

export interface CreateUpdateOptions {
  profile_ids: string[];
  text: string;
  now?: boolean; // Send immediately
  top?: boolean; // Add to top of queue
  media?: BufferMedia;
  attachment?: boolean;
  scheduled_at?: string; // UTC date string
}

export interface UpdateResponse {
  success: boolean;
  buffer_count: number;
  buffer_percentage: number;
  updates: BufferUpdate[];
}

export interface UpdatesListResponse {
  total: number;
  updates: BufferUpdate[];
}

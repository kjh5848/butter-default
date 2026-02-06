
import type {\n  BufferProfile,\n  CreateUpdateOptions,\n  UpdateResponse,\n  UpdatesListResponse\n} from '../shared/buffer/types';

const API_BASE = "/api/buffer";

export class BufferService {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    
    // Auth via Header is preferred over query param for security
    const headers = {
      ...(options.headers || {}),
      'Authorization': `Bearer ${this.accessToken}`
    };

    const config: RequestInit = {
      ...options,
      headers
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        // Try to parse error message from Buffer
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || `Buffer API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Buffer API Request Failed [${endpoint}]:`, error);
      throw error;
    }
  }

  // Get user info (useful for validating token)
  async getUser(): Promise<any> {
    return this.request('/user');
  }

  // Get connected social media profiles
  async getProfiles(): Promise<BufferProfile[]> {
    return this.request<BufferProfile[]>('/profiles');
  }

  // Get pending updates (scheduled/buffered)
  async getPendingUpdates(profileId: string, page = 1, count = 20): Promise<UpdatesListResponse> {
    return this.request<UpdatesListResponse>(`/profiles/${profileId}/updates/pending?page=${page}&count=${count}`);
  }

  // Get sent updates history
  async getSentUpdates(profileId: string, page = 1, count = 20): Promise<UpdatesListResponse> {
    return this.request<UpdatesListResponse>(`/profiles/${profileId}/updates/sent?page=${page}&count=${count}`);
  }

  // Create an update (Schedule or Send Now)
  async createUpdate(options: CreateUpdateOptions): Promise<UpdateResponse> {
    const formData = new URLSearchParams();
    formData.append('text', options.text);
    
    options.profile_ids.forEach(id => formData.append('profile_ids[]', id));
    
    if (options.now) formData.append('now', 'true');
    if (options.top) formData.append('top', 'true');
    if (options.scheduled_at) formData.append('scheduled_at', options.scheduled_at);

    if (options.media) {
      if (options.media.link) formData.append('media[link]', options.media.link);
      if (options.media.description) formData.append('media[description]', options.media.description);
      if (options.media.title) formData.append('media[title]', options.media.title);
      if (options.media.picture) formData.append('media[picture]', options.media.picture);
      if (options.media.thumbnail) formData.append('media[thumbnail]', options.media.thumbnail);
    }

    return this.request<UpdateResponse>('/updates/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });
  }
  
  // Shuffle updates in the buffer
  async shuffleUpdates(profileId: string): Promise<any> {
     return this.request(`/profiles/${profileId}/updates/shuffle`, {
         method: 'POST'
     });
  }
}

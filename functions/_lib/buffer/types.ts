export type Env = {
  BUFFER_ACCESS_TOKEN?: string;
};

export type Context = {
  request: Request;
  env: Env;
  params: {
    path?: string | string[];
  };
};

export type {
  BufferProfile,
  BufferMedia,
  BufferUpdate,
  CreateUpdateOptions,
  UpdateResponse,
  UpdatesListResponse
} from '../../../shared/buffer/types';

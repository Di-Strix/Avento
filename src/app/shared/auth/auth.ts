import { User } from './user';

export namespace AuthRequests {
  export namespace Login {
    export interface Request {
      email: string;
      password: string;
    }

    export interface ResponseSuccess {
      token: string;
      user: User;
    }

    export interface ResponseError {
      message: string;
    }
  }

  export namespace Register {
    export interface Request {
      email: string;
      name: string;
      password: string;
    }

    export interface ResponseSuccess {
      token: string;
      user: User;
    }

    export interface ResponseError {
      message: string;
    }
  }
}

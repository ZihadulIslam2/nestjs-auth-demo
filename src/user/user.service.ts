import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
  roles: string[];
};

@Injectable()
export class UserService {
  private readonly user: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: ['user'],
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      roles: ['admin'],
    },
    {
      userId: 3,
      username: 'superadmin',
      password: 'admin123',
      roles: ['admin', 'superadmin'],
    },
  ];
  findOne(username: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      const user = this.user.find((user) => user.username === username);
      if (user) {
        resolve(user);
      } else {
        reject(new Error(`User with username ${username} not found`));
      }
    });
  }

  findById(userId: number): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      const user = this.user.find((user) => user.userId === userId);
      if (user) {
        resolve(user);
      } else {
        reject(new Error(`User with userId ${userId} not found`));
      }
    });
  }
}

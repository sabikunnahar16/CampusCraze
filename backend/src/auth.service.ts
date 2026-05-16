import { createHash, randomUUID } from 'crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from './prisma.service';

export type AuthUser = {
  id: number;
  email: string;
  name: string;
  role: string;
  clubSlug: string | null;
};

const sessionTtlMs = 1000 * 60 * 60 * 24 * 7;

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(email: string, password: string) {
    const adminUser = await this.prisma.adminUser.findUnique({
      where: {
        email,
      },
    });

    if (!adminUser) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordValid = await bcrypt.compare(password, adminUser.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const token = randomUUID();
    const tokenHash = createHash('sha256').update(token).digest('hex');

    await this.prisma.adminSession.create({
      data: {
        tokenHash,
        adminUserId: adminUser.id,
        expiresAt: new Date(Date.now() + sessionTtlMs),
      },
    });

    return {
      accessToken: token,
      user: this.mapAdminUser(adminUser),
    };
  }

  async authenticateToken(token: string) {
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const session = await this.prisma.adminSession.findUnique({
      where: {
        tokenHash,
      },
      include: {
        adminUser: true,
      },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Your session has expired. Please sign in again.');
    }

    return this.mapAdminUser(session.adminUser);
  }

  async getProfile(token: string) {
    return this.authenticateToken(token);
  }

  private mapAdminUser(adminUser: {
    id: number;
    email: string;
    name: string;
    role: string;
    clubSlug: string | null;
  }): AuthUser {
    return {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
      clubSlug: adminUser.clubSlug,
    };
  }
}

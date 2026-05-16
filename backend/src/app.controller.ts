import { Body, Controller, ForbiddenException, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AdminAuthGuard, AuthenticatedRequest } from './auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPlatform() {
    return this.appService.getPlatform();
  }

  @Get('clubs')
  getClubs() {
    return this.appService.getClubs();
  }

  @Get('clubs/:slug')
  getClub(@Param('slug') slug: string) {
    return this.appService.getClub(slug);
  }

  @UseGuards(AdminAuthGuard)
  @Patch('clubs/:slug')
  updateClub(@Param('slug') slug: string, @Body() payload: Record<string, unknown>, @Req() request: AuthenticatedRequest) {
    const adminUser = request.adminUser;

    if (!adminUser) {
      return this.appService.updateClub(slug, payload as never);
    }

    if (adminUser.role !== 'superadmin' && adminUser.clubSlug !== slug) {
      throw new ForbiddenException('You can only edit your assigned club.');
    }

    return this.appService.updateClub(slug, payload as never);
  }

  @Get('bus-routes')
  getBusRoutes() {
    return this.appService.getBusRoutes();
  }

  @Get('welfare-zones')
  getWelfareZones() {
    return this.appService.getWelfareZones();
  }
}

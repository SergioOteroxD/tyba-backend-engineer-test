import { Body, Controller, DefaultValuePipe, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ResponseHttp } from '../../../core/common/entity/response-http.model';
import { AuthJwtGuard } from '../../guard/jwt.guard';
import { RestaurantNearbyDto } from './dto/restaurant-nearby.dto';
import { IqueryRestaurantUC } from '../../../core/restaurant/use-case/query-restaurant.uc';
import { ApiTags } from '@nestjs/swagger';

@Controller('Restaurant')
@ApiTags('restaurant')
@UseGuards(AuthJwtGuard)
export class RestaurantController {
  constructor(private queryRestaurant: IqueryRestaurantUC) {}

  @Post('nearby')
  async registerAssociate(@Body() body: RestaurantNearbyDto, @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number) {
    const result = await this.queryRestaurant.getAllNearBy(limit, body);
    return new ResponseHttp(result.status, result);
  }
}

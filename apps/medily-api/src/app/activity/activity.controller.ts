import { Controller, Get, Param } from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {

    constructor(private activityService: ActivityService){}

    @Get()
    findAll() {
        return this.activityService.findAll();   
    }

    @Get('/:id')
    findbyid(@Param('id') id: string) {
        return this.activityService.findbyId(id);   
    }
}

import { Controller, Get, Param, Body, Post, Delete, Patch } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from './activity.interface';

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

    @Post()
    create(@Body() newActivity: Activity)  {
        return this.activityService.createActivity(newActivity);   
    }

    @Patch('/:id')
    update(@Param('id') id: string, @Body() updateActivity: Activity) {
      return this.activityService.update(updateActivity, id);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
    return this.activityService.DeletebyId(id);
    }

}

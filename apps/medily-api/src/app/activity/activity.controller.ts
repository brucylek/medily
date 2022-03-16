import { Controller, Get, Param, Body, Post, Delete, Patch, ValidationPipe, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from './activity.interface';
import { ActivityValidationDto } from './activity.validation';
import { activityExample, ApiActivity, ApiActivityCreateDto } from './activity.documentation';
import { ApiQuery,ApiBadRequestResponse, ApiBody, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiCreatedResponse } from '@nestjs/swagger';
@Controller('activity')
export class ActivityController {

    constructor(private activityService: ActivityService){}

    @Get()
    @ApiCreatedResponse({ type: [ApiActivity]})
    findAll() {
        return this.activityService.findAll();   
    }

    @Get('/category')
    @ApiCreatedResponse({ type: [ApiActivity]})
    @ApiQuery({type: String, name: 'category', example: activityExample.id_category})
    findCategory(@Query('category') category: string) {
        return this.activityService.findCategory(category);   
    }

    @Get('/:id')
    @ApiParam({type: String, name: 'id', example: activityExample._id})
    @ApiOkResponse({ type: ApiActivity})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    findbyid(@Param('id') id: string) {
        return this.activityService.findbyId(id);   
    }

    @Post()
    @ApiCreatedResponse({ type: ApiActivity})
    @ApiBody({ type: ApiActivityCreateDto})
    @ApiBadRequestResponse()
    create(@Body(ValidationPipe) newActivity: ActivityValidationDto)  {
        return this.activityService.createActivity(newActivity);   
    }


    @Patch('/:id')
    @ApiBody({ type: ApiActivityCreateDto})
    @ApiParam({type: String, name: 'id', example: activityExample._id})
    @ApiOkResponse({ type: ApiActivity})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    update(@Param('id') id: string, @Body(ValidationPipe) updateActivity: ActivityValidationDto) {
      return this.activityService.update(updateActivity, id);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiParam({type: String, name: 'id', example: activityExample._id})
    @ApiNoContentResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    delete(@Param('id') id: string) {
    return this.activityService.DeletebyId(id);
    }

}

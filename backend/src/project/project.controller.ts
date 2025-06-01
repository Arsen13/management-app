import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUpdateProjectDto } from './dto/create-project.dto';

@Controller('project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createProjectDto: CreateUpdateProjectDto, @Req() req) {
    return this.projectService.create(createProjectDto, +req.user.id);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Body() updateProjectDto: CreateUpdateProjectDto,
    @Param('id') projectId: string,
    @Req() req,
  ) {
    return this.projectService.update(
      updateProjectDto,
      +projectId,
      +req.user.id,
    );
  }

  @Delete(':id')
  delete(@Req() req, @Param('id') id: string) {
    return this.projectService.delete(+id, +req.user.id);
  }
}

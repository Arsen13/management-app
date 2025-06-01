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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('project')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: 'Used to create a new project' })
  @ApiCreatedResponse({ description: 'Project created' })
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createProjectDto: CreateUpdateProjectDto, @Req() req) {
    return this.projectService.create(createProjectDto, +req.user.id);
  }

  @ApiOperation({ summary: 'Used to get a list of projects' })
  @ApiCreatedResponse({ description: 'Projects found' })
  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @ApiOperation({ summary: 'Used to find a single project' })
  @ApiCreatedResponse({ description: 'Project found' })
  @Get(':id')
  findOne(@Param('id') projectId: string) {
    return this.projectService.findOne(+projectId);
  }

  @ApiOperation({ summary: 'User to update information about a project' })
  @ApiCreatedResponse({ description: 'Project updated' })
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

  @ApiOperation({ summary: 'Used to delete a project' })
  @ApiCreatedResponse({ description: 'Project deleted' })
  @Delete(':id')
  delete(@Req() req, @Param('id') id: string) {
    return this.projectService.delete(+id, +req.user.id);
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUpdateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateUpdateProjectDto, userId: number) {
    const isProjectExist = await this.projectRepository.findBy({
      user: { id: userId },
      title: createProjectDto.title,
    });

    if (isProjectExist.length) {
      throw new BadRequestException('This project already exist');
    }

    const newProject = {
      title: createProjectDto.title,
      description: createProjectDto.description,
      user: {
        id: userId,
      },
    };

    return await this.projectRepository.save(newProject);
  }

  async findAll() {
    return await this.projectRepository.find();
  }

  async findOne(projectId: number) {
    return await this.projectRepository
      .createQueryBuilder('project')
      .leftJoin('project.user', 'user')
      .addSelect(['user.firstName', 'user.lastName'])
      .where('project.id = :projectId', { projectId })
      .getOne();
  }

  async update(
    updateProjectDto: CreateUpdateProjectDto,
    projectId: number,
    userId: number,
  ) {
    const project = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoin('project.user', 'user')
      .addSelect(['user.id'])
      .where('project.id = :projectId', { projectId })
      .andWhere('user.id = :userId', { userId })
      .getOne();

    if (!project) throw new NotFoundException('Project not found');

    return await this.projectRepository.save({
      ...project,
      ...updateProjectDto,
    });
  }

  async delete(projectId: number, userId: number) {
    const result = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoin('project.user', 'user')
      .addSelect(['user.id'])
      .delete()
      .where('project.id = :projectId', { projectId })
      .andWhere('user.id = :userId', { userId })
      .execute();

    if (result.affected == 0) {
      throw new NotFoundException('Project not found');
    }

    return {
      message: 'Project was deleted successfully',
      affected: result.affected,
    };
  }
}

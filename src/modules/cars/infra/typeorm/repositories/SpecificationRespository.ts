import { getRepository, Repository } from "typeorm";

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../../../repositories/ISpecificationRepository";
import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    });

    console.log("teste");

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    // Select * from specification where name = "name" limit 1
    const specification = await this.repository.findOne({
      name,
    });

    return specification;
  }

  async list(): Promise<Specification[]> {
    const specification = await this.repository.find();
    return specification;
  }
}

export { SpecificationRepository };
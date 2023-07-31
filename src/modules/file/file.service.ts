
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { readExcelFile } from '../../shared/excel-file-reader';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async insertDataFromExcel(filePath: string) {
        const dataFromExcel = await readExcelFile(filePath);

        // Insert data into the database using the TypeORM repository
        const entitiesToSave = dataFromExcel.map((item) => {
            const user = new User();
            // Map the properties from 'item' to the corresponding properties in 'entity'
            user.name = item.name;
            user.email = item.email;
            user.password = item.password;
            // this.userRepo.insert = item.user;
            // Add other property mappings here
            return user;
        });

        return await this.userRepo.save(entitiesToSave);
    }
}

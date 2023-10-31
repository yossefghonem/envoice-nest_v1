// import { FileService } from './file.service';
// import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';

// @Controller('file')
// export class FileController {
//   constructor(private readonly fileService: FileService) { }

//   @Post('upload')
//   @UseInterceptors(FileInterceptor('file')) // 'file' is the name of the field in the form data
//   async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
//     const filePath = file.path;
//     await this.fileService.insertDataFromExcel(filePath);

//     return 'Data uploaded and saved successfully!';
//   }
// }

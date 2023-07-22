import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export abstract class OBaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  @ApiProperty()
  id?: number;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ readOnly: true, required: false })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({ readOnly: true, required: false })
  updatedAt?: Date;

  // @ApiProperty({ required: false })
  // @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  // deletedAt?: Date;

  // deletedDate: Date;
}
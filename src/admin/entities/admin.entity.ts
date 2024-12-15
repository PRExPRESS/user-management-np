import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'admins' })
export class Admin extends Model {

    @Column
    name: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    phone: string;

    

    @Column
    createdAt: Date;

    @Column
    updatedAt: Date;
}

import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {

  constructor(
    // eslint-disable-next-line prettier/prettier
    private readonly prismaService: PrismaService,
  ) {}

  async findAll() {
    const users = await this.prismaService.users.findMany();

    return {
      status: true,
      data: users?.map((user) => ({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })),
      message: "Danh sách users"
    }
  }
  async update(email,updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.users.update({
      where: {
        email
      },
      data: updateUserDto
    })

    return {
      status: true,
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      message: "Cập nhật thành công"
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

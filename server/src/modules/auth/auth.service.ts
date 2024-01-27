import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { comparePassword, hashPassword } from 'src/utils/bcrypt';
import { RegisterDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ROLES } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    // eslint-disable-next-line prettier/prettier
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async generateAccessToken(payload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_KEY,
    });
  }
  async signUpByEmail(createUserDTO: RegisterDto) {
    const { firstName, lastName, email, password, role } = createUserDTO;
    const roleId = ROLES[role?.toUpperCase() || 'USER']
    const encryptedPassword = await hashPassword(password);
    let user = await this.prismaService.users.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      throw new HttpException({
        status: false, 
        daa: null,
        message: "Tài khoản đã tồn tại"
      }, HttpStatus.BAD_REQUEST)
    } else {
      user = await this.prismaService.users.create({
        data: {
          firstName,
          lastName,
          email,
          encryptedPassword,
          roleId
        },
      });
    }
    const accessToken = await this.generateAccessToken({
      email: email,
      id: user.id,
    });
    return {
      status: true,
      data: {
        token: accessToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      message: 'Đăng ký thành công',
    };
  }

  async login(data: LoginDto) {
    const { email, password } = data;
    const ex_user = await this.prismaService.users.findFirst({
      where: {
        email,
      },
    });
    if (!ex_user) {
      throw new HttpException({
        status: false, 
        data: null,
        message: "Tài khoản không tồn tại"
      }, HttpStatus.BAD_REQUEST)
    }

    const { encryptedPassword } = ex_user;
    const isValidPassword = await comparePassword(password, encryptedPassword);
    if (!isValidPassword) {
      throw new HttpException({
        status: false, 
        daa: null,
        message: 'Mật khẩu bạn đã nhập không chính xác.',
      }, HttpStatus.BAD_REQUEST)

    }
    const access_token = await this.generateAccessToken({
      email: email,
      id: ex_user.id,
    });
    return {
      status: true,
      data: {
        token: access_token,
        user: {
          id: ex_user.id,
          email: ex_user?.email,
          firstName: ex_user.firstName,
          lastName: ex_user.lastName,
        },
      },
      message: 'Đăng nhập thành công',
    };
  }
}

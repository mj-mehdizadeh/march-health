import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { PaymentsService } from '../payments.service';
import { PaymentDto } from '../dto/payment.dto';
import { requiredObjectIdParamJoiPipe } from '../../common/lib/joi';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { Roles } from '../../auth/decorator/acesses.decorator';
import { UsersRole } from '../../users/users.type';

@ApiTags('admin/payments')
@Controller('admin/payments')
@ApiBearerAuth()
@Roles(UsersRole.ADMIN)
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @ApiResponse({ status: 200, type: PaymentDto, isArray: true })
  findAll(@Req() req) {
    return this.paymentsService.findAll({});
  }

  @Get(':id')
  @UsePipes(requiredObjectIdParamJoiPipe)
  @ApiResponse({ status: 200, type: PaymentDto })
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(requiredObjectIdParamJoiPipe)
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(id, {}, updatePaymentDto);
  }

  @Delete(':id')
  @UsePipes(requiredObjectIdParamJoiPipe)
  async remove(@Param('id') id: string) {
    await this.paymentsService.remove(id);
  }
}

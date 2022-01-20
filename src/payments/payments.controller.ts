import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { PaymentDto } from './dto/payment.dto';
import { requiredObjectIdParamJoiPipe } from '../common/lib/joi';

@ApiTags('payments')
@Controller('payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiResponse({ status: 200, type: PaymentDto })
  create(@Body() createPaymentDto: CreatePaymentDto, @Req() req) {
    return this.paymentsService.create({
      ...createPaymentDto,
      userId: req.user.id,
    });
  }

  @Get()
  @ApiResponse({ status: 200, type: PaymentDto, isArray: true })
  findAll(@Req() req) {
    return this.paymentsService.findAll({ userId: req.user.id });
  }

  @Get(':id')
  @UsePipes(requiredObjectIdParamJoiPipe)
  @ApiResponse({ status: 200, type: PaymentDto })
  findOne(@Param('id') id: string, @Req() req) {
    return this.paymentsService.findOne(id, { userId: req.user.id });
  }

  @Patch(':id')
  @UsePipes(requiredObjectIdParamJoiPipe)
  update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
    @Req() req,
  ) {
    return this.paymentsService.update(
      id,
      { userId: req.user.id },
      updatePaymentDto,
    );
  }

  @Delete(':id')
  @UsePipes(requiredObjectIdParamJoiPipe)
  async remove(@Param('id') id: string, @Req() req) {
    await this.paymentsService.remove(id, { userId: req.user.id });
  }
}

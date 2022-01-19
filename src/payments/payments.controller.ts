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
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { PaymentDto } from './dto/payment.dto';

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
  @ApiResponse({ status: 200, type: PaymentDto })
  findOne(@Param('id') id: string, @Req() req) {
    return this.paymentsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
    @Req() req,
  ) {
    return this.paymentsService.update(id, req.user.id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}

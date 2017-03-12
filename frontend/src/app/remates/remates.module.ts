import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '@angular/material'
import { RematesRoutingModule, routableComponents } from './remates-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtGuard } from './JwtGuard.service'
import { RemateService } from '../remates/remate.service'

@NgModule({
  declarations: [routableComponents],
  imports: [
    MaterialModule,
    CommonModule,
    RematesRoutingModule,
    FormsModule,
    ReactiveFormsModule ],
  exports: [],
  providers: [
    JwtGuard,
    RemateService
  ]
})

export class RematesModule {}

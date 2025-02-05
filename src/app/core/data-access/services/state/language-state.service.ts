import { Injectable } from '@angular/core';
import { BaseStateService } from '@core/data-access/services/state/base-state.service';
import { LanguagesISOEnum } from '@core/entities/enums/languages-iso.enum';

@Injectable({
  providedIn: 'root',
})
export class LanguageStateService extends BaseStateService<LanguagesISOEnum> {}

import { inject, Injectable } from '@angular/core';
import { InternalApiService } from '@core/data-access/api/internal-api.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { currentLanguageStore } from '@core/data-access/state/current-language.store';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  IAuthor,
  IAuthorRaw,
} from '@app/environment/entities/interfaces/author.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorApiService {
  private readonly _internalApi = inject(InternalApiService);
  private readonly _lang$ = toObservable(inject(currentLanguageStore).data);

  public getAuthor(): Observable<IAuthor> {
    return combineLatest([
      this._getAuthor(),
      this._lang$.pipe(filter(Boolean)),
    ]).pipe(
      map(([authorInfo, lang]) => {
        const { name, links } = authorInfo;

        const updatedLinks = links
          .filter((link) => link.isVisible)
          .map((link) => ({
            ...link,
            href: link.href[lang],
          }));

        return { name: name[lang], links: updatedLinks };
      }),
    );
  }

  private _getAuthor(): Observable<IAuthorRaw> {
    return this._internalApi.getInternalJsonData('author');
  }
}

import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const platformStore = signalStore(
  { providedIn: 'root' },
  withState<{ platform: 'server' | 'browser' | null }>({ platform: null }),
  withComputed(({ platform }) => ({
    isBrowser: computed(() => platform() === 'browser'),
    isServer: computed(() => platform() === 'server'),
  })),
  withMethods((store, _platformId = inject(PLATFORM_ID)) => ({
    init(): void {
      const isBrowser = isPlatformBrowser(_platformId);
      const platform = isBrowser ? 'browser' : 'server';

      patchState(store, { platform: platform });
    },
  })),
);

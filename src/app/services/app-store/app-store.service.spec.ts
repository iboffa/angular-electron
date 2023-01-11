import { TestBed } from '@angular/core/testing';

import { AppStoreService } from './app-store.service';

describe('AppStoreService', () => {
  let service: AppStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStoreService);

    window.appStore = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get value from store', () => {
    const spyOnGet = jest.spyOn(window.appStore, 'get');
    service.get('some.value');
    expect(spyOnGet).toHaveBeenCalledWith('some.value');
  });

  it('should set value in the store', () => {
    const spyOnSet = jest.spyOn(window.appStore, 'set');
    service.set('new.value', 'Test');
    expect(spyOnSet).toHaveBeenCalledWith('new.value', 'Test');
  });

  it('should delete prop from the store', () => {
    const spyOnDelete = jest.spyOn(window.appStore, 'delete');
    service.delete('some.value');
    expect(spyOnDelete).toHaveBeenCalledWith('some.value');
  });
});

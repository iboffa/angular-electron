import {DebugElement, Type} from '@angular/core';
import {By} from '@angular/platform-browser';
import SpyInstance = jest.SpyInstance;

export const tooltipTextMatches = (element: DebugElement, tooltipDataTest: string, innerText: string): boolean => {
  const tooltipTextContainer = getElementByDataTest(element, tooltipDataTest)
    .query(By.css('.infoTooltip'));
  return textMatches(tooltipTextContainer, innerText);
};

export const getElementByDataTest = (parentElement: DebugElement, dataTest: string): DebugElement => {
  // using string templates directly in the selector does not work
  const selector = `[data-test="${dataTest}"]`;
  return parentElement.query(By.css(selector));
};

export const textMatches = (element: DebugElement, text: string, caseInsensitive?: boolean): boolean => {

  return caseInsensitive ?
    element.nativeElement.textContent.trim().toUpperCase() === text.toUpperCase() :
    element.nativeElement.textContent.trim() === text;
};

export const htmlMatches = (element: DebugElement, text: string): boolean => {
  return element.nativeElement.innerHTML.trim() === text;
};

export const clickButton = (element: DebugElement, dataTest: string): void => {
  getElementByDataTest(element, dataTest).nativeElement.click();
};

export function createServiceStub<T extends Type<any>>(serviceClass: T,
  customConfiguration?: { [x: string]: any }, keepOriginal: string[] = []): T {
  return {
    ...Object.getOwnPropertyNames(serviceClass.prototype)
      .filter((key) => key !== 'constructor' && typeof serviceClass.prototype[key] === 'function')
      .reduce((o, key) => ({...o, [key]: keepOriginal.includes(key) ? serviceClass[key] : jest.fn()}), {}),
    ...customConfiguration
  } as T;
};

export const calledBefore = (fn: SpyInstance, compare: SpyInstance): boolean => {
  const fnOrder = fn.mock.invocationCallOrder[0];
  const compareOrder = compare.mock.invocationCallOrder[0];
  return fnOrder < compareOrder;
};

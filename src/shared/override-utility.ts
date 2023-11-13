import * as CryptoJS from 'crypto-js';
import * as crypto from 'crypto'
import moment from 'moment';
import { join } from 'path';
const fs = require('fs');
const fsPromises = require('fs/promises');



export async function getBase64FromImage(link: string): Promise<string> {
  let path = join(
    process.env.AttachementPath,
    link,
  );
  const contents = await fsPromises.readFile(path, { encoding: 'base64' });
  return contents.toString()
}

export class OverrideUtils {
 

  static encryptPassword(password: string) {
    console.log(password);
    let decrypted = CryptoJS.AES.decrypt(password, process.env.JWT_SECRET);
    let value = decrypted.toString(CryptoJS.enc.Utf8);

    if (value) {
      console.log({ value });
      // Dont do nothing because myString is already an encrypted value
      return password;
    } else {
      // Here encrypt your string again
      const enc = CryptoJS.AES.encrypt(password, process.env.JWT_SECRET).toString();
      console.log({ enc });
      return enc;
    }

  }
  static dycreptPassword(password: string) {
    const bytes = CryptoJS.AES.decrypt(password, process.env.JWT_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  /**
   * Search in object
   *
   * @param itemObj
   * @param searchText
   * @returns {boolean}
   */
  // public static searchInObj(itemObj: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }, searchText: any): boolean {
  //   for (const prop in itemObj) {
  //     if (!itemObj.hasOwnProperty(prop)) {
  //       continue;
  //     }

  //     const value = itemObj[prop];

  //     if (typeof value === 'string') {
  //       if (this.searchInString(value, searchText)) {
  //         return true;
  //       }
  //     } else if (Array.isArray(value)) {
  //       if (this.searchInArray(value, searchText)) {
  //         return true;
  //       }
  //     }

  //     if (typeof value === 'object') {
  //       if (this.searchInObj(value, searchText)) {
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // }


  /**
   * Search in array
   *
   * @param arr
   * @param searchText
   * @returns {boolean}
   */
  // public static searchInArray(arr: any[], searchText: any): boolean {
  //   for (const value of arr) {
  //     if (typeof value === 'string') {
  //       if (this.searchInString(value, searchText)) {
  //         return true;
  //       }
  //     }

  //     if (typeof value === 'object') {
  //       if (this.searchInObj(value, searchText)) {
  //         return true;
  //       }
  //     }
  //   }
  //   return false
  // }

  /**
   * Search in string
   *
   * @param value
   * @param searchText
   * @returns {any}
   */
  public static searchInString(value: string, searchText: any): any {
    return value.toLowerCase().includes(searchText);
  }

  /**
   * Generate a unique GUID
   *
   * @returns {string}
   */
  public static generateGUID(): string {
    function S4(): string {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return S4() + S4();
  }


  public static toEnglishDigits(str) {

    // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
    let e = '۰'.charCodeAt(0);
    str = str.replace(/[۰-۹]/g, function (t: string) {
      return t.charCodeAt(0) - e;
    });

    // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
    e = '٠'.charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function (t: string) {
      return t.charCodeAt(0) - e;
    });
    return str;
  }


  /**
   * Generate a random code 5 digits
   *
   * @returns {string}
   */
  public static randomCode(): string {
    return (Math.floor(Math.random() * 90000) + 10000).toString();
  }
  /**
   * Generate a random code 5 digits
   *
   * @returns {string}
   */
  public static randomRate(): number {
    let precision = 100; // 2 decimals
    let randomnum = Math.floor(Math.random() * (5 * precision - 1 * precision) + 1 * precision) / (1 * precision);
    return randomnum;

    // return randomnum < 5 ? randomnum : 5;
  }

  /**
   * Toggle in array
   *
   * @param item
   * @param array
   */
  public static toggleInArray(item: any, array: any[]): void {
    if (array.indexOf(item) === -1) {
      array.push(item);
    } else {
      array.splice(array.indexOf(item), 1);
    }
  }

  /**
   * Handleize
   *
   * @param text
   * @returns {string}
   */
  public static handleize(text: { toString: () => string; }): string {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }

  public static distance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit: 'K' | 'N',
  ) {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    }
    if (unit == 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }

}
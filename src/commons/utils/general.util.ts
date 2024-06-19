// eslint-disable-next-line @typescript-eslint/no-var-requires
const rTracer = require('cls-rtracer');
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { CustomException } from '../../core/common/entity/custom-exception.model';
import { RESPONSE_CODE } from '../response-codes/general-codes';

export class GeneralUtils {
  public static get getCorrelationalId(): string {
    return rTracer.id() || '';
  }

  public static get getTraceId(): string {
    return rTracer.id() || '';
  }

  public static async encryptPassword(password: string, pepper: string): Promise<string> {
    try {
      // Generamos un salt aleatorio para mejorar la seguridad
      const salt = await bcrypt.genSalt(10);

      // Concatenamos la contraseña y el pepper
      const pepperedPassword = password + pepper;

      // Encriptamos la contraseña con el salt y el pepper
      const hash = await bcrypt.hash(pepperedPassword, salt);

      // Devolvemos la contraseña encriptada
      return hash;
    } catch (error) {
      throw new CustomException(RESPONSE_CODE.ERROR, 'GeneralUtils.encryptPassword', 'Technical', error);
    }
  }

  public static async comparePassword(password: string, hash: string, pepper: any): Promise<boolean> {
    // Concatenamos la contraseña y el pepper
    const pepperedPassword = password + pepper;

    // Comparamos la contraseña con su versión encriptada con el pepper
    const match = await bcrypt.compare(pepperedPassword, hash);

    // Devolvemos true si las contraseñas coinciden, false en caso contrario
    return match;
  }

  /**
   *
   * @param length
   * @returns
   */
  public static generatePassword(length: number, prefix?: string): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (prefix) result = prefix + result;
    return result;
  }

  /**
   *
   * @param length
   * @returns
   */
  public static generateHash(length: number, prefix?: string): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (prefix) result = prefix + result;
    return result;
  }

  /**
   *
   * @param length
   * @returns
   */
  public static generateId(length: number, prefix?: string): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (prefix) result = prefix + result;
    return result;
  }

  static extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : type;
  }
}

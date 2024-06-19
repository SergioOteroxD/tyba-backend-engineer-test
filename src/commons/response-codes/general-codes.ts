import { IresponseCode } from '../../core/common/entity/response-code.interface';

export type TreponseCode = '400' | 'QUERY_OK' | 'QUERY_ERROR' | 'NOT_FOUND' | 'ERROR' | 'EXIST';

export const RESPONSE_CODE: Record<TreponseCode, IresponseCode> = {
  400: {
    code: 'BAD_REQUEST',
    message: 'Los datos de la solicitud no tienen el formato esperado.',
    status: 400,
  },
  QUERY_OK: {
    code: 'QUERY_OK',
    message: 'Consulta ejecutada correctamente.',
    status: 200,
  },
  QUERY_ERROR: {
    code: 'QUERY_ERROR',
    message: 'Error ejecutando la consulta.',
    status: 500,
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'No se encontró la información solicitada.',
    status: 404,
  },
  ERROR: {
    code: 'ERROR',
    message: 'Se presentó un error interno. Por favor, intente nuevamente.',
    status: 500,
  },
  EXIST: {
    code: 'EXIST',
    message: 'Ya existe el registro que se intenta crear.',
    status: 404,
  },
};

import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

/**
 * Defines an HTTP exception for *Uniqueness Constraint* type errors.
 */
export class UniquenessConstraintException extends HttpException {
  /**
   * Instantiate an `UniquenessConstraintException` Exception.
   *
   * @example
   * `throw new UniquenessConstraintException()`
   *
   * @usageNotes
   * The HTTP response status code will be 422.
   * - The `objectOrError` argument defines the JSON response body or the message string.
   * - The `description` argument contains a short description of the HTTP error.
   *
   * By default, the JSON response body contains two properties:
   * - `statusCode`: this will be the value 422.
   * - `message`: the string `'Duplicate Field in Entity Violates Uniqueness
   * Constraint in Database'` by default; override this by supplying
   * a string in the `objectOrError` parameter.
   *
   * If the parameter `objectOrError` is a string, the response body will contain an
   * additional property, `error`, with a short description of the HTTP error. To override the
   * entire JSON response body, pass an object instead. Nest will serialize the object
   * and return it as the JSON response body.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(
    objectOrError?: string | object | any,
    description = `Field in Entity Violates Uniqueness Constraint in Database`,
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.UNPROCESSABLE_ENTITY,
      ),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

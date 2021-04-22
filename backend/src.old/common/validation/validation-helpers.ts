import {
  isDefined,
  registerDecorator,
  ValidateIf,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

// https://github.com/typestack/class-validator/issues/245
// Define new constraint that checks the existence of sibling properties
@ValidatorConstraint({ async: false })
class IsNotSiblingOfConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (isDefined(value)) {
      return this.getFailedConstraints(args).length === 0;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${
      args.property
    } cannot exist alongside the following defined properties: ${this.getFailedConstraints(
      args
    ).join(", ")}`;
  }

  getFailedConstraints(args: ValidationArguments) {
    return args.constraints.filter((prop) => isDefined(args.object[prop]));
  }
}

// Create Decorator for the constraint that was just created
function IsNotSiblingOf(
  props: string[],
  validationOptions?: ValidationOptions
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: props,
      validator: IsNotSiblingOfConstraint,
    });
  };
}

// Helper function for determining if a prop should be validated
function incompatibleSiblingsNotPresent(incompatibleSiblings: string[]) {
  return function (o, v) {
    return Boolean(
      isDefined(v) || incompatibleSiblings.every((prop) => !isDefined(o[prop]))
      // Validate if prop has value
      // Then, validate if all incompatible siblings are not defined
    );
  };
}

export function IncompatableWith(incompatibleSiblings: string[]) {
  const notSibling = IsNotSiblingOf(incompatibleSiblings);
  const validateIf = ValidateIf(
    incompatibleSiblingsNotPresent(incompatibleSiblings)
  );
  return function (target: any, key: string) {
    notSibling(target, key);
    validateIf(target, key);
  };
}

// Define new constraint that checks the absence of sibling properties
@ValidatorConstraint({ async: false })
class RequiredInTheAbsenceOfConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (!isDefined(value)) {
      return this.getFailedConstraints(args).length === 0;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${
      args.property
    } must exist if the following properties are not defined: ${this.getFailedConstraints(
      args
    ).join(", ")}`;
  }

  getFailedConstraints(args: ValidationArguments) {
    return args.constraints.filter((prop) => !isDefined(args.object[prop]));
  }
}

// Create Decorator for the constraint that was just created
function RequiredInTheAbsenceOf(
  props: string[],
  validationOptions?: ValidationOptions
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: props,
      validator: RequiredInTheAbsenceOfConstraint,
    });
  };
}

// Helper function for determining if a prop should be validated
function requiredSiblingsNotPresent(requiredSiblings: string[]) {
  return function (o, v) {
    return Boolean(
      // maybe needs to check if required siblings also not defined
      // !isDefined(v) || requiredSiblings.every(prop => !isDefined(o[prop]))
      !isDefined(v) || requiredSiblings.every((prop) => isDefined(o[prop]))
      // Validate if prop doed not have value
      // Then, validate if all required siblings are defined
    );
  };
}

export function RequiredIfMissing(requiredSiblings: string[]) {
  const notSibling = RequiredInTheAbsenceOf(requiredSiblings);
  const validateIf = ValidateIf(requiredSiblingsNotPresent(requiredSiblings));
  return function (target: any, key: string) {
    notSibling(target, key);
    validateIf(target, key);
  };
}

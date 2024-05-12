import { isNotNil, isEmpty, not, allPass, compose, isNil, anyPass, equals } from "ramda";
import { Status } from "../types/types";

// isNotNullOrEmpty:: any -> boolean
export const isNotNullOrEmpty = allPass([isNotNil, compose(not, isEmpty)]);

// isNilOrEmpty:: any -> boolean
export const isNilOrEmpty = anyPass([isNil, isEmpty]);

// isSuccess:: Status -> boolean
export const isSuccess = equals(Status.SUCCESS);

// isError:: Status -> boolean
export const isError = equals(Status.ERROR);
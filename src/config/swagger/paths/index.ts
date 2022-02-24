import { OpenAPIV3 } from 'openapi-types';
import userSchema from './user';
import piuSchema from './piu';

const patternSchema: OpenAPIV3.PathsObject = {
  ...userSchema,
  ...piuSchema,
};

export default patternSchema;

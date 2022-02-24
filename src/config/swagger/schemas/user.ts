import { OpenAPIV3 } from 'openapi-types';

const UserComponent: OpenAPIV3.ComponentsObject['schemas'] = {
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      photo: {
        type: 'string',
      },
      created_at: {
        type: 'string',
      },
      updated_at: {
        type: 'string',
      },
    },
  },
};

export default UserComponent;

import { OpenAPIV3 } from 'openapi-types';

const PiuComponent: OpenAPIV3.ComponentsObject['schemas'] = {
  Piu: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      user_id: {
        type: 'string',
      },
      content: {
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

export default PiuComponent;

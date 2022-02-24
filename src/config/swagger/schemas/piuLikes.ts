import { OpenAPIV3 } from 'openapi-types';

const PiuLikesComponent: OpenAPIV3.ComponentsObject['schemas'] = {
  PiuLikes: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      user_id: {
        type: 'string',
      },
      piu_id: {
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

export default PiuLikesComponent;

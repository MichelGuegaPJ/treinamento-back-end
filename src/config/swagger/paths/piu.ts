import { OpenAPIV3 } from 'openapi-types';
import PiuComponent from '../schemas/piu';

const piuSchema: OpenAPIV3.PathsObject = {
  '/piu/postar-piu': {
    post: {
      summary: 'Postar piu',
      description: 'Postar piu',
      tags: ['Piu'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                content: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Unauthorized',
        },
        400: {
          description: 'Empty content',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  properties: PiuComponent,
                },
              },
            },
          },
        },
      },
    },
  },
  '/piu/listar-pius': {
    get: {
      summary: 'Listar pius',
      description: 'Listar pius',
      tags: ['Piu'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'username',
          in: 'query',
        },
      ],
      responses: {
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'User not found',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  properties: PiuComponent,
                },
              },
            },
          },
        },
      },
    },
  },
  '/piu/deletar/{id}': {
    delete: {
      summary: 'Deletar piu',
      description: 'Deletar piu',
      tags: ['Piu'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
        },
      ],
      responses: {
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'Piu not found',
        },
        405: {
          description: "You can't delete",
        },
        500: {
          description: 'Piu not deleted',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
  },
  '/piu/like': {
    patch: {
      summary: 'Dar like/dislike no piu',
      description: 'Dar like/dislike no piu',
      tags: ['Piu'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                piu_id: {
                  description: 'piu_id',
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Unauthorized',
        },
        400: {
          description: 'Piu not found',
        },
        404: {
          description: 'User not found',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
  },
  '/piu/favorite': {
    patch: {
      summary: 'Favoritar/desfavoritar piu',
      description: 'Favoritar/desfavoritar piu',
      tags: ['Piu'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                piu_id: {
                  description: 'piu_id',
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Unauthorized',
        },
        400: {
          description: 'Piu not found',
        },
        404: {
          description: 'User not found',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
  },
  '/piu/listar-pius/favoritos': {
    get: {
      summary: 'Listar pius favoritos do usuário',
      description: 'Listar pius favoritos do usuário',
      tags: ['Piu'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        401: {
          description: 'Unauthorized',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  properties: PiuComponent,
                },
              },
            },
          },
        },
      },
    },
  },
};

export default piuSchema;
